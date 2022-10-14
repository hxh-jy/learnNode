# 一、node基础

Node.js 可以解析JS代码（没有浏览器安全级别的限制）提供很多系统级别的API，如：

- 文件的读写 (File System)
- 进程的管理 (Process)
- 网络通信 (HTTP/HTTPS)

# 二、fs模块

## 2.1 fs.readFile()

**异步读取文件**

+ 引用

  `const fs = require('fs') `

+ *options 代表编码格式读取*  fs.readFile(path,[,options],callback)

+ *异步读取文件的方法，函数最后一个参数为回调函数，回调函数的第一个参数包含了错误信息(error)*

  ```js
  // 示例 读取成功 err=null 读取失败 data=undefined
  fs.readFile('./files/11.text','utf8',function(err,data){
      if(err){
          return console.log('读取失败'+err)
      }
      console.log(data)
  })
  ```

**同步读取文件**

+ fs.readFileSync(path)

+ 文件的返回值是一个Buffer,需要通过toString方法转换一下,或者通过设置utf-8读取形式

+ <Buffer e6 b5 8b e8 af 95 e8 af bb e6 96 87 e4 bb b6>

  ```js
  let data = fs.readFileSync('../../resource/01.txt','utf-8')
  console.log('测试同步读取文件',data)
  ```

**建议：**建议使用异步方法，比起同步，异步方法性能更高，速度更快，而且没有阻塞。

## 2.2 fs.writeFile()

`fs.writeFile(file, data[, options], callback)`

参数使用说明如下：

- **file** - 文件名或文件描述符。

- **data** - 要写入文件的数据，可以是 String(字符串) 或 Buffer(缓冲) 对象。

- **options** - 该参数是一个对象，包含 {encoding, mode, flag}。默认编码为 utf8, 模式为 0666 ， flag 为 'w'

  writeFile 直接打开文件默认是 **w** 模式，所以如果文件存在，该方法写入的内容会覆盖旧的文件内容。

- **callback** - 回调函数，回调函数只包含错误信息参数(err)，在写入失败时返回。

```js
// options 默认值utf-8
// fs.writeFile(path,data[,options],callback) 写入成功 err=null
fs.writeFile('../resource/02.testWrite.txt','测试写文件',(err) => {
    console.log(err == null)
    if (err == null) {
        return console.log('写入成功')
    } else {
        return console.log('写入失败' + err)
    }
})
```

## 2.3 文件路径问题

### 2.3.1 __dirname

+ 获取当前模块的目录名称，表示当前js的目录

  ```js
  const fs = require('fs')
  
  // options 默认值utf8
  // fs.writeFile(path,data[,options],callback) 写入成功 err=null
  
  /**
   * 以下的path参数代表是在当前js的目录下的resource目录下新建02.testWrite.txt文件
   * 必须保证当前js的目录下有resource目录，以下创建文件的方式才会成功，否则会失败
   *  */ 
  fs.writeFile(__dirname + '/resource/02.testWrite.txt','测试写文件',(err) => {
      console.log(err == null)
      if (err == null) {
          return console.log('写入成功')
      } else {
          return console.log('写入失败' + err)
      }
  })
  
  // __dirname 代表当前js所在的目录
  console.log('测试__dirname',__dirname)
  ```

### 2.3.2 path模块

`path` 模块提供了一些工具函数，用于处理文件与目录的路径。

+ *path.join() 方法使用平台特定的分隔符把全部给定的 path 片段连接到一起，并规范化生成的路径。*

  *长度为零的 path 片段会被忽略。 如果连接后的路径字符串是一个长度为零的字符串，则返回 '.'，表示当前工作目录。*

+ *path.basename(path[,ext]) 从路径字符串中取出文件名*

+ *path.extname(path) 从路径字符串中取出文件扩展名*

+ *path.parse(path) 返回一个对象，对象的属性表示path的元素，返回的对象有如下属性*

  *dir <string>* 

  *root <string>*

  *base <string>* 

  *name <string>*

  *ext <string>*

  ```js
  let obj = path.parse('/home/user/dir/file.txt');
  // 返回:
  // { root: '/',
  //   dir: '/home/user/dir',
  //   base: 'file.txt',
  //   ext: '.txt',
  //   name: 'file' }
  console.log('*****',obj)
  ```

### 2.3.3 __filename模块

当前模块的文件名称---解析后的绝对路径。

## 2.4 打开文件

异步模式下打开文件的语法格

`fs.open(path, flags[, mode], callback)`

**参数说明：**

+ path  文件路径
+ flags 文件打开的行为
  - r----读取模式打开，不存在抛出异常
  - r+ ---- 读写模式 不存在抛出异常
  - rs---同步读取
  - rs+ --- 同步读写
  - w ---写入模式打开，不存在则创建
  - wx--- 写模式，但是如果文件存在会报错
  - w+ --读写，不存在创建
  - wx+  读写，文件存在会报错
  - a  ---追加模式打开，不存在则创建
  - ax ---文件存在则报错
  - a+ ---读追加打开，不存在则创建
  - ax+  -- -读追加打开，文件存在追加失败

## 2.5 获取文件信息

异步模式获取文件信息的语法格式：

`fs.stat(path, callback)`

参数使用说明如下：

- **path** - 文件路径。
- **callback** - 回调函数，带有两个参数如：(err, stats), **stats** 是 fs.Stats 对象。

```js
var fs = require("fs");

console.log("准备打开文件！");
fs.stat('input.txt', function (err, stats) {
   if (err) {
       return console.error(err);
   }
   console.log(stats);
   console.log("读取文件信息成功！");
   
   // 检测文件类型
   console.log("是否为文件(isFile) ? " + stats.isFile());
   console.log("是否为目录(isDirectory) ? " + stats.isDirectory());    
});
```

+ stats.isFile() 是否为文件
+ stats.isDirectory()  是否为目录

## 2.6 读取文件

异步模式下读取文件的语法格式：

`fs.read(fd, buffer, offset, length, position, callback)`

参数使用说明如下：

- **fd** - 通过 fs.open() 方法返回的文件描述符。

- **buffer** - 数据写入的缓冲区。

- **offset** - 缓冲区写入的写入偏移量。

- **length** - 要从文件中读取的字节数。

- **position** - 文件读取的起始位置，如果 position 的值为 null，则会从当前文件指针的位置读取。

