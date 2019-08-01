//全局异常处理 监听任何异常

function func1(){
    func2()
}

async function func2(){
    try {
        await func3()
    } catch (error) {
        //throw error
        console.log('error')    }
}

async function func3(){
    return new Promise((resolve,reject)=>{//对，错
        setTimeout(function(){
            const r = Math.random()
            if(r<0.5){
                reject('error')
            }
        });
    })
    /* setTimeout(function(){
        throw new Error('error')
    },1000) */
    //必须返回的是异步函数的promise包装
}
func1()
