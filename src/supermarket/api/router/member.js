const db = require ("../db");
const apiResult = require ("../utils/apiResult.js");
const filter = require("../utils/filter.js");
module.exports = {
    register(app){
        app.get("/member",(req,res)=>{
            let params = JSON.parse(req.query.pg);
            db.mongodb.select("member").then( (result)=>{
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
        app.post('/memberupdate', (req, res) => {
            let newvalue =req.body;
            let objid = db.mongodb.objectid(newvalue._id);        
            delete newvalue._id;
            db.mongodb.update("member",{_id:objid},newvalue).then( (result) => {
                if(result){
                    res.send(apiResult(true));
                }else{
                    res.send(apiResult(false))
                }
            })
        }),
        app.post('/memberadd',(req,res) => {
            let newvalue = req.body;
            db.mongodb.insert("member",newvalue).then( (result) =>{
                if(result && result.ops.length){
                    res.send(apiResult(true));
                }else{
                    res.send(apiResult(false));
                }
            })
        })

        app.post('/memberdel', (req, res) => {
            let id  = req.body.id;
            let oid = db.mongodb.objectid(id);
            db.mongodb.delete('member',{"_id":oid}).then((result) =>{
                res.send({status: true, data: result});
            })
        })
    }
}