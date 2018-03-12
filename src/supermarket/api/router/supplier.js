const db = require("../db");
const apiResult = require("../utils/apiResult");

module.exports = {
    register(app){
        app.get("/getsupplier", (req,res) => {
            let query = req.query;
            db.mongodb.select("supplier").then( (result) => {
                if(result && result.length>0){
                    res.send(apiResult(true,result))
                }else{
                    res.send(apiResult(false))
                }
            })
        })
    }
}