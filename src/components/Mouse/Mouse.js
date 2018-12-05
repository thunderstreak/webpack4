import React,{Component,Fragment} from 'react';


export default class Mouse extends Component{
    constructor(props){
        super(props);
        this.state = {
            x:0,
            y:0,
        }
    }

    handlerMouse(e){
        let [x,y] = [e.clientX,e.clientY];
        this.setState({x,y})
    }

    testParentComponent(){
        console.log('testParentComponent');
    }

    render(){
        return(
            <div style={{height:'100px',width:'100%'}} onMouseMove={this.handlerMouse.bind(this)}>
                {this.state.x}-{this.state.y}
                {this.props.render(this.state)}
            </div>
        )
    }
}
