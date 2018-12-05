import React from 'react';

export default class MouseIMG extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        let {x,y} = this.props.mouse;
        return(
            <div style={{width:"10px",height:"10px",background:"red",position:"absolute",left:x,top:y}}> </div>
        )
    }
}