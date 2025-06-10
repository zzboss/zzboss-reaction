import { getYearForturn, ZodiacYearFortuneType } from "@/api/zodiac";
import { useEffect, useState } from "react";
import { Carousel } from "antd";
import CardDesc from "@/views/zodiac/components/CardDesc";
import { ZoidacName } from "@/views/zodiac/types/ZodiacType";

export default function YearFortune({ cronName }: { cronName: ZoidacName }) {
  const [info, setInfo] = useState<Partial<ZodiacYearFortuneType>>({});
  useEffect(() => {
    getYearForturn(cronName).then((res) => {
      if (res.code === 200) {
        setInfo(res.data);
      }
    });
  }, [cronName]);

  const displayAttr: (keyof ZodiacYearFortuneType)[] = [
    "career",
    "love",
    "finance",
  ];
  const titles: string[] = ["职业运势", "爱情运势", "财运运势"];

  return (
    <Carousel
      style={{ margin: "10px auto" }}
      infinite
      autoplay
      fade
      speed={1000}
    >
      <CardDesc
        title={(info.year || '') + "年度密码: " + info.mimaInfo}
        desc={info.mimaInfoContent || '暂无数据'}
        cronName={cronName}
      />
      {displayAttr.map((attr, index) => {
        return (
          <CardDesc
            key={attr}
            title={info.year + "年 " + titles[index]}
            desc={info[attr] || "暂无数据"}
            cronName={cronName}
          />
        );
      })}
    </Carousel>
  );
}
