import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';

import App from './components/App';

// 创建store Provider 相当于root component, 数据自上而下流动
import { Provider } from 'react-redux'
import store from './redux/reducers'

// 定义要挂载的 DOM 节点
const MountNode = document.getElementById('app');
const render = (App) => {
    ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                <App/>
            </Provider>
        </AppContainer>,
        MountNode
    )
};

// 初始化调用
render(App);

// 配置需要热模块替换的条件
if (module.hot && process.env.NODE_ENV !== 'production') {
    // 处理对特定依赖的更改
    module.hot.accept('./components/App', (err) => {
        if (err) {
            // console.log(err);
        }
        // 从DOM 中移除已经挂载的 React 组件 然后重装
        ReactDOM.unmountComponentAtNode(MountNode);
        render(App);
    });

    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./redux/reducers', (err) => {
        const nextRootReducer = require('./redux/reducers').default;
        console.log(nextRootReducer);
        store.replaceReducer(nextRootReducer)
    })
}
