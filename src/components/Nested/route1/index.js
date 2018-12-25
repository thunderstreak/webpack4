import React,{Component,Fragment} from 'react'

export default class Route1 extends Component{
    constructor(props){
        super(props);
        this.state = {
            name : 'Route1'
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
