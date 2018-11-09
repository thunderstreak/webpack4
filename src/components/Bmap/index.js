import React,{ Component, Fragment } from 'react'
import BMap  from 'BMap';
import '@JAVASCRIPTS/components/Bmap/DrawingManager_min'
import data from './data';

export default class Bmap extends Component{
    constructor(props){
        super(props);
        this.mapRef = React.createRef();
        this.state = {
            name:'bmap',
            class:'bmap-class',
            windowHeight:0,
            geoUtils:'',
            markers:[],
            polygons:[],

        }
    }

    componentDidMount(){
        console.log(BMapLib);
        // this.setState({geoUtils:BMapLib.GeoUtils});
        let windowHeight = document.documentElement.clientHeight;
        let markers = data.data.map((k) => new BMap.Point(k[0], k[1]));

        let map = new BMap.Map('mapContainer', {enableMapClick: false}); // 创建Map实例
        map.centerAndZoom('西安', 10);
        map.enableScrollWheelZoom();

        this.setState({markers,windowHeight});

    }

    render(){
        return(
            <Fragment>
                <div id="mapContainer" ref={this.mapRef} className={this.state.class} style={{height:`${this.state.windowHeight}px`}}>{this.state.name}</div>
                <div>{this.state.markers.length}</div>
            </Fragment>
        )
    }
}
