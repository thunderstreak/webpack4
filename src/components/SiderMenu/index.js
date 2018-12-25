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
                    { type:'sub1', id:1,name:'login', path:'/login' },
                    { type:'sub1', id:2,name:'mouse', path:'/mouse' },
                    { type:'sub1', id:3,name:'bmap', path:'/bmap' },
                    { type:'sub1', id:4,name:'clock', path:'/clock' },
                ],
                sub2:[
                    { type:'sub1', id:5,name:'stateAscension', path:'/stateAscension' },
                    { type:'sub1', id:6,name:'listFilter', path:'/listFilter' },
                    { type:'sub1', id:7,name:'themes', path:'/themes' },
                    { type:'sub1', id:8,name:'portals', path:'/portals' },
                ],
                sub3:[
                    { type:'sub1', id:9,name:'redux', path:'/redux' },
                    { type:'sub1', id:10,name:'authority', path:'/authority/1' },
                    { type:'sub1', id:11,name:'poetry', path:'/poetry' },
                    { type:'sub1', id:12,name:'nested', path:'/nested/test1' },
                ]
            }
        };
        this.handerChange = this.handerChange.bind(this);
        this.filterHashUrl = this.filterHashUrl.bind(this);
    }

    componentWillUpdate(){

    }

    handerChange(item){
        // console.log(item);
    }

    filterHashUrl(val){
        let router = this.state.router;
        if(this.props.hash){
            for(let key in router){
                for(let val of router[key]){
                    if(this.props.hash.indexOf(val.name) !== -1){
                        return val;
                    }
                }
            }
        }else{
            return router.sub1[0]
        }
    }

    render(){
        let selected = this.filterHashUrl();
        console.log(selected);

        let dashBoard = Object.keys(this.state.router).map(key => (
            <SubMenu key={key} title={<span><Icon type="laptop" />{key}</span>}>
                {
                    this.state.router[key].map(val =>
                        ( <Menu.Item key={val.id} onClick={this.handerChange}>
                            <Link to={val.path}>{val.name}</Link>
                        </Menu.Item> )
                    )
                }
            </SubMenu>
        ));

        return(
            <Sider width={200} style={{ background: '#fff' }}>
                <Menu mode="inline" defaultSelectedKeys={[selected.id.toString()]} defaultOpenKeys={[selected.type]} style={{ height: '100%', borderRight: 0 }} >
                    {dashBoard}
                </Menu>
            </Sider>
        )
    }
}
/*
<Fragment>
    <ul style={{border:'1px red solid'}}>
        <li><Link to="/" replace>home</Link></li>
        <li><Link to="/mouse" replace>Mouse</Link></li>
        <li><Link to="/Bmap" replace>Bmap</Link></li>
        <li><Link to="/drag" replace>Drag</Link></li>
        <li><Link to="/login" replace>Login</Link></li>
        <li><Link to="/clock" replace>Clock</Link></li>
        <li><Link to="/stateAscension" replace>stateAscension</Link></li>
        <li><Link to="/listFilter" replace>listFilter</Link></li>
        <li><Link to="/themes" replace>Themes</Link></li>
        <li><Link to="/portals" replace>Portals</Link></li>
        <li><Link to="/redux" replace>Redux</Link></li>
        <li><Link to="/authority/1" replace>Authority</Link></li>
        <li><Link to="/poetry" replace>Poetry</Link></li>

        <li>{this.props.todos && this.props.todos.length > 0 ? this.props.todos.map((todo) => todo.text) : null}</li>
        <li>{this.props.loginData ? this.props.loginData.content : null}</li>
    </ul>
</Fragment>
* */
