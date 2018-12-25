import React,{Component,Fragment} from 'react'
import { Layout } from 'antd'

export default class Footer extends Component{
    constructor(props){
        super(props);
        this.state = {
            name : 'footer'
        }
    }

    render(){
        return(
            <Fragment>
                <Layout.Footer style={{ textAlign: 'center' }}>
                    Ant Design ©2018 Created by Ant UED
                </Layout.Footer>
            </Fragment>
        )
    }
}
