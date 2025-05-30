import { useEffect, useState } from "react";
import { Radio, RadioChangeEvent, Layout, Typography } from "antd";
import CardMain from "@/components/CardMain";
import styles from "./index.module.css";
import {
  FireOutlined,
  HeartOutlined,
  InfoCircleOutlined,
  MoonOutlined,
} from "@ant-design/icons";
import {
  getDayForturn,
  getMonthForturn,
  getWeekForturn,
  getYearForturn,
} from "@/api/zodiac";
import Fortune from "./components/fortune";
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
    {
      label: (
        <Typography.Text>
          <InfoCircleOutlined /> 星座资料
        </Typography.Text>
      ),
      value: "info",
    },
  ];
  useEffect(() => {
    // getMonthForturn("白羊座").then((res) => {
    //   console.log("month", res);
    // });
    // getYearForturn("白羊座").then((res) => {
    //   console.log("year", res);
    // });
  }, []);
  return (
    <CardMain
      title="星座运势"
      desc="探索十二星座的命运和特质"
      icon={<FireOutlined />}
    >
      <Header>
        <Radio.Group
          className={styles.customRadio}
          options={fnOptions}
          optionType="button"
          onChange={(e: RadioChangeEvent) => setActiveMode(e.target.value)}
          value={activeMode}
          buttonStyle="solid"
        />
      </Header>
      <Content style={{marginTop: 5}}>
        {activeMode === "fortune" ? (
          <Fortune />
        ) : activeMode === "compatibility" ? (
          "compatibility"
        ) : (
          "info"
        )}
      </Content>
    </CardMain>
  );
}
