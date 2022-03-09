import { post } from '@/utils/request'

export default {
  join: query => post(`/api/classroom/join`, query),
  create: query => post(`/api/classroom/create`, query),
  edit: query => post(`/api/classroom/edit`, query),
  exit: query => post(`/api/classroom/exit`, query),
  joinHistoryRoom: query => post(`/api/classroom/joinHistoryRoom`, query),
  exitHistoryRoom: query => post(`/api/classroom/exitHistoryRoom`, query),
  list: query => post(`/api/classroom/list`, query),
  listTeacherRoom: query => post(`/api/classroom/listTeacherRoom`, query),
  historyList: query => post(`/api/classroom/historyList`, query),
  detail: roomCode => post(`/api/classroom/detail`, roomCode),
  teacherDetail: roomCode => post(`/api/classroom/teacherDetail`, roomCode),
}
