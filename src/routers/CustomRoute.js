import React from 'react'
import {Route} from 'react-router-dom'

/*
* 自定义route 合并传递进来的rest参数和props并返回一个新component
* */
const CustomRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => {
        return <Component {...Object.assign(props,rest)} />
    }} />
);


export default CustomRoute
