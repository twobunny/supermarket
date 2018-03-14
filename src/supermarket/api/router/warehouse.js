

const db = require('../db')
const apiResult = require('../utils/apiResult')

module.exports = {
    register:(app)=>{
        app.get('/warehouse',(req,res)=>{
            db.mongodb.select('warehouse').then((result)=>{

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
                    res.send(apiResult(true,result))
                }else{
                    res.send(apiResult(false))
                }
            })
        })
    }
}
