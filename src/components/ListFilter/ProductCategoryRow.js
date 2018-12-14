import React,{Component,Fragment} from 'react'

export default class ProductCategoryRow extends Component{
    constructor(props){
        super(props);
        this.state = {
            name : 'ProductCategoryRow'
        }
    }

    render(){
        return(
            <Fragment>
                <tr>
                    <td colSpan={2}>
                        {this.props.category}
                    </td>
                </tr>
            </Fragment>
        )
    }
}
