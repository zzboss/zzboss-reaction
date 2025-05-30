import { HeartFilled } from "@ant-design/icons";
import { Space, Rate, Typography } from "antd";

const { Text } = Typography;
export default function HeartRate({
  value,
  color,
  label,
}: {
  value: number;
  color: string;
  label: string;
}) {
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
        value={value}
      />
    </Space>
  );
}
