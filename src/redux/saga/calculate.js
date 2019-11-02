import { delay } from 'redux-saga';
import { take, fork, call, put, select, takeEvery, takeLatest, all } from 'redux-saga/effects';

// Our worker Saga: 将执行异步的 increment 任务
function* incrementAsync() {
    yield delay(1000);
    yield put({ type: 'INCREMENT', value:1 })
}
function* decrementAsync() {
    yield delay(1000);
    yield put({ type: 'DECREMENT', value:1})
}
