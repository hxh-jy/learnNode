console.log(null == undefined)
/**
 *  JSON.stringify() 方法
 * 将一个值转为JSON字符串，该字符串符合JSON格式，并且可以被JSON.parse()方法还原
 *  !!!!!!原始类型的字符串，转换之后会带双引号
 */

console.log(JSON.stringify('34'),JSON.stringify(32),JSON.stringify(true))
// result： '"34"'  '32' 'true'