- **callback** - 回调函数，有三个参数err, bytesRead, buffer，err 为错误信息， bytesRead 表示读取的字节数，buffer 为缓冲区对象

  ```js
  var fs = require('fs')
  // 创建一个Buffer缓冲区用于存放数据
  var buf = new Buffer.alloc(1024);
  
  fs.open('input.txt','r+',(err,fd) => {
      if (err) {
          return console.log(err)
      }
      console.log('文件打卡成功\n准备读取文件')
      fs.read(fd,buf,0,buf.length,0,(err,bytes) => {
          if (err) {
              console.log('err',err)
          }
          console.log('字节被读取',bytes,fd)
          if (bytes > 0) {
              console.log(buf.slice(0,bytes).toString())
          }
      })
  })
  ```

## 2.7 关闭文件

`fs.close(fd, callback)`

```js
var fs = require("fs");
var buf = new Buffer.alloc(1024);

console.log("准备打开文件！");
fs.open('input.txt', 'r+', function(err, fd) {
   if (err) {
       return console.error(err);
   }
   console.log("文件打开成功！");
   console.log("准备读取文件！");
   fs.read(fd, buf, 0, buf.length, 0, function(err, bytes){
      if (err){
         console.log(err);
      }

      // 仅输出读取的字节
      if(bytes > 0){
         console.log(buf.slice(0, bytes).toString());
      }

      // 关闭文件
      fs.close(fd, function(err){
         if (err){
            console.log(err);
         } 
         console.log("文件关闭成功");
      });
   });
});
```

## 2.8 截取文件

`fs.ftruncate(fd, len, callback)`

参数使用说明如下：

- **fd** - 通过 fs.open() 方法返回的文件描述符。

- **len** - 文件内容截取的长度。

- **callback** - 回调函数，没有参数。

  ```js
  var fs = require("fs");
  var buf = new Buffer.alloc(1024);
  
  console.log("准备打开文件！");
  fs.open('input.txt', 'r+', function(err, fd) {
     if (err) {
         return console.error(err);
     }
     console.log("文件打开成功！");
     console.log("截取10字节内的文件内容，超出部分将被去除。");
     
     // 截取文件
     fs.ftruncate(fd, 10, function(err){
        if (err){
           console.log(err);
        } 
        console.log("文件截取成功。");
        console.log("读取相同的文件"); 
        fs.read(fd, buf, 0, buf.length, 0, function(err, bytes){
           if (err){
              console.log(err);
           }
  
           // 仅输出读取的字节
           if(bytes > 0){
              console.log(buf.slice(0, bytes).toString());
           }
  
           // 关闭文件
           fs.close(fd, function(err){
              if (err){
                 console.log(err);
              } 
              console.log("文件关闭成功！");
           });
        });
     });
  });
  ```

## 2.9 删除文件

`fs.unlink(path, callback)`

```js
var fs = require("fs");

console.log("准备删除文件！");
fs.unlink('input.txt', function(err) {
   if (err) {
       return console.error(err);
   }
   console.log("文件删除成功！");
});
```

## 2.10 目录的相关操作

```js
var fs = require("fs");

// console.log("准备删除文件！");
// fs.unlink('input.txt', function(err) {
//    if (err) {
//        return console.error(err);
//    }
//    console.log("文件删除成功！");
// });

// 创建目录
// fs.mkdir(__dirname + '/test',(err) => {
//     if (err) {
//         return console.log('创建目录失败',err)
//     }
//     console.log('目录创建成功')
//     fs.writeFile(__dirname + '/test'+ '/temp.txt','创建文件',(err,data) => {
//         err ? console.log(err) : console.log('文件创建成功',data)
//     })
// })

// 读取目录
/**
 * 参数使用说明如下：
 * path - 文件路径。
 * callback - 回调函数回调函数带有两个参数err, files，err 为错误信息
 * files 为 目录下的文件数组列表。
 */
// fs.readdir(__dirname + '/test',(err,files) => {
//     if (err) {
//         return console.log('读取目录失败',err)
//     }
//     console.log('读取目录',files)
//     files.forEach(file => {
//         console.log('file',file)
//     })
// })

// 删除目录
fs.rmdir(__dirname + '/test/temp',err => {
    if (err) {
        return console.log('删除目录失败',err)
    }
    fs.readdir(__dirname + '/test',(err,files) => {
        if (err) {
            return console.log('读取目录失败',err)
        }
        console.log('读取目录',files)
        files.forEach(file => {
            console.log('file',file)
        })
    })
})
```

# 三、http模块

```js
let http = require('http')

// 创建web服务器实例
const server = http.createServer()

// 为服务器绑定request事件,监听客户端发送的请求
server.on('request', (req, res) => {
    // req 客户端的相关请求信息
    console.log('测试客户端的相关数据',req.url)

    let content = '<h1>404 Not found!<h1>'
    let url = req.url
    console.log(url == '/')
    if (url === '/' || url === '/index.html') {
        content = '<h1>首页</h1>'
    } else if (url === '/about.html') {
        content = '<h1>关于页面</h1>'
    } 
 
     // 防止中文乱码，设置响应头
    res.setHeader('Content-Type', 'text/html; charset=utf-8')

    // res.send 给客户端发送指定内容并结束这次请求
    res.end(content)
})
// 启动web服务器监听端口
server.listen(80,() => {
    console.log('启动服务器：http://127.0.0.1')
})
```

# 四、模块化

+ ### 加载模块

  ```js
  // 加载内置模块
  const fs = require('fs')
  // 加载用户的自定义模块
  const custom = require('./custom.js')
  // 加载第三方模块
  const moment = require('moment')
  ```

+ ### 模块作用域

  导入模块时，里面的变量及函数只能有该模块 js 能访问。好处：防止变量污染

## 4.1 向外共享模块作用域中的成员

- #### module 对象

  每个 .js 自定义模块中都有一个 module 对象，导入模块时，其实是导入module.exports指向的对象。默认值为 {}

- **module.exports**

  ​    在 module.exports 对象上挂载属性方法

```js
// test.js
module.exports.name = 'lhd'
module.exports.sayHello = function(){
    console.log('Hello World ') 
}

// index.js
const custom = require('./test')
console.log(custom) 
```

+ **exports** 

  简化 module.exports。默认情况下 exports 和 module.exports 指向同一个对象。最终结果以 module.exports 指向的对象为准

  ```js
  // test.js
  exports.name = 'lhd'
  exports.sayHello = function(){
      console.log('Hello World ') 
  }
  // index.js
  const custom = require('./test')
  console.log(custom)
  ```

  

**注意：使用 require() 模块时，得到的永远是 module.exports 指向的对象**

