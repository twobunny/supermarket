import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeComponent from '../components/home/home.vue'
import DatagridComponent from "../components/datagrid/datagrid.vue"
import LoginComponent from "../components/login/login.vue"
import MemberComponent from "../components/member/member.vue"
import SupplierComponent from "../components/supplier/supplier.vue"
import ProductsComponent from "../components/products/products.vue"

import ItemtransComponent from "../components/itemtrans/itemtrans.vue"
import InvertoryComponent from "../components/invertory/invertory.vue"
import TransferComponent from "../components/transfer/transfer.vue"
import WarehouseComponent from '../components/warehouse/warehouse.vue'
import PurchaseComponent from "../components/purchase/purchase.vue"
import CashierComponent from "../components/cashier/cashier.vue"
import UsersComponent from "../components/users/users.vue"
Vue.use(VueRouter)

const router = new VueRouter({
    routes:[
        {path:"/login",component:LoginComponent},

    {path:"/",component:HomeComponent,
       
        children:[
        {path:"member",component:MemberComponent},
        {path:"product",component:ProductsComponent},
        {path:"supplier",name:"supplier",component:SupplierComponent},
        {path:"itemtrans",name:"itemtrans",component:ItemtransComponent},
        {path:"invertory",name:"invertory",component:InvertoryComponent},
        {path:"transfer",name:"transfer",component:TransferComponent},
        {path:'warehouse',component:WarehouseComponent},
        {path:"purchase",component:PurchaseComponent},
        {path:"cashier",component:CashierComponent},
        {path:"users",component:UsersComponent}
        ]}
        
    
    ]
})

export default router;