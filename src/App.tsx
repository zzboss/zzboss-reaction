import { Outlet, useNavigate } from "react-router";
import {
  FileImageOutlined,
  HourglassOutlined,
  FireOutlined,
} from "@ant-design/icons";
import { Layout, Typography, Flex, Radio, RadioChangeEvent } from "antd";
import styles from "./app.module.css";
import { useState } from "react";
const { Header, Content } = Layout;
const { Title } = Typography;
function App() {
  const [activeMenu, setActiveMode] = useState("pictools");
  const navigete = useNavigate(); 
  const changeMenu = (path: string) => {
    setActiveMode(path);
    navigete(path)
  }
  const menuItems = [
    {
      value: "pictools",
      label: <Typography.Text><FileImageOutlined /> 图片工具</Typography.Text>,
    },
    {
      value: "history",
      label:<Typography.Text><HourglassOutlined /> 历史上的今天</Typography.Text>,
    },
    {
      value: "stars",
      label: <Typography.Text><FireOutlined /> 星座运势</Typography.Text>,
    },
  ];
  return (
    <>
      <Header className={styles.header}>
        <Flex align="center" justify="space-between">
          <Title className={styles.title} level={3}>
            <span
              style={{
                backgroundImage: "linear-gradient(to right, #f9a8d4, #c084fc)",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              兔子会上树
            </span>
            <span
              style={{
                backgroundImage: "linear-gradient(to right, #2dd4bf, #93c5fd)",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              的工具站
            </span>
          </Title>
          <Radio.Group
            className={styles.customRadio}
            options={menuItems}
            optionType="button"
            onChange={(e: RadioChangeEvent) => changeMenu(e.target.value)}
            value={activeMenu}
            buttonStyle="solid"
          />
        </Flex>
      </Header>
      <Content className={styles.main}>
        <Outlet />
      </Content>
    </>
  );
}

export default App;
