/*import React from 'react'
import {connect} from 'react-redux'
import { BrowserRouter as Router, Route, Switch, Redirect, HashRouter} from 'react-router-dom'
// import SiderMenu from '@COMPONENTS/SiderMenu'
import routers from '@SRC/routers'
// import PrivateRoute from '@SRC/routers/PrivateRoute'
// import HocPrivateRoute from '@SRC/routers/HocPrivateRoute'

// const PrivateRouteHoc = HocPrivateRoute(Route);
import '../styles/main.less'
import CustomRoute from '@SRC/routers/CustomRoute'

const mapStateToProps = (state,ownProps) => {
    return {
        todos:state.todos,
        loginData:state.loginData
    }
};
@connect(mapStateToProps)
export default class App extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <HashRouter>
                <div>
                    {/!*<SiderMenu {...this.props}/>*!/}
                    <Switch>

                        {/!*<Redirect from='/Bmap' to='/Mouse'/>*!/}
                        <Route exact path="/home" component={routers.Home}/>
                        <Route exact path="/mouse" component={routers.Mouse}/>

                        {/!*权限路由*!/}
                        {/!*<PrivateRoute path="/mouse" component={routers.Mouse}/>*!/}
                        {/!*<PrivateRouteHoc path="/bmap" component={routers.Bmap}/>*!/}

                        <Route exact path="/bmap" component={routers.Bmap}/>
                        <Route exact path="/unknownPage" component={routers.unknownPage}/>
                        <Route exact path="/login" component={routers.Login}/>
                        <Route exact path="/drag" component={routers.Drag}/>
                        <Route exact path="/clock" component={routers.Clock}/>
                        <Route exact path="/stateAscension" component={routers.StateAscension}/>
                        <Route exact path="/listFilter" component={routers.ListFilter}/>
                        <Route exact path="/themes" component={routers.Themes}/>
                        <Route exact path="/portals" component={routers.Portals}/>
                        <Route exact path="/redux" component={routers.Redux}/>
                        <CustomRoute exact path="/authority/:id" component={routers.Authority} names="Authority"/>
                        <Route exact path="/poetry" component={routers.Poetry}/>
                        <Redirect path="*" to='/home'/>
                    </Switch>
                </div>
            </HashRouter>
        )
    }
}
*/

import React,{Component,Fragment} from 'react'
import { BrowserRouter as Router, Route} from 'react-router-dom'
import Home from './Home'

export default class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            name : 'App'
        }
    }

    render(){
        return(
            <Fragment>
                <Router>
                    <Route exact path="/" component={Home}/>
                </Router>
            </Fragment>
        )
    }
}
