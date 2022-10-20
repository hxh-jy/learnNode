/**
 * 在一个长度为n的数组里的所有数字都在0到n-1的范围内。 数组中某些数字是重复的，
 * 但不知道有几个数字是重复的。也不知道每个数字重复几次。
 * 请找出数组中任意一个重复的数字。 
 * 例如，如果输入长度为7的数组[2,3,1,0,2,5,3]，那么对应的输出是2或者3。
 * 存在不合法的输入的话输出-1
 */
let arr = [2,3,1,0,2,5,3]

// 方法一
function dup(arr) {
    let obj = {}
    for (let i = 0;i < arr.length;i ++) {
        if (!obj[arr[i]]) {
            obj[arr[i]] = 1
        } else {
           return arr[i]
        }
    }
    return -1
}

// 法二
function dup1(arr) {
    let set = new Set()
    for (let i = 0;i < arr.length;i ++) {
        if (set.has(arr[i])) {
            return arr[i]
        } else {
            set.add(arr[i])
        }
    }
    return -1
}


console.log('法二测试**',dup1(arr))