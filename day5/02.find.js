/**
 * 在一个二维数组array中（每个一维数组的长度相同），
 * 每一行都按照从左到右递增的顺序排序，
 * 每一列都按照从上到下递增的顺序排序。
 * 请完成一个函数，输入这样的一个二维数组和一个整数，判断数组中是否含有该整数。
 */
/**
 * continue语句的注意事项：

1. break可以在if-else中使用直接跳出当前循环。
2. 在多层循环中, 一个break语句只向外跳一层。
continue语句的作用是跳过循环体中剩余的语句并到循环末尾而强行执行下一次循环。
continue语句只用在for、while、do-while等循环体中, 常与if条件语句一起使用, 用来加速循环。
 */
let arr = [
        [1,2,8,9],
        [2,4,9,12],
        [4,7,10,13],
        [6,8,11,15]
    ]
// function find(arr,target) {
//     let newArr = new Set(arr.flat())
//     return newArr.flat(target)
// }

// 方法二
// function find(arr,target) {
//     return arr.some(array => array.some(val => val === target))
// }

// 方法三
function find(arr,target) {
    var len = arr.length
    var oneLen = arr[0].length

    for (let i = 0;i < len;i++) {
        for (let j = 0;j < oneLen;j ++) {
            if (arr[i][j] ===  target) {
                return true
            } else if (arr[i][j] < target) {
                continue
            } else {
                break
            }
        }
    }
    return false
}
console.log('测试****',find(arr,11))