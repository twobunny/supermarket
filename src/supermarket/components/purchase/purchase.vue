<template>
    <div class="purchase">
        <label>扫码入库</label>
        <iteminput @inputcall="tableadd" api="/getproduct"></iteminput>
        <button class="btn btn-info" style="margin-bottom:10px;" @click="purchase">确定</button>
        <cashpur :data="dataset"></cashpur>
        <spinner v-show="show"></spinner>
    </div>
   
</template>
<script type="text/javascript">
    import "./pruchase.css"
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
                console.log(mes)
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
            purchase(){
                this.show = true;
                let param={};
                param.data=JSON.stringify(this.dataset);
                param.whid = this.$store.state.common.whid;
                httpclient.post(this.$store.state.common.baseurl+"/purchase",param).then((res) => {
                    if(res.data.status){
                        this.show = false;
                        this.dataset=[];
                        alert("入库成功");
                    }else{
                            alert("该商品不存在")
                            this.show = false;
                        }
                    }
                )
            }
        }
    }

</script>