/* 
* @Author: Marte
* @Date:   2018-03-12 10:07:52
* @Last Modified by:   Marte
* @Last Modified time: 2018-03-13 12:02:08
*/


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
                    console.log(66)
                    res.send(apiResult(true,result))
                }else{
                    console.log(99)

                    res.send(apiResult(false))
                }
            })
        })
    }
}