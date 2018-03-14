const db = require("../db");
const apiResult = require("../utils/apiResult");
module.exports = {
    register:function(app){
        app.get("/gettrans",(req,res) => {
           db.mongodb.select("itemtrans").then( (result) => {
                if(result && result.length>0){
                    res.send(apiResult(true,result))
                }else{
                    res.send(apiResult(false))
                }
            })
        }),
        app.post("/addtrans",(req,res) => {
            
        })
    }
}