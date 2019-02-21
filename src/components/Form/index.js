import React,{Component,Fragment} from 'react'
import {Form, Icon, Input, Button} from 'antd'
import Modal from '@JAVASCRIPTS/components/Modal'

import tools,{isType} from '@TOOLS/utils'

console.log(tools);
function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class Froms extends Component{
    constructor(props){
        super(props);
        this.state = {
            name : 'From',
            visible: false
        };

        this.confirm = this.confirm.bind(this);
        this.showModal = this.showModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    showModal() {
        this.setState((prevState) => {
            console.log(prevState.visible);
            return {
                visible:true
            }
        })
        console.log(this.state.visible);
    }

    closeModal() {
        console.log('我是onClose回调')
    }

    confirm() {
        console.log('我是confirm回调')
    }

    componentDidMount(){
        this.props.form.validateFields();
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };

    render(){
        const { visible } = this.state;

        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched, } = this.props.form;

        const userNameError = isFieldTouched('userName') && getFieldError('userName');
        const passwordError = isFieldTouched('password') && getFieldError('password');

        return(
            <Fragment>
                {this.state.name}
                <Form layout="inline" onSubmit={this.handleSubmit}>
                    <Form.Item validateStatus={userNameError ? 'error' : ''} help={userNameError || ''} >
                        {
                            getFieldDecorator('userName', {
                                rules: [{required: true, message: 'Please input your username!'}],
                            })(<Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>} placeholder="Username"/>)
                        }
                    </Form.Item>
                    <Form.Item validateStatus={passwordError ? 'error' : ''} help={passwordError || ''} >
                        {
                            getFieldDecorator('password', {
                                rules: [{required: true, message: 'Please input your Password!'}],
                            })(<Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password" placeholder="Password"/>)
                        }
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>Log in</Button>
                    </Form.Item>
                </Form>

                <button onClick={this.showModal}>click here</button>
                <Modal visible={visible} title="这是自定义titl1e" confirm={this.confirm} onClose={this.closeModal}>
                    这是自定义content
                </Modal>
            </Fragment>
        )
    }
}

export default Form.create({name:'horizontal_login'})(Froms)
