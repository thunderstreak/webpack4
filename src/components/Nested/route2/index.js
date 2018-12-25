import React,{Component,Fragment} from 'react'

export default class Route2 extends Component{
    constructor(props){
        super(props);
        this.state = {
            name : 'Route2'
        }
    }

    render(){
        return(
            <Fragment>
                {this.state.name}
            </Fragment>
        )
    }
}
