const db = require('../db');
const apiResult = require('../utils/apiResult.js')
module.exports = {
    register(app){
        app.get('/products', (req, res) => {
            let itemid = req.query.itemid;
            db.mongodb.select('item').then((result) => {
                if(result && result.length > 0){
                    res.send(apiResult(true, result))
                } else {
                    res.send(apiResult(false));
                }
            })
        })

       
        app.post('/delproduct', (req, res) => {
            let id  = req.body.id;
            let oid = db.mongodb.objectid(id);
            db.mongodb.delete('item',{"_id":oid}).then((result) =>{
                res.send({status: true, data: result});
            })
        })
    }
}