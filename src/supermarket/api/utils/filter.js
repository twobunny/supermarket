const apiResult = require('./apiResult')
const jwt = require('jsonwebtoken')//引入模板
const url = require ("url");
module.exports = function(req, res, next){

    let token = req.headers['authorization'];//获取请求头里的token
    
    var pathname = url.parse(req.url,true).pathname;
    console.log(pathname)
    if (pathname !="/login"){
        if(token){
            jwt.verify(token, 'secret', (error, result) => {//传送验证token，第二个参数是密钥，它与我们一开始生成token的密钥一致，如果成功执行回掉函数

                if(error){//如果没有error则执行下一步
                    console.log("there is an error");
                    res.send(apiResult(false, null, null, 'unauthorized'))
                }else {
                    next();
                }
            })
        }else {   
            console.log("token不存在");
            res.send(apiResult(false, null, null, 'unauthorized'))
        }
    }else{
        next();
    }
   

    /*if(token){
        jwt.verify(token, 'secret', (error, result) => {//传送验证token，第二个参数是密钥，它与我们一开始生成token的密钥一致，如果成功执行回掉函数

            if(error){//如果没有error则执行下一步
                console.log("there is an error");
                res.send(apiResult(false, null, null, 'unauthorized'))
            }else {
                next();
            }
        })
    }else {   
        console.log("token不存在");
        res.send(apiResult(false, null, null, 'unauthorized'))
    }*/   

    

}
