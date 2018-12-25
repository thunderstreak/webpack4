import React,{Component,Fragment} from 'react'
import { Button } from 'antd';
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
        };

        this.handlerSearch = this.handlerSearch.bind(this);
        this.GotoRouter = this.GotoRouter.bind(this);
        this.fetchData = _debounce(this.fetchData,500);
    }

    componentDidMount(){

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
        return(
            <Fragment>
                {this.props.lodingData.status === 'loding' ? this.props.lodingData.status : null}
                {this.props.lodingData.status === 'success' ? this.props.lodingData.status : null}
                {this.props.lodingData.status === 'error' ? this.props.lodingData.status : null}
                <input type="text" value={this.state.value} onChange={this.handlerSearch}/>
                <Button type="primary" onClick={this.GotoRouter}>Loading</Button>
                {poetryList.length ? poetryList : '暂无数据'}
            </Fragment>
        )
    }
}
