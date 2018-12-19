/*
* 中间件是使用自定义功能扩展Redux的建议方法。中间件允许您包装商店的dispatch方法
* 中间件可以组合，多个中间件组合在一起，每个中间件不需要知道在链中之前和之后调用的内容
* 中间件支持异步操作
* 每个中间件接收Store的dispatch和getState功能命名的参数，并返回一个函数。
* 该函数将被赋予next中间件的调度方法，并且期望返回使用可能不同的参数action调用的next(action)函数，或者在不同的时间，或者可能根本不调用它。
* 链中的最后一个中间件将接收真实商店的dispatch方法作为next参数，从而结束链。所以，中间件签名是({ getState, dispatch }) => next => action。
* */
export default function logger({getState}) {
    return next => action => {
        console.log('will dispatch',action);

        //调用中间件链中的下一个分派方法。
        const returnVal = next(action);

        console.log('state after dispatch',getState());

        //这很可能是操作本身，除非在链中的中间件进一步更改它。
        return returnVal
    }
}

