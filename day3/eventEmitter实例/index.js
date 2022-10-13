let events = require('events')
let emitter = new events.EventEmitter()
let ev1 = function listener1() {
    console.log('监听器1的执行')
}
let ev2 = function listener2() {
    console.log('监听器2的执行')
}

emitter.on('connect',ev1)
emitter.addListener('connect',ev2)

let count = emitter.listenerCount('connect')
console.log('总共监听的事件数为：',count)
emitter.emit('connect')

emitter.removeListener('connect',ev1)
console.log("listener1 不再受监听。--------");
emitter.emit('connect')

eventListeners = emitter.listenerCount('connect');
console.log(eventListeners + " 个监听器监听连接事件。");

console.log("程序执行完毕。");