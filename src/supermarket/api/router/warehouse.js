
const db = require('../db')
const apiResult = require('../utils/apiResult')

module.exports = {
    register:(app)=>{
        app.get('/warehouse',(req,res)=>{

            let params = req.query;
            
            console.log(params)

            db.mongodb.select('warehouse').then((result)=>{
                console.log(result)
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
        app.post('/warehouse',(req,res)=>{
           let pros = req.body;
           db.mongodb.insert('warehouse',pros).then((result) => {
                
                if(result.ops && result.ops.length){
                    res.send(apiResult(true,result))
                }else{
                    res.send(apiResult(false))
                }
            })
        })
    }
}
