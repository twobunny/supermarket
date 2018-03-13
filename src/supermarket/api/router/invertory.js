const db = require("../db");
const apiResult = require("../utils/apiResult");

module.exports = {
    register(app){
        app.get("/invertory",(req,res) => {
            let itemid = req.query.itemid;
            let whid = req.query.whid;
            let obj = itemid?{itemid}:{};
            whid? obj['whid']=whid:obj;
            db.mongodb.select("invertory",obj).then( (result) => {
                if(result && result.length>0){
                    res.send(apiResult(true,result));
                }else{
                    res.send(apiResult(false));
                }
            })
        }),
        app.post("/addinvertory",(req,res) => {
            let params = req.body;
            console.log(req.body)
        })
    }
}