import React,{Component,Fragment} from 'react';
import Mouse from './Mouse';
import MouseIMG from './MouseIMG';
export default class MouseTracker extends Component{
    constructor(props){
        super(props);
        this.initRefs();
    }
    initRefs(){
        this.mouseImg = React.createRef();
    }
    renderMouseIMG(mouse){
        return <MouseIMG ref={this.mouseImg} mouse={mouse}/>
    }
    componentDidMount(){
        console.log(this.mouseEl,this.mouseImg);
    }
    render(){
        return(
            <Fragment>
                {/*<Mouse render={
                mouse => (<MouseIMG mouse={mouse}/>)
                } />*/}
                <Mouse ref={mouseEl => this.mouseEl = mouseEl} render={this.renderMouseIMG.bind(this)}/>
            </Fragment>
        )
    }
}