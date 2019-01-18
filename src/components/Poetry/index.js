import React,{Component,Fragment} from 'react'
import { Button, Pagination, Input, Row, Col, Table, Divider, Icon } from 'antd';
import Highlighter from 'react-highlight-words';

import { connect } from 'react-redux'
import {_debounce} from '@JAVASCRIPTS/libs/Debounce'
import {SetTitle} from '@JAVASCRIPTS/libs/SetTitle'
import { loding } from '@REDUX/actions'

const mapStateToProps = (state) => {
    return {
        lodingData:state.lodingData
    }
};

const mapDispatchToProps = {
    loding
};

@SetTitle('Poetry')
@connect(mapStateToProps,mapDispatchToProps)
export default class Poetry extends Component{
    constructor(props){
        super(props);
        this.state = {
            name : 'Poetry',
            value: '',
            data : '',
            searchText: '',
        };

        this.handlerSearch = this.handlerSearch.bind(this);
        this.GotoRouter = this.GotoRouter.bind(this);
        this.onQuickJumper = this.onQuickJumper.bind(this);
        this.fetchData = _debounce(this.fetchData,500);
    }

    componentDidMount(){
        this.props.loding('https://api.apiopen.top/likePoetry?name=李白');
    }

    componentDidUpdate(prevProps, prevState){

    }

    shouldComponentUpdate(nextProps, nextState){
        return true;
    }

    fetchData(val){
        let url = 'https://api.apiopen.top/likePoetry?name=' + val;
        this.props.loding(url);
    }

    // @debounce(1000)
    handlerSearch(e) {
        let val = e.target.value;
        this.setState({value:val});
        if(val){
            this.fetchData(val)
        }
    }

    // 跳转路由
    GotoRouter(){
        this.props.history.push('/authority/2')
    }

    onQuickJumper(page){
        console.log(page);
    }

    getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, }) => (
            <div className="custom-filter-dropdown">
                <Input
                    ref={node => { this.searchInput = node; }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Button
                    type="primary"
                    onClick={() => this.handleSearch(selectedKeys, confirm)}
                    icon="search"
                    size="small"
                    style={{ width: 90, marginRight: 8 }}
                >
                    Search
                </Button>
                <Button
                    onClick={() => this.handleReset(clearFilters)}
                    size="small"
                    style={{ width: 90 }}
                >
                    Reset
                </Button>
            </div>
        ),
        filterIcon: filtered => <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
                setTimeout(() => this.searchInput.select());
            }
        },
        render: (text) => {
            return (
            <Highlighter
                highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                searchWords={[this.state.searchText]}
                autoEscape
                highlightTag={({ children, highlightIndex }) => (
                    <strong className="highlighted-text">{children}</strong>
                )}
                textToHighlight={text.toString()}
            />
        )},
    });

    handleSearch = (selectedKeys, confirm) => {
        confirm();
        this.setState({ searchText: selectedKeys[0] });
    };

    handleReset = (clearFilters) => {
        clearFilters();
        this.setState({ searchText: '' });
    };

    render(){
        let poetryList = [];
        let div = (data,index) => {
            return(
                <div key={index}>
                    <h3>{data.title}</h3>
                    <h4>{data.authors}</h4>
                    <div>{data.content.split('|').map((x,i) => <div key={i}>{x}</div>)}</div>
                </div>
            )
        };
        let data = this.props.lodingData.data;
        for (let i = 0; i < data.length; i++) {
            poetryList.push(div(data[i],i))
        }

        const tableColumns = [{
            title       : '作者',
            width       : 100,
            dataIndex   : 'authors',
            key         : 'authors',
            render      : text => <a href="javascript:void(0);">{text}</a>,
            ...this.getColumnSearchProps('authors'),
        }, {
            title       : '标题',
            width       : 200,
            dataIndex   : 'title',
            key         : 'title',
            ...this.getColumnSearchProps('title'),
        }, {
            title       : '内容',
            key         : 'content',
            dataIndex   : 'content',
            render      : content => (
                content.split('|').map((x,i) => <div key={i}>{x}</div>)
            ),
            ...this.getColumnSearchProps('content'),
        },{
            title       : '查看',
            key         : 'action',
            width       : 100,
            render      : (text, record) => (
                <span>
                    <a href="javascript:void(0);">查看详情</a>
                </span>
            ),
        }];

        return(
            <Fragment>
                <Row>
                    <Col span={12}>
                        <Input.Search placeholder="input search text" onChange={this.handlerSearch} onSearch={value => console.log(value)} enterButton={this.props.lodingData.status} />
                    </Col>
                    <Col span={12}>
                        <Button type="primary" onClick={this.GotoRouter} loading={this.props.lodingData.status === 'loding' ? true : false}>
                            {this.props.lodingData.status}
                        </Button>
                    </Col>
                </Row>

                {/*<div className="poetry-list">
                    {poetryList.length ? poetryList : '暂无数据'}
                </div>*/}
                <div>
                    <Table columns={tableColumns} dataSource={data} rowKey={data => data.id} loading={this.props.lodingData.status === 'loding' ? true : false}/>
                </div>
                <Pagination showQuickJumper defaultCurrent={1} total={poetryList.length} onChange={this.onQuickJumper} />
            </Fragment>
        )
    }
}

function Btn(props) {
    return (
        <div type="primary">{props.status}</div>
    )
}
