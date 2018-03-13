<template>
        <select id="drop">
            <option v-for="(obj,idx) in options" :value="obj.whid" v-if="current != obj.whid">{{obj.whid}}</option>
        </select>
</template>
<script type="text/javascript">
    import http from "axios"
    export default {
        data:function(){
            return {
                options:[],
                current:""
            }
        },
        props:["params","api"],
        created:function(){
            this.current=this.$store.state.common.whid;
        },
        mounted:function(){
            http.get(this.api).then((res)=>{
                this.options = res.data.data;
            })
        }
    }
</script>