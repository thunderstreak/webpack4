import React,{Component,Fragment} from 'react'

const scaleName = {
    c: 'Celsius',
    f: 'Fahrenheit'
};

export default class TemperatureInput extends Component{
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
        this.setState({temperature:val})
    }

    render(){
        return (
            <Fragment>
                <fieldset>
                    <legend>输入的温度{scaleNames[props.scale]}:</legend>
                    <input value={this.state.temperature} onChange={this.handleChange} />
                </fieldset>
            </Fragment>
        )
    }
}
