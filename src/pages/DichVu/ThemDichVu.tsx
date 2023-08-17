import React, { useState } from 'react'
import Navbar from '../../layout/Navbar'
import { Button, Checkbox, Input, Select } from 'antd'
import './css/themdv.css'
import Header from '../../layout/Header';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import TextArea from 'antd/es/input/TextArea';

function ThemDichVu() {
  const [stt, setStt] = useState('');
  const [maDV, setMaDV] = useState('');
  const [tenDV, setTenDV] = useState('');
  const [moTa, setMoTa] = useState('');
  const [trangThaiHD, setTrangThaiHD] = useState('');


  const [isTangTD, setIsTangTD] = useState(false);
  const [isPrefix, setIsPrefix] = useState(false);
  const [isSurfix, setIsSurfix] = useState(false);
  const [isReset, setIsReset] = useState(false);

  const handleThemDV = async () => {
    const dichVu = {
      stt: stt,
      maDV: maDV,
      tenDV: tenDV,
      moTa: moTa,
      trangThaiHD: trangThaiHD,
      isTangTD: isTangTD,
      isPrefix: isPrefix,
      isSurfix: isSurfix,
      isReset: isReset,
    };

    try {
      const docRef = await addDoc(collection(db, 'dichVu'), dichVu);
      console.log('Thêm dịch vụ thành công. ID:', docRef.id);
      setStt('');
      setMaDV('');
      setTenDV('');
      setMoTa('');
      setTrangThaiHD('');
      setIsTangTD(false);
      setIsPrefix(false);
      setIsSurfix(false);
      setIsReset(false);

    } catch (error) {
      console.error('Lỗi khi thêm dịch vụ:', error);
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <Navbar />
      <div className='right' >
        <Header />

        <p className='nQLDVThemDV'>Quản lý dịch vụ</p>

        <div>
          <section className='bgThemDV'>
            <p className='nTTDV'>Thông tin dịch vụ</p>
            <div style={{ display: 'flex' }}>
              <div>
                <p className='nMaDV'>Mã dịch vụ <span style={{ color: 'red' }}>*</span></p>
                <Input size='large' className='ipMaDVThem' value={maDV} onChange={(e) => setMaDV(e.target.value)} />

                <p className='nTenDVThem'>Tên dịch vụ <span style={{ color: 'red' }}>*</span></p>
                <Input size='large' style={{ width: '450px', marginLeft: '30px' }} value={tenDV} onChange={(e) => setTenDV(e.target.value)} />
              </div>

              <div>
                <p className='nMoTaThem'>Mô tả</p>
                <TextArea size='large' className='ipMotaThem' value={moTa} onChange={(e) => setMoTa(e.target.value)} />

              </div>
            </div>

            <p className='nQuyTacCSThem'>Quy tắc cấp số</p>
            <div style={{ display: 'flex' }} className='kcQuyTacCS'>
              <Checkbox checked={isTangTD}
                onChange={(e) => setIsTangTD(e.target.checked)}>
                <div style={{ display: 'flex' }}>
                  <p className='nTangTDTu'>Tăng tự động từ: </p>
                  <Input size='large' className='ipTangTDTu' value={'0001'} />
                  <p className='nDen'>đến: </p>
                  <Input size='large' className='ipDen' value={'9999'} />
                </div>
              </Checkbox>
            </div>
            <div style={{ display: 'flex' }} className='kcQuyTacCS'>
              <Checkbox checked={isPrefix}
                onChange={(e) => setIsPrefix(e.target.checked)}>
                <div style={{ display: 'flex' }}>
                  <p className='nPrefixThem'>Prefix: </p>
                  <Input size='large' className='ipPrefixThem' value={'0001'} />
                </div>
              </Checkbox>
            </div>
            <div style={{ display: 'flex' }} className='kcQuyTacCS'>
              <Checkbox checked={isSurfix}
                onChange={(e) => setIsSurfix(e.target.checked)}>
                <div style={{ display: 'flex' }}>
                  <p className='nSurfixThem'>Surfix: </p>
                  <Input size='large' className='ipSurfixThem' value={'0001'} />
                </div>
              </Checkbox>

            </div>
            <div className='nResetMNThem kcQuyTacCS'>
              <Checkbox checked={isReset}
                onChange={(e) => setIsReset(e.target.checked)}>
                <p className='nResetMNn'>Reset mỗi ngày </p>
              </Checkbox>
            </div>
            <p className='nTruongBatBuocThemDV'><span style={{ color: 'red' }}>*</span> Là trường thông tin bắt buộc</p>
          </section>
          <div className='kcCacNutThemDV'>
            <Button className='btnHuyBoThemDV'>Hủy bỏ</Button>
            <Button className='btnThemDVThem' onClick={handleThemDV}>Thêm dịch vụ</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ThemDichVu
