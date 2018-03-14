<template>
    <div>
        <tableheader></tableheader> 
        <datagrid :config="config"></datagrid>    
    </div>
</template>
<script type="text/javascript">
    import tableheader from "./component/tableheader.vue"
    import datagrid from "../datagrid/datagrid.vue"
    export default {
        data:function(){
            return {
                config:{
                    api:"",
                    params:{page:1,limit:10},
                    cols:['outhouse','inhouse','itemid','itemname',"outqty"]
                }
            }
        },
        components:{
            tableheader,
            datagrid
        },
        beforeMount(){
            this.config.api = this.$store.state.common.baseurl+"/gettransfer";
        }
    }
    
</script>
