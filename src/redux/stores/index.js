/*
* 初始化定义 state 需要与 rootReducer 里面定义的的状态键名称相同
* */
let initialState = {
    todos           :[],
    visibilityFilter:'SHOW_ALL',
    loginData       : {
        name:'initname'
    },
    lodingData      :{
        data:[],
        status:''
    }
};

export default initialState
