import { combineReducers ,applyMiddleware} from 'redux'
import todos from './todos'
import visibilityFilter from './visibilityFilter'
import login from './login'
import logger from '../logger'
/*
* 通过combineReducers()命名空间生成的状态名，每个reducer的状态在其键下传递给combineReducers()
* 可以通过对传递的对象中的reducer使用不同的键来控制状态键名称
* 可以使用ES6属性简写表示法：combineReducers({ counter, todos })。这相当于写作combineReducers({ counter: counter, todos: todos })。
* 其键作为在 Provider 里面 store 获得对象数据的名称
* */
export default combineReducers({
    todos:todos,
    visibilityFilter:visibilityFilter,
    loginData:login,

})
