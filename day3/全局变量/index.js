/**
 * process全局对象
 * process.execPath 可以返回当前Node应用程序执行的路径
 * process.version 返回当前Node版本信息
 * process.platform 返回当前Node服务平台信息
 * 
 */
// console.log('process全局对象',global.process.execPath,process.version,process.platform)
// process.on('exit',(code) => {
//     setTimeout(() => {
//         console.log('测试该代码会不会执行')
//     })

//     console.log('退出码为',code)
// })
// console.log('程序执行结束',process.pid)
// console.log('标准输出流',process.stdout)
// console.log('标准输入流',process.stdin)
// console.log('标准错误流',process.stderr)

// 输出到终端
// process.stdout.write("Hello World!" + "\n");
// console.log(process.argv)
// // 通过参数读取
// process.argv.forEach(function(val, index, array) {
//    console.log(index + ': ' + val);
// });

// console.log('node占用内存的情况',process.memoryUsage(),process.uptime(),process.cwd())
