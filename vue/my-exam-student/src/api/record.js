import { post } from '@/utils/request'

export default {
  list: query => post(`/api/record/list`,query),
}
