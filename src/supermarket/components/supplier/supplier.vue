<template>
    <datagrid :config="config"></datagrid>    
</template>
<script type="text/javascript">
    import DatagridComponent from "../datagrid/datagrid.vue"
    export default {
        data:function(){
            return{
                config:{
                    api:"",
                    params:{page:1,limit:8},
                    cols:['supplierid','person','phone','address']
                }
            }
        },
        components:{
            datagrid:DatagridComponent
        },
        beforeMount(){
            this.config.api = this.$store.state.common.baseurl+"/supplier";
        }
    }
</script>