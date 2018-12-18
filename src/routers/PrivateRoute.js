import React, { Component, Fragment } from 'react'
import { Route, Redirect, withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'

class PrivateRoute extends Component{
    static propTypes = {
        path        :PropTypes.string.isRequired,
        exact       :PropTypes.bool,
        strict      :PropTypes.bool,
        component   :PropTypes.func.isRequired
    };

    constructor(){
        super();
        this.state = {
            name:'PrivateRoute'
        }
    }

    componentWillMount(){
        let isAuthenticated = false;
        this.setState({isAuthenticated:isAuthenticated});
        if(!isAuthenticated){
            const { history } = this.props;
            setTimeout(() => {
                history.replace('/login')
            },3000)
        }
    }

    render(){
        let { component: Component, path = "/", exact = false, strict = false } = this.props;
        return this.state.isAuthenticated ? ( <Route path={path} exact={exact} strict={strict} render={(props)=>( <Component {...props} /> )} /> ) : ("请重新登录");
    }
}

export default withRouter(PrivateRoute)
