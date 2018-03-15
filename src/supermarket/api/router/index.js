const express = require('express');
const app = express();
const bp = require('body-parser');
const path = require("path");
const products = require('./products');

const supplier = require("./supplier")
const itemtrans = require("./trans")
const invertory = require("./invertory")
const transfer = require("./transfer")
const product = require("./products")
const warehouse = require("./warehouse")
const purchase = require("./purchase")
const cashier = require("./cashier")
const member = require("./member")
const login = require("./login")
const filter = require("../utils/filter.js")

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    if(req.method=="OPTIONS") {
      res.send(200);/*让options请求快速返回*/
    } else{
      next();
    }
});
app.use(filter);

app.use(bp.urlencoded({extended: false}));

module.exports = {
    start(_port){
        products.register(app);
        warehouse.register(app)
        supplier.register(app);
        itemtrans.register(app);
        invertory.register(app);
        warehouse.register(app);
        transfer.register(app);
        product.register(app);
        purchase.register(app);
        cashier.register(app);
        login.register(app);
        member.register(app);
        app.listen(_port||8081);

    }
}