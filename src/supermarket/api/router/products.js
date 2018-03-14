const db = require('../db');
const apiResult = require('../utils/apiResult.js')
module.exports = {
    register(app){
        app.get('/products', (req, res) => {
            db.mongodb.select('item').then((result) => {
                if(result && result.length > 0){
                    res.send(apiResult(true, result))
                } else {
                    res.send(apiResult(false));
                }
            })
        })

        app.post('/addproduct',(req,res) => {
            let itemNum = req.body.itemNum;
            let itemName = req.body.itemName;
            let price = req.body.price;
            let status = req.body.status;
            db.mongodb.insert('item',{itemNum, itemName, price, status}).then((result) => {
                res.send({status: true, data: result});
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