+ #### CommonJS 规范

  - 每个模块内部，module变量代表当前模块。
  - module变量是一个对像，它的exports属性（即module.exports)是对外的接口。
  - 加载某个模块，其实是加载该模块的module.exports属性。require(0方法用于加载模块。

# 五、npm与包

## 5.1 定义

node.js中第三方模块又叫包

+ ### 安装包

  ```js
  # 默认安装最新
  npm install 包名称   
  npm i 包名称
  
  # 安装多个
  npm i 包名称 包名称
  
  # 指定安装版本
  npm install 包名称@x.xx.x      // x.xx.x为版本
  # 第一个x代表大版本，第二个代表功能版本，第三个代表 Bug 修复版本    
  ```

+ 淘宝镜像

  ```js
  # 查看当前的下包镜像源
  npm config get registry
  # 将下包的镜像源切换为淘宝镜像源
  npm config set registry=https://registry.npm.taobao.org/
  # 检查
  npm config get registry
  ```

## 5.2 dependencies

在 `package.json` 中记录核心依赖包信息

正常安装默认为核心依赖包,但不包含测试时或者本地打包时所使用的包。

## 5.3 devDependencies

作用：在 `package.json` 中记录开发依赖包信息

如果某些包只在项目开发阶段用到，在项目上线以后不会用到，建议把这些包记录在 `devDependencies` 中。相反，如果在开发及上线都用到，则记录在 `dependencies` 中。一般来说依据官方使用说明安装即可

```js
# 安装到 devDependencies 
npm i 包名称 -D
npm install 包名称 --save-dev
```

## 5.4 package.json

package.json几乎是一个必须的文件，它的主要作用就是管理项目中所使用到的外部依赖包，同时它也是npm命令的入口文件。

## 5.5 模块加载机制

模块在第一次加载后会被缓存。这也意味着多次调用require0不会导致模块的代码被执行多次。
注意：不论是内置模块、用户自定义模块、还是第三方模块，它们都会优先从缓存中加载，从而提高模块的加载效率。

+ 内置模块加载优先级最高。
+ 加载自定义模块时，应指定 ./ 或者 …/ 开头的路径，如果没有将被认为内置模块或者第三方模块。
+ 如果加载自定义模块时省略扩展名，则会以 .js 、.json 、.node 进行尝试加载，如果没有则加载失败。
+ 加载第三方模块时，会先从父级目录寻找 node_modules ，如果父级没有则依次往上寻找。
  把目录当作模块标识符加载时，会在被加载的目录下查找 package.json 并寻找 main 属性，作为加载的入口。如果没有或者无法解析，则会加载目录下的 index.js 文件。

# 六、 express

**注意：express属于第三方包，所以在使用前必须先下载**

Web 开发框架。封装 http 内置模块的第三方包

```js
const express = require('express')

var app = express()

app.get('/',(req,res) => {
    res.send('hello world')
})

var server = app.listen(8081,'localhost',() => {
    var host = server.address().address
    var port = server.address().port

    console.log(`应用实例，访问地址为http://${host}:${port}`)
})  
```

## 6.0 get请求和post请求的区别

+ **get请求是直接嵌入在路径中的**，URL是完整的请求路径包括了?后面的部分，因此你可以手动解析后面的内容作为GET请求的参数。

  **POST 请求的内容全部的都在请求体中**

  - node.js 中 url 模块中的 parse 函数提供了这个功能。

    ```js
    var http = require('http');
    var url = require('url');
    http.createServer((req,res) => {
         // 解析 url 参数
    	var params = url.parse(req.url, true).query;
        res.end(util.inspect(url.parse(req.url, true)));
    }).listen(3000)
    ```

+ get请求用来从服务器上获得资源，而post是用来向服务器提交数据；

+ get将表单中数据按照name=value的形式，添加到action 所指向的URL 后面，并且两者使用”?”连接，而各个变量之间使用”&”连接；post是将表单中的数据放在HTTP协议的请求头或消息体中，传递到action所指向URL；

+ get传输的数据要受到URL长度限制（最大长度是 2048 个字符）；而post可以传输大量的数据，上传文件通常要使用post方式；

+ 使用get时参数会显示在地址栏上，如果这些数据不是敏感数据，那么可以使用get；对于敏感数据还是应用使用post；

+ get请求只能进行url编码（appliacation-x-www-form-urlencoded）,post请求支持多种（multipart/form-data等）

+ 对于 GET 方式的请求，浏览器会把 http header 和 data 一并发送出去，服务器响应 200
  （返回数据）表示成功；
  而对于 POST，浏览器先发送 header，服务器响应 100， 浏览器再继续发送 data，服
  务器响应 200 （返回数据）

## 6.1  Request 请求对象

**request对象标识HTTP请求**

包含了请求查询字符串、参数、内容、HTTP头部等属性

 * req.hostname 获取主机名和IP地址----127.0.0.1
 * req.params：获取路由的params
 * req.path：获取请求路径
 * req.protocol：获取协议类型
 * req.query：获取URL的查询参数串  ....

**req.params和req.query的区别**

### 6.1.1 动态参数 req.[params](https://so.csdn.net/so/search?q=params&spm=1001.2101.3001.7020)

```js
req.params.id就可以获取到前端传递来的参数。
该对象默认为{}

app.get("/api/:id",(req,res)=>{
    console.log(req.params.id)
    res.send("发送成功")
})
```

**地址栏传值**

```js
http://localhost/api/1123  //api 后面的这个就是动态传递的值
```

### 6.1.2 req.query

```
包含在路由中每个查询字符串参数属性的对象。如果没有，默认为{}
```

request.query获取?后的查询参数，很简单，示例如下：

```js
app.get('/getHero', function(req, res){
    console.log(req.query.id)
    res.send(req.query.id)
})
```

## req.query与req.params的区别

```
req.params包含路由参数（在URL的路径部分），而req.query包含URL的查询参数（在URL的？后的参数）。
```

可以使用 url.parse 方法来解析 URL 中的参数

## 6.2 Response 响应对象

**esponse 对象表示 HTTP 响应**

即在接收到请求时向客户端发送的 HTTP 响应数据。

 * res.cookie(name，value [，option])：设置Cookie
 * res.clearCookie()：清除Cookie
 * res.get()：返回指定的HTTP头
 * res.json()：传送JSON响应
 * res.jsonp()：传送JSONP响应
 * res.send()：传送HTTP响应
 * res.status()：设置HTTP状态码
 * res.type()：设置Content-Type的MIME类型

## 6.3 路由

**路由决定了由谁(指定脚本)去响应客户端请求。**

+ Express 中的路由分3部分组成，分别是请求的类型、请求的URL地址、处理函数。

+ 在HTTP请求中，我们可以通过路由提取出请求的URL以及GET/POST参数。

### 6.3.1 普通路由

挂载到app上

```js
const express = require('express')

