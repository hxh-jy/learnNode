/**
 *  Buffer.from(string[, encoding])： 返回一个被 string 的值初始化的新的 Buffer 实例
 * 缓冲区合并
 * concat
 */

let buf1 = Buffer.from('www.baidu.com ')
let buf2 = Buffer.from('www.taobao.com')
let buf3 = Buffer.concat([buf1,buf2])
console.log('合并后的Buffer为：',buf3.toString())

/**
 * buffer 比较
 * buf.compare(otherBuffer);
 */

let res = buf2.compare(buf1)
console.log('buf1和buf2的比较',res)

/**
 * 拷贝缓冲区
 * buf.copy(targetBuffer[, targetStart[, sourceStart[, sourceEnd]]])
 */

let buf4 = buf2.copy(buf1,4)
console.log('拷贝缓冲区，buf1实例会改变',buf1.toString(),buf1.length)