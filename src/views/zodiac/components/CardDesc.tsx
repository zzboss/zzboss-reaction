import { Card, ConfigProvider, Typography } from "antd";
import { ZodiacAttr, ZoidacName } from "@/views/zodiac/types/ZodiacType";
import { useEffect, useState } from "react";
import { ZODIACS_INFO } from "@/views/zodiac/constants/ZodiacConstants";

type CardDescProps = {
  title?: string;
  desc?: string;
  width?: number | string;
  height?: number | string;
  cronName: ZoidacName;
};
export default function CardDesc({
  title = "",
  desc = "",
  cronName,
  width = "60%",
  height = "10rem",
}: CardDescProps) {
  const [primaryColor, setPrimaryColor] = useState<ZodiacAttr>(ZodiacAttr.fire);
  useEffect(() => {
    const target = ZODIACS_INFO.find((z) => z.name === cronName);
    if (target) {
      setPrimaryColor(target.attr);
    }
  }, [cronName]);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorTextHeading: "#000",
        },
      }}
    >
      <Card
        style={{
          width,
          background: `var(--${primaryColor})`,
        }}
        title={title}
      >
        <Typography.Text
          editable={false}
          style={{
            display: "block",
            height,
            color: "#000",
            overflowY: "auto",
            scrollbarWidth: 'thin',
            scrollbarColor: `var(--${primaryColor}-primary) var(--${primaryColor}-secondary)`
          }}
        >
          {desc}
        </Typography.Text>
      </Card>
    </ConfigProvider>
  );
}
