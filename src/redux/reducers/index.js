import { createStore, combineReducers ,applyMiddleware, compose} from 'redux'
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';
// import logger from '../logger';
import rootSaga from '../saga';
import co from 'co'
import utils from '../../tools/utils'

import initStores from '../stores'

/*
* 导入 reducer
* */
import todos from './todos'
import visibilityFilter from './visibilityFilter'
import login from './login'
import loding from './loding'
import saveRoute from './saveRoute'
import {counter, users} from './saga'

/*
* 应用异步 sync action
* 并应用中间件日志
* */
const sagaMiddleware = createSagaMiddleware();// 创建saga
const logger = createLogger();//创建redux log
const middlewares = [ thunk, sagaMiddleware, /*logger*/];

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
    counter         :counter,
    users           :users,
});

// 导入 rootReducer 创建 stroe
const store = createStore(
    rootReducer,
    initStores,
    enhancer
);

sagaMiddleware.run(rootSaga);

export default store


/*const arr1 = [ 1, 2, 3];
const arr2 = [ 5, 6, 7];
console.log([...arr1, ...arr2, 10, 11]); // [1, 2, 3, 5, 6, 7, 10, 11]
arr1.push(...arr2, 10, 11);
console.log(arr1); // [1, 2, 3, 5, 6, 7, 10, 11]

const [ arg1, ...arg2 ] = [1, 2, {a:1}];
console.log(arg1); // 1
console.log(arg2); // [2, {a:1}]

const div = [...document.getElementsByTagName('div')];
console.log(div);*/

// 解构
/*let { a, b, ...x } = { a: 1, b: 2, c: 3, d: 4 };
console.log(a); // 1
console.log(b); // 2
console.log(x); // {c: 3, d: 4}
// 插入
let n = { n: 6, ...x };
console.log(n); // {n: 6, c: 3, d: 4}
// 合并
let y = { y: 10 };
console.log({ ...y, ...x }); // {y: 10, c: 3, d: 4}
console.log(...y); // ?*/

/*// 分解字符串
let str = 'hello';
console.log(...str); // h e l l o
// 把字符串转成数组
let rest = [ ...str ];
console.log(rest); //  ["h", "e", "l", "l", "o"]
// 结构字符串
let [a, b, c, d, e] = [...str];
console.log(a, b, c, d, e); // h e l l o*/

/*
let obj = {
    a: 1,
    b: 2,
    c: 3,
    data: [ 'hello', 'world' ],
    [Symbol.iterator]: function () {
        let keyIndex = Object.keys(this);
        let index = 0;
        return {
            next: () => {
                return index < keyIndex.length ? {
                    value: {
                        key: keyIndex[index],
                        val: this[keyIndex[index++]]
                    }
                } : {
                    done: true
                }
            }
        }
    }
};
console.log(...obj); // {key: "a", val: 1} {key: "b", val: 2} {key: "c", val: 3} {key: "data", val: Array(2)}
*/


/*function Obj(value) {
    this.value = value;
    this.next = null;
}
Obj.prototype[Symbol.iterator] = function() {
    let iterator = { next: next };
    let current = this;
    function next() {
        if (current) {
            let value = current.value;
            current = current.next;
            return { done: false, value: value };
        } else {
            return { done: true };
        }
    }
    return iterator;
}
let one = new Obj(1);
let two = new Obj(2);
let three = new Obj(3);
one.next = two;
two.next = three;
console.log(...one); // 1 2 3*/



/*let arr = ['a', 'b', 'c'];
let iter = arr[Symbol.iterator]();

console.log(iter.next()); // { value: 'a', done: false }
console.log(iter.next()); // { value: 'b', done: false }
console.log(iter.next()); // { value: 'c', done: false }
console.log(iter.next()); // { value: undefined, done: true }*/


/*
let iterator = {
    *[Symbol.iterator] () {
        yield 1;
        yield 2;
        yield 3;
    }
}
console.log(...iterator); // 1 2 3*/

/*function* helloWorldGenerator() {
    yield 'hello';
    yield 'world';
    return 'ending';
}

let hw = helloWorldGenerator();
// console.log(...hw);// hello world
console.log(hw.next()); // {value: "hello", done: false}
console.log(hw.next()); // {value: "world", done: false}
console.log(hw.next()); // {value: "ending", done: true}
console.log(hw.next()); // {value: "undefined", done: true}*/

/*
let generator = function* () {
    yield 1;
    yield* [2,3,4];
    yield 5;
};
let iterator = generator();
console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: 2, done: false }
console.log(iterator.next()); // { value: 3, done: false }
console.log(iterator.next()); // { value: 4, done: false }
console.log(iterator.next()); // { value: 5, done: false }
console.log(iterator.next()); // { value: undefined, done: true }*/


/*
let myIterable = {};
myIterable[Symbol.iterator] = function* () {
    yield 1;
    yield 2;
    yield 3;
};

console.log(...myIterable); // 1, 2, 3

function* iterEntries(obj) {
    let keys = Object.keys(obj);
    for (let i=0; i < keys.length; i++) {
        let key = keys[i];
        yield [key, obj[key]];
    }
}
let myObj = { foo: 3, bar: 7 };
for (let [key, value] of iterEntries(myObj)) {
    console.log(key, value);// foo 3  bar 7
}*/

/*function* gen(x){
    let y = yield x + 2;
    return y;
}

let g = gen(1);
console.log(g.next()); // { value: 3, done: false }
console.log(g.next(2)); // { value: 2, done: true }*/


/*function* gen(x){
    try {
        let y = yield x + 2;
    } catch (e){
        console.log(e);
    }
    return y;
}

let g = gen(1);
g.next();
g.throw('出错了');*/

/*
function* gen(){
    let url = 'https://api.github.com/users/github';
    let result = yield fetch(url);
    console.log(result.bio);
}

let g = gen();
let result = g.next();

result.value.then(function(data){
    return data.json();
}).then(function(data){
    g.next(data);
});*/



/*
let g = function* (){
    let f1 = yield utils.Fetch('https://api.github.com/users/github');
    let fn = yield utils.Fetch('https://api.apishop.net/common/tongue/getTongueList');
    console.log(f1);
    console.log(fn);
};
co(g).then(() => {
    console.log('执行完成');
});
*/

/*
let g = function* (){
    let f1 = yield utils.Fetch('https://api.github.com/users/github', 'json');
    let fn = yield utils.Fetch('https://api.apishop.net/common/tongue/getTongueList', 'json');
    console.log(f1);
    console.log(fn);
};
function run(gen){
    let g = gen();
    function next(data){
        let result = g.next(data);
        if (result.done) return result.value;
        result.value.then(function(data){
            next(data);
        });
    }
    next();
}
run(g);
*/
