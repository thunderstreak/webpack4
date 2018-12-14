/*
* react 事件自动绑定this
* 使用装饰器模式
* */
const {defineProperty} = Object;

const bind = (fn,context) => {
    if(fn.bind){
        return fn.bind(context)
    } else {
        return function __autobind__(){
            return fn.apply(context,arguments)
        }
    }
};

const createDefaultSetter = (key) => {
    return function set(newValue) {
        defineProperty(this,key,{
            configurable    :true,
            writable        :true,
            enumerable      :true,
            value           :newValue
        });
        return newValue
    }
};

export default function autobind(target,key,{value:fn,configurable,enumerable}) {
    if(typeof fn !== 'function'){
        throw new SyntaxError(`@autobind can only be use functions, not ${fn}`)
    }

    return {
        configurable,
        enumerable,
        get(){
            /**
             * 使用这种方式相当于替换了这个函数，所以当比如
             * Class.prototype.hasOwnProperty(key) 的时候，为了正确返回
             * 所以这里做了 this 的判断
             */
            if(this === target){
                return fn
            }
            const boundFn = bind(fn,this);
            defineProperty(this,key,{
                configurable    :true,
                writable        :true,
                enumerable      :false,
                value           :boundFn
            });
            return boundFn;
        },
        set:createDefaultSetter(key)
    }
}
