import React,{Component,Fragment} from 'react'

import {ThemeContext, themes} from '@JAVASCRIPTS/components/themes'
import ThemedButton from './themed-button'


// 一个使用到ThemedButton组件的中间组件
function Toolbar(props) {
    return (
        <ThemedButton onClick={props.changeTheme}>Change Theme</ThemedButton>
    );
}

export default class Themes extends Component{
    constructor(props){
        super(props);
        this.state = {
            name : "Themes",
            theme: themes.light,
        };

        this.toggleTheme = this.toggleTheme.bind(this)
    }
    toggleTheme () {
        this.setState(state => ({
            theme: state.theme === themes.dark ? themes.light : themes.dark,
        }));
    };

    render(){
        return(
            <Fragment>
                <div>{this.state.name}</div>
                <ThemeContext.Provider value={this.state.theme}>
                    {/*<Toolbar changeTheme={this.toggleTheme} />*/}
                    <ThemedButton onClick={this.toggleTheme}>Change Theme super</ThemedButton>
                </ThemeContext.Provider>
                <section>
                    <ThemedButton />
                </section>
            </Fragment>
        )
    }
}
