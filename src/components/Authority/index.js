import React,{Component,Fragment} from 'react'
import Proptyps from 'prop-types'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

class Authority extends Component{
    static propTypes = {
        isLoding    :Proptyps.bool,
        loginUserName:Proptyps.string,
        loginError  :Proptyps.string
    };

    constructor(props){
        super(props);
        this.state = {
            name : 'Authority'
        }
    }

    componentDidMount(){

    }

    render(){
        return(
            <Fragment>
                {
                    this.props.isLoding ? <p>loding</p> : null
                }
                {
                    this.props.loginUserName ? <p>{this.props.loginUserName}</p> : null
                }
                {
                    this.props.loginError ? <p>{this.props.loginError}</p> : null
                }
                {this.props.match.params.id}
            </Fragment>
        )
    }
}

export default withRouter(Authority)
