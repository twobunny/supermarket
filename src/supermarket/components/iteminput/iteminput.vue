<template>
    <input type="text" v-model="itemid" @keyup.enter="getProduct" id="it"/>
</template>

<script type="text/javascript">
    import http from "../../httpclient/httpclient.js"
    export default {
        props:["api"],
        data:function(){
            return {
                itemid:""
            }
        },
        methods:{
            getProduct(event){
                http.get(this.$store.state.common.baseurl+this.api,{params:{itemid:this.itemid,whid:this.$store.state.common.whid}}).then((res) => {
                    document.getElementById("it").select();
                    if(res.data.status){
                        this.$emit("inputcall",res.data.data[0]);
                    }else{
                        alert("该产品不存在")
                    }
                })
            }
        }
    }
</script>