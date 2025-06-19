import { Layout, Typography } from "antd";
import styles from "./cardMain.module.css";
import React, { ReactNode } from "react";
const { Header } = Layout;
const { Title } = Typography;
type CardMainProps = {
  title: string;
  icon?: ReactNode;
  desc?: string;
  children?: ReactNode
};
const CardHeader: React.FC<CardMainProps> = ({icon, desc, title, children}) => {
  return (
    <Layout className={styles.container}>
      <Header className={styles.header}>
        <Title className={styles.title} level={3} style={{color: 'var(--title-primary-color)'}}>
          {icon} {title}
        </Title>
        <Title level={5} style={{ marginTop: 10, color: 'var(--title-primary-color)' }}>
          {desc}
        </Title>
      </Header>
      <Layout className={styles.content}>{children}</Layout>
    </Layout>
  );
};
export default CardHeader;
