<template>
    <datagrid :config="config"></datagrid>
</template>
<script type="text/javascript">
    import datagrid from "../datagrid/datagrid.vue"
    export default {
        data:function(){
            return {
                config:{
                    api:"",
                    params:{page:1,limit:10},
                    cols:['itemtransid','type','direction','qty','amount','wsid','reckid']
                }
            }
        },
        components:{
            datagrid
        },
        beforeMount(){
            this.config.api = this.$store.state.common.baseurl+"/gettrans";
        }
    }
</script>