import "./common/common.css"
import '../../node_modules/bootstrap/dist/css/bootstrap.css'

import Vue from 'vue'
import Router from "./router/router.js"
import home from './components/home/home.vue'

import store from "./vuex/store.js"

new Vue({
    el:"#app",
    router:Router,
    store,
    render: h => h(home)
    //在实例化的时候最先把根组件渲染到页面去
}) 