import { post,form,postWithJson } from '@/utils/request'

export default {
  register: form => postWithJson(`/api/user/register`,form),
  saveUserInfo: form => postWithJson(`/api/user/saveUserInfo`,form),
  login: form => post(`/api/user/login`,form),
  signOut: userId => post(`/api/user/signOut`,userId),
  getUser: userId => post(`/api/user/getUserInfo`,userId),
  uploadImg: imgBase64 => form(`/api/user/uploadAvatar`,imgBase64),
}
