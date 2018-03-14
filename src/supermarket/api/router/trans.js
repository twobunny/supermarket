const db = require("../db");
const apiResult = require("../utils/apiResult");
module.exports = {
    register:function(app){
        app.get("/gettrans",(req,res) => {
            let params = JSON.parse(req.query.pg);
            db.mongodb.select("itemtrans").then( (result) => {
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
        app.post("/gettrans",(req,res) => {
            let pros = req.body;
            db.mongodb.insert('itemtrans',pros).then((result) => {
                if(result.ops && result.ops.length){
                    res.send(apiResult(true,result.ops))
                }else{
                    res.send(apiResult(false))
                }
            })
        })
    }
}