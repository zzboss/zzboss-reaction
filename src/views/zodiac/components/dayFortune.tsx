import { getDayForturn, ZodiacDayFortuneType } from "@/api/zodiac";
import { Flex } from "antd";
import { useEffect, useState } from "react";
import HeartRate from "./HeartRate";
import { ZoidacName } from "../types/ZodiacType";
import CardDesc from "./CardDesc";
export default function DayFortune({
  activeMode,
  cronName,
}: {
  activeMode: 0 | 1;
  cronName: ZoidacName;
}) {
  const [info, setInfo] = useState<Partial<ZodiacDayFortuneType>>({});
  const [all, setAll] = useState<number>(1);
  const [health, setHealth] = useState<number>(0);
  const [love, setLove] = useState<number>(0);
  const [money, setMoney] = useState<number>(0);
  const [work, setWork] = useState<number>(0);

  useEffect(() => {
    const type = activeMode === 1 ? "tomorrow" : "today";
    getDayForturn(cronName, type).then((res) => setInfo(res.data));
  }, [cronName, activeMode]);

  useEffect(() => {
    setAll(Number((parseInt(info.all || "0") / 20).toFixed(1)));
    setHealth(Number((parseInt(info.health || "0") / 20).toFixed(1)));
    setLove(Number((parseInt(info.love || "0") / 20).toFixed(1)));
    setMoney(Number((parseInt(info.money || "0") / 20).toFixed(1)));
    setWork(Number((parseInt(info.work || "0") / 20).toFixed(1)));
  }, [info]);

  return (
    <Flex style={{ margin: "10px 0" }} gap={"2vw"}>
      <CardDesc
        title={`${activeMode === 1 ? "明日" : "今日"}运势`}
        desc={info.summary || ""}
        cronName={cronName}
      />
      <Flex
        className="border"
        vertical
        justify="space-around"
        style={{ backgroundColor: "#281341", height: "15rem" }}
        gap={10}
      >
        <HeartRate label="综合指数" value={all} color="#af1d75" />
        <HeartRate label="健康指数" value={health} color="#19995f" />
        <HeartRate label="爱情指数" value={love} color="#e23232" />
        <HeartRate label="财运指数" value={money} color="#c64d19" />
        <HeartRate label="工作指数" value={work} color="#5526a7" />
      </Flex>
    </Flex>
  );
}
