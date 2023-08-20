import React, { useState } from 'react';
import logo from '../img/logo.jpg';
import { Button, Input } from 'antd';
import './dangnhap.css';
import'./quenmk.css'
import h2 from './h2.jpg';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig'; 

function QuenMK() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleTiepTuc = async () => {
    try {
      const usersCollection = collection(db, 'nguoiDung'); 
      const q = query(usersCollection, where('email', '==', email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        navigate(`/datlaimkmoi?email=${encodeURIComponent(email)}`);
      } else {
        alert('Email không tồn tại');
      }
    } catch (error) {
      console.error('Lỗi khi kiểm tra email:', error);
    }
  };

  const handleHuy = () => {
    navigate('/dangnhap');
  }

  return (
    <div style={{ backgroundColor: 'var(--white, #FFF)' }}>
      <div className='QuenMKLeft'>
        <div className='left'>
          <img src={logo} alt="logo" className='logo' />
          <p className='datlaimk' style={{ textAlign: 'center' }}>Đặt lại mật khẩu</p>
          <p style={{ float: 'left', marginLeft: '25px' }}>Vui lòng nhập email để nhập lại mật khẩu của bạn *</p>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            width={20}
            size='large'
            className='ipEmailQuenMK'
          />
          <div style={{ display: 'flex' }} className='btnDLMK'>
            <Button className='btnHuy' onClick={handleHuy}>Hủy</Button>
            <Button className='btnTiepTuc' onClick={handleTiepTuc}>Tiếp tục</Button>
          </div>
        </div>
      </div>
      <div className='QuenMKRight'>
        <img src={h2} alt="h2" className='h2' />
      </div>
    </div>
  );
}

export default QuenMK;
