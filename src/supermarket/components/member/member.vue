<template>
    <datagrid :config = "config"></datagrid>
</template>
<script>
    import DatagridComponent from "../datagrid/datagrid.vue"

    export default {
        data:function(){
            return {
                config:{
                    api:"",
                    params:{page:1,limit:8},
                    cols:["membername","birthday","discount","phone","integrals"]
                }
            }
        },
        components:{
            datagrid:DatagridComponent
        },
        beforeMount(){
        
            this.config.api = this.$store.state.common.baseurl + "/member";
        }
        
    }
</script>