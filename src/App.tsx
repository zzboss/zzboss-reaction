import { NavLink, Outlet } from "react-router";
import { MenuItemType } from "antd/es/menu/interface";
import {
  FileImageOutlined,
  HourglassOutlined,
  FireOutlined,
} from "@ant-design/icons";
import { Menu, Layout, Typography, Col, Row } from "antd";
import styles from "./app.module.css";
const { Header, Content } = Layout;
const { Title } = Typography;
function App() {
  const menuItems: MenuItemType[] = [
    {
      key: "img-tool",
      icon: <FileImageOutlined />,
      label: <NavLink to="/pictools">图片工具</NavLink>,
    },
    {
      key: "history-today",
      icon: <HourglassOutlined />,
      label: <NavLink to="/history">历史上的今天</NavLink>,
    },
    {
      key: "stars",
      icon: <FireOutlined />,
      label: <NavLink to="/stars">星座运势</NavLink>,
    },
  ];
  return (
    <>
      <Header className={styles.header}>
        <Row align="middle" style={{ height: "100%" }}>
          <Col offset={1} span={4} style={{ height: "100%" }}>
            <Title className={styles.title} level={3}>
              <span
                style={{
                  backgroundImage:
                    "linear-gradient(to right, #f9a8d4, #c084fc)",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                兔子会上树
              </span>
              <span
                style={{
                  backgroundImage:
                    "linear-gradient(to right, #2dd4bf, #93c5fd)",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                的工具站
              </span>
            </Title>
          </Col>
          <Col offset={2}>
            <Menu
              theme="dark"
              className={styles.menu}
              defaultSelectedKeys={["img-tool"]}
              items={menuItems}
              mode="horizontal"
            ></Menu>
          </Col>
        </Row>
      </Header>
      <Content className={styles.main}>
        <Outlet />
      </Content>
    </>
  );
}

export default App;
