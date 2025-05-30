import { Button, ConfigProvider } from "antd";
import useStyle from "../styles/cresteStyle";
import { ZodiacAttr } from "../types/ZodiacType";
import React from "react";

interface ZodiacButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  attr: ZodiacAttr;
  active: boolean;
  toActive?: () => void;
  children?: React.ReactNode;
}
export default function ZodiacButton({
  attr,
  active = false,
  className,
  toActive = () => {},
  children = null,
}: ZodiacButtonProps) {
  const { styles } = useStyle();
  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            defaultHoverColor: "white",
          },
        },
      }}
    >
      <Button
        onClick={toActive}
        className={[active ? styles[attr] : "", className].join(" ")}
      >
        {children}
      </Button>
    </ConfigProvider>
  );
}
