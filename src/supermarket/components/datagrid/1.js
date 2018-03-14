/* 
* @Author: Marte
* @Date:   2018-03-13 15:11:41
* @Last Modified by:   Marte
* @Last Modified time: 2018-03-14 11:57:31
*/

$(document).ready(function(){
    
});

 computed:{
            page:{
                get:function(){
                    console.log('get',this.pageindex)
                    http.get(this.config.api,{params:{page:this.pageindex,limit:this.config.params.limit}}).then((res) => {
                        this.dataset = res.data.data;
                    })
                    return this.pageindex;
                },
                set:function(_newVal){
                    console.log(_newVal)
                    this.pageindex = _newVal;
                }
            }
        },


        this.pageindex = _page;
                http.get(this.config.api,{params:{page:this.pageindex,limit:this.config.params.limit}}).then((res) => {
                    this.dataset = res.data.data;
                })
                return this.pageindex;



 httpclient.post(this.config.api,pro).then((res)=>{
                    if(res.data.status){
                        this.showcover = false;
                        http.get(this.config.api,{params:this.config.params || {} }).then((res) => {
                            this.dataset = res.data.data;
                        })
                        this.txt={}
                    }else{
                        alert('error')
                    }
                })