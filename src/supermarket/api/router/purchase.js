const db = require("../db");
const apiResult = require("../utils/apiResult");
const addtrans = require("./addtrans")
module.exports = {
    register(app){
        app.post("/purchase",(req,res) => {
            let whid = req.body.whid;
            let items =JSON.parse(req.body.data);
            items.forEach(function(item){
                db.mongodb.select("invertory",{itemid:item.itemid,whid:whid}).then( (oldres) => {
                    if(oldres && oldres.length>0){
                         db.mongodb.update("invertory",{itemid:item.itemid,whid:whid},{qty:item.outqty*1+oldres[0].qty*1}).then( (newres) =>{
                            if(newres){
                                        
                                res.send(apiResult(true));
                            }else{
                                res.send(apiResult(false,"","修改失败，请联系系统管理员"))
                            }
                         })
                     } else {
                        console.log(item);
                        let itemid = item.itemid;
                        let itemname = item.itemname;
                        let qty = item.outqty;
                        let price = item.price/item.outqty;
                        db.mongodb.insert("invertory",{itemid,itemname,whid,qty,price}).then( (newres) => {
                            if(newres && newres.ops.length){
                                res.send(apiResult(true));
                            }else{
                                res.send(apiResult(false,"","修改失败，请联系系统管理员"));
                            }
                        })
                     }
                     //记录流水
                    addtrans("采购",item.itemid,"入库",item.outqty,item.price,whid,"purchase");
                })
            })
        })
    }
}