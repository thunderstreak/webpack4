import React,{Component,Fragment} from 'react'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import { Layout, Menu, Breadcrumb, Icon } from 'antd'
const { SubMenu } = Menu;
const { Header, Content, Sider, Footer} = Layout;

const mapStateToProps = (state) => {
    return {
        hash:state.saveRoute.hashUrl
    }
};
@connect(mapStateToProps)
export default class SiderMenu extends Component{
    static displayName = "HOME";
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
                ]
            },
            openKeys: ['sub1'],
            selectedKeys:[],
        };
        this.filterHashUrl = this.filterHashUrl.bind(this);
    }

    handerMenuItemChange = (item) => {
        for (let key in this.state.router) {
            let k = this.state.router[key].find(v => item.key === v.id);
            if(k){
                this.setState({selectedKeys:[k.id]});
                break;
            }
        }
        // let k = Object.keys(this.state.router).find(key => item.key === key.id)
        // console.log(Object.keys(this.state.router));
    };


    // 收起其他展开的所有菜单
    handerMenuOpenChange = (openKeys) => {
        console.log(openKeys); //["sub1", "sub3"]
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if (Object.keys(this.state.router).indexOf(latestOpenKey) === -1) {
            this.setState({ openKeys });
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [],
            });
        }
    };

    filterHashUrl(v){
        let router = this.state.router;
        if(this.props.hash){
            for(let key in router){
                for(let val of router[key]){
                    if(this.props.hash.indexOf(val.name) !== -1){
                        if(v){
                            return Object.keys(router).find(k => [val.type].indexOf(k) === -1)
                        }else{
                            return val;
                        }
                    }
                }
            }
        }
    }

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

    componentWillReceiveProps(nextProps){
        let r = this.filterHashUrltoState(nextProps.hash);
        this.setState({selectedKeys:[r.id],openKeys:[r.type]});

    }

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
