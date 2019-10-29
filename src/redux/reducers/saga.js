export function counter(state = 0, action) {
    console.log(action);
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
        case 'REQUEST_USERS_SAVE':
            return { ...state, ...action.payload };
        case 'REQUEST_USERS_DELETE':
            return { ...state, list:action.payload };
        case 'REQUEST_USERS_UPDATE':
            list = state.list.map(user => user.id === action.payload.id ? {...user, ...action.payload} : user );
            return { ...state, list };
        case 'REQUEST_USERS_CREATE':
            list = [ action.payload, ...state.list ];
            return { ...state, list };
        case 'REQUEST_USERS_LOADING':
            return { ...state, ...action.payload};
        default:
            return state
    }
}
