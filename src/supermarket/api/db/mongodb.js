const mongo = require('mongodb');
const client = mongo.MongoClient;
const ObjectID = mongo.ObjectID;
let db;

client.connect('mongodb://127.0.0.1:27017', (_error, _db) => {
    if(_error){
        console.error(_error);
        return false;
    }
    db = _db.db('supermarket');
})

module.exports = {
    select: (_collection, _condition) => {
        if(db){
            return new Promise((resolve, reject) => {
                db.collection(_collection).find(_condition || {}).toArray((_error, _data) => {
                    if(_error){
                        reject(_error)
                    } else {
                        resolve(_data);
                    }
                })
            })
            
        }
    },
    update: (_collection,_condition,newdefine) =>{
        return new Promise((resolve, reject) =>{
            db.collection(_collection).update(_condition,{$set:newdefine}).then((result,error) =>{
                resolve(result);
            })
        })
    },
    insert: (_collection, _data) => {
        return new Promise((resolve, reject) => {
            db.collection(_collection).insert(_data).then((result, error) => {
                resolve(result);
            })
        })
    },
    delete: (_collection, _condition) => {
        return new Promise((resolve, reject) => {
            db.collection(_collection).remove(_condition).then((result, error) => {
                resolve(result);
            })
        })
    },
    objectid: (_id) => {
        return _id ? new ObjectID(_id) : new ObjectID();
    }
}