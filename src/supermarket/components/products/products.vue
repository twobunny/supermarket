<template>
    <div>
        <datagrid :config="config"></datagrid>
    </div>
</template>

<script type="text/javascript">
    import datagrid from '../datagrid/datagrid.vue'

    export default {
    data:function(){
            return{
                config:{
                    api:"",
                    params:{page:1,limit:10},
                    // cols:['supplierid','person','phone','adress']
                    cols:['itemId','itemName','price','status']
                }
            }
        },
        components: {
            datagrid
        },
         beforeMount(){
            this.config.api = this.$store.state.common.baseurl+"/products";
            

        }

    }
</script>