import { useState } from "react";
import { Radio, RadioChangeEvent, Layout, Typography } from "antd";
import CardMain from "@/components/CardMain";
import RadioStyle from "@/styles/Radio.module.less";
import { FireOutlined, HeartOutlined, MoonOutlined } from "@ant-design/icons";
import Fortune from "./components/fortune";
import Compatibility from "./components/compatibility";
const { Header, Content } = Layout;
export default function Stars() {
  const [activeMode, setActiveMode] = useState("fortune");
  const fnOptions = [
    {
      label: (
        <Typography.Text>
          <MoonOutlined /> 星座运势
        </Typography.Text>
      ),
      value: "fortune",
    },
    {
      label: (
        <Typography.Text>
          <HeartOutlined /> 星座配对
        </Typography.Text>
      ),
      value: "compatibility",
    },
  ];
  return (
    <CardMain
      title="星座运势"
      desc="探索十二星座的命运和特质"
      icon={<FireOutlined />}
    >
      <Header>
        <Radio.Group
          className={RadioStyle.customRadio}
          options={fnOptions}
          optionType="button"
          onChange={(e: RadioChangeEvent) => setActiveMode(e.target.value)}
          value={activeMode}
          buttonStyle="solid"
        />
      </Header>
      <Content style={{ marginTop: 5, height: "100%" }}>
        {activeMode === "fortune" ? <Fortune /> : <Compatibility />}
      </Content>
    </CardMain>
  );
}
