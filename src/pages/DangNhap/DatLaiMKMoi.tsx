import React, { useState } from 'react';
import { Button, Input } from 'antd';
import logo from '../img/logo.jpg';
import h2 from './h2.jpg'
import './datlaimkmoi.css'
import { useLocation, useNavigate } from 'react-router-dom';
import { updateDoc, doc, collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';

function DatLaiMKMoi() {
  const [matKhauMoi, setMatKhauMoi] = useState('');
  const [nhapLaiMatKhauMoi, setNhapLaiMatKhauMoi] = useState('');
  const [thongBao, setThongBao] = useState('');

  const [tenDangNhap, setTenDangNhap] = useState('');
  const [matKhau, setMatKhau] = useState('');

  const navigate = useNavigate();
  const location = useLocation();
  const email = new URLSearchParams(location.search).get('email');

  const handleXacNhan = async () => {
    if (matKhauMoi !== nhapLaiMatKhauMoi) {
      setThongBao('Mật khẩu mới không khớp. Vui lòng nhập lại.');
      return;
    }

    try {
      const usersCollection = collection(db, 'nguoiDung');
      const querySnapshot = await getDocs(usersCollection);

      const foundUser = querySnapshot.docs.find(doc => doc.data().email === email);

      if (foundUser) {
        const userDocRef = doc(usersCollection, foundUser.id);

        await updateDoc(userDocRef, { matKhau: matKhauMoi });

        console.log('Mật khẩu đã được cập nhật vào Firestore');

        if (email !== null) {
          setTenDangNhap(email);
        }

        setMatKhau(matKhauMoi);

        navigate('/dangnhap');
      } else {
        setThongBao('Email không tồn tại trong hệ thống.');
      }
    } catch (error) {
      console.error('Lỗi cập nhật mật khẩu:', error);
      setThongBao('Có lỗi xảy ra khi cập nhật mật khẩu. Vui lòng thử lại sau.');
    }
  };


  return (
    <div style={{ backgroundColor: 'var(--white, #FFF)' }}>
      <div className='DatLaiMKMoiLeft'>
        <div className='left'>
          <img src={logo} alt="logo" className='logo' />
          <p className='datlaimk' style={{ textAlign: 'center' }}>Đặt lại mật khẩu</p>
          <p style={{ float: 'left', marginLeft: '25px' }}>Mật khẩu *</p>
          <Input.Password value={matKhauMoi} onChange={(e) => setMatKhauMoi(e.target.value)} size='large' style={{ width: '400px' }} />
          <p style={{ float: 'left', marginLeft: '25px' }}>Nhập lại mật khẩu *</p>
          <Input.Password value={nhapLaiMatKhauMoi} onChange={(e) => setNhapLaiMatKhauMoi(e.target.value)} size='large' style={{ width: '400px' }} />
          {thongBao && <p style={{ color: 'red' }}>{thongBao}</p>}
          <Button className='btnXacNhan' onClick={handleXacNhan}>Xác nhận</Button>
        </div>
      </div>
      <div className='DatLaiMKMoiRight'>
        <img src={h2} alt="h22" className='h22' />
      </div>
    </div>
  );
}

export default DatLaiMKMoi;
