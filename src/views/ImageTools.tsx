import { PlusOutlined } from "@ant-design/icons";
import ImgCrop from "antd-img-crop";
import "@ant-design/v5-patch-for-react-19";
import { useEffect, useState } from "react";
import { MAX_THRESHOLD, transformImg, urlToBase64 } from "../utils/imgUtils";
import { RcFile } from "antd/es/upload";
import { randomImgG } from "../api/randomImg";
import styles from "@/styles/imageTools.module.css";
import {
  Layout,
  Upload,
  Button,
  UploadProps,
  Image,
  Slider,
  InputNumber,
  Row,
  Col,
  Form,
  Select,
  Empty,
} from "antd";
import { addImage, deleteImageById, findAllImage } from "../utils/dbUtils";
import PopImage from "./imgTools/PopImage";
const { Sider, Content } = Layout;
export default function Home() {
  const [fileList, setFileList] = useState<{ url: string; id: number }[]>([]);
  const [curImgUrl, setCurImgUrl] = useState<string>("");
  const [orgImgUrl, setOrgImgUrl] = useState<string>("");
  const [mode, setMode] = useState(0);
  const [thresholdValue, setThresholdValue] = useState(30);
  useEffect(() => {
    initImageList();
  }, []);
  const initImageList = async () => {
    const imgList = await findAllImage();
    if (imgList && imgList.length) {
      const { url } = imgList[0];
      setOrgImgUrl(url);
      setCurImgUrl(url);
      setFileList([...imgList]);
    }
  };
  const del = (id: number) => {
    let img;
    const list = fileList.filter((v) => {
      if (v.id === id) {
        img = v.url;
      }
      return v.id != id;
    });
    if (curImgUrl === img) {
      const url = fileList.length > 1 ? fileList[1].url : "";
      setCurImgUrl(url);
      setOrgImgUrl(url);
    }
    setFileList([...list]);
    deleteImageById(id);
  };
  const load = (url: string) => {
    setCurImgUrl(url);
    setOrgImgUrl(url);
  };
  const transForm = async () => {
    const url = await transformImg(mode, orgImgUrl, thresholdValue);
    setCurImgUrl(url);
  };
  const loadRandomImg = () => {
    // randomImgG(Math.floor(Math.random() * 5))
    randomImgG(4).then((res) => {
      addImgToList(res.data);
    });
  };
  const addImgToList = async (url: string) => {
    const base64 = await urlToBase64(url);
    const id = await addImage(base64);
    setOrgImgUrl(base64);
    setCurImgUrl(base64);
    setFileList([...fileList, { url: base64, id }]);
  };
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
    { value: 2, label: "灰色转轮廓图" },
    { value: 3, label: "彩色转轮廓图" },
  ];
  const thresholdProps = {
    min: 1,
    max: MAX_THRESHOLD,
    step: 1,
  };
  const onThresholdValueChange = (val: number | null) => {
    setThresholdValue(val || 1);
  };
  const download = () => {
    const a = document.createElement("a");
    a.href = curImgUrl;
    a.download = Date.now() + "";
    a.click();
  };

  return (
    <Layout>
      <Sider className={styles.sider}>
        <div className={styles.uploadBtn}>
          <ImgCrop rotationSlider aspectSlider showReset>
            <Upload showUploadList={false} beforeUpload={onBeforeUpload}>
              <Button type="primary" size="small">
                <PlusOutlined />
                本地
              </Button>
            </Upload>
          </ImgCrop>
          <Button
            type="primary"
            size="small"
            style={{ marginLeft: 10 }}
            onClick={loadRandomImg}
          >
            随机图片
          </Button>
        </div>
        <Content className={styles.imgContainer}>
          {fileList.map((v) => (
            <PopImage
              key={v.id}
              del={() => del(v.id)}
              load={() => load(v.url)}
              imgProps={{
                src: v.url,
                preview: false,
                width: 75,
                height: 75,
                className: styles.img,
              }}
            />
          ))}
        </Content>
      </Sider>
      <Content className={styles.content}>
        {curImgUrl ? (
          <Image
            className={styles.mainImg}
            width="40vw"
            height="50vh"
            src={curImgUrl}
          />
        ) : (
          <Empty className={styles.empty} />
        )}

        <Form
          size="small"
          style={{ width: "30vw", marginTop: "10px", letterSpacing: 1 }}
          labelAlign="right"
          labelWrap={true}
        >
          <Form.Item label="转换模式">
            <Select
              style={{ width: "10vw", letterSpacing: 0 }}
              options={selectOptions}
              onChange={setMode}
              value={mode}
            />
          </Form.Item>
          <Form.Item label="近似阈值">
            <Row>
              <Col span={12}>
                <Slider
                  value={thresholdValue}
                  style={{ width: "10vw" }}
                  onChange={onThresholdValueChange}
                  {...thresholdProps}
                />
              </Col>
              <Col span={4}>
                <InputNumber
                  onChange={onThresholdValueChange}
                  value={thresholdValue}
                  {...thresholdProps}
                  precision={0}
                />
              </Col>
            </Row>
          </Form.Item>
          <Form.Item>
            <Row>
              <Col span={6}>
                <Button type="primary" size="middle" onClick={transForm}>
                  开始转换
                </Button>
              </Col>
              <Col span={6}>
                <Button type="primary" size="middle" onClick={download}>
                  下载
                </Button>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </Content>
    </Layout>
  );
}
