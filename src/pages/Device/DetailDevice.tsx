import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import Header from '../../components/Header';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDataFromFirebase, selectDevice } from '../../store/deviceSlice'
import { useParams } from 'react-router-dom';

function DetailDevice() {
  const dispatch = useDispatch();
  const { key } = useParams();

  useEffect(() => {
    dispatch(fetchDataFromFirebase() as any);

    if (key) {
      dispatch(selectDevice(key) as any);
    }
  }, [dispatch, key]);

  const selectedDevice = useSelector((state: any) => state.device.selectedDevice);

  useEffect(() => {
    if (selectedDevice) {
      setMaTB(selectedDevice.maTB || '');
      setLoaiTB(selectedDevice.loaiTB || '');
      setTenTB(selectedDevice.tenTB || '');
      setTenDN(selectedDevice.tenDN || '');
      setDcIP(selectedDevice.dcIP || '');
      setMatKhau(selectedDevice.matKhau || '');
      setDvSD(selectedDevice.dvSD || '');
    }
  }, [selectedDevice]);

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
      <div style={{ backgroundColor: 'rgb(246,246,246,1)', width: '1230px', height:'740px' }}>
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

export default DetailDevice
