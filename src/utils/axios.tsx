import axios from 'axios'
import { store } from '../store';

const CODE_MSG: { [status: number]: string } = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  301: '资源永久移动，请求的资源已被永久的移动到新 URI，返回信息会包括新的 URI，浏览器会自动定向到新 URI。',
  302: '资源临时移动，只是临时被移动，客户端可继续使用原有 URI。',
  303: '查看其它地址，与 301 类似，使用 GET 和 POST 请求查看。',
  304: '资源未修改，所请求的资源未修改，服务器返回此状态码时，不会返回任何资源。客户端通常会缓存访问过的资源，通过提供一个头信息指出客户端希望只返回在指定日期之后修改的资源。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '请求路径不存在',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。'
};

// 创建一个实例，此后都在此实例上改造
const http = axios.create({
  baseURL: "/",
  timeout: 1000 * 30,
  withCredentials: true,
})
// 请求拦截器
const beforeRequest = (config:any) => {
  console.log({config});
  
  // 设置 token
  const token = store.getState().user.token
  token && (config.headers.Authorization = token)
  // NOTE  添加自定义头部
  // config.headers['my-header'] = 'jack'
  return config
}

http.interceptors.request.use(beforeRequest)

// 响应拦截器
const responseSuccess = (response:any) => {
  // eslint-disable-next-line yoda
  // 这里没有必要进行判断，axios 内部已经判断
  // const isOk = 200 <= response.status && response.status < 300
  console.log("response", response);
  
  return Promise.resolve(response.data)
}

const responseFailed = (error:any) => {
  const { response } = error
  if (response) {
    console.log(CODE_MSG[response.status]);
    return Promise.reject()
  } else if (!window.navigator.onLine) {
    return Promise.reject(new Error('请检查网络连接'))
  }
  return Promise.reject(error)
}
http.interceptors.response.use(responseSuccess, responseFailed)

export default http
