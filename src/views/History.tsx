import { useEffect, useState } from "react";
import { listHistory } from "../api/history";
import { Timeline, TimelineItemProps, Card } from "antd";

export default function History() {
  const [itemList, setItemList] = useState<TimelineItemProps[]>([])
  useEffect(() => {
    listHistory().then((res) => setItemList(res.data.map(v => {
      return {
        label: ' ',
        children: (
          <Card style={{ maxWidth: '15rem' }}>
            <p>{v.eventYear + '年' + v.eventDate}</p>
            <p>{v.eventDesc}</p>
          </Card>)
      }
    })))
  }, [])
  return (<div style={{marginTop: '2rem', height: '78vh', overflowY: 'scroll'}}>
      <Timeline style={{width: '30rem', margin: 'auto'}} mode="alternate" items={itemList}/>
    </div>)
}