import React,{Component} from 'react'

export const SetTitle = (title) => (WrappedComponent) => {
    return class extends Component{
        componentDidMount(){
            document.title = title;
        }
        render(){
            return <WrappedComponent {...this.props}/>
        }
    }
};
