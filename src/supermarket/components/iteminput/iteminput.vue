<template>
    <input type="text" v-model="itemid" @keyup.enter="getProduct" />
</template>

<script type="text/javascript">
    import http from "../../httpclient/httpclient.js"
    export default {
        data:function(){
            return {
                itemid:""
            }
        },
        methods:{
            getProduct(event){
                http.get(this.$store.state.common.baseurl+"/getinvertory",{params:{itemid:this.itemid,whid:this.$store.state.common.whid}}).then((res) => {
                    if(res.status){
                        this.$emit("inputcall",res.data.data[0]);
                    }else{
                        alert("该产品不存在")
                    }
                })
            }
        }
    }
</script>