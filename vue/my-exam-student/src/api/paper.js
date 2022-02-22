import { post } from '@/utils/request'

export default {
  detail: paperId => post(`/api/paper/detail/`+paperId),
}
