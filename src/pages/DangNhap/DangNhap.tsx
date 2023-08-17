import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Input } from 'antd';
import './dangnhap.css';
import logo from '../img/logo.jpg';
import h1 from '../img/h1.jpg';
import { db } from '../../firebase/firebaseConfig';
import { setCurrentUser } from '../../store/nguoiDungSlice';
import { Link, useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';

function DangNhap() {
  const [tenDangNhap, setTenDangNhap] = useState('');
  const [matKhau, setMatKhau] = useState('');
  const [thongBao, setThongBao] = useState('');

  const [tenDangNhapError, setTenDangNhapError] = useState(false);
  const [matKhauError, setMatKhauError] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDangNhap = async () => {
    try {
      const usersCollection = collection(db, 'nguoiDung');
      const querySnapshot = await getDocs(usersCollection);
      const foundUser = querySnapshot.docs.find(doc => doc.data().tenDN === tenDangNhap && doc.data().matKhau === matKhau);

      if (foundUser) {
        console.log('Found user:', foundUser.data());
        dispatch(setCurrentUser({
          hoTen: foundUser.data().hoTen,
          hinh: foundUser.data().hinh,
          vaiTro: '',
          trangThaiHD: '',
          tenDN: '',
          sdt: '',
          email: '',
          key: foundUser.id,
        }
        ));

        navigate('/trangchu');
      } else {
        setThongBao('Sai tên đăng nhập hoặc mật khẩu');
        setTenDangNhapError(true);
        setMatKhauError(true);
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
          <Input value={tenDangNhap} onChange={(e) => setTenDangNhap(e.target.value)} width={20} size='large'
            style={{
              width: '400px',
              borderColor: tenDangNhapError ? 'red' : undefined,
            }} />
          <p style={{ float: 'left', marginLeft: '25px' }}>Mật khẩu *</p>
          <Input.Password value={matKhau} onChange={(e) => setMatKhau(e.target.value)} size='large'
            style={{
              width: '400px',
              borderColor: tenDangNhapError ? 'red' : undefined,
            }} />
          {thongBao && <p style={{ color: 'red' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none" style={{ marginBottom: '-5px', marginRight: '5px' }}>
              <g clip-path="url(#clip0_83645_3505)">
                <path d="M10.228 18.8327C14.8304 18.8327 18.5613 15.1017 18.5613 10.4993C18.5613 5.89698 14.8304 2.16602 10.228 2.16602C5.62561 2.16602 1.89465 5.89698 1.89465 10.4993C1.89465 15.1017 5.62561 18.8327 10.228 18.8327Z" stroke="#E73F3F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M10.228 13.834H10.2364" stroke="#E73F3F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M10.228 7.16602V10.4993" stroke="#E73F3F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </g>
              <defs>
                <clipPath id="clip0_83645_3505">
                  <rect width="20" height="20" fill="white" transform="translate(0.228027 0.5)" />
                </clipPath>
              </defs>
            </svg>{thongBao}</p>}
          <Button className='btnDN' onClick={handleDangNhap}>Đăng nhập</Button>
          <Link to={'/quenmk'} style={{ textDecoration: 'none' }}><p className='lbForgetPW fontFamily'>Quên mật khẩu</p></Link>
        </div>
      </div>

      <div className='right' style={{ display: 'flex' }}>
        <img src={h1} alt="h1" className='h1' />
      </div>

    </div>
  );
}

export default DangNhap;
