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
        app.get('/getwarehouse',(req,res) => {
            db.mongodb.select('warehouse').then( (result) => {
                if(result && result.length){
                    res.send(apiResult(true,result))
                }else{
                    res.send(apiResult(false))
                }
            })
        }),
        app.post('/warehouse',(req,res)=>{
           let pros = req.body;
           db.mongodb.insert('warehouse',pros).then((result) => {
                if(result.ops && result.ops.length){
                    res.send(apiResult(true,result.ops))
                }else{
                    res.send(apiResult(false))
                }
            })
        })
    }
}
