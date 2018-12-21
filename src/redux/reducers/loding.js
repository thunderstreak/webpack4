/*
* 返回到Provider上的store，内部保存为对象{}
* */
export function loding(state = null,action) {
    console.log(state,action);
    switch (action.type) {
        case 'LODING':
            return action;
        case 'LODING_SUCC':
            return 'LODING_SUCC';
        case 'LODING_FAIL':
            return 'LOGIN_FAIL';
        default:
            return state
    }
}

export default loding;
