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
        })
    }
}
