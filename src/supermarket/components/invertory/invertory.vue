<template>
    <datagrid :config="config" :showo="false"></datagrid>    
</template>
<script type="text/javascript">
    import datagrid from "../datagrid/datagrid.vue"
    export default {
        data:function(){
            return {
                config:{
                    api:"",
                    params:{page:1,limit:10},
                    cols:['itemid','itemname','whid','qty',"price"]
                }
            }
        },
        components:{
            datagrid
        },
        beforeMount(){
            this.config.api = this.$store.state.common.baseurl+"/invertory";
        }
    }
</script>