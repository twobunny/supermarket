import Vue from 'vue'
import Vuex from 'vuex'

import common from "../common/common.js"
import login from "../components/login/login.js"
Vue.use(Vuex)
const store = new Vuex.Store({
    modules:{
        common,
        login
    }
})
export default store;