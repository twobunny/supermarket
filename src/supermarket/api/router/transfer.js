const db = require("../db");
const apiResult = require("../utils/apiResult");

module.exports = {
    register(app){
        app.get("/gettransfer",(req,res) => {
          
            let params = JSON.parse(req.query.pg);

            db.mongodb.select("transfer").then((result) => {
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
        })
    }
}