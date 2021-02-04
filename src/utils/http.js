import axios from 'axios';
import { Message } from 'element-ui';

axios.defaults.timeout = 5000;
// axios.defaults.baseURL = '';
axios.defaults.baseURL = 'https://www.test.unionprocloud.com';
// axios.defaults.baseURL = 'http://192.168.31.205:8980/hhuangtech';

// https://www.tongyeyun.com/japi/login/loginForWeb


//http request 拦截器
axios.interceptors.request.use(
    config => {
        // console.log(config)
        // const token = getCookie('名称');注意使用的时候需要引入cookie方法，推荐js-cookie
        // config.headers['content-type'] = 'application/json; charset=UTF-8'

        config.data = JSON.stringify(config.data);
        // config.data = {a:''};
        config.headers = {
            ...config.headers,
            'Content-Type': 'application/x-www-form-urlencoded',
            // "token": '96c45b879727d00b194dd97826c2ddb9',
        }
        // config.url = config.url + '&__sid=cdfe45288c7e4756bb1d11acdf4c0d6d'
        // if(token){
        //   config.params = {'token':token}
        // }
        return config;
    },
    error => {
        return Promise.reject(err);
    }
);


//http response 拦截器
axios.interceptors.response.use(
    response => {
        //   console.log(response)
        if (response.data.errCode == 2) {
            router.push({
                path: "/home",
                querry: { redirect: router.currentRoute.fullPath }//从哪个页面跳转
            })
        }
        return response;
    },
    error => {
        return Promise.reject(error)
    }
)


/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function get(url, params = {}) {
    //  axios.get(url, {
    //         params: params
    //     }).then(res=>{})
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params
        })
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err)
            })
    })
}


/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.post(url, data)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err)
            })
    })
}

