import React,{Component} from 'react'

export default class Multis extends Component{
    constructor(prop){
        super(prop);
        this.state = {
            name : 'Multis'
        }
    }

    render(){
        return (
            <div>
                {this.state.name}
                {this.props.children}
            </div>
        )
    }
}
