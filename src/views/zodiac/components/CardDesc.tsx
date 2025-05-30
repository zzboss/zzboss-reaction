import { Card, ConfigProvider, Typography } from "antd";
import { ZodiacAttr, ZoidacName } from "../types/ZodiacType";
import { useEffect, useState } from "react";
import { ZODIACS_INFO } from "../constants/ZodiacConstants";

type CardDescProps = {
  title?: string;
  desc?: string;
  cronName: ZoidacName;
};
export default function CardDesc({ title = '', desc = '', cronName }: CardDescProps) {
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
          height: "100%",
          width: "60%",
          background: `var(--${primaryColor})`,
        }}
        title={title}
      >
        <Typography.Text
          editable={false}
          style={{ display: "inline-block", height: "8rem", color: "#000" }}
        >
          {desc}
        </Typography.Text>
      </Card>
    </ConfigProvider>
  );
}
