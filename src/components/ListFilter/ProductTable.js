import React,{Component,Fragment} from 'react'
import ProductCategoryRow from './ProductCategoryRow'
import ProductRow from './ProductRow'

export default class ProductTable extends Component{
    constructor(props){
        super(props);
        this.state = {
            name : 'ProductTable'
        }
    }

    render(){
        let rows = [];
        let lastCategory = null;
        this.props.products.forEach((product) => {
            if(product.name.toUpperCase().indexOf(this.props.filterText.toUpperCase()) === -1 || (!product.stocked && this.props.inStockOnly)){
                return
            }
            if(product.category !== lastCategory){
                rows.push(<ProductCategoryRow category={product.category} key={product.category}/>);
            }
            rows.push(<ProductRow product={product} key={product.name}/>);
            lastCategory = product.category
        });

        return(
            <Fragment>
                <table>
                    <thead>
                        <tr>
                            <th>name</th>
                            <th>price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            </Fragment>
        )
    }
}
