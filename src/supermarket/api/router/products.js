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
                let realdata = result.slice((page-1)*limit,limit*page);
                if(result && result.length){
                    res.send(apiResult(true,realdata,datacounts))
                }else{
                    res.send(apiResult(false))
                }
            })
        }),
        app.get('/getproduct', (req, res) => {
            let params = req.query.params;
            let itemid = JSON.parse(params).itemid;
            db.mongodb.select('item',{itemid}).then((result) => {
                    console.log(result)
                if(result && result.length>0){
                    res.send(apiResult(true,result))
                }else{
                    res.send(apiResult(false))
                }
            })
        }),

        app.post('/productsupdate', (req, res) => {
            let newvalue =req.body;
            let objid = db.mongodb.objectid(newvalue._id);        
            delete newvalue._id;
            db.mongodb.update("item",{_id:objid},newvalue).then( (result) => {
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