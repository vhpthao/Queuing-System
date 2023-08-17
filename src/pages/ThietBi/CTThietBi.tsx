import React, { useEffect, useState } from 'react'
import Navbar from '../../layout/Navbar'
import Header from '../../layout/Header';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDataFromFirebase, selectTB } from '../../store/thietBiSlice'
import { useParams } from 'react-router-dom';


function CTThietBi() {
  const dispatch = useDispatch();
  const { key } = useParams();

  // Gọi fetchDataFromFirebase khi component được gắn kết
  useEffect(() => {
    dispatch(fetchDataFromFirebase() as any);

    if (key) {
      dispatch(selectTB(key) as any);
    }
  }, [dispatch, key]);

  const selectedTB = useSelector((state: any) => state.thietBi.selectedTB);

  useEffect(() => {
    if (selectedTB) {
      setMaTB(selectedTB.maTB || '');
      setLoaiTB(selectedTB.loaiTB || '');
      setTenTB(selectedTB.tenTB || '');
      setTenDN(selectedTB.tenDN || '');
      setDcIP(selectedTB.dcIP || '');
      setMatKhau(selectedTB.matKhau || '');
      setDvSD(selectedTB.dvSD || '');
    }
  }, [selectedTB]);

  const [maTB, setMaTB] = useState('');
  const [loaiTB, setLoaiTB] = useState('');
  const [tenTB, setTenTB] = useState('');
  const [tenDN, setTenDN] = useState('');
  const [dcIP, setDcIP] = useState('');
  const [matKhau, setMatKhau] = useState('');
  const [dvSD, setDvSD] = useState('');

  return (
    <div style={{ display: 'flex' }}>
      <Navbar />
      <div className='right' style={{ backgroundColor: 'rgb(246,246,246,1)', width: '1225px' }}>
        <Header />

        <p className='ttQLTB'>Quản lý thiết bị</p>

        <section className='scTTB'>
          <p className='lbTTTB' style={{ marginBottom: '20px' }}>Thông tin thiết bị</p>

          <div style={{ display: 'flex' }}>
            <p className='chuCTTBID' style={{ marginLeft: '20px' }}>Mã thiết bị:</p>
            <p>{maTB}</p>

            <p className='chuCTTBID' style={{ marginLeft: '450px' }}>Loại thiết bị:</p>
            <p>{loaiTB}</p>
          </div>

          <div style={{ display: 'flex' }}>
            <p className='chuCTTBID' style={{ marginLeft: '20px' }}>Tên thiết bị:</p>
            <p>{tenTB}</p>

            <p className='chuCTTBID' style={{ marginLeft: '415px' }}>Tên đăng nhập:</p>
            <p>{tenDN}</p>
          </div>

          <div style={{ display: 'flex' }}>
            <p className='chuCTTBID' style={{ marginLeft: '20px' }}>Địa chỉ IP:</p>
            <p>{dcIP}</p>

            <p className='chuCTTBID' style={{ marginLeft: '440px' }}>Mật khẩu:</p>
            <p>{matKhau}</p>
          </div>

          <p className='chuCTTBID' style={{ marginLeft: '-920px' }}>Dịch vụ sử dụng:</p>
          <p style={{ marginLeft: '-920px' }}><p>{dvSD}</p></p>

        </section>

      </div>
    </div>
  )
}

export default CTThietBi