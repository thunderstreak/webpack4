import React,{ Component, Fragment } from 'react'
import Boom from '@JAVASCRIPTS/libs/boom/boom/boom'

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
                file:''
            }
        };
    }
    handlerChange(e){

        let key = e.target.value;
        let name = e.target.name;

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
        console.log(e.target['file']);
        let formdata = new FormData();
        formdata.append('files',e.target['file'].files[0]);

        console.log(formdata.get('files'));
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
                        <input type="submit" value="Submit" />
                        <input type="button" onClick={(e) => this.handlerBoom(e)} value='Boom'/>
                    </div>
                </form>
            </Fragment>
        )
    }
}