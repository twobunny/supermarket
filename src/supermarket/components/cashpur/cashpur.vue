<template>
    <table class="table">
        <thead>
            <tr>
                <th>产品编号</th>
                <th>产品名称</th>
                <th>数量</th>
                <th>价格</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(obj,idx) in dataset">
                <td v-for="(val,key) in obj">{{val}}</td>
            </tr>
        </tbody>
    </table>
</template>
<script type="text/javascript">
    export default {
        props:['data'],
        data:function(){
            return {
                dataset:[],
            }
        },
        watch:{
            data:{
               handler(newvalue,old){
                this.dataset = newvalue;
                },
            deep:true 
            }
        }
    }
</script> 