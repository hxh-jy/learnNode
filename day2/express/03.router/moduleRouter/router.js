let express = require('express')

// 创建路由对象
let router = express.Router()

// 向路由对象上挂载具体的路由
router.get('/',(req,res) => {
    res.send('模块路由的首页')
})

router.get('/post',(req,res) => {
    res.send('模块路由--post请求')
})

// 向外共享路由对象
module.exports = router
