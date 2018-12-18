import React,{Component,Fragment} from 'react'
import Dialog from './dialog'

export default class Portals extends Component{
    constructor(props){
        super(props);
        this.state = {
            name:'Portals',
            show:false
        };

        this.showDialog = this.showDialog.bind(this);
    }

    showDialog(e){
        this.setState((prevState) => ({
            show:!prevState.show
        }))
    }

    componentWillMount(){

    }

    render(){
        return(
            <Fragment>
                <div onClick={this.showDialog}>showDialog{String(this.state.show)}</div>
                <Dialog onShow={this.showDialog} show={this.state.show}/>
            </Fragment>
        )
    }
}
