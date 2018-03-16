const db = require("../db");
// itemtransid type  itemid  direction   qty amount whid reckid
module.exports = function(_type,_itemid,_dir,_qty,_amount,_whid,_reckid){
    var str="1234567890abcdefghijklmnopqrstuvwxyz";
    let itemtransid="";
    for(var i= 0; i<8;i++){
        itemtransid += str[parseInt(Math.random()*37)];
    }
    db.mongodb.insert("itemtrans",{itemtransid,type:_type,itemid:_itemid,direction:_dir,qty:_qty,amount:_amount,whid:_whid,reckid:_reckid}).then((result) =>{console.log(result)})
}