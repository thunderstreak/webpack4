let nextTodoId = 0;
export const addTodo = text => {
    return {
        type: 'ADD_TODO',
        id  : nextTodoId++,
        text
    }
};

export const setVisibilityFilter = filter => {
    return {
        type: 'SET_VISIBILITY_FILTER',
        filter
    }
};

export const toggleTodo = id => {
    return {
        type: 'TOGGLE_TODO',
        id
    }
};

export const loginIng = data => {
    return {
        type    :'LOGIN_ING',
        data    :data
    }
};

export const VisibilityFilters = {
    SHOW_ALL        : 'SHOW_ALL',
    SHOW_COMPLETED  : 'SHOW_COMPLETED',
    SHOW_ACTIVE     : 'SHOW_ACTIVE'
};

/*
* Loding data
* */
export const lodingData = data => {
    return {
        type    :'LODING',
        data    :data.result,
        status  :data.status,
    }
};

export function loding(url) {
    return function (dispatch) {
        let wd = {
            result:[],
            status:'loding'
        };
        dispatch(lodingData(wd));

        fetch(url).then(res => res.json()).then((data) => {
            // 这里可以格式化数据，可以使用normalizr等辅助工具处理数据
            let d = Object.assign(data,{status:'success'});
            dispatch(lodingData(d));
        }).catch((err) => {
            let e = Object.assign(err,{status:'error'});
            dispatch(lodingData(e));
        });
    }
}

/*
* save route
* */
export const saveRoute = (payload) => {
    return {
        type:'SAVE_ROUTE',
        hashUrl:payload
    }
};
