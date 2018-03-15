const db = require("../db")
const apiResult = require("../utils/apiResult.js")
const jwt = require("jsonwebtoken")
module.exports = {
    register(app){
        app.get("/login",(req,res)=>{
            let username = req.query.username;
            let password = req.query.password;
            db.mongodb.select("users",{username,password}).then( (result)=>{
                var user = {username};
                 var token = jwt.sign(user, 'secret', {
                 'expiresIn': 1440 // 设置过期时间
                })   
                if(result && result.length >0){
                    res.send(apiResult(true,result,token))
                }else{
                    res.send(apiResult(false));
                }
            })
        }),
        app.get('/users',(req,res) => {
            let params = JSON.parse(req.query.pg);
            db.mongodb.select("users").then( (result)=>{
                let datacounts  = result.length;
                let page = params.page*1;
                let limit = params.limit*1;
                let realdata = result.slice((page-1)*limit,limit*page);
                if(result && result.length){
                    res.send(apiResult(true,realdata,datacounts))
                }else{
                    res.send(apiResult(false))
                }
            })
        }),
        app.post('/usersupdate', (req, res) => {
            let newvalue =req.body;
            let objid = db.mongodb.objectid(newvalue._id);        
            delete newvalue._id;
            db.mongodb.update("users",{_id:objid},newvalue).then( (result) => {
                if(result){
                    res.send(apiResult(true));
                }else{
                    res.send(apiResult(false))
                }
            })
        }),
        app.post('/usersadd',(req,res) => {
            let newvalue = req.body;
            db.mongodb.insert("users",newvalue).then( (result) =>{
                if(result && result.ops.length){
                    res.send(apiResult(true));
                }else{
                    res.send(apiResult(false));
                }
            })
        })

        app.post('/usersdel', (req, res) => {
            let id  = req.body.id;
            let oid = db.mongodb.objectid(id);
            db.mongodb.delete('users',{"_id":oid}).then((result) =>{
                res.send({status: true, data: result});
            })
        })
    }
}