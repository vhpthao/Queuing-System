import React, { useState } from 'react';
import { Button, Input } from 'antd';
import './dangnhap.css';
import logo from '../img/logo.jpg';
import h2 from '../img/h2.jpg';
import { useLocation, useNavigate } from 'react-router-dom';
import { updateDoc, doc, collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';

function DatLaiMKMoi() {
  const [matKhauMoi, setMatKhauMoi] = useState('');
  const [nhapLaiMatKhauMoi, setNhapLaiMatKhauMoi] = useState('');
  const [thongBao, setThongBao] = useState('');

  const [tenDangNhap, setTenDangNhap] = useState(''); // Thêm biến tại đây
  const [matKhau, setMatKhau] = useState(''); // Thêm biến tại đây

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
  
      // Tìm người dùng với email tương ứng trong Firestore
      const foundUser = querySnapshot.docs.find(doc => doc.data().email === email);
  
      if (foundUser) {
        const userDocRef = doc(usersCollection, foundUser.id);
  
        // Cập nhật mật khẩu mới vào Firestore
        await updateDoc(userDocRef, { matKhau: matKhauMoi });
  
        console.log('Mật khẩu đã được cập nhật vào Firestore');
  
        // Kiểm tra và sử dụng biến email trước khi gọi hàm setTenDangNhap
        if (email !== null) {
          setTenDangNhap(email);
        }
  
        // Cập nhật lại mã xác thực trước khi chuyển hướng đến trang đăng nhập
        setMatKhau(matKhauMoi);
  
        navigate('/dangnhap');
      } else {
        setThongBao('Email không tồn tại trong hệ thống.'); // Email không tồn tại
      }
    } catch (error) {
      console.error('Lỗi cập nhật mật khẩu:', error);
      setThongBao('Có lỗi xảy ra khi cập nhật mật khẩu. Vui lòng thử lại sau.');
    }
  };
  

  return (
    <div style={{ backgroundColor: 'var(--white, #FFF)' }}>
      <div className='bgLeft'>
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
      <div className='right'>
        <img src={h2} alt="h2" className='h2' />
      </div>
    </div>
  );
}

export default DatLaiMKMoi;
