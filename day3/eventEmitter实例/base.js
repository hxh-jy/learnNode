let events = require('events')
let emitter = new events.EventEmitter()

/**
 * 为指定事件注册一个监听器
 * 参数有两个，第一个为事件名，第二个为回调函数
 * EventEmitter 的每个事件由一个事件名和若干个参数组成，事件名是一个字符串，通常表达一定的语义。
 * 对于每个事件，EventEmitter 支持 若干个事件监听器。
 * 当事件触发时，注册到这个事件的事件监听器被依次调用
 * 事件参数作为回调函数参数传递。
 * on 函数用于绑定事件函数，emit 属性用于触发一个事件。
 */

emitter.on('event1',(arg1,arg2) => {
    console.log('监听器1',arg1,arg2)
})

emitter.on('event1',(arg1,arg2) => {
    console.log('监听器1',arg1,arg2)
})


emitter.emit('event1','arg1参数','arg2参数')