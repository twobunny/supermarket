<template>
    <div>
        <div class="header">
            <cheader></cheader>
        </div>
        <div class="body">
            <div class="nav">
                <cnav></cnav>
            </div>
            <div class="container">
                <router-view></router-view>
            </div>
        </div>
        <div class = "cover">
        </div>
    </div>
</template>
<script type="text/javascript">
    import "./home.css"
    import HeaderComponent from "./header/header.vue"
    import NavComponent from "./nav/nav.vue"
    export default {
        data:function(){
            return{}
        },
        components:{
            cheader:HeaderComponent,
            cnav:NavComponent
        }
    }
</script>