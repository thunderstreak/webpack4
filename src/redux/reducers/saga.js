export default function counter(state = 0, action) {
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
            return state - 1;
        default:
            return state
    }
}
