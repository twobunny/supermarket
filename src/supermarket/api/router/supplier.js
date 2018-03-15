
const db = require("../db");

const apiResult = require("../utils/apiResult");
module.exports = {
    register(app){
        app.get("/supplier", (req,res) => {
            
            let params = JSON.parse(req.query.pg);

            db.mongodb.select("supplier").then( (result) => {
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
        app.post('/supplieradd',(req,res)=>{
           let pros = req.body;
           db.mongodb.insert('supplier',pros).then((result) => {
            
                if(result.ops && result.ops.length){
                    res.send(apiResult(true,result))
                }else{
                    res.send(apiResult(false))
                }
            })
        })
        app.post('/supplierupdate', (req, res) => {
            let newvalue =req.body;
            let objid = db.mongodb.objectid(newvalue._id);        
            delete newvalue._id;
            db.mongodb.update("supplier",{_id:objid},newvalue).then( (result) => {
                if(result){
                    res.send(apiResult(true));
                }else{
                    res.send(apiResult(false))
                }
            })
        }),

        app.post('/supplierdel', (req, res) => {
            let id  = req.body.id;
            let oid = db.mongodb.objectid(id);
            db.mongodb.delete('supplier',{"_id":oid}).then((result) =>{
                res.send({status: true, data: result});
            })
        })
    }
}