let app = express()

app.get('/',(req,res) => {
    res.send('get请求  主页')
})

app.post('/',(req,res) => {
    res.send('post请求  主页')
})

app.get('/user',(req,res) => {
    res.send('用户列表页')
})

app.get('/ab*cd',(req,res) => {
    res.send('正则匹配页')
})

let server = app.listen(8080,'localhost',() => {
    let host = server.address().address
    let port = server.address().port

    console.log(`当前实例运行的地址为:http://${host}:${port}`)
})
```

### 6.3.2 模块化路由

为了方便对路由进行模块化管理，Express 不建议将路由直接挂载到app上，而是推荐将路由抽离为单独的模块。

+ 创建路由模块对应的 `.js` 文件
+ 调用 express.Router() 创建路由对象
+ 向路由对象上挂载具体的路由
+ 使用 module.exports 向外共享路由对象
+ 使用 app.use() 注册路由模块

## 6.4 静态文件

Express 提供了内置的中间件 **express.static** 来设置静态文件

可以使用 **express.static** 中间件来设置静态文件路径

通过 express.static() 创建静态资源服务器。可将图片、`css` 文件、`js` 文件对外开放访问。

```js
app.use('/public', express.static('public'));
let express = require('express')

let app = express()

app.get('/',(req,res) => {
    res.send('get请求  主页')
})

// 设置中间件  可以通过以下地址访问公布出去的静态资源http://127.0.0.1:8080/public/img/test.jpg
app.use('/public',express.static('public'))

let server = app.listen(8080,'localhost',() => {
    let host = server.address().address
    let port = server.address().port

    console.log(`当前实例运行的地址为:http://${host}:${port}`)
})
// 将 public 目录下资源提供访问。多个目录请多次调用
// 访问地址：http://localhost:端口号/xxx.html
app.use(express.static('./public'))

// 挂载路径前缀
// 访问地址：http://localhost:端口号/public/xxx.html
app.use('/public',express.static('./public'))

```

## 6.5 form表单和express实现简单的案例

### 6.5.1 body-parser是什么

Node.js 正文解析中间件。在处理程序之前在中间件中解析传入的请求主体，在`req.body`属性下可用。【获取前端数据的插件】

+ 作用： Node.js 正文解析中间件。在处理程序之前在中间件中解析传入的请求主体，在`req.body`属性下可用。【获取前端数据的插件】

  ```js
  var express = require('express');
  var app = express();
  var bodyParser = require('body-parser');
   
  // 创建 application/x-www-form-urlencoded 编码解析
  var urlencodedParser = bodyParser.urlencoded({ extended: false })
   
  app.use('/public', express.static('public'));
   
  app.get('/index.html', function (req, res) {
     res.sendFile( __dirname + "/" + "index.html" );
  })
   
  app.post('/process_post', urlencodedParser, function (req, res) {
   
     // 输出 JSON 格式
     var response = {
         "first_name":req.body.first_name,
         "last_name":req.body.last_name
     };
     console.log(response);
     res.end(JSON.stringify(response));
  })
   
  var server = app.listen(8081, function () {
   
    var host = server.address().address
    var port = server.address().port
   
    console.log("应用实例，访问地址为 http://%s:%s", host, port)
   
  })
  ```

## 6.6 nodemon工具

类似热更新的工具

编写调试 Node.js 项目时，如果修改了代码则需要重新启动项目才可以使用，使用 `nodemon` 工具修改代码时可以自动帮我们重启项目，方便开发

+ 安装

  ```js
  // 安装为全局可用工具
  npm i nodemon -g
  ```

+ #### 使用

  ```js
  // 原本启动
  node app.js
  // nodemon 启动
  nodemon app.js
  ```

  git reset  --hard HEAD^  取消所有的暂存

# 七、express中间件

+ 请求到达 Express 服务器之后，可连续调用多个中间件，从而对这次请求进行预处理。和vue的路由守卫一样，next()代表放行

+ **express中间件必须在路由的上方**

## 7.1 next()函数

next() 函数是实现多个中间件连续调用的关键，它表示把流转关系转交给下一个中间件或者路由。

**定义中间件**

```js
// mw 指向的就是一个中间件函数
const mw = function(req.res,next){
    console.log('这是个简单的中间件函数')
    next()
}
// 全局生效的中间件
app.use(mw)
```

+ 只要有请求到达服务器，必先经过mw中间件函数处理。相对于vue前置守卫，拦截器

## 7.2 **作用**

多个中间件之间，共享同一份req和res。基于这样的特性，我们可以在上游的中间件中，统一为req或res对象添加自定义的属性或方法，供下游的中间件或路由进行使用。

```js
// 示例：每个请求都需要获取时间
app.use((req, res, next) => {
  req.startTime = Date.now()
  next()
})
app.get('/user',(req,res)=>{
    res.send('time:'+req.startTime)
})
```

## 7.3 局部生效的中间件

```js
const mw = function(req,res,next){
    console.log('中间件函数')
    next()
}
app.get('/',mw,(req,res)=>{
    res.send('Hellow World')
})
app.get('/user',(req,res)=>{
    res.send('Hellow World')
})
```

**多个局部中间件**

```js
// mw1与mw2 为中间件函数，两种方式等价
app.get('/',mw1,mw2,(req,res)=>{ xxx })
app.get('/',[mw1,mw2],(req,res)=>{ xxx })
```

## 7.4 中间件的分类

### 7.4.1 应用级别的中间件

通过 app.use() 或者 app.get() 或 app.post() ,绑定到 app 实例上的中间件。

### 7.4.2 路由级别的中间件

绑定到 express.Router() 实例上的中间件。

用法与应用级别中间件一致。

```js
var app = express()
var router = express.Router()

