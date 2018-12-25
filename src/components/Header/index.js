import React,{Component,Fragment} from 'react'
import { Layout, Menu} from 'antd'

export default class Header extends Component{
    constructor(props){
        super(props);
        this.state = {
            name : 'header'
        }
    }

    render(){
        return(
            <Fragment>
                <Layout.Header className="header">
                    <div className="logo" />
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} style={{ lineHeight: '64px' }}>
                        <Menu.Item key="1">nav 1</Menu.Item>
                        <Menu.Item key="2">nav 2</Menu.Item>
                        <Menu.Item key="3">nav 3</Menu.Item>
                    </Menu>
                </Layout.Header>
            </Fragment>
        )
    }
}
