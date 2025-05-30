/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import {
  listHistory,
  getHistoryDetail,
  HistoryDetail,
  HistoryInfo,
} from "@/api/history";
import {
  Timeline,
  TimelineItemProps,
  Card,
  Typography,
  Flex,
  Layout,
  Image,
  Space,
} from "antd";
import CardMain from "@/components/CardMain";
import styles from "./index.module.css";
import { HourglassOutlined } from "@ant-design/icons";

const { Text } = Typography;
const { Sider, Content } = Layout;
export default function History() {
  const [itemList, setItemList] = useState<TimelineItemProps[]>([]);
  const [detail, setDetail] = useState<HistoryDetail>({
    id: "",
    title: "",
    content: "",
    picNo: 0,
    picUrls: [],
  });
  const [historyList, setHistoryList] = useState<HistoryInfo[]>([]);
  const today = new Date();
  const desc = `${today.getMonth() + 1}年${today.getDate()}日`;
  const getDetail = async (id: string) => {
    const historyDetail = (await getHistoryDetail(id)).data;
    historyDetail.content = historyDetail.content
      .replace(/&#13;/g, "\n")
      .replace(/(\r\n|\n\t|\t\n)+/g, "\n")
      .replace(/(\n)+/g, "\n");
    if (historyDetail.content.startsWith("\n")) {
      historyDetail.content = historyDetail.content.replace("\n", "");
    }
    if(historyDetail.content.length === 0){
      historyDetail.content = historyDetail.title;
    }
    setDetail(historyDetail);
    renderEvent();
  };
  useEffect(() => {
    listHistory().then((res) => {
      setHistoryList(res.data);
      if(res.data.length){
        getDetail(res.data[0].id);
      }
    });
  }, []);
  useEffect(() => setItemList(historyList.map(toCard)), [detail]);
  function toCard(info: HistoryInfo) {
    return {
      label: "",
      color: detail.id == info.id ? "green" : "blue",
      children: (
        <Card
          style={{ maxWidth: "15rem", cursor: "pointer" }}
          onClick={() => getDetail(info.id)}
        >
          <Text>{info.eventYear + "年" + info.eventDate}</Text>
          <Text>{info.eventDesc}</Text>
        </Card>
      ),
    };
  }
  function renderEvent() {
    return (
      <>
        <Text
          className={[
            styles.evDetail,
            detail.picNo > 0 ? styles.h30 : styles.h40,
          ].join(" ")}
        >
          {detail.content}
        </Text>
        {detail.picNo > 0 ? (
          <Space className={styles.imgs}>
            {detail.picUrls.map((url) => (
              <Image width={70} height={70} src={url} />
            ))}
          </Space>
        ) : null}
      </>
    );
  }
  return (
    <CardMain title="历史上的今天" desc={desc} icon={<HourglassOutlined />}>
      <Sider width={400}>
        <Flex className={styles.historyList}>
          <Timeline
            style={{ width: "20rem", margin: "auto" }}
            mode="alternate"
            items={itemList}
          />
        </Flex>
      </Sider>
      <Content style={{ padding: "2rem" }}>
        <Card title="事件详情" style={{ height: "100%" }}>
          {renderEvent()}
        </Card>
      </Content>
    </CardMain>
  );
}
