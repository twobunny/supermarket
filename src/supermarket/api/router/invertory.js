const db = require("../db");
const apiResult = require("../utils/apiResult");

module.exports = {
    register(app){
        app.get("/invertory",(req,res) => {
            let itemid = req.query.itemid;
            let whid = req.query.whid;
            db.mongodb.select("invertory",{itemid,whid}).then( (result) => {
                if(result && result.length>0){
                    res.send(apiResult(true,result));
                }else{
                    res.send(apiResult(false));
                }
            })
        }),
        app.post("/addinvertory",(req,res) => {
            let params = req.body;
            console.log(params);
        })
    }
}