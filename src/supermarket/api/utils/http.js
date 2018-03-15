import axios from 'axios'

const baseUrl = 'http://localhost:8081'
import router from "../../router/router.js"
export default {
    // socket(_wsurl){
    //  var url = _wsurl && _wsurl.startsWith('ws') ? _wsurl : `${base_wsurl}/${_wsurl}`;
    //  var ws = new WebSocket(url);
    //  return ws;
    // },
    get(_url, _params){
        var url = _url && _url.startsWith('http') ? _url : `${baseUrl}/${_url}`;
        return new Promise((resolve, reject) => {
            axios({
                url: url,
                params: _params || {},
                headers: {authorization: window.sessionStorage.getItem('token')}
            }).then(res => {
                if(!res.data.status && res.data.err == "unauthorized"){
                    
                    router.push('login');
                    return false;
                }
                resolve(res)
            }).catch(error => {
                reject(error)
                router.push('login');

            })
        })
    },
    post(_url, _params){
        var url = _url && _url.startsWith('http') ? _url : `${baseUrl}/${_url}`;
        return new Promise((resolve, reject) => {
            axios({
                url: url,
                method: 'post',
                data: _params || {},
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Authorization: window.sessionStorage.getItem('token')
                },
                transformRequest: [function (data) {
                    let ret = ''
                    for (let it in data) {
                      ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                    }
                    return ret
                  }], 
            }).then(res => {
                if(!res.data.status && res.data.error == "unauthorized"){
                    router.push('login');
                    return false;
                }               
                resolve(res)
            }).catch(error => {
                
                reject(error)
            })
        })
    }
}