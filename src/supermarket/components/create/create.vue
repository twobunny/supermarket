<template>
     <div class="add" @click= "addshow"> 
        <input type ="button" value="添加" class="btn"/>
        <div v-show="show">
            <div class = "cover">
            </div>
            <form name="adddata" class="adddata">
                <h1></h1>
                <div v-for="(val) in dataset">
                    <label class="lab">{{val}}</label>
                    <input type="text" class="txt"/>
                </div>
                <button class="btn_create" @click.stop= "createData">提交</button>
                <button class="btn_cancel" @click.stop="cancel">取消</button>
            </form>
        </div>
    </div>
</template>


<script>

import './create.css'
import '../../../../node_modules/jquery/dist/jquery.js'
    export default{
        data(){
            return {
                dataset:[],
                show:false  
            }
        },
        props:['datakey'],
        methods:{
            addshow(){
                this.show = true;
                console.log(this.show);
            },
            createData(){
            },
            cancel(){
                this.show = false;
                console.log(this.show)
            },

        },
        mounted(){
            console.log(this.datakey)

        }
    }

</script>