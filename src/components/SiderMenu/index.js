import React,{Component,Fragment} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import { Layout, Menu, Breadcrumb, Icon } from 'antd'
const { SubMenu } = Menu;
const { Header, Content, Sider, Footer} = Layout;

/*const mapStateToProps = (state) => {
    return {
        hash:state.saveRoute.hashUrl
    }
};
@connect(mapStateToProps)*/
export default class SiderMenu extends Component{
    static displayName = "HOME";
    static propTypes = {
        hash:PropTypes.string
    };
    constructor(props){
        super(props);
        this.state = {
            name:'home',
            router:{
                sub1:[
                    { type:'sub1', id:'1',name:'login', path:'/login' },
                    { type:'sub1', id:'2',name:'mouse', path:'/mouse' },
                    { type:'sub1', id:'3',name:'bmap', path:'/bmap' },
                    { type:'sub1', id:'4',name:'clock', path:'/clock' },
                    { type:'sub1', id:'13',name:'drag', path:'/drag' },
                ],
                sub2:[
                    { type:'sub2', id:'5',name:'stateAscension', path:'/stateAscension' },
                    { type:'sub2', id:'6',name:'listFilter', path:'/listFilter' },
                    { type:'sub2', id:'7',name:'themes', path:'/themes' },
                    { type:'sub2', id:'8',name:'portals', path:'/portals' },
                ],
                sub3:[
                    { type:'sub3', id:'9',name:'redux', path:'/redux' },
                    { type:'sub3', id:'10',name:'authority', path:'/authority/1' },
                    { type:'sub3', id:'11',name:'poetry', path:'/poetry' },
                    { type:'sub3', id:'12',name:'nested', path:'/nested/test1' },
                ],
                sub4:[
                    { type:'sub4', id:'13',name:'saga', path:'/saga' },
                    { type:'sub4', id:'14',name:'form', path:'/form' },
                ],
            },
            openKeys: ['sub1'],
            selectedKeys:[],
        };

        this.handerMenuOpenChange = this.handerMenuOpenChange.bind(this);
        this.handerMenuItemChange = this.handerMenuItemChange.bind(this);
    }

    handerMenuItemChange (item) {
        for (let key in this.state.router) {
            if(this.state.router.hasOwnProperty(key)){
                let k = this.state.router[key].find(v => item.key === v.id);
                if(k){
                    this.setState({selectedKeys:[k.id]});
                    break;
                }
            }
        }
    };


    // 收起其他展开的所有菜单
    handerMenuOpenChange (openKeys) {
        // console.log(openKeys); //["sub1", "sub3"]
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        // console.log(latestOpenKey);
        if (Object.keys(this.state.router).indexOf(latestOpenKey) === -1) {
            this.setState({ openKeys },() => {
                console.log(this.state.openKeys);
            });
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [],
            },() => {
                console.log(this.state.openKeys);
            });
        }
    };

    filterHashUrltoState(url){
        let router = this.state.router;
        for(let key in router){
            for(let val of router[key]){
                if(url.indexOf(val.name) !== -1){
                    return val;
                }
            }
        }
    }

    componentDidMount(){
        let r = this.filterHashUrltoState(this.props.hash);
        r && this.setState({selectedKeys:[r.id],openKeys:[r.type]});
    }

    /*
    * 在17.0.0版本之前不会废弃 componentWillReceiveProps 这个生命周期，但会推荐使用 getDerivedStateFromProps 静态方法来做更新处理
    * 组件实例化后和接受新属性时将会调用,返回一个对象来更新状态，或者返回null来表明新属性不需要更新任何状态。
    * */
    //static getDerivedStateFromProps(nextProps, prevState){
        // console.log(prevState);
        /*if(nextProps.hash){
            let router = prevState.router;
            for(let key in router){
                if(router.hasOwnProperty(key)){
                    for(let val of router[key]){
                        if(nextProps.hash.indexOf(val.name) !== -1){
                            return { selectedKeys:[val.id], openKeys:[val.type] };
                        }
                    }
                }
            }
        }*/
       // return null;
    //}
    /*componentWillReceiveProps(nextProps){
        console.log(nextProps);
        let r = this.filterHashUrltoState(nextProps.hash);
        r && this.setState({selectedKeys:[r.id],openKeys:[r.type]});
    }*/

    render(){
        let dashBoard = Object.keys(this.state.router).map(key => {
            return (
                <SubMenu key={key} title={<span><Icon type="laptop" />{key}</span>}>
                    {
                        this.state.router[key].map(val =>
                            ( <Menu.Item key={val.id} onClick={this.handerMenuItemChange}>
                                <Link to={val.path}>{val.name}</Link>
                            </Menu.Item> )
                        )
                    }
                </SubMenu>
            )
        });

        return(
            <Sider width={200} style={{ background: '#fff' }}>
                <Menu mode="inline"
                      selectedKeys={this.state.selectedKeys}
                      openKeys={this.state.openKeys}
                      onOpenChange={this.handerMenuOpenChange}
                      defaultSelectedKeys={this.state.selectedKeys}
                      defaultOpenKeys={this.state.openKeys}
                      style={{ height: '100%', borderRight: 0 }} >
                    {dashBoard}
                </Menu>
            </Sider>
        )
    }
}
