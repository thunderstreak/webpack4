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
            scale:'c',
            num:''
        };

        this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
        this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
        this.handleFilterNum = this.handleFilterNum.bind(this);
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

    handleFilterNum(e){
        let num = e.target.value;
        ///(^[1-9]([0-9]+)?(\.[0-9]*)?$)|(^(0){1}$)|(^(0){1}\.[0-9]+$)/
        let numbersReg = new RegExp(/\d/, 'g');
        if(num !== '' && numbersReg.test(num)){
            let specificreg = new RegExp(/\./,'g');
            let res;
            let lastIndex;
            let i = 0;
            while ((res = specificreg.exec(num)) != null){
                if(i === 1){
                    lastIndex = res.index;
                    console.log(res)
                }
                i ++
            }

            if(num.charAt(lastIndex) === '.'){
                num = num.substr(0,lastIndex)
            }
            if(num.charAt(0) === '.'){
                num = ''
            }

            console.log(num);
            this.setState({num:num});
        }else{
            this.setState({num:''});
        }

    }

    render(){
        const {celsius,fahrenheit} = this.comfirmTransfrom();
        return (
            <Fragment>
                <TemperatureInput scale="c" temperature={celsius} onTemperatureChange={this.handleCelsiusChange}/>
                <TemperatureInput scale="f" temperature={fahrenheit} onTemperatureChange={this.handleFahrenheitChange}/>
                <BoilingVerdict celsius={parseFloat(celsius)}/>
                <input type="text" value={this.state.num} onInput={this.handleFilterNum}/>{this.state.num}
            </Fragment>
        )
    }
}
