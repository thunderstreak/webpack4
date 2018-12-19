import React,{ Component, Fragment } from 'react'
import {connect} from 'react-redux'
import Boom from '@JAVASCRIPTS/libs/boom/boom/boom'
import {loginIng} from '@REDUX/actions'

@connect()
export default class Login extends Component{
    constructor(){
        super();
        this.boomBox = React.createRef();
        this.state = {
            name:'Login',
            data:{
                user:'',
                pass:'',
                number:'',
                file:'',
                text:'',
                select:'lime',
                sex:false
            }
        };
        this.input = React.createRef();
    }
    shouldComponentUpdate(){
        console.log(this.state.data.sex);
        return true
    }

    handlerChange(e){

        let key = e.target.value;
        let name = e.target.name;

        if(name === 'sex'){
            key === 'true' ? key = true : key = false;
        }
        if(name === 'file'){
            console.log(e.target.files[0]);

            /*let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = (e) => {
                console.log(e.result);
            }*/
        }
        let data = {};
        data[name] = key;
        this.setState({data:Object.assign( {}, this.state.data, data )});
    }
    handlerSubmit(e){
        e.preventDefault();
        /*console.log(e.target['file']);
        let formdata = new FormData();
        formdata.append('files',e.target['file'].files[0]);
        console.log(formdata.get('files'));*/
        // console.log(this.state.data,this.input.value);
        fetch('https://api.apiopen.top/singlePoetry').then(res => res.json()).then(data => {
            // console.log(data);
            this.props.dispatch(loginIng(data.result))
        })

    }

    handlerBoom(e){
        console.log(this.boomBox);

        let boomChildList = [];

        for(let i = 0 ; i < 10; i++){
            let tempDom = document.createElement("div");
            tempDom.className = "demoDom";
            tempDom.innerHTML = i;
            boomChildList.push(tempDom);
        }

        let boom = new Boom({
            childList: boomChildList,
            boomNumber: 6,
            rotate: 0,
            spread: 360,
            delayRange: 100,
            power: 3,
            container:this.boomBox.current
        });
        boom.boom()
    }

    render(){
        return(
            <Fragment>
                <div>{this.state.name}</div>
                <form onSubmit={this.handlerSubmit.bind(this)} className="boom-box" ref={this.boomBox}>
                    <div className='ipt'>
                        <input type="text" placeholder='user' name='user' value={this.state.data.user} onChange={this.handlerChange.bind(this)}/>{this.state.data.user}
                    </div>
                    <div className='ipt'>
                        <input type="password" placeholder='password' name='pass' value={this.state.data.pass} onChange={(e) => this.handlerChange(e)}/>{this.state.data.pass}
                    </div>
                    <div className='ipt'>
                        <input type="number" placeholder='number' name='number' value={this.state.data.number} onChange={(e) => this.handlerChange(e)}/>{this.state.data.number}
                    </div>
                    <div className='ipt'>
                        <input type="file" placeholder='file' name='file' value={this.state.data.file} onChange={(e) => this.handlerChange(e)}/>{this.state.data.file}
                    </div>
                    <div>
                        <input type="text" ref={(input) => this.input = input} defaultValue="非受控组件" placeholder="非受控组件"/>
                    </div>
                    <div>
                        <textarea placeholder='text' name='text' value={this.state.data.text} onChange={(e) => this.handlerChange(e)}/>{this.state.data.text}
                    </div>
                    <div>
                        <select name="select" value={this.state.data.select} onChange={(e) => this.handlerChange(e)}>
                            <option value="grapefruit">Grapefruit</option>
                            <option value="lime">Lime</option>
                            <option value="coconut">Coconut</option>
                            <option value="mango">Mango</option>
                        </select>{this.state.data.select}
                    </div>
                    <div>
                        <input name="sex" type="radio" defaultChecked='true' value={true} onClick={(e) => this.handlerChange(e)}/>
                        <input name="sex" type="radio" defaultChecked='false' value={false} onClick={(e) => this.handlerChange(e)}/>
                        {this.state.data.sex ? 'true' : 'false'}
                        <input type="checkbox" defaultChecked="true"/>
                    </div>
                    <div>
                        <input type="submit" value="Submit" />
                    </div>
                    <div>
                        <input type="button" onClick={(e) => this.handlerBoom(e)} value='Boom'/>
                    </div>
                </form>
            </Fragment>
        )
    }
}
