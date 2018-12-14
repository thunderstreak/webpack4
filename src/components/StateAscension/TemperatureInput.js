import React,{Component,Fragment} from 'react'

export default class TemperatureInput extends Component{
    static scaleNames = {
        c: 'Celsius',
        f: 'Fahrenheit'
    };

    constructor(props){
        super(props);

        this.state = {
            name:'TemperatureInput',
            temperature:''
        };

        this.handlerChange = this.handlerChange.bind(this);
    }

    handlerChange(e){
        let val = e.target.value;
        this.setState({temperature:val});
        this.props.onTemperatureChange(val);
    }

    render(){
        return (
            <Fragment>
                <fieldset>
                    <legend>输入的温度{TemperatureInput.scaleNames[this.props.scale]}:</legend>
                    <input type="number" style={{border:'1px red solid'}} value={this.props.temperature} onChange={this.handlerChange} />{this.props.temperature}
                </fieldset>
            </Fragment>
        )
    }
}
