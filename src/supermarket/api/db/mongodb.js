const mongo = require("mongodb").MongoClient;

let db;
mongo.connect('mongodb://localhost:27017',(err,_db) => {
    if(err){
        res.send("");
    }
    db=_db.db('test');
})
module.exports = {
    select:(_collection,_condition) => {
        return new Promise((resolve,reject)=>{
            db.collection(_collection).find(_condition || {}).toArray((err,result) => {
                resolve(result);
            })
        })
    },
    insert:(_collection,_condition) => {
        return new Promise((resolve,reject) => {
            db.collection(_collection).insert(_condition).then((result,err) => {
                resolve(result);
            })
        })
    },
    update:(_collection,_condition,_update) => {
        return new Promise((resolve,reject) => {
            db.collection(_collection).update(_condition,{$set:_update}).then((result,err) => {
                resolve(result);
            })
        })
    },
}