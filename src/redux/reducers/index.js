import { createStore, combineReducers ,applyMiddleware, compose} from 'redux'
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';
// import logger from '../logger';
import rootSaga from '../saga';


import initStores from '../stores'

/*
* 导入 reducer
* */
import todos from './todos'
import visibilityFilter from './visibilityFilter'
import login from './login'
import loding from './loding'
import saveRoute from './saveRoute'
import saga from './saga'

/*
* 应用异步 sync action
* 并应用中间件日志
* */
const sagaMiddleware = createSagaMiddleware();// 创建saga
const logger = createLogger();//创建redux log
const middlewares = [ thunk, sagaMiddleware, logger ];

let enhancer = applyMiddleware(...middlewares);
/*if (process.env.NODE_ENV === 'development') {
    enhancer = compose(
        // applyMiddleware(thunk, createLogger())
        applyMiddleware(...middlewares)
    )
}*/

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
    saga            :saga,
});

// 导入 rootReducer 创建 stroe
const store = createStore(
    rootReducer,
    initStores,
    enhancer
);

sagaMiddleware.run(rootSaga);

export default store
