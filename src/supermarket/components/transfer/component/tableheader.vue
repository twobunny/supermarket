<template>
    <div class="tableheader">
        <label>调入仓库</label>
        <dropdownlist :params="params" :api="api"></dropdownlist>
        <label>产品编号</label>
        <iteminput @inputcall="tableadd"></iteminput>
        <button class="btn btn-primary" @click="transfer">submit</button>
        <br />

        <div class="ttable">
            <table class="table">
                <thead>
                    <tr>
                        <th>产品编号</th>
                        <th>产品名称</th>
                        <th>调出数量</th>
                        <th>价格</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(obj,idx) in dataset">
                        <td v-for="(val,key) in obj" v-if="cols.indexOf(key)>-1">{{val}}</td>
                    </tr>
                </tbody>
            </table>  
        </div>
         
    </div>
</template>
<script type="text/javascript">
    import "./tableheader.css"
    import dropdownlist from "../../dropdownlist/dropdowmlist.vue"
    import iteminput from "../../iteminput/iteminput.vue"
    import $ from "jquery"
    import httpclient from "../../../httpclient/httpclient.js"
    export default {
        data:function(){
            return {
                params:"",
                api:"",
                dataset:[],
                cols:["itemid","itemname",'outqty','price']
            }
        },
        components:{
            dropdownlist,
            iteminput
        },
        beforeMount:function(){
            this.params = this.$store.state.common.whid;
            this.api = this.$store.state.common.baseurl+"/warehouse";
        },
        methods:{
            tableadd:function(mes){
                var exit=false;
                this.dataset.forEach( item => {
                    if(item.itemid == mes.itemid){
                        item.outqty++;
                        exit=true;
                    }
                });
                if(!exit){
                    let obj={};
                    obj.itemid = mes.itemid;
                    obj.itemname = mes.itemname;
                    obj.outqty=1;
                    obj.price = mes.price;
                    this.dataset.push(obj);
                }
            },
            transfer:function(){
                // this.dataset.forEach(item => {
                    let params={};
                    params.from = this.$store.state.common.whid;
                    params.to = $("#drop option:selected").val();
                    params.data =JSON.stringify(this.dataset);
                    httpclient.post(this.$store.state.common.baseurl+"/changeinvertory",params).then((result) => {
                        if(!result.data.status){
                            if(result.data.mes){
                                alert(result.data.mes);
                            }
                        }
                    }) 
                // })
            }
        }
    }
</script>