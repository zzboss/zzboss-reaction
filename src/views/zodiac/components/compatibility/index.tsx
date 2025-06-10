import { Col, Flex, Layout, Row, Select, Space, Typography } from "antd";
import styles from './index.module.css';
const { Sider, Content } = Layout;
import {ZODIACS_INFO} from '../../constants/ZodiacConstants'
import { useEffect, useState } from "react";
import { getCompatibility, ZodiacCompatibilityType } from "@/api/zodiac";
import { ZodiacInfo } from "../../types/ZodiacType";
import { ArrowRightOutlined } from "@ant-design/icons";
import ZodiaxDetail from "./ZodiaxDetail";
import CardDesc from "../CardDesc";
import HeartRate from "../fortune/HeartRate";
export default function Compatibility() {
  const [menCode, setMenCode] = useState<number>(ZODIACS_INFO[0].code);
  const [womenCode, setWomenCode] = useState<number>(ZODIACS_INFO[0].code);
  const [menCron, setMenCron] = useState<ZodiacInfo>(ZODIACS_INFO[0]);
  const [womenCron, setWomenCron] = useState<ZodiacInfo>(ZODIACS_INFO[0]);
  const [compatibility, setCompatibility] = useState<Partial<ZodiacCompatibilityType>>({});

  useEffect(() => {
    getCompatibility(ZODIACS_INFO[menCode].name, ZODIACS_INFO[womenCode].name).then(res => {
      console.log(res);
      if(res.code === 200){
        setCompatibility(res.data);
      }
    });
    setMenCron(ZODIACS_INFO[menCode]);
    setWomenCron(ZODIACS_INFO[womenCode]);
  }, [menCode, womenCode]);

  const zodiacOptions = ZODIACS_INFO.map(zodiac => ({
    label: zodiac.name,
    value: zodiac.code
  }));
  return (
    <Layout>
      <Sider width={300} className={styles.sider}>
        <Flex vertical gap={10}>
          <Typography.Title level={4}>
            选择两个星座
          </Typography.Title>
          <Typography.Text>
            选择星座: 男
          </Typography.Text>
          <Select value={menCode} options={zodiacOptions} onChange={setMenCode}></Select>
          <Typography.Text>
            选择星座: 女
          </Typography.Text>
          <Select value={womenCode} options={zodiacOptions} onChange={setWomenCode}></Select>
          <Space direction="vertical" size='middle' align="center" style={{
            marginTop: '1rem'
          }}>
            <HeartRate label="婚姻指数" value={compatibility.tcdj || 0} color="#c31c11"/>
            <HeartRate label="恋爱指数" value={compatibility.xiangyue || 0} color="#c31c11"/>
            <HeartRate label="综合评分" value={compatibility.zhishu || 0} color="#c31c11"/>
            <Typography.Title style={{
              color: 'var(--text-color)',
            }} level={5}>Tips: {compatibility.jieguo}</Typography.Title>
          </Space>
        </Flex>
      </Sider>
      <Content style={{ height: '60vh', margin: '1rem 2rem 0 2rem' }}>
        <Row align='middle'>
          <Col span={10}>
            <ZodiaxDetail cronInfo={menCron} />
          </Col>
          <Col span={4} style={{ textAlign: 'center', fontSize: '3rem', color: '#610ba3' }}>
            <ArrowRightOutlined />
          </Col>
          <Col span={10}>
            <ZodiaxDetail cronInfo={womenCron} />
          </Col>
        </Row>
        <Content style={{marginTop: '1rem'}}>
          <Flex justify="space-between" gap={10}>
            <CardDesc title="恋爱指南" width='50%' height='8rem' desc={compatibility.lianai} cronName={menCron.name} />
            <CardDesc title="注意事项" width='50%' height='8rem' desc={compatibility.zhuyi} cronName={womenCron.name} />
          </Flex>
        </Content>
      </Content>
    </Layout>
  );
}