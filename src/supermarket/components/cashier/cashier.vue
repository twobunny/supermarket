<template>
     <div class="purchase">
        <label>扫码收银</label>
        <iteminput @inputcall="tableadd"></iteminput>
        <button class="btn btn-info" style="margin-bottom:10px;" @click="cashier">确定</button>
        <cashpur :data="dataset"></cashpur>
        <spinner v-show="show"></spinner>
    </div>
</template>
<script type="text/javascript">
     import iteminput from "../iteminput/iteminput.vue"
    import cashpur from "../cashpur/cashpur.vue"
    import httpclient from "../../httpclient/httpclient.js"
    import spinner from "../../components/spinner/spinner.vue"
    export default {
        data:function(){
            return {
                dataset:[],
                show:false
            }
        },
        components:{
            cashpur,
            iteminput,
            spinner
        },
        beforeMount(){},
        methods:{
            tableadd(mes){
                var exit=false;
                this.dataset.forEach( item => {
                    if(item.itemid == mes.itemid){
                        var price = item.price/item.outqty;
                        item.outqty++;
                        item.price = price * item.outqty;
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
            cashier(){
                this.show = true;
                let param={};
                param.data=JSON.stringify(this.dataset);
                param.whid = this.$store.state.common.whid;
                httpclient.post(this.$store.state.common.baseurl+"/cashier",param).then((res) => {
                    if(res.data.status){
                        this.show = false;
                        alert("收银成功");
                    }else{
                        if(res.data.mes){
                            alert(res.data.mes)
                            this.show = false;
                        }
                    }
                })
            }
        }
    }
</script>