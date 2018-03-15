const db = require('../db');
const apiResult = require('../utils/apiResult.js')
module.exports = {
    register(app){
        app.get('/products', (req, res) => {
            let itemid = req.query.itemid;
            let params = JSON.parse(req.query.pg);
            db.mongodb.select('item').then((result) => {
                let datacounts  = result.length;
                let page = params.page*1;
                let limit = params.limit*1;
                console.log(page,limit)
                let realdata = result.slice((page-1)*limit,limit*page);
                if(result && result.length){
                    res.send(apiResult(true,realdata,datacounts))
                }else{
                    res.send(apiResult(false))
                }
            })
        })

        app.post('/productsupdate', (req, res) => {
            let newvalue =req.body;
            let objid = db.mongodb.objectid(newvalue._id);        
            let{itemid,itemName,status,price}=newvalue;
            db.mongodb.update("item",{_id:objid},{itemid,itemName,status,price}).then( (result) => {
                if(result){
                    res.send(apiResult(true));
                }else{
                    res.send(apiResult(false))
                }
            })
        }),
        app.post('/productsadd',(req,res) => {
            let newvalue = req.body;
            db.mongodb.insert("item",newvalue).then( (result) =>{
                if(result && result.ops.length){
                    res.send(apiResult(true));
                }else{
                    res.send(apiResult(false));
                }
            })
        })

        app.post('/productsdel', (req, res) => {
            let id  = req.body.id;
            let oid = db.mongodb.objectid(id);
            db.mongodb.delete('item',{"_id":oid}).then((result) =>{
                res.send({status: true, data: result});
            })
        })
    }
}