router.use((req,res,next)=>{
    console.log('路由级别中间件')
    next()
})
app.use('/',router)
```

### 7.4.3 错误级别的中间件

专门用来捕获项目中发生的异常错误，从而防止项目崩溃。

格式：处理函数中必须有4个形参 (err,req,res,next)

特点：必须注册在所有路由之后

```js
// 示例
app.get('/',(req,res)=>{
    throw new Error('服务器出错')			// 错误发生后，下面的语句无法执行
    res.send('Hellow World')			    // 无法响应
})
app.use((err,req,res,next)=>{
	console.log('发生了错误'+err.message)
    res.send('Error!'+err.message)			// 捕获错误，向客户端响应
})
```

### 7.4.4 内置中间件

express@4.16.0版本开始，内置了3个常用的中间件

+ express.static 快速托管静态资源的内置中间件 (无兼容性)
+ express.json 解析 JSON 格式的请求体数据 (仅在4.16.0 +可用)
+ express.urlencoded 解析 URL-encoded 格式的请求体 (仅在4.16.0 +可用)

```js
// 配置解析 application/json 格式数据的内置中间件
app.use(express.json())
// 配置解析 application/x-www-form-urlencoded 格式数据的内置中间件
app.use(express.urlencoded({ extended:false }))
```

```js
const express = require('express')
const app = express()

// 注意：除了错误级别的中间件，其他的中间件，必须在路由之前进行配置
// 通过express.json()这个中间件，解析表单中的JSON格式的数据
app.use(express.json())

// 通过express.urlencoded()这个中间件，来解析表单中的url-encoded格式的数据
app.use(express.urlencoded({ extended:false }))

app.post('/user',(req,res)=>{
	// 在服务器，可以使用req.body这个属性，来接收客户端发送过来的请求体数据
	// 默认情况下，如果不配置解析表单数据的中间件，则req.body默认等于undefined
	console.log(req.body)
	res.send('ok')
})
app.post('/book',(req,res)=>{
    // 在服务器端，可以通过req,body来获取JSON格式的表单数据和url-encoded格式的数据
    console.log(req.body)
})
```

### 7.4.5 第三方中间件(需要下载)

非官方内置，由第三方开发出来的中间件叫第三方中间件，可用按需加载和配置

例如：在 express@4.16.0 之前的版本中，经常使用 body-parser 这个第三方中间件来解析请求体数据。

**使用步骤**

+ 使用 `npm i body-parser` 安装

+ 使用 `require` 导入中间件

+ 使用 `app.use()` 注册并使用中间件

  ```js
  const parser = require('body-parser')
  app.use(parser.urlencoded({ extended:false }))
  ```

### 7.4.6 自定义中间件

```js
// test.js
function test(req,res,next){ /*中间件处理函数*/ }
module.exports = test			// 暴露出去

// app.js
const test = require('./test')	// 导入自定义中间件
app.use(test)					// 注册
```

# 八、CORS中间件

**作用：**主要用于解决客户端请求与服务端的跨域问题

**原理：**由一系列http响应头组成，这个响应头可以决定浏览器是否阻止前端JS代码跨域获取资源，当接口服务器配置了CORS中间件后在发起请求就会自动配置相应的请求头，进而接触浏览器的跨域访问权限

## 8.1 cors请求头介绍

### **8.1.1 origin** 

+ 定义：指定允许访问该资源的外域URL

+ 语法： ‘Access-Control-Allow-Origin’,‘域名’

+ 用法： res.setHeader(‘Access-Control-Allow-Origin’,’*’),通配符，表示允许来自任何域的请求。*

  ```js
  // 只允许来自 http://127.0.0.1 的请求
  res.setHeader('Access-Control-Allow-Origin','http://127.0.0.1')
  // 允许任何域的请求
  res.setHeader('Access-Control-Allow-Origin','*')
  ```

### 8.1.2 Headers

+ **定义**：声明cors支持之外的请求头

+ *默认情况下，cors仅支持客户端向服务器发送如下的9个请求头：
  Accept、Accept-Language、Content-Language、DPR、Downlink、Save-Data、Viewport-Width、Width、Content-Type*（值仅限于 text/plain、multipart/form-data、application/x-www-form-urlencoded 三者之一)

+ *如果需要向服务器发送额外的请求头信息，则需要在服务器端，通过Access-Control-Allow-Headers，对额外的请求头进行声明*

+ **用法：** *res.setHeader(‘Access-Control-Allow-Header’,‘添加的请求头’)*

  ```js
  // 允许客户端额外向服务器发送Content-Type请求头和X-Custom-Header请求头
  // 注意：多个请求头之间使用英文的逗号进行分割
  res.setHeader('Access-Control-Allow-Headers','Content-Type,X-Custom-Header')
  ```

### 8.1.3 Methods

+ **定义：**添加请求方式

+ 默认情况下，cors仅仅支持客户端发起get、post、head三种请求

+ 如果客户端需要发起put、delete等请求服务器资源，需要通过*Access-Control-Allow-Methods来指明实际请求所允许使用的HTTP方法*

+ **用法：***res.setHeader(‘Access-control-Allow-Methods’,’*’) //通配符，选定所有请求方式，，或者写入’DELETE’,这种方式也可以

  ```js
  // 只允许POST、GET、DELETE、HEAD请求方法
  res.setHeader('Access-Control-Allow-Methods','POST,GET,DELETE,HEAD')
  // 允许所有的HTTP请求方法
  res.setHeader('Access-Control-Allow-Methods','*')
  ```

## 8.2 请求分类

### 8.2.1 简单请求

同时满足条件：

+ （1）请求方式为GET、POST、HEAD之一 
+ （2）http头部信息不超过以下几种字段：无自定义头部、Accept、Accept-Language、Content-Language、DPR、Downlink、Save-Data、Viewport-Width、Width、Content-Type

### 8.2.2 预检请求

符合以下条件之一：

+ （1）请求方式为GET、POST、HEAD之外 
+ （2）请求头中包含自定义头部字段 
+ （3）向服务器发送了application/json格式的数据

**意思：**就是说在浏览器和服务器正式通信之前，检测到了整个请求体中存在非cors默认的信息，此时要通过*options*进行预检，查明服务端是否允许了此种非默认的改变，如果预检成功，则表示服务端允许了，才会发送正真的请求，并携带回响应的数据

**总结：**简单请求只会存在一次请求，而预检请求会在发送真正请求之前，通过options请求来确认服务器是否允许了此次请求信息中的非默认允许信息

## 8.3 基本使用

+ 安装

  ```js
  npm i cors
  ```

+ 使用

  ```js
  const cors = require('cors')
  app.use(cors()) // 配置中间件，必须在路由之前
  ```

# 九、前后端身份认证

网址： https://blog.csdn.net/DDDHL_/article/details/124390573

# 十、Buffer

**js语言本身只有字符串形式，没有二进制形式类型**

+ 在处理TCP流或文件时必须使用到二进制数据，因为在node中专门定义了buffer类，该类用来创建一个专门存放二进制数据的缓存区
+ 一个 Buffer 类似于一个整数数组
+ *在v6.0之前创建Buffer对象直接使用new Buffer()构造函数来创建对象实例，但是Buffer对内存的权限操作相比很大，可以直接捕获一些敏感信息，所以在v6.0以后，官方文档里面建议使用* **Buffer.from()** *接口去创建Buffer对象。*

## 10.1 创建Buffer类

- **Buffer.alloc(size[, fill[, encoding]])：** 返回一个指定大小的 Buffer 实例，如果没有设置 fill，则默认填满 0
- **Buffer.allocUnsafe(size)：** 返回一个指定大小的 Buffer 实例，但是它不会被初始化，所以它可能包含敏感的数据
- **Buffer.allocUnsafeSlow(size)**
- **Buffer.from(array)：** 返回一个被 array 的值初始化的新的 Buffer 实例（传入的 array 的元素只能是数字，不然就会自动被 0 覆盖）
- **Buffer.from(arrayBuffer[, byteOffset[, length]])：** 返回一个新建的与给定的 ArrayBuffer 共享同一内存的 Buffer。
- **Buffer.from(buffer)：** 复制传入的 Buffer 实例的数据，并返回一个新的 Buffer 实例
- **Buffer.from(string[, encoding])：** 返回一个被 string 的值初始化的新的 Buffer 实例

```js
let buf1 = Buffer.alloc(10,'abc')
console.log('buffer实例为：',buf1.toString())

