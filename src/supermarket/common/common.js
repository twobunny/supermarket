var state={
    lanType:'en',
    //  请求的统一api地址
     baseurl:'http://localhost:8081',
    // baseurl:"http://10.3.136.191:8081",
    whid:"wh001"   
}
var mutations ={
    creatTrans(http,params){
        var url = state.baseurl+"/addTrans";
        http.post(url,params).then(function(result){
            console.log(result)
        })
    }
}

var actions = {};

export default {
    state,
    mutations,
    actions
}