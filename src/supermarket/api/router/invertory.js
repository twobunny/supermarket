const db = require("../db");
const apiResult = require("../utils/apiResult");

module.exports = {
    register(app){
        app.get("/invertory",(req,res) => {
            let itemid = req.query.itemid;
            let whid = req.query.whid;
            let obj = itemid?{itemid}:{};
            whid? obj['whid']=whid:obj;
            let params = JSON.parse(req.query.pg);
            db.mongodb.select("invertory",obj).then( (result) => {
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
        app.post("/changeinvertory",(req,res) => {
            let from = req.body.from;
            let to = req.body.to;
            let data = JSON.parse(req.body.data);
            data.forEach(function(item){
                //新增记录到调货记录
                db.mongodb.insert('transfer',{outhouse:from,inhouse:to,itemid:item.itemid,itemname:item.itemname,outqty:item.outqty}).then((result) => {
                    if(result && result.ops.length){}else{
                        res.send(apiResult(false));
                    }
                })
                //修改对应库存，item.outqty调出数量
                db.mongodb.select("invertory",{itemid:item.itemid,whid:from}).then( (fromres) =>{
                    if(fromres && fromres.length>0){
                        if(fromres[0].qty-item.outqty<0){
                            res.send(apiResult(false,"","剩余库存不足"));
                        } 
                        else {
                            db.mongodb.update("invertory",{itemid:item.itemid,whid:from},{qty:(fromres[0].qty-item.outqty)}).then((result) => {
                                db.mongodb.select("invertory",{itemid:item.itemid,whid:to}).then((tores) => {
                                    if(tores && tores.length>0){
                                        db.mongodb.update("invertory",{itemid:item.itemid,whid:to},{qty:tores[0].qty+item.outqty}).then( (result) => {
                                            res.send(apiResult(true));
                                        })
                                    }else{
                                        let obj = {};
                                        obj.itemid = item.itemid;
                                        obj.itemname = item.itemname;
                                        obj.whid = to;
                                        obj.qty = item.outqty;
                                        obj.price = item.price;
                                        db.mongodb.insert("invertory",obj).then((result) => {
                                            console.log('result:'+result)

                                            if(result && result.ops.length)
                                            res.send(apiResult(true));
                                        })
                                    }
                                })
                            })
                        }
                    }else {
                        res.send(apiResult(false));
                    }
                })
            })
        })
    }
}