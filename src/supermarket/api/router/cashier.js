const db = require("../db");
const apiResult = require("../utils/apiResult");

module.exports = {
    register(app){
        app.post("/cashier",(req,res) => {
            let whid = req.body.whid;
            let items =JSON.parse(req.body.data);
            items.forEach(function(item){
                db.mongodb.select("invertory",{itemid:item.itemid,whid:whid}).then( (oldres) => {
                    if(oldres && oldres.length>0){
                        if(oldres[0].qty-item.outqty<0){
                            res.send(apiResult(false,"","库存不足，不能销售"))
                        }else{
                            db.mongodb.update("invertory",{itemid:item.itemid,whid:whid},{qty:oldres[0].qty-item.outqty}).then( (newres) =>{
                                if(newres){
                                    res.send(apiResult(true));
                                }else{
                                    res.send(apiResult(false,"","修改失败，请联系系统管理员"))
                                }
                             })
                        }
                         
                     } else {
                        res.send(apiResult(false,"","该商品不存在"))
                     }
                   
                })
            })
        })
    }
}