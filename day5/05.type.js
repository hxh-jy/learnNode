function fn(a,b) {
    console.log(a + b)
}
console.log(typeof fn)
console.log(typeof null)
console.log(typeof NaN)

/**
 * 基本数据类型(栈内存):undefined boolean number string symbol bigint
 * 引用数据类型（指针存储在栈中，值存储在堆中）: object function
 * 栈：会自定分配内存空间会自动释放，存放基本数据类型，简单的数据段占固定大小的空间
 * 堆： 动态分配内存，大小不定也不是自动释放，存放引用类型
 * 哪些可能由多个值构成的对象保存在堆内存中
 */