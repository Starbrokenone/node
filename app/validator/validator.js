const {LinValidator,Rule} = require('../../core/lin-validator')

class PositiveIntegerValidator extends LinValidator{
    constructor(){
        super()
        this.id = [//校验规则 且
            new Rule('isInt','需要是正整数',{min:1}),
        ]
    }
}

class RegisterValidator extends LinValidator{
    constructor(){
        super()
        this.email = [
            new Rule('isEmail','不符合email规范')
        ]
        this.passworld1 = [
            //
            new Rule('isLength','密码至少6个字符，最多32个字符',{
                min:6,
                max:32
            }),
            new Rule('matches','密码不符合规范','^(?![0-9]+$)(?![a-zA-Z+$])[0-9A-Za-z]')
        ]
        this.passworld2 = this.passworld1
        this.nickname = [
            new Rule('isLength','昵称不符合长度规范',{
                min:4,
                max:32
            }),
        ]
    }
    validatePassword(vals){
        const psw1 = vals.body.passworld1
        const psw2 = vals.body.passworld2
        if(psw1 !== psw2){
            throw new Error('两个密码必须相同') 
        }
    }
}

class TokenValidator extends LinValidator {
    constructor() {
        //隐藏的错误
        // Java
        // JS Python 
        super()
        this.account = [
            new Rule('isLength', '不符合账号规则', {
                min: 4,
                max: 32
            })
        ]
        this.secret = [
            //    validator.js
            new Rule('isOptional'),
            new Rule('isLength', '至少6个字符', {
                min: 6,
                max: 128
            })
        ]

    }

    validateLoginType(vals) {
        if (!vals.body.type) {
            throw new Error('type是必须参数')
        }
        if (!LoginType.isThisType(vals.body.type)) {
            throw new Error('type参数不合法')
        }
    }
}

module.exports = {
    PositiveIntegerValidator,
    RegisterValidator,
    TokenValidator
}
