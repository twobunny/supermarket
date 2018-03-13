
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
                    params:{},
                    // cols:['supplierid','person','phone','adress']
                    cols:['id','name','phone','contacts','address']
                }
            }
        },
        components:{
            datagrid:DatagridComponent
        },
        beforeMount(){
            this.config.api = this.$store.state.common.baseurl+'/warehouse';
        }
    }
</script>