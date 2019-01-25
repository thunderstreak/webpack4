export function counter(state = 0, action) {
    switch (action.type) {
        case 'INCREMENT':
            return {value : state.value + 1};
        case 'INCREMENT_IF_ODD':
            let res = {value : state};
            if(state % 2 !== 0){
                res.value = state + 1;
            }else{
                res.value = state;
            }
            // (state % 2 !== 0) ? state + 1 : state;
            return res;
        case 'DECREMENT':
            return {value : state.value - 1};
        default:
            return {value : state.value};
    }
}

export function users(state = null,action) {
    let list;
    switch (action.type) {
        case 'SAVE_USERS':
            return { ...action.payload };
        case 'DELETE_USERS':
            return { ...state, list:action.payload};
        case 'UPDATE_USERS':
            list = state.list.map(user => user.id === action.payload.id ? {...user, ...action.payload} : user );
            return { ...state, list };
        case 'CREATE_USERS':
            list = [action.payload, ...state.list];
            console.log({ ...state, list});
            return { ...state, list};
        default:
            return state
    }
}
