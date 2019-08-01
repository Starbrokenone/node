const bcrypt = require('bcryptjs')
const {sequelize} = require('../../core/db')
const {Sequelize,Model} = require('sequelize')

class User extends Model{
    static async verifyEmailPassword(email, plainPassword) {
        const user = await User.findOne({
            where: {
                email
            }
        })
        if (!user) {
            throw new global.errs.AuthFailed('账号不存在')
        }
        // user.password === plainPassword
        const correct = bcrypt.compareSync(
            plainPassword, user.password)
        if(!correct){
            throw new global.errs.AuthFailed('密码不正确')
        }
        return user
    } 
}

User.init({//对应mysql的类型
    id:{
        //并发，1000 注册
        //曝露 用户编号 1，2，3，4，5
        //即使别人知道用户编号，也无法做坏事
        //接口保护 权限 反问接口
        type:Sequelize.INTEGER,
        primaryKey:true, //主键
        autoIncrement:true
    },
    nickname:Sequelize.STRING,
    email:{
        type:Sequelize.STRING(128),
        unique:true
    },
    password:{
        type:Sequelize.STRING,
        set(val){
            console.log(val)
            const salt = bcrypt.genSaltSync(10)//10指计算机生成盐花费的成本
            const psw = bcrypt.hashSync(val,salt)
            console.log(psw)
            this.setDataValue('password', psw)
        }
    },
    openid:{
        type:Sequelize.STRING(64),
        unique:true
    }
    //一个用户对一个微信小程序有一个openid，即你换了一个小程序，你的openid是会改变的
    //你对于所有的小程序、公众号都有一个唯一的标识：unionID
},{
    sequelize,
    tableName:'user'
})

module.exports = {
    User
}

//数据迁移 SQL 更新 风险