let buf2 = Buffer.from([1,1,1,143,23,34])
console.log('buffer实例为：',buf2.toString())
```

## 10.2 写入缓冲区

`buf.write(string[, offset[, length]][, encoding])`

参数描述如下：

- **string** - 写入缓冲区的字符串。
- **offset** - 缓冲区开始写入的索引值，默认为 0 。
- **length** - 写入的字节数，默认为 buffer.length
- **encoding** - 使用的编码。默认为 'utf8' 。

**返回值:**返回**实际写入的大小**。如果 buffer 空间不足， 则只会写入部分字符串。

```js
let buf3 = Buffer.alloc(256)
let len = buf3.write('www.baicu.com')
console.log('实际写入的字节数为:',len)
// 3
```

## 10.3 从缓冲区读取数据

`buf.toString([encoding[, start[, end]]])`

参数描述如下：

- **encoding** - 使用的编码。默认为 'utf8' 。
- **start** - 指定开始读取的索引位置，默认为 0。
- **end** - 结束位置，默认为缓冲区的末尾。

*返回值：解码缓冲区数据并使用指定的编码返回字符串。*

```js
let buf = buf3.toString('ascii',4)
console.log('从缓冲区读取到的数据为：',buf)
```

## 10.4 将buffer转换为JSON对象

`buf.toJSON()`

当字符串化一个 Buffer 实例时，[JSON.stringify()](https://www.runoob.com/js/javascript-json-stringify.html) 会隐式地调用该 **toJSON()**。

**返回值:**`*｛type: 'Buffer',data: [...]｝*`

```js
let bufJson = buf3.toJSON()
console.log('将buffer实例转换为json对象为:',bufJson)
```

## 10.5 缓冲区合并

`Buffer.concat(list[, totalLength])`

参数描述如下：

- **list** - 用于合并的 Buffer 对象数组列表。
- **totalLength** - 指定合并后Buffer对象的总长度。

**返回值：** 返回一个多个成员合并的新 Buffer 对象。

```js
let buf1 = Buffer.from('www.baidu.com ')
let buf2 = Buffer.from('www.taobao.com')
let buf3 = Buffer.concat([buf1,buf2])
console.log('合并后的Buffer为：',buf3.toString())
```

## 10.6 缓冲区比较

`buf.compare(otherBuffer);`

参数描述如下：

- **otherBuffer** - 与 **buf** 对象比较的另外一个 Buffer 对象。

**返回：**返回一个数字，表示 **buf** 在 **otherBuffer** 之前，之后或相同。

```js
var buffer1 = Buffer.from('ABC');
var buffer2 = Buffer.from('ABCD');
var result = buffer1.compare(buffer2);

