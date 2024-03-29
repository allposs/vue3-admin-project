import axios from "axios";
import router from "@/router/router";
import {
    Loading
} from "element-ui";
import {messages} from '@/assets/js/common.js'
import store from '@/store/store'
axios.defaults.timeout = 60000;
axios.defaults.responseType='json';
axios.defaults.data={};
axios.defaults.baseURL = `${window.location.origin}`;
axios.defaults.withCredentials=true;
axios.defaults.headers.post["Content-Type"] =
    "application/x-www-form-urlencoded;application/json;charset=UTF-8";
let loading = null;
/*
 *请求前拦截
 *用于处理需要请求前的操作
 */
axios.interceptors.request.use(
    config => {
        loading = Loading.service({
            text: "正在加载中......",
            fullscreen: true
        });
        if (store.state.token) {
            config.headers["Authorization"] = "Bearer " + store.state.token;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);
/*
 *请求响应拦截
 *用于处理数据返回后的操作
 *200 通过
 *500 服务器内部错误
 *404 未找到远程服务器
 *401 用户登陆过期
 *400 数据异常
 */
axios.interceptors.response.use(
    response => {
        return new Promise((resolve, reject) => {
            //请求成功后关闭加载框
            if (loading) {
                loading.close();
            }
            const res = response.data;
            if (res.code === 200) {
                resolve(res)
            } else{
                reject(res)
            }
        })
    },
    error => {
        //请求成功后关闭加载框
        if (loading) {
            loading.close();
        }
        //断网处理或者请求超时
        if (!error.response) {
            //请求超时
            if (error.message.includes("timeout")) {
                messages("error", "请求超时，请检查互联网连接");
            } else {
                //断网，可以展示断网组件
                messages("error", "请检查网络是否已连接");
            }
            return;
        }
        const status = error.response.status;
        switch (status) {
            case 500:
                messages("error", "服务器内部错误");
                break;
            case 404:
                messages(
                    "error",
                    "未找到远程服务器"
                );
                break;
            case 401:
                messages("warning", "用户登陆过期，请重新登陆");
                store.commit('COMMIT_TOKEN','')
                setTimeout(() => {
                    router.replace({
                        path: "/login",
                        query: {
                            redirect: router.currentRoute.fullPath
                        }
                    });
                }, 1000);
                break;
            case 400:
                messages("error", "数据异常，详情请咨询服务热线");
                break;
            default:
                messages("error", error.response.data.message);
        }
        return Promise.reject(error);
    }
);
/*
 *get方法，对应get请求
 *@param {String} url [请求的url地址]
 *@param {Object} params [请求时候携带的参数]
 */
export function get(url, params) {
    return new Promise((resolve, reject) => {
        axios
            .get(url, {
                params
            })
            .then(res => {
                resolve(res);
            })
            .catch(err => {
                reject(err);
            });
    });
}
/*
 *post方法，对应post请求
 *@param {String} url [请求的url地址]
 *@param {Object} params [请求时候携带的参数]
 */
export function post(url, params) {
    return new Promise((resolve, reject) => {
        axios
            .post(url, params)
            .then(res => {
                resolve(res);
            })
            .catch(err => {
                reject(err);
            });
    });
}
export default {
    getMockData(url,params){
        return fetch(url,params)
    }
}