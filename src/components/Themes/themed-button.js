import React,{Component,Fragment} from 'react'
import {ThemeContext} from '@JAVASCRIPTS/components/themes'

export default class ThemedButton extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <Fragment>
                <ThemeContext.Consumer>
                    {theme => (
                        <button {...this.props} style={{backgroundColor:theme.background}}/>
                    )}
                </ThemeContext.Consumer>
            </Fragment>
        )
    }
}
