type HistoryResult = {
  code: number,
  data: Array<HistoryInfo>
}

type HistoryInfo = {
  id: string,
  eventDesc: string,
  eventDate: string,
  eventYear: string
}

const url = 'http://localhost:8080/open/history/today'
const listHistory = (): Promise<HistoryResult> => {
  return fetch(url).then(res => res.json())
} 

export {
  listHistory,
  type HistoryInfo
}