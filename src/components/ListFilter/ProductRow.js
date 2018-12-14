import React,{Component,Fragment} from 'react'

export default class ProductRow extends Component{
    constructor(props){
        super(props)
    }

    render(){
        let name = this.props.product.stocked ? this.props.product.name : <span style={{color:'red'}}>{this.props.product.name}</span>;

        return(
            <Fragment>
                <tr>
                    <td>{name}</td>
                    <td>{this.props.product.price}</td>
                </tr>
            </Fragment>
        )
    }
}
