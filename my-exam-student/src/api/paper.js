import { post,postWithJson } from '@/utils/request'

export default {
  detail: paperId => post(`/api/paper/detail`,paperId),
  submit: params => postWithJson(`/api/paper/submit`,params),
  undonePapers: params => post(`/api/paper/undonePapers`,params),
  metaPapers: params => post(`/api/paper/metaPapers`,params),
  updateMetaPaper: params => postWithJson(`/api/paper/updateMetaPaper`,params),
  getMetaPaper: params => post(`/api/paper/getMetaPaper`,params),
  deleteMetaPaper: params => post(`/api/paper/deleteMetaPaper`,params),
  createMetaPaper: params => postWithJson(`/api/paper/createMetaPaper`,params),
}
