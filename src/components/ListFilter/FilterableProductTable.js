import React, {Component,Fragment} from 'react'
import SearchBar from './SearchBar'
import ProductTable from './ProductTable'

const PRODUCTS = [
    {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
    {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
    {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
    {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
    {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
    {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
]

export default class FilterableProductTable extends Component{
    constructor(props){
        super(props);
        this.state = {
            name :'FilterableProductTable',
            filterText: '',
            inStockOnly: false,
        };

        this.refSearchBar = React.createRef();
        this.refProductTable = null;
        this.setRefProductTable = el => {
            this.refProductTable = el
        };
        this.handleFilterTextInput = this.handleFilterTextInput.bind(this);
        this.handleInStockOnlyInput = this.handleInStockOnlyInput.bind(this);
    }

    handleFilterTextInput(filterText){
        this.setState({filterText:filterText})
    }

    handleInStockOnlyInput(inStockOnly){
        this.setState({inStockOnly:inStockOnly})
    }

    // 渲染完成后调用
    componentDidMount(){
        console.log(this.refProductTable);
        // 调用ref节点内部的输入框
        this.refSearchBar.current.refInput.current.focus()
    }

    render(){
        return (
            <Fragment>
                <SearchBar
                    ref={this.refSearchBar}
                    filterText={this.state.filterText}
                    inStockOnly={this.state.inStockOnly}
                    onFilterTextInput={this.handleFilterTextInput}
                    onInStockOnlyInput={this.handleInStockOnlyInput}
                />
                <ProductTable
                    ref={this.setRefProductTable}
                    products={PRODUCTS}
                    filterText={this.state.filterText}
                    inStockOnly={this.state.inStockOnly}
                />
            </Fragment>
        )
    }
}
