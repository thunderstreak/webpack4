import React,{Component,Fragment} from 'react'
import PropTypes from 'prop-types'

export default class Dialog extends Component{
    constructor(props){
        super(props);

        this.isShow = this.isShow.bind(this);
    }

    static propTypes = {
        show:PropTypes.bool.isRequired
    };

    isShow(){
        this.props.onShow();
    }

    render(){
        return(
            <Fragment>
                {
                    this.props.show ? <div className="dialog" onClick={this.isShow}>{this.props.children}</div> : null
                }
            </Fragment>
        )
    }
}
