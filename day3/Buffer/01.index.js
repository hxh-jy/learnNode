
/**
 * 创建buffer类
 * Buffer.alloc(size[, fill[, encoding]])： 返回一个指定大小的 Buffer 实例，如果没有设置 fill，则默认填满 0
 * Buffer.from(array)： 返回一个被 array 的值初始化的新的 Buffer 实例（传入的 array 的元素只能是数字，不然就会自动被 0 覆盖）
 * Buffer.from(buffer)： 复制传入的 Buffer 实例的数据，并返回一个新的 Buffer 实例
 * Buffer.from(string[, encoding])： 返回一个被 string 的值初始化的新的 Buffer 实例
 */
let buf1 = Buffer.alloc(10,'abc')
console.log('buffer实例为：',buf1.toString())

let buf2 = Buffer.from([1,1,1,143,23,34])
console.log('buffer实例为：',buf2.toString())

/**
 * 写入缓冲区
 * buf.write(string[, offset[, length]][, encoding])
 * 返回值：实际写入的大小
 */
let buf3 = Buffer.alloc(256)
let len = buf3.write('www.baidu.com')
console.log('实际写入的字节数为:',len)

/**
 * 从缓冲区读取数据
 * 返回值：解码缓冲区数据并使用指定的编码返回字符串。
 */

// let buf = buf3.toString('ascii',4)
// console.log('从缓冲区读取到的数据为：',buf)

/**
 * 将buffer转换为JSON对象
 * 当字符串化一个 Buffer 实例时，JSON.stringify() 会隐式地调用该 toJSON()。
 * 返回值为： ｛type: 'Buffer',data: [...]｝
 */
let bufJson = buf3.toJSON()
console.log('将buffer实例转换为json对象为:',bufJson)