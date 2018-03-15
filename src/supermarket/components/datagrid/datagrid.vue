<template>
    <div>
        <div class="add" > 
            <input type ="button" value="添加" class="btn" @click.stop= "addshow" v-show="showos"/>
            <div v-show="showcover">
                <div class = "cover">
                </div>
                <form class="adddata">
                    <h1></h1>
                    <div v-for="(val,idx) in this.config.cols">
                        <label class="lab">
                            *{{val}}:
                        </label>
                        <input type="text" class="txt" v-model="txtobj[val]" v-if="idx == 0 " autofocus />
                        <input type="text" class="txt" v-model="txtobj[val]" v-else />
                    </div> 
                    <div class="btn">
                    <button class="btn_create" @click.stop= "createData" v-if="$store.state.common.lanType=='en'">Submit</button>
                    <button class="btn_create" @click.stop= "createData" v-else>提交</button>
                    <button class="btn_cancel" @click.stop="cancel" v-if="$store.state.common.lanType=='en'">Cancel</button>
                    <button class="btn_cancel" @click.stop="cancel" v-else>取消</button>
                    </div>
                </form>
            </div>
        </div>
        <table class="table  table-hover">
            <thead>
                <tr>
                    <th v-if="$store.state.common.lanType=='en'">Linenum</th>
                    <th v-else>序号</th>
                    <th v-for="(val,key) in dataset[0]" v-if="config.cols.indexOf(key)>-1">{{key}}</th>
                    <th v-if="$store.state.common.lanType=='en'" v-show="showos">Operation</th>
                    <th v-else v-show="showos">操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(obj,idx) in dataset">
                    <td>{{idx+1}}</td>
                    <td v-for="(val,key) in obj" v-if="config.cols.indexOf(key)>-1" :data-id="key">{{val}}</td>
                    <td>
                        <button v-if="$store.state.common.lanType=='en'" class="btn btn-default" v-show="showos" @click="update">update</button>
                        <button v-else class="btn btn-default" v-show="showos" @click="update">编辑</button>
                        <button v-if="$store.state.common.lanType=='en'" class="btn btn-danger" v-show="showos" @click='del'>del</button>
                        <button v-else class="btn btn-danger" v-show="showos" @click='del'>删除</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class = "page">
        <ul>
            <li>
                <button @click = "pre" v-model = "pageindex">上一页</button>
            </li>
            <li v-for="page in this.pages">
                <input type="button"  :value="page" @click="goto(page)"/>
            </li>
            <li>
                <button @click = "next" v-model = "pageindex">下一页</button>
            </li>
        </ul>
        </div>
        <spinner v-show="show"></spinner> 
        <sublime v-show="link" :obj="txtobj" :cols="config.cols" :config="config" @linkhide="linkhide"></sublime>
    </div>
    
</template>
<script type="text/javascript">
    import http from "axios"
    import $ from "jquery"
    import spinner from "../spinner/spinner.vue"
    import httpclient from '../../httpclient/httpclient.js'
    import "./datagrid.css"
    import sublime from "./sublime.vue"
    
    export default {
        props:["config",'showo'],
        data:function(){
            return{
                dataset:[],
                dictionary:{},
                txtobj:{},
                show:false,
                showcover:false,
                qty:'',
                pages:'',
                showos:true,
                pageindex:1,
                link:false
            }
        },
        components:{
            spinner,sublime
        },
        methods:{
            addshow(){
                this.showcover = true;
            }, 
            linkhide(){
                this.link = false;

                http.get(this.config.api,{params: {pg:this.config.params || {}}}).then((res) => {
                    this.dataset = res.data.data;
                })
            },                                                            
            createData(){
                let pro = this.txtobj;
                console.log(this.txtobj)
                let prolength = Object.keys(pro).length;
                let datalength = this.config.cols.length;
                console.log(prolength,datalength)
                if(prolength!= datalength){
                    alert("输入框不能为空");
                    return 
                }
                 httpclient.post(this.config.api+"add",pro).then((res)=>{
                    if(res.data.status){
                        this.showcover = false;
                        http.get(this.config.api,{params: {pg:this.config.params || {}}}).then((res) => {
                            this.dataset = res.data.data;
                        })
                        this.txtobj={}
                    }else{
                        alert('error')
                    }
                })

            },
            cancel(){
                this.showcover = false;
            },
            goto:function(_page){
                this.pageindex = _page;
                http.get(this.config.api,{params:{pg:{page:this.pageindex,limit:this.config.params.limit}|| {}}}).then((res) => {
                    this.dataset = res.data.data;
                })

                return this.pageindex;
            },
            pre(){
                this.pageindex --;
                if(this.pageindex <= 0 ){
                    this.pageindex = 1
                }
                http.get(this.config.api,{params:{pg:{page:this.pageindex,limit:this.config.params.limit}|| {}}}).then((res) => {
                    this.dataset = res.data.data;
                })
                return this.pageindex;
            },
            next(){
                this.pageindex ++;
                if(this.pageindex >= this.pages ){
                    this.pageindex = this.pages
                }
                http.get(this.config.api,{params:{pg:{page:this.pageindex,limit:this.config.params.limit}|| {}}}).then((res) => {
                    this.dataset = res.data.data;
                })
                return this.pageindex;

            },
            del:function(event){    
                var index = $(event.target).closest("tr").index();
                let id=this.dataset[index]._id;
                httpclient.post(this.config.api+"del",{id:id}).then((res) => {
                   if(res.data.status){
                       $(event.target).closest('tr').remove();
                        location.reload();
                   }
              });
            },
            update:function(e){
                this.link = true;
                var index = $(event.target).closest("tr").index();
                let obj=this.dataset[index];
                console.log(this.dataset)
                this.$children[1].setnew(obj);
            }
        },
        mounted(){
            if(this.showo === false){
                this.showos = this.showo;
            }
            this.show=true;
            http.get("http://localhost:8080/src/supermarket/dictionary/common.txt").then( (res) => {
                this.dictionary =res.data;
            })
            http.get(this.config.api,{params: {pg:this.config.params || {}}}).then((res) => {
                if(res.data.status){
                     this.dataset = res.data.data;
                    this.qty = res.data.mes;
                    this.pages = Math.ceil((this.qty*1) / (this.config.params.limit*1));
                }
               
                this.show=false;
            })
        },
    }

    
</script>