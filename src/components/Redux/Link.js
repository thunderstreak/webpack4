import React,{Component,Fragment} from 'react'
import PropType from 'prop-types'

import { connect } from 'react-redux'
import { setVisibilityFilter } from '@REDUX/actions'

const mapStateToProps = (state, ownProps) => {
    let sta = {
        active: ownProps.filter === state.visibilityFilter
    };
    return sta;
};

const mapDispatchToProps = (dispatch, ownProps) => {
    let dis =  {
        onClick: () => dispatch(setVisibilityFilter(ownProps.filter))
    };
    return dis
};

/*
* 装饰器模式添加 mapStateToProps mapDispatchToProps
* 类似connect( mapStateToProps, mapDispatchToProps )(components) 添加props属性和派发事件到组件上
* */
@connect(mapStateToProps,mapDispatchToProps)
export default class Link extends Component{

    static propTypes = {
        active  :PropType.bool.isRequired,
        children:PropType.node.isRequired,
        onClick :PropType.func.isRequired
    };

    constructor(props){
        super(props);
        this.state = {
            name : ''
        }
    }

    componentDidMount(){
        // console.log(this.props);
    }

    render(){
        return(
            <Fragment>
                {
                    this.props.active ? <span>{this.props.children}</span> : <a href="javascript:void(0)" onClick={this.props.onClick}>{this.props.children}</a>
                }
            </Fragment>
        )
    }
}
