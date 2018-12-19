/*
* 返回到Provider上的store，内部保存为对象{}
* */
export function logins(state = null,action) {
    switch (action.type) {
        case 'LOGIN_ING':
            return action.data;
        case 'LOGIN_SUCC':
            return 'LOGIN_SUCC';
        case 'LOGIN_FAIL':
            return 'LOGIN_FAIL';
        default:
            return state
    }
}

export default logins;
