let dateArr = [31,28,31,30,31,30,31,31,30,31,30,31]
let date = new Date()

let year = date.getFullYear()  // 四位数字的年份
let month = date.getMonth() // 返回值为（0~11）

// 判断是否为闰年
if (month > 1 && year % 400 == 0) {
    dateArr = [31,29,31,30,31,30,31,31,30,31,30,31]
}
let day = date.getDate() // 返回一个月中的某一天(1~31)
let res = 0

for (let i = 0;i < month;i ++) {
    res += dateArr[i]
}

res += day
console.log(`今年是${year}中的第${res}天`)