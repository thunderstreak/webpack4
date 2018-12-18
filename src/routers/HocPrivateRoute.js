import React,{ Component } from 'react'
import { withRouter } from 'react-router-dom'

export default function withHocPrivateRoute(WrappedComponent,hocProps) {
    if(!WrappedComponent){
        throw new Error("缺少组件参数");
        return
    }
    return withRouter(class extends Component {
        constructor(props){
            super(props)
        }
        componentWillMount(){
            let isAuthenticated = false;
            this.setState({isAuthenticated:isAuthenticated});
            if(!isAuthenticated){
                const { history } = this.props;
                setTimeout(() => {
                    history.replace("/login");
                }, 1000)
            }
        }
        render(){
            return this.state.isAuthenticated ? ( <WrappedComponent {...hocProps} /> ) : ("请重新登录");
        }
    })
}
