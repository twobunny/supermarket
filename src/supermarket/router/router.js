import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeComponent from '../components/home/home.vue'
import DatagridComponent from "../components/datagrid/datagrid.vue"
import LoginComponent from "../components/login/login.vue"
import SupplierComponent from "../components/supplier/supplier.vue"
import WarehouseComponent from '../components/warehouse/warehouse.vue'

Vue.use(VueRouter)

const router = new VueRouter({
    routes:[
        {path:"/login",component:LoginComponent},

        {path:"/",component:HomeComponent,
            children:[
                {path:"supplier",name:"supplier",component:SupplierComponent},
                
                {path:'warehouse',component:WarehouseComponent},
            ]
        },
        
        
    ]
})

export default router;