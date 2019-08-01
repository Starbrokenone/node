const Koa = require('koa')
const parser = require('koa-bodyparser')
const Initmanager = require('./core/init')
const catchError = require('./middlewares/exception')

require('./app/models/user')

const app = new Koa() 

app.use(catchError)
app.use(parser()) //获取body参数需要的库
Initmanager.initCore(app)

app.listen(3000)//端口号