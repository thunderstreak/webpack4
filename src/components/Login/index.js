import React,{ Component, Fragment } from 'react'

export default class Login extends Component{
    constructor(){
        super();
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

    render(){
        return(
            <Fragment>
                <div>{this.state.name}</div>
                <form onSubmit={this.handlerSubmit.bind(this)}>
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
                    </div>
                </form>
            </Fragment>
        )
    }
}
