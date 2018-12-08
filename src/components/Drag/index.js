import React,{ Component, Fragment } from 'react'
import ReactDom from 'react-dom'
import { useEventCallback } from 'rxjs-hooks'
import { fromEvent } from 'rxjs'
import { map, switchMap, takeUntil, withLatestFrom } from 'rxjs/operators'

import '@STYLES/components/Drag'

export default class Drag extends Component{
    constructor(props){
        super(props);
        this.state = {
            name:'Drag',
        };
        this.style = {
            top:0,
            left:0,
        };
    }

    componentWillMount(){

    }

    onMouseDown(e){
        console.log(e.target);
    }

    render(){
        return(
            <Fragment>
                <div className="App">
                    <div className="box" onMouseDown={e => this.onMouseDown(e)} style={this.style}>
                        {this.state.name}
                        {new Date().toLocaleTimeString()}
                    </div>
                </div>
            </Fragment>
        )
    }
}
