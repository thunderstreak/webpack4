import { delay } from 'redux-saga';
import { take, fork, call, put, takeEvery, all } from 'redux-saga/effects';

export function* helloSaga() {
    console.log('hello saga');
}

// Our worker Saga: 将执行异步的 increment 任务
export function* incrementAsync() {
    yield delay(3000);
    yield put({ type: 'INCREMENT', value:1 })
}

// Our watcher Saga: 在每个 INCREMENT_ASYNC action spawn 一个新的 incrementAsync 任务
export function* watchIncrementAsync() {
    yield takeEvery('INCREMENT_ASYNC', incrementAsync)
}


// 注意，我们现在只导出rootSaga,一次启动所有单一入口点
export default function* rootSaga() {
    yield all([
        helloSaga(),
        incrementAsync(),
        watchIncrementAsync()
    ])
}
