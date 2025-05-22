import { Button, Image, ImageProps, Popover } from "antd";
import { useState } from "react";

type OnEvent = () => void;
export default function PopImage({
  load,
  del,
  imgProps,
}: {
  load: OnEvent;
  del: OnEvent;
  imgProps: ImageProps;
}) {
  const [open, setOpen] = useState(false);
  const wrapLoad = () => {
    load();
    setOpen(false);
  };
  return (
    <Popover
      placement="right"
      trigger="click"
      open={open}
      onOpenChange={setOpen}
      color="var(--header-bg)"
      content={
        <div style={{ width: '100%', display: "flex", flexDirection: "column", gap: 5, }}>
          <Button type="primary" size="small" onClick={() => wrapLoad()}>
            加载
          </Button>
          <Button type="primary" size="small" onClick={() => del()}>
            删除
          </Button>
        </div>
      }
    >
      <Image {...imgProps} onClick={() => null} />
    </Popover>
  );
}
