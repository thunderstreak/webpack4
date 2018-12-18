import React,{Component,Fragment} from 'react'
// import Link from './containers/FilterLink'
import Link from './Link'
import { VisibilityFilters } from '@REDUX/actions'


export default class Footer extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return (
            <Fragment>
                <span>显示: </span>
                <Link filter={VisibilityFilters.SHOW_ALL}>所有</Link>
                -
                <Link filter={VisibilityFilters.SHOW_ACTIVE}>活动的</Link>
                -
                <Link filter={VisibilityFilters.SHOW_COMPLETED}>完成的</Link>
            </Fragment>
        )
    }
}
