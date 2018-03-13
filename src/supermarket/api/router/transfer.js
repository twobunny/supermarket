const db = require("../db");
const apiResult = require("../utils/apiResult");

module.exports = {
    register(app){
        app.get("/gettransfer",(req,res) => {
            let params = req.query;
            db.mongodb.select("transfer").then((result) => {
                if(result && result.length>0){
                    res.send(apiResult(true,result));
                }else{
                    res.send(apiResult(false));
                }
            })
        })
    }
}