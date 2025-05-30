type HistoryResult<T> = {
  code: number,
  data: T
}

type HistoryInfo = {
  id: string,
  eventDesc: string,
  eventDate: string,
  eventYear: string
}

type HistoryDetail = {
  id: string,
  title: string,
  content: string,
  picNo: number,
  picUrls: string[],
}

const url = 'http://localhost:8080/open/history'

const listHistory = (): Promise<HistoryResult<HistoryInfo[]>> => {
  return fetch(`${url}/today`).then(res => res.json())
} 
const getHistoryDetail = (id: string): Promise<HistoryResult<HistoryDetail>> => {
  return fetch(`${url}/detail/${id}`).then(res => res.json())
} 

export {
  listHistory,
  getHistoryDetail,
  type HistoryInfo,
  type HistoryDetail
}