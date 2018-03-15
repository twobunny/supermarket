<template>
    <dl class="cnav foldpanel">
        <dt @click="showdd">用户管理</dt>
            <dd><router-link to="11">用户</router-link></dd>
        <dt @click="showdd">基本信息</dt>
            <dd><router-link to="/product">物料表</router-link></dd>
            <dd><router-link to="/warehouse">仓库表</router-link></dd>
            <dd><router-link to="/supplier">供应商</router-link></dd>
        <dt @click="showdd">库存管理</dt>
            <dd><router-link to="/invertory">库存表</router-link></dd>
            <dd><router-link to="/transfer">调货单</router-link></dd>
            <dd><router-link to="/purchase">进货单</router-link></dd>
            <dd><router-link to="/itemtrans">物料事项</router-link></dd>
        <dt @click="showdd">销售</dt>
            <dd><router-link to="/cashier">收银</router-link></dd>
    </dl>
    
</template>
<script type="text/javascript">
    import "./nav.css"
    import $ from "jquery"
    export default {
        methods:{
            showdd(event){
                $(event.target).nextUntil("dt").toggle();
            }
        }
    }
</script>