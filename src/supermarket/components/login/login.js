import Vue from 'vue'
import http from '../../api/utils/http.js'
import router from '../../router/router.js'
import filter from "../../api/utils/filter.js"
const state = {
	a: 1,
	b: 2
}

const mutations = {
	login: (statedata, formData) => {
			http.get('login',formData).then(response => {
				if(response.data.status){
				window.sessionStorage.setItem("token",response.data.mes)
					router.push({path:"/"})
				}else{
					alert("登陆信息错误");
				}

				
			})
	}
}

const actions = {
	login: (store, params) => {
		store.commit('login', params)
	}
}

export default {
	state,
	mutations,
	actions
}