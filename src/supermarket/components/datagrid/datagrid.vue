<template>
    <div>
        <div class="add" @click.stop= "addshow"> 
            <input type ="button" value="添加" class="btn" />
            <div v-show="showcover">
                <div class = "cover">
                </div>
                <form class="adddata">
                    <h1></h1>
                    <div v-for="(val) in this.config.cols">
                        <label class="lab">{{val}}</label>
                        <input type="text" class="txt" v-model="txt[val]"/>
                    </div>
                    <button class="btn_create" @click.stop= "createData">提交</button>
                    <button class="btn_cancel" @click.stop="cancel">取消</button>
                </form>
            </div>
        </div>
       
        <table class="table  table-hover">
            <thead>
                <tr >
                    <th v-if="$store.state.common.lanType=='en'">Linenum</th>
                    <th v-else>序号</th>
                    
                    <th v-for="(val,key) in dataset[2]" v-if="config.cols.indexOf(key)>-1">{{ dictionary[$store.state.common.lanType][key] || key}}</th>
                    <th v-if="$store.state.common.lanType=='en'">Operation</th>
                    <th v-else>操作</th>
                </tr>
            </thead> 
            <tbody>
                <tr v-for="(obj,idx) in dataset">
                    <td>{{idx+1}}</td>
                    <td v-for="(val,key) in obj" v-if="config.cols.indexOf(key)>-1">{{val}}</td>
                    <td>
                        <button v-if="$store.state.common.lanType=='en'" class="btn btn-default">update</button>
                        <button v-else class="btn btn-default">编辑</button>
                        <button v-if="$store.state.common.lanType=='en'" class="btn btn-danger">del</button>
                        <button v-else class="btn btn-danger">删除</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <spinner v-show="show"></spinner> 
    </div>
    
</template>
<script type="text/javascript">
    import http from "axios"
    import spinner from "../spinner/spinner.vue"
    import httpclient from '../../httpclient/httpclient.js'
    import "./datagrid.css"
    import '../../../../node_modules/jquery/src/jquery.js'
    
    export default {
        props:["config"],
        data:function(){
            return{
                dataset:[],
                dictionary:{},
                txt:{},
                show:false,
                showcover:false,
                createdata:[],
                pushdata:{}
            }
        },
        components:{
            spinner,
        },
        methods:{
            addshow(){
                this.showcover = true;

            },
            createData(){
                let pro = this.txt;
                httpclient.post(this.config.api,pro).then((res)=>{
                    if(res.data.status){
                        this.showcover = false;
                        http.get(this.config.api,{params:this.config.params || {} }).then((res) => {
                            this.dataset = res.data.data;
                        })
                        this.txt={}
                    }else{
                        alert('error')
                    }
                })
            },
            cancel(){
                this.showcover = false;
       
            },
        },
        mounted(){
            this.show=true;
            http.get("http://localhost:8080/src/supermarket/dictionary/common.txt").then( (res) => {
                this.dictionary =res.data;
            })
            http.get(this.config.api,{params:this.config.params || {} }).then((res) => {
                this.dataset = res.data.data;
                this.show=false;
            })
        }
    }
</script>