import { post } from '@/utils/request'

export default {
  join: query => post(`/api/classroom/join`, query),
  exit: query => post(`/api/classroom/exit`, query),
  joinHistoryRoom: query => post(`/api/classroom/joinHistoryRoom`, query),
  list: query => post(`/api/classroom/list`, query),
  historyList: query => post(`/api/classroom/historyList`, query),
  detail: roomCode => post(`/api/classroom/detail/`+roomCode),
}
