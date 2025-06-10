import { Flex, Space, Tag, Typography } from "antd";
import { ZodiacInfo } from "../../types/ZodiacType";
import styles from "@/views/zodiac/styles/compatibility/zodiacDetail.module.css";

export default function ZodiaxDetail({ cronInfo }: { cronInfo: ZodiacInfo }) {
  return (
    <Flex vertical style={{ width: "100%" }} justify="center" align="center">
      <Space.Compact direction="vertical" style={{ width: "100%", backgroundColor: '#1f0639' }}>
        <div
          className={styles.container}
          style={{ background: `var(--${cronInfo.attr})` }}
        >
          <Typography.Title level={4}>{cronInfo.name}</Typography.Title>
          <Typography.Text>{cronInfo.birthday}</Typography.Text>
        </div>
        <Flex>
          <Flex
            vertical
            gap={10}
            justify="center"
            align="center"
            className={styles.attrContainer}
          >
            <span style={{ color: `var(--${cronInfo.attr}-primary)` }}>元素属性</span>
            <h3 className={styles[cronInfo.attr]}>{cronInfo.element}</h3>
          </Flex>
          <Flex
            vertical
            gap={10}
            justify="center"
            align="center"
            className={styles.attrContainer}
          >
            <span style={{ color: `var(--${cronInfo.attr}-primary)` }}>守护星</span>
            <h3 className={styles[cronInfo.attr]}>
              {cronInfo.planetCh}({cronInfo.planet})
            </h3>
          </Flex>
        </Flex>
        <Flex style={{padding: '0 0 10px 20px'}}>
          {cronInfo.traits.map((trait) => (
            <Tag color={`var(--${cronInfo.attr}-secondary)`} key={cronInfo.name + '_' + trait}>{trait}</Tag>
          ))}
        </Flex>
      </Space.Compact>
    </Flex>
  );
}
