import React, { useState, useEffect } from 'react';
import Navbar from '../../layout/Navbar';
import { Button, Input, Select } from 'antd';
import { useParams, useNavigate } from 'react-router-dom'; // Sử dụng useNavigate
import Header from '../../layout/Header';
import '././css/themNcapnhat.css'

import { useDispatch, useSelector } from 'react-redux';
import { fetchDataFromFirebase, selectTB } from '../../store/thietBiSlice';
import { updateDoc, doc, getDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';


const loaiThietBi = [{ value: 'Kiosk', label: 'Kiosk' }, { value: 'Display counter', label: 'Display counter' }];
const dichvuSD = [{ value: 'Khám tổng quát', label: 'Khám tổng quát' }, { value: 'Khám tai mũi họng', label: 'Khám tai mũi họng' },  { value: 'Khám mắt', label: 'Khám mắt' }];

function CapNhatTB() {
  const dispatch = useDispatch();
  const { key } = useParams();

  useEffect(() => {
    dispatch(fetchDataFromFirebase() as any);

    if (key) {
      dispatch(selectTB(key) as any);
    }
  }, [dispatch, key]);

  const selectedTB = useSelector((state: any) => state.thietBi.selectedTB);
  const navigate = useNavigate();

  const [maTB, setMaTB] = useState('');
  const [loaiTB, setLoaiTB] = useState('');
  const [tenTB, setTenTB] = useState('');
  const [tenDN, setTenDN] = useState('');
  const [ttHD, setTtHD] = useState('');
  const [ttKN, setTtKN] = useState('');
  const [dcIP, setDcIP] = useState('');
  const [matKhau, setMatKhau] = useState('');
  const [dvSD, setDvSD] = useState('');

  const handleCapNhat = () => {
    const updatedData = {
      maTB,
      loaiTB,
      tenTB,
      tenDN,
      ttHD,
      ttKN,
      dcIP,
      matKhau,
      dvSD,
    };

    const thietBiCollection = collection(db, 'thietBi');
    const thietBiDoc = doc(thietBiCollection, key);
  getDoc(thietBiDoc)
  .then((docSnapshot) => {
    if (docSnapshot.exists()) {
      updateDoc(thietBiDoc, updatedData)
        .then(() => {
          console.log('Đã cập nhật dữ liệu thành công');
      dispatch(selectTB({ ...selectedTB, ...updatedData }) as any);
          setMaTB('');
          setLoaiTB('');
          setTenTB('');
          setTenDN('');
          setTtHD('');
          setTtKN('');
          setDcIP('');
          setMatKhau('');
          setDvSD('');
        })
        .catch((error) => {
          console.error('Lỗi khi cập nhật dữ liệu:', error);
        });
    } else {
      console.log('Không tìm thấy dữ liệu');
    }
  })
  .catch((error) => {
    console.error('Lỗi khi truy vấn dữ liệu:', error);
  });
};

  useEffect(() => {
    if (selectedTB) {
      setMaTB(selectedTB.maTB || '');
      setLoaiTB(selectedTB.loaiTB || '');
      setTenTB(selectedTB.tenTB || '');
      setTenDN(selectedTB.tenDN || '');
      setTtHD(selectedTB.ttHD || '');
      setTtKN(selectedTB.ttKN || '');
      setDcIP(selectedTB.dcIP || '');
      setMatKhau(selectedTB.matKhau || '');
      setDvSD(selectedTB.dvSD || '');
    }
  }, [selectedTB]);

  const handleHuy = () => {
    navigate('/thietbi');
  }

  return (
    <div style={{ display: 'flex' }}>
      <Navbar />
      <div className='right' style={{ backgroundColor: 'rgb(246,246,246,1)', width: '1225px' }}>
        <Header />
        <p className='nQuanLyTTTB'>Quản lý thiết bị</p>
<div>
  <section className='scThemTB'>
    <p className='nThongTinTB'>Thông tin thiết bị</p>
    <div style={{ display: 'flex' }}>
      <div>
        <p className='nMaTB'>
          Mã thiết bị <span style={{ color: 'red' }}>*</span>
        </p>
        <Input size='large' className='ipMaTB' value={maTB} onChange={(e) => setMaTB(e.target.value)} />
      </div>

      <div className='kcLoaiTB'>
        <p className='nLoaiTB'>
          Loại thiết bị <span style={{ color: 'red' }}>*</span>
        </p>
        <Select
          placeholder='Chọn loại thiết bị'
          style={{ width: 500, textAlign: 'left' }}
          options={loaiThietBi}
          size='large'
          value={loaiTB || undefined}
          onChange={(value) => setLoaiTB(value)}
        />
      </div>
    </div>
    <div style={{ display: 'flex' }}>
      <div>
        <p className='nTenTB'>
          Tên thiết bị <span style={{ color: 'red' }}>*</span>
        </p>
        <Input size='large' className='ipTenTB' value={tenTB} onChange={(e) => setTenTB(e.target.value)} />
      </div>

      <div className='kcTenDN'>
        <p className='nTenDN'>
          Tên đăng nhập <span style={{ color: 'red' }}>*</span>
        </p>
        <Input size='large' className='ipTenDN' value={tenDN} onChange={(e) => setTenDN(e.target.value)} />
      </div>
    </div>
    <div style={{ display: 'flex' }}>
      <div>
        <p className='nDiaChiIP'>
          Địa chỉ IP <span style={{ color: 'red' }}>*</span>
        </p>
        <Input size='large' className='ipDiaChiIP' value={dcIP} onChange={(e) => setDcIP(e.target.value)} />
      </div>

      <div className='kcMatKhau'>
        <p className='nMatKhau'>
          Mật khẩu <span style={{ color: 'red' }}>*</span>
        </p>
        <Input size='large' className='ipMatKhau' value={matKhau} onChange={(e) => setMatKhau(e.target.value)} />
      </div>
    </div>

    <div style={{ display: 'flex' }}>
      <div>
        <p className='nDichVuSD'>
          Dịch vụ sử dụng <span style={{ color: 'red' }}>*</span>
        </p>
        <Select
          placeholder='Chọn dịch vụ sử dụng'
          className='slDichVuSD'
          options={dichvuSD}
          size='large'
          value={dvSD || undefined}
          onChange={(value) => setDvSD(value)}
        />
        <br />
        <div className='kcBatBuoc'>
          <span className='nSaoBBThem'>* </span>
          <p className='nBBThem'>Là trường thông tin bắt buộc</p>
        </div>
      </div>
    </div>
  </section>
  <div className='kcCacNut'>
    <Button className='btnHuyBo' onClick={handleHuy}>Hủy bỏ</Button>
    <Button className='btnThemTBThem' onClick={handleCapNhat}>
      Cập nhật
    </Button>
  </div>
        </div>
      </div>
    </div>
  );
}

export default CapNhatTB;
