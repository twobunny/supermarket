
<template>
    <div>
        <div>
        </div> 
        <table class="table  table-hover">
            <thead>
                <tr >
                    <th v-if="$store.state.common.lanType=='en'">Linenum</th>
                    <th v-else>序号</th>
                    <th v-if="config.cols.indexOf(key)>-1" v-for="(val,key) in dataset[0]" >{{ dictionary[$store.state.common.lanType][key] || key}}</th>
                    <th v-if="$store.state.common.lanType=='en'">Operation</th>
                    <th v-else>操作</th>

                </tr>
            </thead> 
            <tbody>
                <tr v-for="(obj,idx) in dataset">
                    <td>{{idx+1}}</td>
                    <td v-for="(val,key) in obj" v-if="config.cols.indexOf(key)>-1" :data-id="key">{{val}}</td>
                    <td>
                        <button v-if="$store.state.common.lanType=='en'" class="btn btn-default">update</button>
                        <button v-else class="btn btn-default">编辑</button>
                        <button v-if="$store.state.common.lanType=='en'" class="btn btn-danger" @click="del">del</button>
                        <button v-else class="btn btn-danger" @click="del">删除</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <spinner v-show="show"></spinner> 
    </div>
    
</template>
<script type="text/javascript">
    import http from "axios"
    import $ from "jquery"
    import spinner from "../spinner/spinner.vue"
    import httpclient from "../httpclient/httpclient.js"
    export default {
        props:["config"],
        data:function(){
            return{
                dataset:[],
                dictionary:{},
                show:false
            }
        },
        components:{
            spinner
        },

        mounted(){
            this.show=true;
            http.get("http://localhost:8080/src/supermarket/dictionary/common.txt").then((res) => {
                this.dictionary =res.data;
            })
            // console.log(this.config.api)
            http.get(this.config.api).then((res) => {
                this.dataset = res.data.data;
                this.show=false;
            })
        },

        methods: {
            del:function(event){    
                this.config.api = this.$store.state.common.baseurl + "/delproduct";
                var index = $(event.target).closest("tr").index();
                let id=this.dataset[index]._id;
                httpclient.post(this.config.api,{id:id}).then((res) => {
                   if(res.data.status){
                   console.log(event.target)
                       $(event.target).closest('tr').remove();
                   }
                //     http.get(this.config.api).then((res) => {
                //     this.dataset = res.data.data;
                //     this.show=false;
                // })
              });
                
        
            }
        }
       

    }
</script>