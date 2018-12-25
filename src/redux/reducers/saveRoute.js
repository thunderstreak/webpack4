/*
* 返回到Provider上的store，内部保存为对象{}
* */
export function saveRoute(state = null,action) {
    switch (action.type) {
        case 'SAVE_ROUTE':
            return {hashUrl : action.hashUrl};
        default:
            return state
    }
}

export default saveRoute;
