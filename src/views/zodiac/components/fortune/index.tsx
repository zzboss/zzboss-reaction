import DayFortune from "./dayFortune";
import WeekFortune from "./weekFortune";
import MonthFortune from "./monthFortune";
import YearFortune from "./yearFortune";
import { useEffect, useState } from "react";
import { Flex, Layout, Space, Typography } from "antd";
import ZodiacButton from "./ZodiacButton";
import { ZODIACS_INFO } from "../../constants/ZodiacConstants";
import styles from "../../styles/fortune.module.css";
import { ZodiacInfo } from "../../types/ZodiacType";
import { BellOutlined, CalendarOutlined, FireOutlined, MoonOutlined, SunOutlined } from "@ant-design/icons";
const { Header, Content, Sider } = Layout;
export default function Fortune() {
  const [activeMode, setActiveMode] = useState(0);
  const [activeZodiac, setActiveZodiac] = useState(ZODIACS_INFO[0]);
  const [targetComponent, setTargetComponent] = useState(
    <DayFortune cronName={activeZodiac.name} activeMode={0} />
  );

  function onButtonClick(zodiac: ZodiacInfo) {
    setActiveZodiac(zodiac);
  }
  const fortuneOptions = [{
    label: "今日",
    icon: <SunOutlined />
  },
  {
    label: "明日",
    icon: <BellOutlined />
  },
  {
    label: "本周",
    icon: <CalendarOutlined />
  }, {
    label: "本月",
    icon: <MoonOutlined />
  }, {
    label: "本年",
    icon: <FireOutlined />
  }];

  useEffect(() => {
    switch (activeMode) {
      case 0:
      case 1:
        setTargetComponent(<DayFortune cronName={activeZodiac.name} activeMode={activeMode} />);
        break;
      case 2:
        setTargetComponent(<WeekFortune cronName={activeZodiac.name} />);
        break;
      case 3:
        setTargetComponent(<MonthFortune cronName={activeZodiac.name} />);
        break;
      case 4:
        setTargetComponent(<YearFortune cronName={activeZodiac.name} />);
        break;
    }
  }, [activeZodiac.name, activeMode]);
  return (
    <Layout style={{ height: "100%" }}>
      <Sider width={380} className={styles.sider}>
        <Flex gap={10} wrap justify="space-around">
          {ZODIACS_INFO.map((zodiac) => {
            return (
              <ZodiacButton
                className={styles.zodiacButton}
                key={zodiac.name}
                attr={zodiac.attr}
                active={activeZodiac === zodiac}
                toActive={() => onButtonClick(zodiac)}
              >
                <Flex vertical style={{ zIndex: 1 }}>
                  <h3>{zodiac.name}</h3>
                  <span>{zodiac.birthday}</span>
                </Flex>
              </ZodiacButton>
            );
          })}
        </Flex>
      </Sider>
      <Content className={styles.content}>
        <Header
          className={styles.header}
          style={{ background: `var(--${activeZodiac.attr})` }}
        >
          <Flex
            justify="space-between"
            align="center"
            style={{ height: "100%" }}
          >
            <Flex align="flex-end" gap={10}>
              <Typography.Title className={styles.title} level={2}>
                {activeZodiac.name}
              </Typography.Title>
              <Typography.Text>{activeZodiac.birthday}</Typography.Text>
            </Flex>
            <Typography.Text
              style={{
                padding: 10,
                borderRadius: 10,
                background: `var(--${activeZodiac.attr})`,
              }}
            >
              {activeZodiac.element}
            </Typography.Text>
          </Flex>
        </Header>
        <Content style={{ padding: "0 10px"}}>
         <Space size="small" style={{marginTop: 10}}>
           {
            fortuneOptions.map((option, index) => (
              <ZodiacButton key={option.label} attr={activeZodiac.attr} active={activeMode === index} toActive={() => setActiveMode(index)}>
                {option.icon} {option.label}
              </ZodiacButton>
            ))
          }
         </Space>
          {targetComponent}
        </Content>
      </Content>
    </Layout>
  );
}
