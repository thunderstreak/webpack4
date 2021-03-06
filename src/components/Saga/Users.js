import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Table, Pagination, Popconfirm, Button } from 'antd';
import UserModal from './UserModal';
// import '@JAVASCRIPTS/libs/Promise'

const mapStateToProps = (state) => {
    const { list, total, page, loading } = state.users;
    return {
        list,
        total,
        page,
        loading
    };
};

@connect(mapStateToProps)
class Users extends Component{
    constructor(props){
        super(props);
        this.state = {
            page : 1,
        };
    }

    // static getDerivedStateFromProps(props, state){
    //     console.log(props, state)
    // }

    // UNSAFE_componentWillReceiveProps(nextProps){
    //
    // }
    columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: text => <a href="">{text}</a>,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Website',
            dataIndex: 'website',
            key: 'website',
        },
        {
            title: 'Operation',
            key: 'operation',
            render: (text, record) => (
                <span>
                        <UserModal record={record} onOk={this.editHandler.bind(null, record.id)}>
                            <a>Edit</a>
                        </UserModal>
                        <Popconfirm title="Confirm to delete?" onConfirm={this.deleteHandler.bind(null, record.id)}>
                            <a href="">Delete</a>
                        </Popconfirm>
                    </span>
            ),
        },
    ];
    componentDidMount(){
        this.props.dispatch({
            type:'HANDLER_REQUEST_USERS_SAVE',
            page:1
        })
    }

    deleteHandler = (id) => {
        this.props.dispatch({
            type: 'HANDLER_REQUEST_USERS_DELETE',
            payload: id,
        });
    };

    pageChangeHandler = (page) => {
        this.props.dispatch({
            type:'HANDLER_REQUEST_USERS_SAVE',
            page:page
        })
    };

    editHandler = (id, values) => {
        this.props.dispatch({
            type: 'HANDLER_REQUEST_USERS_UPDATE',
            payload: { id, values },
        });
    };

    createHandler = (values) => {
        this.props.dispatch({
            type: 'HANDLER_REQUEST_USERS_CREATE',
            payload: values,
        });
    };

    render(){
        const { loading, list, total, page } = this.props
        const { columns } = this
        return (
            <div>
                <div>
                    <div>
                        <UserModal record={{}} onOk={this.createHandler}>
                            <Button type="primary">Create User</Button>
                        </UserModal>
                    </div>
                    <Table
                        loading={loading}
                        columns={columns}
                        dataSource={list}
                        rowKey={record => record.id}
                        pagination={true}
                    />
                    <Pagination
                        className="ant-table-pagination"
                        total={total}
                        current={page}
                        pageSize={5}
                        onChange={this.pageChangeHandler}
                    />
                    {total}
                </div>
            </div>
        );
    }
}

export default Users;
