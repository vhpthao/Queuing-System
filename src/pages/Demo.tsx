import { Button, Modal } from 'antd';
import React, { useState } from 'react';
import './demo.css';

function Demo() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal visible={isModalOpen} footer={null} width={800} centered className="custom-modal">
        <div className="modal-content">
          <div className="bgTrang">
            <p>Số thứ tự được cấp</p>
            <p>2010001</p>
            <p>DV: Khám tổng quát</p>
          </div>
          <div className="bgCam">
            <p>tt</p>
            <p>tt</p>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Demo;
