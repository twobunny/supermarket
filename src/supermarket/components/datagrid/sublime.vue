<template>
    <div class="add">
    <div class = "cover"></div>
            <form class="adddata">
                <h1></h1>
                <div v-for="(val,idx) in cols">
                    <label class="lab">
                        {{val}}:
                    </label>
                    <input type="text" class="txt" v-if="idx == 0 " autofocus  :value="edit[val]" :data-val="val"/>
                    <input type="text" class="txt" v-else  :value="edit[val]" :data-val="val"/>
                </div> 
                <div class="btn">
                    <button class="btn_create" @click.stop= "updated" v-if="$store.state.common.lanType=='en'">Submit</button>
                    <button class="btn_create" @click.stop= "updated" v-else>提交</button>
                    <button class="btn_cancel" @click.stop="cancel" v-if="$store.state.common.lanType=='en'">Cancel</button>
                    <button class="btn_cancel" @click.stop="cancel" v-else>取消</button>
                </div>
            </form>
        </div>
</template>  
<script>
    import "./datagrid.css"
    import httpclient from "../../httpclient/httpclient.js"
    import $ from "jquery"
    export default {
        props:["obj",'cols','config'],
        data:function(){
            return{
                edit:{},
            }
        },
        methods:{
            setnew(mes){
                this.edit = mes;

            },
            updated(){
                this.cols.forEach((item) => {
                    this.edit[item] = $(`input[data-val=${item}]`).val();
                })
                httpclient.post(this.config.api+"update",this.edit).then((res) => {
                    this.$emit("linkhide");
                })
            },
            cancel(){
                this.$emit("linkhide");
            }
        },
       
    }
</script>        