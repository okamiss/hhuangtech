import axios from 'axios';
import {
    Message
} from 'element-ui';
import qs from 'qs'
import cookies from 'vue-cookies'

axios.defaults.timeout = 5000;

axios.defaults.baseURL = 'http://192.168.31.205:8980/hhuangtech';

let sid = cookies.get('sid')


//http request 拦截器
axios.interceptors.request.use(
    config => {
        let setData = []
        for (let i in config.data) {
            setData.push(i)
        }

        if (setData.length === 1) {
            config.url = config.url + '?__sid=' + sid + '&' + qs.stringify(config.data)
        } else {
            config.url = config.url + '?__sid=' + sid
        }


        config.data = JSON.stringify(config.data);
        config.headers = {
            ...config.headers,
            'Content-Type': 'application/json;charset=UTF-8',
        }

        return config;
    },
    error => {
        return Promise.reject(error);
    }
);


//http response 拦截器
axios.interceptors.response.use(
    response => {
        // console.log(response)
        if (response) {
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
        axios.post(url, data)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err)
            })
    })
}