import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeComponent from '../components/home/home.vue'
import DatagridComponent from "../components/datagrid/datagrid.vue"
import LoginComponent from "../components/login/login.vue"
import SupplierComponent from "../components/supplier/supplier.vue"
Vue.use(VueRouter)

const router = new VueRouter({
    routes:[
    {path:"/",component:LoginComponent},
    {path:"/home",component:HomeComponent},
    {path:"/supplier",component:SupplierComponent}

    ]
})

export default router;