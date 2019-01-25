import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Table, Pagination, Popconfirm, Button } from 'antd';
import UserModal from './UserModal';
import { fetchdata } from '@REDUX/saga'

const mapStateToProps = (state) => {
    const { list, total, page } = state.users;
    return {
        list,
        total,
        page,
    };
};

@connect(mapStateToProps)
class Users extends Component{
    constructor(props){
        super(props);
    }

    UNSAFE_componentWillReceiveProps(nextProps){

    }

    componentDidMount(){
        this.props.dispatch({
            type:'USERS_SAVE',
            page:1
        })
    }

    deleteHandler = (id) => {
        this.props.dispatch({
            type: 'USERS_DELETE',
            payload: id,
        });
    };

    pageChangeHandler = (page) => {
        console.log(page);
        this.props.dispatch({
            type: '/PAGE',
            query: { page },
        });
    };

    editHandler = (id, values) => {
        this.props.dispatch({
            type: 'USERS_UPDATE',
            payload: { id, values },
        });
    };

    createHandler = (values) => {
        this.props.dispatch({
            type: 'USERS_CREATE',
            payload: values,
        });
    };

    render(){
        const columns = [
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

        return (
            <div>
                <div>
                    <div>
                        <UserModal record={{}} onOk={this.createHandler}>
                            <Button type="primary">Create User</Button>
                        </UserModal>
                    </div>
                    <Table
                        // loading={this.props.loading}
                        columns={columns}
                        dataSource={this.props.list}
                        rowKey={record => record.id}
                        pagination={false}
                    />
                    <Pagination
                        className="ant-table-pagination"
                        total={this.props.total}
                        current={this.props.page}
                        pageSize={5}
                        onChange={this.pageChangeHandler}
                    />
                </div>
            </div>
        );
    }
}

export default Users;
