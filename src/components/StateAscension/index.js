import React,{Component,Fragment} from 'react'
import TemperatureInput from './TemperatureInput'

const BoilingVerdict = (props) => {
    return props.celsius >= 100 ? <p>水烧开了</p> : <p>水没烧开</p>
};

export default class Calculator extends Component {
    constructor(props){
        super(props);
        this.state = {
            name : 'Calculator',
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
                <TemperatureInput />
            </Fragment>
        )
    }
}
