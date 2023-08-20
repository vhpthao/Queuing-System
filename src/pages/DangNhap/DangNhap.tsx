import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Input } from 'antd';
import './dangnhap.css';
import logo from '../img/logo.jpg';
import h1 from './h1.jpg'
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
      const foundUser = querySnapshot.docs.find(
        doc => doc.data().tenDN === tenDangNhap && doc.data().matKhau === matKhau
      );

      if (foundUser) {
        console.log('Found user:', foundUser.data());
        const userData = {
          hoTen: foundUser.data().hoTen,
          hinh: foundUser.data().hinh,
          vaiTro: foundUser.data().vaiTro,
          trangThaiHD: foundUser.data().trangThaiND,
          tenDN: foundUser.data().tenDN,
          sdt: foundUser.data().sdt,
          email: foundUser.data().email,
          matKhau: foundUser.data().matKhau,
          key: foundUser.id,
        };

        // Đăng nhập thành công, cập nhật trạng thái người dùng trong Redux
        dispatch(setCurrentUser(userData));

        // Chuyển hướng người dùng đến trang chủ
        navigate('/trangchu');
      } else {
        // Tên đăng nhập hoặc mật khẩu không đúng
        setThongBao('Sai tên đăng nhập hoặc mật khẩu');
        setTenDangNhapError(true);
        setMatKhauError(true);
      }
    } catch (error) {
      console.error('Lỗi khi đăng nhập', error);
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--white, #FFF)', display: 'flex' }}>
      <div className='bgLeftDNN'>
        <div className='left'>
          <img src={logo} alt="logo" className='logo' />
          <p style={{ float: 'left', marginLeft: '25px' }}>Tên đăng nhập *</p>
          <Input
            value={tenDangNhap}
            onChange={(e) => setTenDangNhap(e.target.value)}
            width={20}
            size='large'
            style={{
              width: '400px',
              borderColor: tenDangNhapError ? 'red' : undefined,
            }}
          />
          <p style={{ float: 'left', marginLeft: '25px' }}>Mật khẩu *</p>
          <Input.Password
            value={matKhau}
            onChange={(e) => setMatKhau(e.target.value)}
            size='large'
            style={{
              width: '400px',
              borderColor: matKhauError ? 'red' : undefined,
            }}
          />
          {thongBao && (
            <p style={{ color: 'red' }}>
              {thongBao}
            </p>
          )}
          <Button className='btnDN' onClick={handleDangNhap}>
            Đăng nhập
          </Button>
          <Link to={'/quenmk'} style={{ textDecoration: 'none' }}>
            <p className='lbForgetPW fontFamily'>Quên mật khẩu</p>
          </Link>
        </div>
      </div>

      <div className='' style={{ display: 'flex', background: 'white' }}>
        <img src={h1} alt="h1" className='h1' />
        <div className='chuTrenH'>
          <p className='nHeThongDN'>Hệ thống</p>
          <p className='nQLXHDN'>QUẢN LÝ XẾP HÀNG</p>
        </div>
      </div>
    </div>
  );
}

export default DangNhap;
