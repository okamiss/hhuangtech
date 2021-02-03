/* eslint-disable no-unused-vars */
import axios from 'axios';


// const get = () => {
//     console.log('get请求');
// }

// const post = () => {
//     console.log('post请求')
// }

// export{
//     get,
//     post
// }

// process.env.NODE_ENV环境
// let baseURL;
// if(process.env.NODE_ENV=='development'){
//     baseURL = 'https://lifegem.org/api/'
// }else{
//     baseURL = '/xxx'
// }

let baseURL = 'http://192.168.31.205:8980/hhuangtech/plm'

// baseURL es6 方法


const service = axios.create({

})
service.interceptors.request.use(config => {
    // 在发送请求之前做某事，比如说 设置token
    // config.headers['token'] = 'token';
    config.headers['Cookie'] = 'xxxxxxxxxxxxxxxxxxx';
    return config;
  }, error => {
    // 请求错误时做些事
    return Promise.reject(error);
  });

const $http = axios.create({
    baseURL,
})
// create 是axios自带的方法

export const get = (url,params)=>{
    params = params || {};
    return new Promise((resolve,reject)=>{
        // axiso 自带 get 和 post 方法
        $http.get(url,{
            params,
        }).then(res=>{
            if(res.data.status===0){
                resolve(res.data);
            }else{
                // alert(res.data.msg)
            }
        }).catch(error=>{
            // alert('网络异常');
        })
    })
}

export const post = (url,params)=>{
    params = params || {};
    return new Promise((resolve,reject)=>{
        $http.post(url,params).then(res=>{
            if(res.data.status===0){
                resolve(res.data);
            }else{
                // alert(res.data.msg);
            }
        }).catch(error=>{
            // alert('网络异常');
        })
    })
}