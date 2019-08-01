const Router = require('koa-router')//koa-router文档：koa-router npm
const {PositiveIntegerValidator} = require('../../validator/validator')

const router = new Router()
//const {HttpException,ParameterException} = require('../../../core/http-exception')
router.post('/v1/:id/classic/latest',(ctx,next)=>{
    const path = ctx.params
    const query = ctx.request.query
    const headers = ctx.request.header
    const body = ctx.request.body

    const v = new PositiveIntegerValidator().validate(ctx)
    
    
    

})

module.exports = router