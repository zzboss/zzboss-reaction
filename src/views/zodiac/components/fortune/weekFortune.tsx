import { getWeekForturn, ZodiacWeekFortuneType } from "@/api/zodiac";
import { Carousel} from "antd";
import { useEffect, useState } from "react";
import CardDesc from "@/views/zodiac/components/CardDesc";
import { ZoidacName } from "@/views/zodiac/types/ZodiacType";

export default function WeekFortune({ cronName }: { cronName: ZoidacName }) {
  const [info, setInfo] = useState<Partial<ZodiacWeekFortuneType>>({});

  useEffect(() => {
    getWeekForturn(cronName).then((res) => {
      if (res.code === 200) {
        setInfo(res.data);
      }
    });
  }, [cronName]);
  const displayAttr: (keyof ZodiacWeekFortuneType)[] = [
    "health",
    "love",
    "money",
    "work",
  ];
  const titles: string[] = ["健康", "爱情", "财运", "工作"];

  return (
    <Carousel style={{ margin: "10px auto" }} infinite autoplay fade speed={1000}>
      {displayAttr.map((attr, index) => {
        return (
          <CardDesc
            key={attr}
            title={titles[index]}
            desc={info[attr] || ""}
            cronName={cronName}
          />
        );
      })}
    </Carousel>
  );
}