if(result < 0) {
   console.log(buffer1 + " 在 " + buffer2 + "之前");
}else if(result == 0){
   console.log(buffer1 + " 与 " + buffer2 + "相同");
}else {
   console.log(buffer1 + " 在 " + buffer2 + "之后");
}
```

## 10.7 拷贝缓冲区

`buf.copy(targetBuffer[, targetStart[, sourceStart[, sourceEnd]]])`

参数描述如下：

- **targetBuffer** - 要拷贝的 Buffer 对象。
- **targetStart** - 数字, 可选, 默认: 0
- **sourceStart** - 数字, 可选, 默认: 0
- **sourceEnd** - 数字, 可选, 默认: buffer.length

```js
var buf1 = Buffer.from('abcdefghijkl');
var buf2 = Buffer.from('RUNOOB');
//将 buf2 插入到 buf1 指定位置上
buf2.copy(buf1, 2);
console.log(buf1.toString());
```

# 十一、全局对象

## 11.1 process

 process是一个全局变量，即 global 对象的属性。

**process全局变量的属性**

* process.execPath 可以返回当前Node应用程序执行的路径
* process.version 返回当前Node版本信息

* process.platform 返回当前Node服务平台信息
* process.pid  当前进程的进程号
* **process.stdout** 标准输出流
* process.stdin 标准输入流
* process.argv 属性返回一个数组，由命令行执行脚本时的各个参数组成。它的第一个成员总是node，第二个成员是脚本文件名，其余成员是脚本文件的参数。

**process全局变量的方法**

+ **process.exit** 当进程准备退出时触发。

```js
process.on('exit',(code) => {
    setTimeout(() => {
        console.log('测试该代码会不会执行')
    })

    console.log('退出码为',code)
})
console.log('程序执行结束')
```

+ **memoryUsage()**
  返回一个对象，描述了 Node 进程所用的内存状况，单位为字节。

+ **uptime()**  返回 Node 已经运行的秒数

+ **nextTick(callback)**  一旦当前事件循环结束，调用回调函数。

  使用场景：如果需要创建一个新的函数，该函数有一个回调函数作为其参数，期望该回调函数真正的被异步执行

+ **cwd()** 返回当前进程的工作目录

## 11.2 global

global 最根本的作用是作为全局变量的宿主。按照 ECMAScript 的定义，满足以下条 件的变量是全局变量：

- 在最外层定义的变量；
- 全局对象的属性；
- 隐式定义的变量（未定义直接赋值的变量）。
- Node.js 中的全局对象是 global，所有全局变量（除了 global 本身以外）都是 global 对象的属性。

## 11.3 buffer

buffer也属于全局对象，关于其介绍看第十章

# 十二、定时器

Node.js定时器模块提供了全局API，用于在以后的某个时间段调用函数。

所有的定时器函数都是全局的。不需要通过`require()`就可以访问。

+ ## setTimeout(callback, delay[, arg][, ...])

  需要注意，你的回调函数可能不会非常准确的在`delay`毫秒后执行，Node.js不保证回调函数的精确时间和执行顺序。回调函数会尽量的靠近指定的时间。

+ ## clearTimeout(timeoutObject)

  阻止一个timeout被触发。

  ## setInterval(callback, delay[, arg][, ...])

  每隔`delay`毫秒就重复执行`callback`。返回`timeoutObject`对象，可能会用来`clearTimeout()`。你也可以给回调函数传参数。

  ## clearInterval(intervalObject)

  阻止一个interval被触发。

  ## setImmediate(callback[, arg][, ...])

  在`setTimeout`和`setInterval`事件前，在输入/输出事件后，安排一个`callback`"immediate"立即执行。

  immediates的回调以它们创建的顺序加入队列。整个回调队列会在事件循环迭代中执行。如果你将immediates加入到一个正在执行回调中，那么将不会触发immediate，直到下次事件循环迭代。

  ## clearImmediate(immediateObject)

  用于停止一个immediate的触发。

# 十三、[EventEmitter](https://www.w3cschool.cn/nodejs/aue11itf.html#events_class_events_eventemitter)的实例

+ events 模块只提供了一个对象： events.EventEmitter。EventEmitter 的核心就是事件触发与事件监听器功能的封装。

+ 你可以通过require("events");来访问该模块。

+ EventEmitter 对象如果在实例化时发生错误，会触发 error 事件。当添加新的监听器时，newListener 事件会触发，当监听器被移除时，removeListener 事件被触发。

+ EventEmitter 的每个事件由一个事件名和若干个参数组成，事件名是一个字符串，通常表达一定的语义。对于每个事件，EventEmitter 支持 若干个事件监听器。

  当事件触发时，注册到这个事件的事件监听器被依次调用，事件参数作为回调函数参数传递。

  ```js
  let events = require('events')
  let emitter = new events.EventEmitter()
  emitter.on('event1',(arg1,arg2) => {
      console.log('监听器1',arg1,arg2)
  })
  emitter.on('event1',(arg1,arg2) => {
      console.log('监听器1',arg1,arg2)
  })
  emitter.emit('event1','arg1参数','arg2参数')
  ```

  **on** 函数用于绑定事件函数，**emit** 属性用于触发一个事件。

## 13.1 方法

+ **addListener(event, listener)**
  为指定事件添加一个监听器到监听器数组的尾部。

+ **on(event, listener)**
  为指定事件注册一个监听器，接受一个字符串 event 和一个回调函数。

  ```js
  server.on('connection', function (stream) {
    console.log('someone connected!');
  });
  ```

+ **once(event, listener)** 为指定事件注册一个单次监听器，即 监听器最多只会触发一次，触发后立刻解除该监听器。

  ```js
  server.once('connection', function (stream) {
    console.log('Ah, we have our first user!');
  });
  ```

+ **removeListener(event, listener)**

  移除指定事件的某个监听器，监听器必须是该事件已经注册过的监听器。

  它接受两个参数，第一个是事件名称，第二个是回调函数名称。

  ```js
  var callback = function(stream) {
    console.log('someone connected!');
  };
  server.on('connection', callback);
  // ...
  server.removeListener('connection', callback);
  ```

+ **removeAllListeners([event])**
  移除所有事件的所有监听器， 如果指定事件，则移除指定事件的所有监听器。

+ **setMaxListeners(n)**
  默认情况下， EventEmitters 如果你添加的监听器超过 10 个就会输出警告信息。 setMaxListeners 函数用于改变监听器的默认限制的数量。

+ **emit(event, [arg1], [arg2], [...])**
  按监听器的顺序执行执行每个监听器，如果事件有注册监听返回 true，否则返回 false。

+ 返回指定事件的监听器数量。

  `events.emitter.listenerCount(eventName) //推荐`

## 13.2 继承EventEmitter

大多数时候我们不会直接使用 EventEmitter，而是在对象中继承它。包括 fs、net、 http 在内的，只要是支持事件响应的核心模块都是 EventEmitter 的子类。

为什么要这样做呢？原因有两点：

首先，具有某个实体功能的对象实现事件符合语义， 事件的监听和发生应该是一个对象的方法。

其次 JavaScript 的对象机制是基于原型的，支持 部分多重继承，继承 EventEmitter 不会打乱对象原有的继承关系。

# 十四、流

Stream 有四种流类型：

- **Readable** - 可读操作。
- **Writable** - 可写操作。
- **Duplex** - 可读可写操作.
- **Transform** - 操作被写入数据，然后读出结果。

所有的 Stream 对象都是 EventEmitter 的实例。常用的事件有：

- **data** - 当有数据可读时触发。
- **end** - 没有更多的数据可读时触发。
- **error** - 在接收和写入过程中发生错误时触发。
- **finish** - 所有数据已被写入到底层系统时触发

## 14.1 从流中读取数据

```js
let fs = require('fs')

let data = ''

// 创建可读流
let readStream = fs.createReadStream('../resource/test.txt')
readStream.setEncoding('utf-8')
// 处理流事件 data\end\error
readStream.on('data',(chunk) => {
    console.log('chunk',chunk)
    data += chunk
})

readStream.on('end',() => {
    console.log('data: ',data)
})

readStream.on('error',err => {
    console.log('读取错误',err,err.stack)
})

console.log('程序执行完毕')
```

## 14.2 写入流

```js
let fs = require('fs')

let writeStream = fs.createWriteStream('../resource/output.txt')
let data = '创建写入流'

// 使用 utf8 编码写入数据
writeStream.write(data,'utf-8')

writeStream.on('finish',() => {
    console.log('写入完成')
})
writeStream.on('error',(err) => {
    console.log('写入错误',err)
})
console.log('程序执行完成')
```

