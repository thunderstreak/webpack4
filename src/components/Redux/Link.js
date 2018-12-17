import React,{Component,Fragment} from 'react'
import PropType from 'prop-types'

export default class Link extends Component{

    static propTypes = {
        active  :PropType.bool.isRequired,
        children:PropType.node.isRequired,
        onClick :PropType.func.isRequired
    };

    constructor(props){
        super(props);
        this.state = {
            name : ''
        }
    }

    render(){
        return(
            <Fragment>
                {
                    this.props.active ? <span>{this.props.children}</span> : <a href="javascript:void(0)" onClick={this.props.onClick}>{this.props.children}</a>
                }
            </Fragment>
        )
    }
}
