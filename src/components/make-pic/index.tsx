/* eslint-disable react-hooks/rules-of-hooks */
import "./index.css";
import React, { useState } from "react";
import { Upload, Button, message, Modal, Col, Row } from "antd";
import { PlusOutlined } from "@ant-design/icons";

function getBase64(file: any) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

const mask =
  "data:image/png;base64,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";
const makePic: React.FC = () => {
  const [fileList, setFileList] = useState<any>([]);
  const [preImg, setPreImg] = useState({
    previewVisible: false,
    previewImage: "",
    previewTitle: "",
  });

  console.log(fileList, 111);

  const handlePreview = async (file: any) => {
    console.log(file);
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreImg({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle:
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
    });
  };

  const handleChange = async (data: { fileList: any }) => {
    if (data.fileList[0]) {
      data.fileList[0].preview = await getBase64(
        data.fileList[0]?.originFileObj
      );
    }

    setFileList(data.fileList);
  };

  const props = {
    onRemove: (file: any) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    fileList,
    beforeUpload: () => false,
    onPreview: handlePreview,
    onChange: handleChange,
  };

  const handleCancel = () =>
    setPreImg(Object.assign(preImg, { previewVisible: false }));

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  console.log(fileList[0]?.preview, 222);

  return (
    <>
      <Row>
        <Col span={12}>
          <div
            className="container"
            style={{
              background: ` url(${fileList[0]?.preview}) no-repeat center,
        url(${mask}) no-repeat center`,
            }}
          ></div>
        </Col>

        <Col span={12}>
          <Upload {...props} listType="picture-card" className="upload">
            {fileList.length >= 1 ? null : uploadButton}
          </Upload>
        </Col>
      </Row>

      {/* <Modal
        visible={preImg.previewVisible}
        title={preImg.previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img
          alt="example"
          style={{ width: "100%" }}
          src={preImg.previewImage}
        />
      </Modal> */}
    </>
  );
};

export default makePic;