## 14.3 管道流

**从一个流中读取数据并将数据传递到另外一个流中**

相当于把一个文件拷贝到另一个文件中

```js
let fs = require('fs')

// 创建可读流
let readStream = fs.createReadStream('../resource/test.txt')
// 创建一个可写流
let writeStream = fs.createWriteStream('../resource/pipe.txt')

// 管道流写操作
readStream.pipe(writeStream)

console.log('程序执行完毕')
```

## 14.4 链式流

链式是通过连接输出流到另外一个流并创建多个流操作链的机制。链式流一般用于管道操作。

接下来我们就是用管道和链式来压缩和解压文件。

```js
let fs = require('fs')
let zlib = require('zlib')
// 创建可读流
let readStream = fs.createReadStream('../resource/test.txt')
// 创建一个可写流
let writeStream = fs.createWriteStream('../resource/zlib.txt.gz')

// 压缩 test.txt 文件为 zlib.txt.gz
readStream.pipe(zlib.createGzip())
          .pipe(writeStream)

console.log('程序执行完毕')
```

**解压缩文件**

```js
// 解压缩程序
fs.createReadStream('../resource/zlib.txt.gz')
  .pipe(zlib.createGunzip())
  .pipe(fs.createWriteStream('../resource/zlib.txt'))
console.log('程序执行完毕')
```

# 十五、网络编程

## 15.1 TCP服务

+ 定义： 网络传输协议，在osi模型上由七层组成（物理层、链路层、网络层--IP、传输层--TCP/UDP、会话层、表示层、应用层--http）
+ 面向连接的协议，特点是在传输之前需要三次握手形成会话
+ 会话形成后，服务端和客户端之间才能互相发送数据，在创建会话的过程中服务端和客户端会分别提供一个套接字，通过套接字实现两者之间的连接操作

```js
let net = require('net')

let server = net.createServer()
server.on('connection',(socket) => {
    socket.on('data', function (data) { 
        socket.write('hello'); 
    })
    socket.on('end', function () { 
        console.log('接开'); 
    }); 
    socket.write("欢迎\n");
})

let app = server.listen(8080,'localhost',() => {
    let host = app.address().address
    let port = app.address().port
    console.log('server运行地址为: ',`http://${host}:${port}`)
})
```

## 15.2 TCP服务的事件

### 15.2.1 服务器事件

通过net.createServer()创建的服务器而言，是一个EventEmitter实例，自定义事件如下

+ listening
+ connection： 每个客户端套接字连接到服务器时触发
+ close： 服务器关闭时触发
+ error  服务器异常触发

### 15.2.2 连接事件

服务器可以同时和多个客户端保持连接，对于每个连接而言属于典型的可读可写Stream对象。Stream对象可以用于客户端和服务端之间的通信，可以通过data事件从一端读取另一端发来的数据，也可以通过write事件从一端向另一端发送数据

**自定义事件**

+ data 一端用write发送数据时另一端会触发data事件
+ end 当连接端中的任意一端发送了FIN数据时触发
+ drain 当连接端中的任意一端用write发送时触发
+ timeout  一段时间活跃时触发

**由于TCP是可读写的Stream对象，可以通过pipe管道流方法巧妙实现管道操作**



# nodeJs基础面试题

## (1) 你对node的了解

Node. js是一个基于 Chrome v8引擎的服务器端 JavaScript运行环境；Node. js是一个事件驱动、非阻塞式I/O的模型，轻量而又高效；Node. js的包管理器npm是全球最大的开源库生态系统。

**注意：事件驱动、非阻塞I/O的概念需要清楚理解**

## (2) process有哪些常用方法

## (3) node.js中事件循环是什么样的

事件循环其实就是一个事件队列，先加入先执行，执行完一次队列，再次循环遍历看有没有新事件加入队列。

执行中的事件叫IO事件， setlmmediate在当前队列中立即执行，setTimout/setInterval把执行定时到下一个队列， process. nextTick在当前队列执行完，下次遍历前执行。所以总体顺序是：IO事件→ setImmediate→ setTimeout/setInterval→ process. nextTick。

## (4) node中定时功能的函数

setTimeout/clearTimeout, setInterval/clearInterval、 setImmediate/clearImmediate、 process. nextTick

## (5) **Node. js中的 Buffer？**

buffer是用来处理二进制数据的，例如（图片、文件、MP3等），支持各种编码解码、二进制字符串互转

## (6) node中的异步和同步

Node.js是单线程的，异步是通过一次次的循环事件队列来实现的。同步则是阻塞式的IO，这在高并发环境中会是一个很大的性能问题，所以同步一般只在基础框架启动时使用，用来加载配置文件、初始化程序等。

## (7) 单线程与多线程

### 7.1 进程

一个程序开始运行时它就属于一个进程，进程包括运行中的程序和程序所使用到内存和系统资源，一个进程由多个线程组成

### 7.2 线程

线程是程序中的一个执行流，每个线程都有自己的专有寄存器，但代码区是共享的

### 7.3 多线程

[多线程](https://so.csdn.net/so/search?q=多线程&spm=1001.2101.3001.7020)是指程序中包含多个执行流，即在一个程序中可以同时运行多个不同的线程来执行不同的任务，也就是说允许单个程序创建多个并行执行的线程来完成各自的任务。

**好处：**可以提高CPU的利用率。在多线程程序中，一个线程必须等待的时候，CPU可以运行其它的线程而不是等待，这样就大大提高了程序的效率。

**缺点：**线程也是程序，所以线程需要占用内存，线程越多占用内存也越多;多线程需要协调和管理，所以需要CPU时间跟踪线程;线程之间对共享资源的访问会相互影响，必须解决竞用共享资源的问题;

## (8) npm的作用、好处

npm是 Node. js中管理和分发包的工具，可用于安装、卸载、发布、查看包等。

**好处：** 以安装和管理项目的依赖，还可以指明依赖项的具体版本号。

**作用：**

（1）允许用户从npm服务器下载别人编写的第三方包到本地。

（2）允许用户从npm服务器下载并安装别人编写的命令行程序到本地。

（3）允许用户将自己编写的包或命令行程序上传到npm服务器供别人使用。

## (9) node 还需要了解的

+ **精通 Express/Koa/Nest.js 框架或其他语言流行框架**
+ 熟练使用 MongoDB/Redis/MySQL 数据库；
+ **流、express框架、EventEmitter**

## (10) node有哪些全局对象

global、 process, console、 module和 exports。

