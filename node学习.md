# 一、node基础

Node.js 可以解析JS代码（没有浏览器安全级别的限制）提供很多系统级别的API，如：

- 文件的读写 (File System)
- 进程的管理 (Process)
- 网络通信 (HTTP/HTTPS)

# 二、fs模块

## 2.1 fs.readFile()

+ 引用

  `const fs = require('fs') `

+ *options 代表编码格式读取*  fs.readFile(path,[,options],callback)

  ```js
  // 示例 读取成功 err=null 读取失败 data=undefined
  fs.readFile('./files/11.text','utf8',function(err,data){
      if(err){
          return console.log('读取失败'+err)
      }
      console.log(data)
  })
  ```

## 2.2 fs.writeFile()

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

