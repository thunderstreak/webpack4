import React,{Component,Fragment} from 'react'
import debounce,{_debounce} from '@JAVASCRIPTS/libs/Debounce'
import {SetTitle} from '@JAVASCRIPTS/libs/SetTitle'


@SetTitle('Poetry')
export default class Poetry extends Component{
    constructor(props){
        super(props);
        this.state = {
            name : 'Poetry',
            value: '',
            data : '',
            now:''
        };

        this.handlerSearch = this.handlerSearch.bind(this);
        this.fetchData = _debounce(this.fetchData,500);
    }

    componentDidUpdate(prevProps, prevState){

    }

    fetchData(val){
        fetch('https://api.apiopen.top/likePoetry?name=' + val).then(res => res.json()).then(data => {
            this.setState({data:data.result})
        })
    }

    // @debounce(1000)
    handlerSearch(e) {
        let val = e.target.value;
        this.setState({value:val});
        this.fetchData(val)
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
        let data = this.state.data;
        for (let i = 0; i < data.length; i++) {
            poetryList.push(div(data[i],i))
        }
        return(
            <Fragment>
                <input type="text" value={this.state.value} onChange={this.handlerSearch}/>
                {poetryList.length ? poetryList : '暂无数据'}
            </Fragment>
        )
    }
}
