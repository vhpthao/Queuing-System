import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import { Button, Modal, Select } from 'antd';
import moment from 'moment';
import Header from '../../components/Header';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import {NguoiDungState as UserState} from '../../store/userSlice'
import { setIsUpdating, setLastSTT } from '../../store/giveNumberSlice';
import './giveNewNumber.css';

const dichvuSD = [
  { value: 'Khám mắt', label: 'Khám mắt' },
  { value: 'Khám tai mũi họng', label: 'Khám tai mũi họng' },
  { value: 'Khám tổng quát', label: 'Khám tổng quát' },
];

const customArrow = (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M6 9L12 15L18 9" fill="#FF7506" />
    <path
      d="M6 9L12 15L18 9H6Z"
      stroke="#FF7506"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

interface RootState {
  user: UserState;
}

function GiveNewNumber() {
  const dispatch = useDispatch<Dispatch>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedDichVu, setSelectedDichVu] = useState('');
  const [nextSoThuTu, setNextSoThuTu] = useState('');

  const giveNumberList = useSelector((state: any) => state.giveNumber.giveNumberList);
  const lastSTT = useSelector((state: any) => state.giveNumber.lastSTT);

  const [tgCap, setTgCap] = useState(moment().format('HH:mm'));
  const [ngayCap, setNgayCap] = useState(moment().format('DD/MM/YYYY'));
  const [tgSD, setTgSD] = useState(moment().format('17:00'));
  const [ngaySD, setNgaySD] = useState(moment().format('DD/MM/YYYY'));

  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleInSo = async () => {
    if (!selectedDichVu) {
      console.log('Please select a service');
      return;
    }

    const dichVu = dichvuSD.find((dichvu) => dichvu.value === selectedDichVu);
    if (!dichVu) {
      console.log('Invalid service');
      return;
    }

    try {
      const nextSoThuTuValue = (lastSTT + 1).toString().padStart(4, '0'); 
      setNextSoThuTu(nextSoThuTuValue);

      const capSoItem = {
        stt: nextSoThuTuValue,
        tenDV: selectedDichVu,
        tgCap: moment().format('HH:mm'),
        ngayCap: moment().format('DD/MM/YYYY'),
        tgSD: '17:00',
        ngaySD: moment().format('DD/MM/YYYY'),
        trangThai: 'Đang chờ',
        nguonCap: 'Hệ thống',
      };

      setTgCap(moment().format('HH:mm'));
      setNgayCap(moment().format('DD/MM/YYYY'));
      setNgaySD(moment().format('DD/MM/YYYY'));

      const docRef = await addDoc(collection(db, 'capSo'), capSoItem);
      console.log('Cấp số thành công. ID:', docRef.id);

      await taoLogTB();

      dispatch(setIsUpdating(true));
      dispatch(setLastSTT(parseInt(nextSoThuTuValue, 10)));
    } catch (error) {
      console.error('Lỗi khi cấp số:', error);
    }
    showModal();
  };

   // Hàm tạo log để lưu dữ liệu khi cấp số mới
   const taoLogTB = async () => {
    const logEntry = {
      hoTen: 'Huỳnh Lam Minh',
      tgCapSoMoi: moment().format('HH:mm'),
      ngayCapSoMoi: moment().format('DD/MM/YYYY'),
    };
  
    try {
      await addDoc(collection(db, 'thongBao'), logEntry);
    } catch (error) {
      console.error('Lỗi khi tạo log:', error);
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <Navbar />
      <div className="right" style={{ backgroundColor: 'rgb(246,246,246,1)', width: '1231px', height:'740px'}}>
        <style>
          {`
    .ant-table-thead th {
      background-color: orange !important;
      color: white !important;
    }

    .ant-table-thead>tr>th {
      background: #fdfdfd;
      color: white;
    } 
  `}
        </style>
        <div>
          <Header />
          <p className="tieude">Quản lý cấp số</p>
          <div>
            <section className="scCapSoMoi">
              <p className="lbCapSoMoi">CẤP SỐ MỚI</p>
              <p style={{ fontWeight: '600' }}>Dịch vụ khách hàng lựa chọn</p>
              <Select
                style={{ width: 350, textAlign: 'left' }}
                options={dichvuSD.map((dichvu) => ({ value: dichvu.value, label: dichvu.label }))}
                size="large"
                placeholder="Chọn dịch vụ"
                onChange={(value) => setSelectedDichVu(value)}
                suffixIcon={customArrow}
              />
              <div style={{ display: 'flex', marginLeft: '420px', marginTop: '30px' }}>
                <Button className="btnHuyBoCSM">Hủy bỏ</Button>
                <Button className="scbtnInso" onClick={handleInSo}>
                  In số
                </Button>
              </div>
            </section>
          </div>
        </div>
        <Modal
          visible={isModalVisible}
          footer={null}
          onCancel={handleCancel} style={{textAlign:'center'}} className="rounded-modal custom-modal">
            <div className='modal-conten'>
          <div className='bgTrang'>
          <p className='nSTTDuocCap'>Số thứ tự được cấp</p>
          <p className='STT'>{nextSoThuTu}</p> 
          <p className='nDichVu'>DV: {selectedDichVu}</p>
          </div>
          <div className='bgCam'>
            <p className='chuTrang'>Thời gian cấp: {tgCap} - {ngayCap}</p>
            <p className='chuTrang'>Hạn sử dụng: {tgSD} - {ngaySD}</p>
          </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default GiveNewNumber;
