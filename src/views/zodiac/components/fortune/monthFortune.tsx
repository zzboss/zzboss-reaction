import { getMonthForturn, ZodiacMonthFortuneType } from "@/api/zodiac";
import { Carousel } from "antd";
import { useEffect, useState } from "react";
import CardDesc from "@/views/zodiac/components/CardDesc";
import { ZoidacName } from "@/views/zodiac/types/ZodiacType";

export default function MonthFortune({cronName}: {cronName: ZoidacName}) {
  const [info, setInfo] = useState<Partial<ZodiacMonthFortuneType>>({});

  useEffect(() => {
    getMonthForturn(cronName).then((res) => {
      console.log(res, cronName);
      if (res.code === 200) {
        setInfo(res.data);
      }
    });
  }, [cronName])

  const displayAttr: (keyof ZodiacMonthFortuneType)[] = [
    "all",
    "health",
    "love",
    "money",
    "work",
  ];
  const titles: string[] = ["综合运势","健康运势", "爱情运势", "财运运势", "工作运势"];

   return (
    <Carousel style={{ margin: "10px auto" }} infinite autoplay fade speed={1000}>
      {displayAttr.map((attr, index) => {
        return (
          <CardDesc
            key={attr}
            title={(info.date || '') + ' ' + titles[index]}
            desc={info[attr] || "暂无数据"}
            cronName={cronName}
          />
        );
      })}
    </Carousel>
  ); 
}