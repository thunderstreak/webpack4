import React,{Component,Fragment} from 'react'
import { Button } from 'antd'
import {Switch,Route,Link,HashRouter} from 'react-router-dom'
import Roure1 from './route1/'

export default class Nested extends Component{
    constructor(props){
        super(props);
        this.state = {
            name : 'Nested'
        };
        this.handlerNested = this.handlerNested.bind(this);
    }

    handlerNested(){
        this.props.history.push('/nested/test1')
    }

    render(){
        return(
            <Fragment>
                <Button type="primary" onClick={this.handlerNested}>嵌套路由</Button>
                <Link to="/nested/test1">嵌套路由1</Link>
                <Link to="/nested/test2">嵌套路由2</Link>
                {this.props.children}

                <div className="margin-box">
                    <div className="margin-list">1</div>
                </div>
            </Fragment>
        )
    }
}
