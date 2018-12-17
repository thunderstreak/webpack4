import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect, HashRouter,Link} from 'react-router-dom'
import RouteHome from '@COMPONENTS/Home'
import routers from '@SRC/routers'
// import PrivateRoute from '@SRC/routers/PrivateRoute'
// import HocPrivateRoute from '@SRC/routers/HocPrivateRoute'

// const PrivateRouteHoc = HocPrivateRoute(Route);
import '../styles/main.less'

export default class App extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <HashRouter>
                <div>
                    <RouteHome/>
                    <Switch>

                        {/*<Redirect from='/Bmap' to='/Mouse'/>*/}
                        <Route exact path="/home" component={routers.Home}/>
                        <Route exact path="/mouse" component={routers.Mouse}/>

                        {/*权限路由*/}
                        {/*<PrivateRoute path="/mouse" component={routers.Mouse}/>*/}
                        {/*<PrivateRouteHoc path="/bmap" component={routers.Bmap}/>*/}

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
                        <Redirect path="*" to='/home'/>
                    </Switch>
                </div>
            </HashRouter>
        )
    }
}
