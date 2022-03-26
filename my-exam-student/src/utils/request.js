import axios from 'axios'
import { useRouter } from 'vue-router'
import qs from 'qs'

const request = function (loadtip, query) {
  const router = useRouter()
  return axios.request(query)
    .then(res => {
      if (loadtip) {
        // loading.close()
      }
      if (res.data.code === 401) {
        router.push({ path: '/login' })
        return Promise.reject(res.data)
      } else if (res.data.code === 500) {
        return Promise.reject(res.data)
      } else if (res.data.code === 501) {
        return Promise.reject(res.data)
      } else if (res.data.code === 502) {
        router.push({ path: '/login' })
        return Promise.reject(res.data)
      } else {
        return Promise.resolve(res.data)
      }
    })
    .catch(e => {
      if (loadtip) {
        // loading.close()
      }
      // vue.prototype.$message.error(e.message)
      return Promise.reject(e.message)
    })
}

const post = function (url, params) {
  const query = {
    url: url,
    method: 'post',
    withCredentials: true,
    timeout: 30000,
    data: qs.stringify(params),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'request-ajax': true }
  }
  return request(false, query)
}

const postWithJson = function (url, params) {
  const query = {
    url: url,
    method: 'post',
    withCredentials: true,
    timeout: 30000,
    data: params,
    headers: { 'Content-Type': 'application/json', 'request-ajax': true }
  }
  return request(false, query)
}

const postWithLoadTip = function (url, params) {
  const query = {
    url: url,
    method: 'post',
    withCredentials: true,
    timeout: 30000,
    data: params,
    headers: { 'Content-Type': 'application/json', 'request-ajax': true }
  }
  return request(true, query)
}

const postWithOutLoadTip = function (url, params) {
  const query = {
    url: url,
    method: 'post',
    withCredentials: true,
    timeout: 30000,
    data: params,
    headers: { 'Content-Type': 'application/json', 'request-ajax': true }
  }
  return request(false, query)
}

const get = function (url, params) {
  const query = {
    url: url,
    method: 'get',
    withCredentials: true,
    timeout: 30000,
    params: params,
    headers: { 'request-ajax': true }
  }
  return request(false, query)
}

const form = function (url, params) {
  const query = {
    url: url,
    method: 'post',
    withCredentials: true,
    timeout: 30000,
    data: params,
    headers: { 'Content-Type': 'multipart/form-data', 'request-ajax': true }
  }
  return request(false, query)
}

export {
  post,
  postWithJson,
  postWithLoadTip,
  postWithOutLoadTip,
  get,
  form
}
