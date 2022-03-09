import { post } from '@/utils/request'

export default {
  list: query => post(`/api/examRecord/list`,query),
}
