/*
* 装饰器函数防抖
* */
// _debounce(callbacl,100)
export function _debounce(func, wait, immediate, target) {
    let timeout;
    return function (event) {
        let context = this;
        let args = arguments;

        if (timeout) clearTimeout(timeout);
        if (immediate) {
            let callNow = !timeout;
            timeout = setTimeout(function(){
                timeout = null;
            }, wait);
            if (callNow) func.apply(context, args)
        } else {
            timeout = setTimeout(function(){
                func.apply(context, args)
            }, wait);
        }
    }
}

export default function debounce(wait, immediate) {
    /*
    * params:target(目标类)
    * params:name(目标属性)
    * params:descriptor(目标属性的描述符) 自带属性 => (configurable、value、enumerable、writable、__proto__)
    * */
    return function handleDescriptor(target, name, descriptor) {

        const callback = descriptor.value;

        if (typeof callback !== 'function') {
            throw new SyntaxError('Only functions can be debounced');
        }

        let fn = _debounce(callback, wait, immediate, target);

        return {
            ...descriptor,
            value() {
                fn()
            }
        };
    }
}
