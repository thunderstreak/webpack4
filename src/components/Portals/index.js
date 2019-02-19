import React, {Component, Fragment} from 'react'
import Dialog from './dialog'

export default class Portals extends Component {
    constructor(props) {
        super(props);
        this.name = 'MyComponent';
        this.state = {
            name: 'Portals',
            show: false,
            val: 0,
        };

        this.showDialog = this.showDialog.bind(this);
        // this.handleClick2 = this.handleClick1.bind(this);
    }

    componentDidMount() {
        let arr = [];
        for (let i = 0; i < 5; i++) {
            if (i <= 1) {
                arr.push(i)
            } else {
                arr.push(arr[i - 1] + arr[i - 2])
            }
        }

        fetch(`/api/users?_page=1&_limit=10`).then(res => res.json()).then((res) => {
            /*this.setState({list:[...res]})
            console.log(this.state.list);*/
            this.setState({val: this.state.val + 1});
            // console.log(this.state.val);
        })


    }



    showDialog(e) {
        this.setState((prevState) => ({
            show: !prevState.show
        }))
    }

    handleClick1() {
        console.log('handleClick1' + this.name);
    }

    // handleClick3 = () => console.log('handleClick3' + this.name);

    render() {
        return (
            <Fragment>
                <div onClick={this.showDialog}>showDialog {String(this.state.show)}</div>
                <Dialog onShow={this.showDialog} show={this.state.show}/>

                <button onClick={this.handleClick1()}>click 1</button>
                <button onClick={this.handleClick1}>click 2</button>
                <button onClick={this.handleClick2}>click 3</button>
                <button onClick={this.handleClick3}>click 4</button>
            </Fragment>
        )
    }
}


