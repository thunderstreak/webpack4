/*
* 装饰器函数防抖
* */

function _debounce(func, wait, immediate) {
    let timeout;
    return function () {
        let context = this;
        let args = arguments;

        if (timeout) clearTimeout(timeout);
        if (immediate) {
            let callNow = !timeout;
            timeout = setTimeout(function(){
                timeout = null;
            }, wait);
            if (callNow) func.apply(context, args)
        }
        else {
            timeout = setTimeout(function(){
                func.apply(context, args)
            }, wait);
        }
    }
}

export default function debounce(wait, immediate) {
    return function handleDescriptor(target, key, descriptor) {
        const callback = descriptor.value;

        if (typeof callback !== 'function') {
            throw new SyntaxError('Only functions can be debounced');
        }

        let fn = _debounce(callback, wait, immediate);

        return {
            ...descriptor,
            value() {
                fn()
            }
        };
    }
}
