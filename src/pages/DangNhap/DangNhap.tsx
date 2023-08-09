import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Input } from 'antd';
import '../css/dangnhap.css';
import logo from '../img/logo.jpg';
import h1 from '../img/logo.jpg';
import { db } from '../../firebase/firebaseConfig';
import { setUser } from '../../store/nguoiDungSlice';
import { Link, useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';

function DangNhap() {
  const [tenDangNhap, setTenDangNhap] = useState('');
  const [matKhau, setMatKhau] = useState('');
  const [thongBao, setThongBao] = useState('');

  const dispatch = useDispatch(); 
  const navigate = useNavigate(); 

  const handleDangNhap = async () => {
    try {
  // Kiểm tra tên đăng nhập và mật khẩu với dữ liệu trong Firestore
  const usersCollection = collection(db, 'nguoiDung'); 
  const querySnapshot = await getDocs(usersCollection);
  const foundUser = querySnapshot.docs.find(doc => doc.data().tenDN === tenDangNhap && doc.data().matKhau === matKhau);

  if (foundUser) {
    // Đăng nhập thành công, cập nhật trạng thái người dùng trong Redux
    dispatch(setUser({ tenNguoiDung: foundUser.data().tenNguoiDung, matKhau: '' }));

    navigate('/ttcanhan'); 
  } else {
    // Tên đăng nhập hoặc mật khẩu không đúng
    setThongBao('Sai tên đăng nhập hoặc mật khẩu');
  }
} catch (error) {
  console.error('Lỗi khi đăng nhập', error);
}
  };

  return (
    <div style={{ backgroundColor: 'var(--white, #FFF)' }}>
      <div className='bgLeft'>
        <div className='left'>
          <img src={logo} alt="logo" className='logo' />
          <p style={{ float: 'left', marginLeft: '25px' }}>Tên đăng nhập *</p>
          <Input value={tenDangNhap} onChange={(e) => setTenDangNhap(e.target.value)} width={20} size='large' style={{ width: '400px' }} />
          <p style={{ float: 'left', marginLeft: '25px' }}>Mật khẩu *</p>
          <Input.Password value={matKhau} onChange={(e) => setMatKhau(e.target.value)} size='large' style={{ width: '400px' }} />
          {thongBao && <p style={{ color: 'red' }}>{thongBao}</p>}
          <Button className='btnDN' onClick={handleDangNhap}>Đăng nhập</Button>
          <Link to={'/quenmk'} style={{textDecoration:'none'}}><p className='lbForgetPW fontFamily'>Quên mật khẩu</p></Link>
        </div>
      </div>

      <div className='right' style={{ display: 'flex' }}>
        <img src={h1} alt="h1" className='h1' />
      </div>

    </div>
  );
}

export default DangNhap;
