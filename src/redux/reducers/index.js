import { createStore, combineReducers ,applyMiddleware, compose} from 'redux'
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import logger from '../logger'

import initStores from '../stores'

/*
* 导入 reducer
* */
import todos from './todos'
import visibilityFilter from './visibilityFilter'
import login from './login'
import loding from './loding'
import saveRoute from './saveRoute'

/*
* 应用异步 sync action
* 并应用中间件日志
* */
let enhancer = applyMiddleware(thunk);
if (process.env.NODE_ENV === 'development') {
    enhancer = compose(
        applyMiddleware(thunk, createLogger())
    )
}

/*
* 通过combineReducers()命名空间生成的状态名，每个reducer的状态在其键下传递给combineReducers()
* 可以通过对传递的对象中的reducer使用不同的键来控制状态键名称
* 可以使用ES6属性简写表示法：combineReducers({ counter, todos })。这相当于写作combineReducers({ counter: counter, todos: todos })。
* 其键作为在 Provider 里面 store 获得对象数据的名称
* */
const rootReducer = combineReducers({
    todos           :todos,
    visibilityFilter:visibilityFilter,
    loginData       :login,
    lodingData      :loding,
    saveRoute       :saveRoute,
});

// 导入 rootReducer 创建 stroe
const store = createStore(
    rootReducer,
    initStores,
    enhancer
);

export default store
