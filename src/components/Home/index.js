import React, {Component, Fragment} from 'react'
import { Layout, Menu, Breadcrumb, Icon } from 'antd'

import {Route, Switch, Redirect, HashRouter, withRouter, Link} from 'react-router-dom'
import routers from '@SRC/routers'
import CustomRoute from '@SRC/routers/CustomRoute'

import '@STYLES/main.less'

import HeaderComponent from '../Header'
import SiderMenuComponent from '../SiderMenu'
import FooterComponent from '../Footer'


const { SubMenu } = Menu;
const { Header, Content, Sider, Footer} = Layout;

import { connect } from 'react-redux'
import { saveRoute } from '@REDUX/actions'

const mapStateToProps = (state) => {
    return {
        hashUrl:state.hashUrl,
        loginData:state.loginData
    }
};

@connect(mapStateToProps)
export default class ContentComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            hash : ''
        }
    }

    componentDidMount(){
        this.setState({hash:this.props.location.hash.replace('#','')})
    }

    componentWillUpdate(nextProps,nextState){
        let hashUrl = nextProps.location.hash.replace('#','');
        console.log(hashUrl,this.props.loginData);
        this.props.dispatch(saveRoute(hashUrl));
    }

    render(){
        let isLogin;
        if(this.props.loginData.author){
            isLogin = (
                <Layout>
                    <HeaderComponent/>
                    <Layout>
                        <SiderMenuComponent/>
                        <Layout style={{ padding: '0 24px 24px' }}>
                            <Breadcrumb style={{ margin: '16px 0' }}>
                                <Breadcrumb.Item>Home</Breadcrumb.Item>
                                <Breadcrumb.Item>List</Breadcrumb.Item>
                                <Breadcrumb.Item><Link to="/nested/test1">嵌套路由</Link></Breadcrumb.Item>
                            </Breadcrumb>
                            <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 'auto', }} >

                                {/*<Redirect from='/Bmap' to='/Mouse'/>*/}
                                <Route exact path="/home" component={routers.Home}/>
                                <Route exact path="/mouse" component={routers.Mouse}/>

                                {/*权限路由
                                        <PrivateRoute path="/mouse" component={routers.Mouse}/>
                                        <PrivateRouteHoc path="/bmap" component={routers.Bmap}/>*/}

                                <Route exact path="/bmap" component={routers.Bmap}/>
                                <Route exact path="/unknownPage" component={routers.unknownPage}/>
                                {/*<Route exact path="/login" component={routers.Login}/>*/}
                                <Route exact path="/drag" component={routers.Drag}/>
                                <Route exact path="/clock" component={routers.Clock}/>
                                <Route exact path="/stateAscension" component={routers.StateAscension}/>
                                <Route exact path="/listFilter" component={routers.ListFilter}/>
                                <Route exact path="/themes" component={routers.Themes}/>
                                <Route exact path="/portals" component={routers.Portals}/>
                                <Route exact path="/redux" component={routers.Redux}/>
                                <CustomRoute exact path="/authority/:id" component={routers.Authority} title="Authority"/>
                                <Route exact path="/poetry" component={withRouter(routers.Poetry)}/>
                                {/*嵌套路由*/}
                                <Route path="/nested" render={({history,location,match}) => (
                                    <routers.Nested history={history} location={location} match={match}>
                                        <Route exact path="/nested/test1" component={routers.NestedRoute1}/>
                                        <Route exact path="/nested/test2" component={routers.NestedRoute2}/>
                                    </routers.Nested>
                                )}/>
                                {/*<Route exact path="/login" component={routers.Login}/>*/}
                                <Redirect path="*" to='/mouse'/>

                            </Content>
                        </Layout>
                    </Layout>
                </Layout>
            );
        }else{
            isLogin = (
                <Fragment>
                    <Route exact path="/login" component={routers.Login}/>
                    <Route path="/login" render={() => (<Redirect to="/home"/>)}></Route >
                    {/*<Redirect path="*" to='/login'/>*/}
                </Fragment>
            );
        }
        return(
            <HashRouter>
                <Switch>
                    <Fragment>
                        { isLogin }
                    </Fragment>
                </Switch>
            </HashRouter>
        )
    }
}
