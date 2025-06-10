import { HeartFilled } from "@ant-design/icons";
import { Space, Rate, Typography } from "antd";

const { Text } = Typography;
export default function HeartRate({
  value, // 百分制
  color,
  label,
}: {
  value: number | string;
  color: string;
  label: string;
}) {
  function getScore() {
    const score = typeof value === "string" ? parseInt(value) : value
    return Number((score / 20).toFixed(1))
  }
  return (
    <Space style={{
      padding: "0 10px",
    }}>
      <Text style={{ color: "var(--text-color)" }}>{label}: </Text>
      <Rate
        character={<HeartFilled />}
        style={{ color: color }}
        allowHalf
        disabled
        value={getScore()}
      />
    </Space>
  );
}
