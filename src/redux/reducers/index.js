import {Increment, Decrement} from '../actions'

export default (state, action) => {
    const {counterCaption} = action;
    switch (action.type) {
        case Increment:
            return {...state, [counterCaption]: state[counterCaption] + 1};
        case Decrement:
            return {...state, [counterCaption]: state[counterCaption] - 1};
        case 'CHANGE_COLOR':
            return { ...state, themeColor: action.themeColor };
        default:
            return state
    }
}