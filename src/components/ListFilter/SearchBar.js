import React,{Component,Fragment} from 'react'
// import PropTypes from 'prop-types'
import autobind from '@JAVASCRIPTS/libs/AutoBind'
import debounce from '@JAVASCRIPTS/libs/Debounce'


export default class SearchBar extends Component{
    constructor(props){
        super(props);
        this.state = {
            name : 'SearchBar'
        };

        this.refInput = React.createRef();

        // this.handleFilterTextInputChange = this.handleFilterTextInputChange.bind(this);
        this.handleInStockOnlyInputChange = this.handleInStockOnlyInputChange.bind(this);
    }

    // 定义默认props
    static defaultProps = {
        filterText:'iphone'
    };

    // Prop数据校验
    static propTypes = {
        // filterText:PropTypes.string.isRequired
        filterText:(props, propName, componentName) => {
            // console.log(SearchBar.props);
            if(!props[propName]){
                return new Error(`提供给 '${componentName}' 组件的prop '${propName}' 验证无效`);
            }
        }
    };

    @autobind
    handleFilterTextInputChange(e){
        console.log(e.target);
        this.props.onFilterTextInput(e.target.value)
    }

    @autobind
    handleInStockOnlyInputChange(e){
        this.props.onInStockOnlyInput(e.target.checked)

    }

    componentDidMount(){
        // console.log(this.ref.current);
        // this.refInput.current.focus()
    }

    componentDidUpdate(){
        // console.log(this.refInput.current);
    }

    render(){
        return(
            <Fragment>
                <form>
                    <input ref={this.refInput} type="text" placeholder="Search" value={this.props.filterText} onChange={this.handleFilterTextInputChange}/>{this.props.filterText}
                    <p>
                        <input type="checkbox" checked={this.props.inStockOnly} onChange={this.handleInStockOnlyInputChange}/>Only show products in stock
                    </p>
                </form>
                {this.state.name}
            </Fragment>
        )
    }
}
