function Promise(fn){
    let state = 'pending';//默认等待状态
    let value = null;
    let callbacks = [];

    this.then = (onFulfilled, onRejected) => {
        /*if(state === 'pending'){
            callbacks.push(onFulfilled);
        }else if(state === 'fulfilled'){
            onFulfilled(value);
        }else if(state === 'rejected'){
            onRejected(value)
        }
        return this;*/

        // 提供 Promise 类型的回调
        return new Promise((resolve,reject) => {
            handler({
                onFulfilled :onFulfilled || null,
                onRejected  :onRejected || null,
                resolve     :resolve,
                reject      :reject,
            })
        })
    };

    let handler = (callback) => {
        console.log(state);
        if(state === 'pending'){
            callbacks.push(callback);
            return;
        }

        // 处理完成或失败,
        let cb = state === 'fulfilled' ? callback.onFulfilled : callback.onRejected;
        // callback 没有 onFulfilled 认为是一个 Promise, 如果 then 没有传递任何东西直接 resolve
        if(cb === null){
            cb = state === 'fulfilled' ? callback.resolve : callback.reject;
            cb(value);
            return;
        }

        // 如果在执行成功回调、失败回调时代码出错,将 bridge promise 设为 rejected 状态
        try{
            let ret = cb(value);
            callback.resolve(ret);
        }catch(e){
            callback.reject(e);
        }
    };

    let resolve = (newValue) => {
        let thenCalledOrThrow = false;
        if(newValue && typeof newValue === 'object' || typeof newValue === 'function'){
            let then = newValue.then;
            if(typeof then === 'function'){
                if(thenCalledOrThrow){
                    return
                }
                thenCalledOrThrow = true;
                then.call(newValue, resolve, reject);
                return;
            }
        }
        value = newValue;
        state = 'fulfilled';
        execute();
    };

    let reject = (err) => {
        value = err;
        state = 'rejected';
        execute();
    };

    let execute = () => {
        // 调用 Promise 的时候，由于 then 方法在注册回调之前， resolve 已经执行了，这里使用异步保证 resolve 执行之前 then 方法已经注册完所有的回调
        setTimeout(() => {
            callbacks.forEach(f => f(value));
        })
    };

    fn(resolve,reject);// 立即执行 Promise 里面的函数
}

let get1 = () => {
    return new Promise((resolve,reject) => {
        resolve('get1');
    })
};

let get2 = (type) => {
    return new Promise((resolve,reject) => {
        reject('get2' + type)
    });
};

get1().then(res => {
    console.log(res);
    return res
}).then(get2).then(res => {
    console.log(res);
},(err) => {
    console.log(err);
});


/*function P(fn) {
    this.state = 'pending';
    this.value = null;
    this.callbacks = [];

    this.then = (onFulfilled = null,onRejected = null) => {
        return new P((resolve,reject) => {
            handler({
                onFulfilled:onFulfilled,
                onRejected:onRejected,
                resolve:resolve,
                reject:reject
            })
        })
    };

    let handler = (callback) => {
        if(this.state === 'pending'){
            this.callbacks.push(callback);
            return;
        }

        let cb = this.state === 'fulfilled' ? callback.onFulfilled : callback.onRejected;
        if(cb === null){
            cb = this.state === 'fulfilled' ? callback.resolve : callback.reject;
            cb(this.value);
            return;
        }

        let ret = cb(this.value);
        callback.resolve(ret);
    };

    let reslove = (value) => {
        if(value && typeof value === 'object' || typeof value === 'function'){
            let then = value.then;
            if(typeof then === 'function'){
                then.call(value, reslove, reject);
                return
            }
        }
        this.state = 'fulfilled';
        this.value = value;
        // 保证 promise 所有 then 回调执行
        setTimeout(() => {
            this.callbacks.forEach(f => f(this.value))
        })
    };

    let reject = (value) => {
        this.state = 'rejected';
        this.value = value;
        setTimeout(() => {
            this.callbacks.forEach(f => f(this.value));
        })
    };

    fn(reslove,reject);
}*/


function P (fu){
    this.state = 'pending';
    this.data = null;
    this.callbacks = [];

    this.then = (onFullfilled = null,onRejected = null) => {
        return new P((resolve,reject) => {
            handler({
                onFullfilled:onFullfilled,
                onRejected:onRejected,
                resolve:resolve,
                reject:reject
            })
        })
    };

    let handler = (callback) => {
        if(this.state === 'pending'){
            this.callbacks.push(callback);
            return
        }

        let cb = this.state === 'fullfilled' ? callback.onFulfilled : callback.onRejected;
        if(!cb){
            cb = this.state === 'fullfilled' ? callback.resolve : callback.reject;
            cb(this.data);
            return
        }

        let ret = cb(this.data);
        callback.resolve(ret)
    };

    let resolve = (value) => {
        if(value && typeof value === 'object' || typeof value === 'function'){
            let then = value.then;
            if(typeof then === 'function'){
                then.call(value,resolve,reject);
                return
            }
        }
        this.state = 'fullfilled';
        this.data = value;
        setTimeout(
            this.callbacks.forEach(x => x(this.data))
        )
    };

    let reject = (value) => {
        this.state = 'rejected';
        this.data = value;
        setTimeout(
            this.callbacks.forEach(x => x(this.data))
        )
    };

    fu(resolve,reject)
}
