const db = require('../db')
const apiResult = require('../utils/apiResult')

module.exports = {
    register:(app)=>{
        app.get('/warehouse',(req,res)=>{

            let params = JSON.parse(req.query.pg);
            db.mongodb.select('warehouse').then((result)=>{
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
        app.post('/warehouseupdate', (req, res) => {
            let newvalue =req.body;
            let objid = db.mongodb.objectid(newvalue._id);        
            delete newvalue._id;
            console.log(newvalue)
            db.mongodb.update("warehouse",{_id:objid},newvalue).then( (result) => {
                if(result){
                    res.send(apiResult(true));
                }else{
                    res.send(apiResult(false))
                }
            })
        }),
        app.get('/getwarehouse',(req,res) => {
            db.mongodb.select('warehouse').then( (result) => {
                if(result && result.length){
                    res.send(apiResult(true,result))
                }else{
                    res.send(apiResult(false))
                }
            })
        }),
        app.post('/warehouseadd',(req,res)=>{
           let pros = req.body;
           db.mongodb.insert('warehouse',pros).then((result) => {
                if(result.ops && result.ops.length){
                    res.send(apiResult(true,result.ops))
                }else{
                    res.send(apiResult(false))
                }
            })
        }),
        app.post('/warehousedel', (req, res) => {
            let id  = req.body.id;
            let oid = db.mongodb.objectid(id);
            db.mongodb.delete('warehouse',{"_id":oid}).then((result) =>{
                res.send({status: true, data: result});
            })
        })

        app.post('/warehousesearch', (req, res) => {

            let params = req.body.pro;
            console.log(params)

            db.mongodb.select('warehouse',{params}).then((result)=>{
                console.log(result)
            })

        })
    }
}
