<template>
    <div class="tableheader">
        <label for="">调入仓库</label>
        <dropdownlist :params="params" :api="api"></dropdownlist>
        <label>产品编号</label>
        <iteminput @inputcall="tableadd"></iteminput>
        <button class="btn btn-primary">submit</button>
        <br />

        <div class="ttable">
            <table class="table">
                <thead>
                    <tr>
                        <th>产品编号</th>
                        <th>产品名称</th>
                        <th>调出数量</th>
                        <th>价格</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(obj,idx) in dataset">
                        <td v-for="(val,key) in obj" v-if="cols.indexOf(key)>0">{{val}}</td>
                    </tr>
                </tbody>
            </table>  
        </div>
         
    </div>
</template>
<script type="text/javascript">
    import "./tableheader.css"
    import dropdownlist from "../../dropdownlist/dropdowmlist.vue"
    import iteminput from "../../iteminput/iteminput.vue"
    export default {
        data:function(){
            return {
                params:"",
                api:"",
                dataset:[],
                cols:["itemid","itemname",'outqty','price']
            }
        },
        components:{
            dropdownlist,
            iteminput
        },
        beforeMount:function(){
            this.params = this.$store.state.common.whid;
            this.api = this.$store.state.common.baseurl+"/warehouse";
        },
        methods:{
            tableadd:function(mes){
                console.log(mes)
                this.dataset.push(mes);
            }
        }
    }
</script>