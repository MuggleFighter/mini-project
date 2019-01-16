/**
 * @class eventBus
 * 说明:
 * 由于$off方法无法取消监听匿名函数,所以使用$on方法传入的监听函数请使用具名函数
 */

// 一个事件最大监听函数数量
const MAX_LISTENERS = 10

class eventBus {
    constructor() {
        this.eventsCenter = {}
    }
/**
 * @memberof eventBus 监听事件
 * 
 * @param {String} eventName 监听的事件名称
 * @param {Function} listener 监听函数
 * @param {Object} context 监听函数绑定的上下文(this), 非必传
 * 
 */
    $on(eventName, listener, context) {
        if(typeof listener !== 'function') {
            throw new Error('listener must be a fuction')
        }

        if(!this.eventsCenter[eventName]) {
            this.eventsCenter[eventName] = []
        }
        this.eventsCenter[eventName].push({listener, context: context || null})
        this._checkListenersLength(eventName)
    }
    /**
     * @memberof eventBus 触发事件
     *
     * @param {String} eventName 触发的事件名称
     * @param {*} args 传给监听函数的参数
     * 
     */
    $emit(eventName, ...args) {
        const listeners = this.eventsCenter[eventName] || []
        listeners.forEach(obj => {
            obj.listener.apply(obj.context, args)
        })
    }
/**
 * @memberof eventBus 取消监听事件
 *
 * @param {*} eventName 事件名称
 * @param {*} listener 取消该事件的指定监听函数, 不传时默认取消该事件所有监听函数
 * 
 */
    $off(eventName, listener) {
        // 取消某个事件全部监听函数
        if(!eventName) return;

        if(!listener) {
            delete this.eventsCenter[eventName]
        }else{
            // 取消指定的监听函数
            const listeners = this.eventsCenter[eventName]
            if(!listeners) return;
            const index = listeners.findIndex(obj => obj.listener === listener)
            listeners.splice(index, 1)
        }
    }

    _checkListenersLength(eventName) {
        if(this.eventsCenter[eventName].length > MAX_LISTENERS) {
            console.warn(`${eventName} has more than ${MAX_LISTENERS} listeners`)
        }
    }
}

export default new eventBus()