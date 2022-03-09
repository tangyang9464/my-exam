import { post,postWithJson } from '@/utils/request'

export default {
  detail: paperId => post(`/api/studentPaper/detail`,paperId),
  submit: params => postWithJson(`/api/studentPaper/submit`,params),
  undonePapers: params => post(`/api/studentPaper/undonePapers`,params),
  metaPapers: params => post(`/api/studentPaper/metaPapers`,params)
}
