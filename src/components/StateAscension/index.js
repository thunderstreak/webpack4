import React,{Component,Fragment} from 'react'
import TemperatureInput from './TemperatureInput'
import Transfromfun from './transfromFun'

const BoilingVerdict = (props) => {
    return props.celsius >= 100 ? <p>水烧开了</p> : <p>水没烧开</p>
};

export default class Calculator extends Component {
    constructor(props){
        super(props);
        this.state = {
            name : 'Calculator',
            temperature:'',
            scale:'c'
        };

        this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
        this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
    }

    handleCelsiusChange(temperature){
        this.setState({scale: 'c', temperature});
    }

    handleFahrenheitChange(temperature){
        this.setState({scale: 'f', temperature});
    }

    comfirmTransfrom(){
        let {scale,temperature} = this.state;
        const celsius       = scale === 'f' ? Transfromfun.tryConvert(temperature, Transfromfun.toCelsius) : temperature;
        const fahrenheit    = scale === 'c' ? Transfromfun.tryConvert(temperature, Transfromfun.toFahrenheit) : temperature;
        return {
            celsius:celsius,
            fahrenheit:fahrenheit
        };
    }

    render(){
        const {celsius,fahrenheit} = this.comfirmTransfrom();
        console.log(celsius,fahrenheit)
        return (
            <Fragment>
                <TemperatureInput scale="c" temperature={celsius} onTemperatureChange={this.handleCelsiusChange}/>
                <TemperatureInput scale="f" temperature={fahrenheit} onTemperatureChange={this.handleFahrenheitChange}/>
                <BoilingVerdict celsius={parseFloat(celsius)}/>
            </Fragment>
        )
    }
}
