import { delay } from 'redux-saga';
import { take, fork, call, put, select, takeEvery, takeLatest, all } from 'redux-saga/effects';
import * as userServices from '@JAVASCRIPTS/services';
import * as constants from '../constants'

// Our worker Saga: 将执行异步的 increment 任务
function* incrementAsync() {
    yield delay(1000);
    yield put({ type: 'INCREMENT', value:1 })
}
function* decrementAsync() {
    yield delay(1000);
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



function* fetchData(payload) {
    // yield put({type: 'LOADING', value: true);
    const { page } = payload;
    const {data, headers} = yield call(userServices.fetch, {page});
    yield put({type: 'REQUEST_USERS_SAVE', payload: {list: data, total: Number(headers['x-total-count']), page: Number(page)}});
}

function* createData({payload}) {
    // const { payload } = yield take('CREATE');
    // yield call(userServices.create, payload);

    const list = yield select(state => state.users.list);
    let item = Object.assign({},list[0],payload);
    item.id = Math.round(Math.random() * (30 - 10) + 10);
    yield put({ type: 'REQUEST_USERS_CREATE', payload: item });
}

function* updateData({payload}){
    let { id, values } = payload;
    yield call(userServices.patch, id, values);

    /*
    * redux 里面的 reduces 不要做不纯的操作，直接修改 state 上的内容会导致 component 在 connect mapStatesToProps 的时候不会 re render
    * */
    let index = 0;
    let item = yield select(state => {
        state.users.list.forEach((x, i) => {
            if(x.id === id){
                return index = i;
            }
        });
        return Object.assign(state.users.list[index], values);
    });

    yield put({ type: 'REQUEST_USERS_UPDATE', payload: item});
}


function* deleteDate({payload}){
    // yield call(userServices.remove, payload);
    const list = yield select(state => state.users.list.filter(x => x.id !== payload));

    yield put({type: 'REQUEST_USERS_DELETE', payload: list });
}

function* loadingDate(payload) {
    yield put({type: 'REQUEST_USERS_LOADING', payload})
}

const USERS_HANDLERS = {
    HANDLER_REQUEST_USERS_SAVE      :fetchData,
    HANDLER_REQUEST_USERS_CREATE    :createData,
    HANDLER_REQUEST_USERS_UPDATE    :updateData,
    HANDLER_REQUEST_USERS_DELETE    :deleteDate,
    HANDLER_REQUEST_USERS_LOADING   :loadingDate,
};

/*
* takeEvery 允许多个 INCREMENT_ASYNC 实例同时启动
* 如果我们只想得到最新那个请求的响应（例如，始终显示最新版本的数据）。我们可以使用 takeLatest 辅助函数。
* 和 takeEvery 不同，在任何时刻 takeLatest 只允许一个任务在执行。并且这个任务是最后被启动的那个。 如果已经有一个任务在执行的时候启动另一个相同类型的任务，那之前的这个任务会被自动取消。
* */
function* watchComputedAsync() {
    yield takeEvery('INCREMENT_ASYNC', incrementAsync);
    yield takeEvery('DECREMENT_ASYNC', decrementAsync);
    yield takeLatest('SAVE', fetchData);
    yield takeLatest('UPDATE', updateData);
    yield takeLatest('DELETE', deleteDate);
    yield takeLatest('CREATE', createData);
}


// 注意，我们现在只导出rootSaga,一次启动所有单一入口点
export default function* rootSaga() {

    // all 用于同时启动指定 task
    /*yield all([
        watchComputedAsync(),
        // fork(createData)
        // watchAndLog()
    ])*/
    yield takeEvery('INCREMENT_ASYNC', incrementAsync);
    yield takeEvery('DECREMENT_ASYNC', decrementAsync);

    const USERS = Object.keys(constants.Users);

    while (true){

        const action = yield take(USERS);
        let taskName = USERS.filter(x => x === action.type)[0];
        // yield put(action);
        yield call(USERS_HANDLERS.HANDLER_REQUEST_USERS_LOADING,{loading: true});
        yield call(USERS_HANDLERS[taskName],action);
        yield call(USERS_HANDLERS.HANDLER_REQUEST_USERS_LOADING,{loading: false});
    }
}
