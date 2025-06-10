import { getDayForturn, ZodiacDayFortuneType } from "@/api/zodiac";
import { Flex } from "antd";
import { useEffect, useState } from "react";
import HeartRate from "./HeartRate";
import CardDesc from "@/views/zodiac/components/CardDesc";
import { ZoidacName } from "@/views/zodiac/types/ZodiacType";
export default function DayFortune({
  activeMode,
  cronName,
}: {
  activeMode: 0 | 1;
  cronName: ZoidacName;
}) {
  const [info, setInfo] = useState<Partial<ZodiacDayFortuneType>>({});

  useEffect(() => {
    const type = activeMode === 1 ? "tomorrow" : "today";
    getDayForturn(cronName, type).then((res) => setInfo(res.data));
  }, [cronName, activeMode]);

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
        <HeartRate label="综合指数" value={info.all || '0'} color="#af1d75" />
        <HeartRate label="健康指数" value={info.health || "0"} color="#19995f" />
        <HeartRate label="爱情指数" value={info.love || "0"} color="#e23232" />
        <HeartRate label="财运指数" value={info.money || "0"} color="#c64d19" />
        <HeartRate label="工作指数" value={info.work || "0"} color="#5526a7" />
      </Flex>
    </Flex>
  );
}
