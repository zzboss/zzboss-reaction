import {
  DownloadOutlined,
  FileJpgOutlined,
  ImportOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import ImgCrop from "antd-img-crop";
import { useEffect, useState } from "react";
import { MAX_THRESHOLD, transformImg, urlToBase64 } from "@/utils/imgUtils";
import { randomImgG } from "@/api/randomImg";
import styles from "./index.module.css";
import {
  Layout,
  Upload,
  Button,
  UploadProps,
  Image,
  Slider,
  InputNumber,
  Select,
  Empty,
  Typography,
  Flex,
  Space,
  Col,
  Row,
} from "antd";
import { addImage, deleteImageById, findAllImage } from "@/utils/dbUtils";
import PopImage from "@/views/imgTools/PopImage";
import { RcFile } from "antd/es/upload/interface";
import CardMain from "@/components/CardMain";
const { Sider, Content } = Layout;
const { Title, Text } = Typography;
export default function Home() {
  const [fileList, setFileList] = useState<{ url: string; id: number }[]>([]);
  const [curImgUrl, setCurImgUrl] = useState<string>("");
  const [orgImgUrl, setOrgImgUrl] = useState<string>("");
  const [mode, setMode] = useState(0);
  const [thresholdValue, setThresholdValue] = useState(30);
  // 初始化图片列表, 设置默认图片
  const initImageList = async () => {
    const imgList = await findAllImage();
    if (imgList && imgList.length) {
      setFileList([...imgList]);
      const { url } = imgList[0];
      setOrgImgUrl(url);
      setCurImgUrl(url);
      transForm(url);
    } else {
      loadRandomImg();
    }
  };

  useEffect(() => {
    initImageList();
  }, []);
  // 删除图片
  const del = (id: number) => {
    let img;
    const list = fileList.filter((v) => {
      if (v.id === id) {
        img = v.url;
      }
      return v.id != id;
    });
    if (orgImgUrl === img) {
      const url = fileList.length > 1 ? fileList[1].url : "";
      setOrgImgUrl(url);
      setCurImgUrl(url);
      if (url) {
        transForm(url);
      }
    }
    setFileList([...list]);
    deleteImageById(id);
  };
  // 加载图片
  const load = (url: string) => {
    setOrgImgUrl(url);
    transForm(url);
  };
  // 转换图片
  const transForm = async (originUrl: string) => {
    const url = await transformImg(mode, originUrl, thresholdValue);
    setCurImgUrl(url);
  };
  // 随机加载网络图片
  const loadRandomImg = () => {
    // randomImgG(Math.floor(Math.random() * 5))
    randomImgG(4).then(async (res) => {
      const url = res.data;
      const base64 = await urlToBase64(url);
      const id = await addImage(base64);
      setOrgImgUrl(base64);
      transForm(base64);
      setFileList([...fileList, { url: base64, id }]);
    });
  };
  // 通过 onBeforeUpload 拦截图片上传, 做本地图片预览
  /**
   * Handles file upload before it's sent to the server.
   * Reads the file as data URL, adds it to the image list, and sets it as current/original image.
   * @param file - The file to be uploaded
   * @returns false to prevent default upload behavior
   */
  const onBeforeUpload: UploadProps["beforeUpload"] = (file: RcFile) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const url = reader.result as string;
      addImage(url).then((id) => {
        setFileList([...fileList, { url: url, id }]);
        setCurImgUrl(url);
        setOrgImgUrl(url);
      });
    };
    return false;
  };
  const selectOptions = [
    { value: 0, label: "灰色图" },
    { value: 1, label: "黑白图" },
    { value: 2, label: "轮廓图" },
  ];
  const thresholdProps = {
    min: 1,
    max: MAX_THRESHOLD,
    step: 1,
  };
  // 图片下载
  const download = (url: string) => {
    const a = document.createElement("a");
    a.href = url;
    a.download = Date.now() + "";
    a.click();
  };

  function renderImgList() {
    // 通过 Row + Col 设置为一行两个
    const targetArr = [];
    const cols = 3;
    const sp = Math.floor(24 / cols);
    for (let i = 0; i < fileList.length; i += cols) {
      const row = new Array(cols).fill(0);
      for (let j = 0; j < cols; j++) {
        const target = fileList[i + j] || null;
        row[j] = target ? (
          <Col key={target.id} span={sp}>
            <PopImage
              del={() => del(target.id)}
              load={() => load(target.url)}
              imgProps={{
                src: target.url,
                preview: false,
                width: '100%',
                className: styles.img,
              }}
            />
          </Col>
        ) : (
          <Col key={'empty'} span={sp}></Col>
        );
      }
      targetArr.push(
        <Row
          className={styles.imgRow}
          gutter={10}
          justify={"space-evenly"}
          key={"row" + i}
        >
          {row}
        </Row>
      );
    }
    return targetArr;
  }

  return (
    <CardMain
      icon={<FileJpgOutlined />}
      title="图片处理"
      desc="上传图片转换为不同风格"
    >
      <Sider width={400} className={styles.sider}>
        <Flex
          gap={5}
          justify="space-evenly"
          style={{
            position: "sticky",
            top: 0,
            zIndex: 1,
            padding: "10px",
            background: "#111827",
          }}
        >
          <ImgCrop rotationSlider aspectSlider showReset>
            <Upload showUploadList={false} beforeUpload={onBeforeUpload}>
              <Button type="primary" size="large">
                <UploadOutlined /> 图片加载
              </Button>
            </Upload>
          </ImgCrop>
          <Button type="primary" size="large" onClick={loadRandomImg}>
            <ImportOutlined /> 随机图片
          </Button>
        </Flex>
        <Content className={styles.imgContainer}>
          {renderImgList()}
        </Content>
      </Sider>
      <Content className={styles.displayContainer}>
        <Flex justify="space-evenly" style={{ height: "100%", minWidth: '60vw', marginTop: '10vh' }}>
          <Flex vertical className={styles.mainImgContainer}>
            <Title level={4} className={styles.imgTitle}>
              原图
            </Title>
            {orgImgUrl ? (
              <Image
                className={styles.mainImg}
                width="20vw"
                height="25vh"
                src={orgImgUrl}
              />
            ) : (
              <Empty className={styles.empty} />
            )}
            <Content
              style={{ width: "20vw", marginLeft: "2rem", marginTop: "1rem" }}
            >
              <Space>
                <Text className={styles.label}>转换模式</Text>
                <Select
                  style={{
                    width: "15vw",
                    letterSpacing: 0,
                    color: "white",
                  }}
                  options={selectOptions}
                  onChange={setMode}
                  value={mode}
                />
              </Space>
              <Space style={{ marginTop: "1rem" }}>
                <Button type="primary" onClick={() => transForm(orgImgUrl)}>
                  <FileJpgOutlined />
                  开始转换
                </Button>
                <Button type="primary" onClick={() => download(orgImgUrl)}>
                  <DownloadOutlined />
                  保存图片
                </Button>
              </Space>
            </Content>
          </Flex>
          <Flex vertical className={styles.mainImgContainer}>
            <Title level={4} className={styles.imgTitle}>
              {selectOptions[mode].label}
            </Title>
            {curImgUrl ? (
              <Image
                className={styles.mainImg}
                width="20vw"
                height="25vh"
                src={curImgUrl}
              />
            ) : (
              <Empty className={styles.empty} />
            )}
            <Content style={{ width: "20vw", marginLeft: "2rem" }}>
              <Space style={{ marginTop: 10 }}>
                <Text className={styles.label}>处理阈值</Text>
                <Slider
                  value={thresholdValue}
                  style={{ width: "10vw" }}
                  onChange={(val) => setThresholdValue(val)}
                  {...thresholdProps}
                />
                <InputNumber
                  onChange={(val) => setThresholdValue(val || 1)}
                  value={thresholdValue}
                  {...thresholdProps}
                  precision={0}
                  style={{ width: "4vw" }}
                />
              </Space>
              <Space style={{ marginTop: 10 }}>
                <Button type="primary" onClick={() => transForm(orgImgUrl)}>
                  <FileJpgOutlined />
                  开始转换
                </Button>
                <Button type="primary" onClick={() => download(curImgUrl)}>
                  <DownloadOutlined />
                  保存图片
                </Button>
              </Space>
            </Content>
          </Flex>
        </Flex>
      </Content>
    </CardMain>
  );
}
