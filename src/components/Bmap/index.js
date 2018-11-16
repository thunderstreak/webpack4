import React,{ Component, Fragment } from 'react'
import BMap  from 'BMap';
import '@JAVASCRIPTS/components/Bmap/GeoUtils'
import '@JAVASCRIPTS/components/Bmap/DrawingManager_min'
import data from './data';

export default class Bmap extends Component{
    constructor(props){
        super(props);
        this.mapRef = React.createRef();
        this.state = {
            name            :'bmap',
            class           :'bmap-class',
            windowHeight    :0,
            Map             :'',
            GeoUtils        :'',
            markers         :[],
            polygons        :[],
            drawingManager  :'',
        }
    }

    // 清除指定id的覆盖物
    static clearTargetOverlay(state,id){
        let polygons = state.polygons;
        for (let i = 0; i < polygons.length; i++) {
            if(polygons[i].uid === id){
                state.Map.removeOverlay(polygons[i]);
            }
        }
    }

    // 添加海量点
    static addMassPoints(state){
        let pointCollection = new BMap.PointCollection(state.markers, {
            size    : 4,//大小
            shape   : 3,//形状
            color   : 'red',//颜色
        });  // 初始化PointCollection
        state.Map.addOverlay(pointCollection);  // 添加Overlay
    }

    // 获取绘制区域内存在点数量
    static getPointInPolygons(state,polygon){
        let num = 0;
        for (let i = 0; i < state.markers.length; i++) {
            // 判断目标点是否在多边形区域内
            if(state.GeoUtils.isPointInPolygon(state.markers[i],polygon)){
                num += 1;
            }
        }
        return num;
    }

    // 处理绘制事件
    static HandlerDrawingEvent(state){
        state.drawingManager.addEventListener('overlaycomplete', (e) => {
            state.drawingManager.close();
            Bmap.clearTargetOverlay(state,'new');

            let path = e.overlay.getPath();
            e.overlay.uid = 'new';
            state.polygons.push(e.overlay);

            let arrpolgon = [];
            for (let i = 0; i < path.length; i++) {
                arrpolgon.push(new BMap.Point(path[i].lng, path[i].lat));
            }
            let polygon = new BMap.Polygon(arrpolgon);//创建多边形
            polygon.uid = 'new';//设置新绘制的覆盖物

            let num = Bmap.getPointInPolygons(state,polygon);

            // 获取中心点并设置信息窗口
            let centerPoint = polygon.getBounds().getCenter();
            let window = new BMap.InfoWindow("在区域内有：" + num + '个案件');
            state.Map.openInfoWindow(window,centerPoint);
            window.addEventListener('close',() => {
                Bmap.clearTargetOverlay(state,'new');
            });
            console.log(num);
        })
    }

    componentDidMount(){
        const GeoUtils = BMapLib.GeoUtils;
        const windowHeight = document.documentElement.clientHeight;
        const markers = data.data.map((k) => new BMap.Point(k.longitude, k.latitude));

        const Map = new BMap.Map('mapContainer', {enableMapClick: false}); // 创建Map实例
        Map.centerAndZoom('西安', 10);
        Map.enableScrollWheelZoom();

        const drawingManager = new BMapLib.DrawingManager(Map, {
            isOpen            : false, //是否开启绘制模式
            enableDrawingTool : true, //是否显示工具栏
            drawingToolOptions: {
                anchor      : BMAP_ANCHOR_TOP_LEFT, //位置
                offset      : new BMap.Size(5, 5), //偏离值
                drawingModes: [
                    // BMAP_DRAWING_MARKER,//绘制标注点
                    'circle',//BMAP_DRAWING_CIRCLE,//绘制园
                    // BMAP_DRAWING_POLYLINE,//绘制线
                    'polygon',//BMAP_DRAWING_POLYGON,//绘制多边形
                    'rectangle',//BMAP_DRAWING_RECTANGLE //绘制矩形
                ]
            }
            //enableCalculate:true,
        });
        drawingManager.setDrawingMode('polygon');//设置绘制类型

        this.setState({markers,windowHeight,GeoUtils,Map,drawingManager},() => {
            // console.log(this.state);
        });

    }

    /*componentWillUpdate(prevProps, prevState){
        Bmap.addMassPoints(prevState);
        Bmap.HandlerDrawingEvent(prevState);
    }*/

    static getDerivedStateFromProps(nextProps, prevState){
        if(prevState.Map){
            Bmap.addMassPoints(prevState);
            Bmap.HandlerDrawingEvent(prevState);
            return prevState
        }else {
            return null
        }
    }

    render(){
        return(
            <Fragment>
                <div id="mapContainer" ref={this.mapRef} className={this.state.class} style={{height:`${this.state.windowHeight}px`}}>{this.state.name}</div>
            </Fragment>
        )
    }
}
