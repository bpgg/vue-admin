import axios from "axios";
import {Message} from "element-ui"
// 创建axios实例

// 如果不是生产环境，则访问/api接口，/api在vue.config.js的proxy中会被替换为实际访问地址。
const BASEURL = process.env.NODE_ENV === "production"?"":"/devApi";

const servie = axios.create({
  baseURL:BASEURL,// http://192.168.1.131:8080/devApi/ === "http://www.web-jshtml.cn/productionApi/devApi" ==> "http://www.web-jshtml.cn/productionApi"
  timeout:1000
});

// 添加请求拦截器
servie.interceptors.request.use(
  function(config) {
    // 在发送请求之前做些什么
    return config;
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
servie.interceptors.response.use(
  function(response) {
    // 对响应数据做点什么
    let {resCode,message} = response.data
    if(resCode!==0){
      Message.error(message)
      return Promise.reject(data)
    } 
    // Message.success(message)
    return response;
    return Promise.resolve(response.data);
  },
  function(error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export default servie