import axios from 'axios';
import { Message } from 'element-ui';
import  qs from 'qs'


axios.defaults.timeout = 5000;
// axios.defaults.baseURL = '';
// axios.defaults.baseURL = 'https://www.test.unionprocloud.com';
axios.defaults.baseURL = 'http://192.168.31.205:8980/hhuangtech';

//http request 拦截器
axios.interceptors.request.use(
    config => {
        // console.log(config)
        // const token = getCookie('名称');注意使用的时候需要引入cookie方法，推荐js-cookie

        config.data = JSON.stringify(config.data);
        config.headers = {
            ...config.headers,
            'Content-Type': 'application/x-www-form-urlencoded',
        }
        let hasLogin = config.url.indexOf('__login')
        if(hasLogin == '-1'){
            config.url = config.url + '?__sid=9279a8aed3694e5c9c3bd871c9b38d38'
        }
        return config;
    },
    error => {
        return Promise.reject(err);
    }
);


//http response 拦截器
axios.interceptors.response.use(
    response => {
        if (response.data.result = "login") {
            // router.push({
            //     path: "/",
            //     querry: { redirect: router.currentRoute.fullPath } //从哪个页面跳转
            // })
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
        axios.post(url, qs.stringify(data))
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err)
            })
    })
}

