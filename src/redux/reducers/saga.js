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
    console.log(action,state);
    switch (action.type) {
        case 'SAVE_USERS':
            return {...action.payload};
        case 'DELETE_USERS':
            return { ...state};
        case 'UPDATE_USERS':
            return { ...state};
        case 'CREATE_USERS':
            return state;
        default:
            return state
    }
}
