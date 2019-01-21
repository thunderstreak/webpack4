import { delay } from 'redux-saga';
import { take, fork, call, put, select, takeEvery, takeLatest, all } from 'redux-saga/effects';
import * as userServices from '@JAVASCRIPTS/services';

// Our worker Saga: 将执行异步的 increment 任务
function* incrementAsync() {
    yield delay(3000);
    yield put({ type: 'INCREMENT', value:1 })
}
function* decrementAsync() {
    yield delay(3000);
    yield put({ type: 'DECREMENT', value:1})
}

/*
* 使用 takeEvery('*')（使用通配符 * 模式），我们就能捕获发起的所有类型的 action。
* */
function* watchAndLog() {
    /*yield takeEvery('*', function* logger(action) {
        const state = yield select()

        console.log('action', action)
        console.log('state after', state)
    })*/

    while (true) {
        // take 可以并发监听多个 action 使用 ['action1','action2']
        const action = yield take('*');
        const state = yield select();

        console.log('action', action);
        console.log('state after', state)
    }
}



export function* fetch(payload) {
    // yield put({type: 'LOADING', value: true);
    const { page } = payload;
    const {data, headers} = yield call(userServices.fetch, {page});
    yield put({type: 'SAVE_USERS', payload: {list: data, total: Number(headers['x-total-count']), page: Number(page)}});
}

function* create(payload) {
    yield call(userServices.create, payload);
    const list = yield select(state => {
        return state.users.list.unshift(payload)
    });
    yield put({ type: 'CREATE_USERS', payload: list });
}

/*
* takeEvery 允许多个 INCREMENT_ASYNC 实例同时启动
* 如果我们只想得到最新那个请求的响应（例如，始终显示最新版本的数据）。我们可以使用 takeLatest 辅助函数。
* 和 takeEvery 不同，在任何时刻 takeLatest 只允许一个任务在执行。并且这个任务是最后被启动的那个。 如果已经有一个任务在执行的时候启动另一个相同类型的任务，那之前的这个任务会被自动取消。
* */
function* watchComputedAsync() {
    /*yield select(select => {
        console.log(select);
    })*/

    yield takeEvery('INCREMENT_ASYNC', incrementAsync);
    yield takeLatest('DECREMENT_ASYNC', decrementAsync);
    yield takeLatest('SAVE', fetch);
    yield takeLatest('CREATE', create);
}


// 注意，我们现在只导出rootSaga,一次启动所有单一入口点
export default function* rootSaga() {
    yield all([
        watchComputedAsync(),
        // watchAndLog()
    ])
}
