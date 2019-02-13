import React,{Component,Fragment} from 'react'
import Dialog from './dialog'

export default class Portals extends Component{
    constructor(props){
        super(props);
        this.name = 'MyComponent';
        this.state = {
            name:'Portals',
            show:false
        };

        this.showDialog = this.showDialog.bind(this);
        this.handleClick2 = this.handleClick1.bind(this);
    }

    showDialog(e){
        this.setState((prevState) => ({
            show:!prevState.show
        }))
    }

    handleClick1() {
        console.log('handleClick1' + this.name);
    }

    handleClick3 = () => console.log('handleClick3' + this.name);

    render(){
        return(
            <Fragment>
                <div onClick={this.showDialog}>showDialog {String(this.state.show)}</div>
                <Dialog onShow={this.showDialog} show={this.state.show}/>

                <button onClick={this.handleClick1()}>click 1</button>
                <button onClick={this.handleClick1}>click 2</button>
                <button onClick={this.handleClick2}>click 3</button>
                <button onClick={this.handleClick3}>click 4</button>
            </Fragment>
        )
    }
}
