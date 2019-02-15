import React,{Component,Fragment} from 'react'
import Prototypes from 'prop-types'

export default class MulitRouter extends Component{
    static propTypes = {
        name:Prototypes.string
    };

    constructor(props){
        super(props);
        this.state = {
            name : 'MulitRouter'
        }
    }

    componentDidMount(){
        console.log(this.props);
    }

    render(){
        return(
            <Fragment>
                {this.state.name}
                {this.props.children}
            </Fragment>
        )
    }
}
