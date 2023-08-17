import React, { useState, useEffect } from 'react'
import Navbar from '../../layout/Navbar'
import { Button, Checkbox, Input } from 'antd'
import './css/themdv.css'
import Header from '../../layout/Header';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchDataFromFirebaseDV, selectDV } from '../../store/dichVuSlice';
import { useSelector } from 'react-redux';
import { collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import TextArea from 'antd/es/input/TextArea';

const ttHoatDong = [{ value: 'Hoạt động', label: 'Hoạt động' }, { value: 'Ngưng hoạt động', label: 'Ngưng hoạt động' }];

function CapNhatDV() {
  const [maDV, setMaDV] = useState('');
  const [tenDV, setTenDV] = useState('');
  const [moTa, setMoTa] = useState('');
  const [trangThaiHD, setTrangThaiHD] = useState('');

  const [isTangTD, setIsTangTD] = useState(false);
  const [isPrefix, setIsPrefix] = useState(false);
  const [isSurfix, setIsSurfix] = useState(false);
  const [isReset, setIsReset] = useState(false);

  const dispatch = useDispatch();
  const { key } = useParams();

  useEffect(() => {
    dispatch(fetchDataFromFirebaseDV() as any);

    if (key) {
      dispatch(selectDV(key) as any);
    }
  }, [dispatch, key]);

  const selectedDV = useSelector((state: any) => state.dichVu.selectedDV);
  const navigate = useNavigate();

  const handleCapNhat = () => {
    const updatedData = {
      maDV,
      tenDV,
      moTa,
      trangThaiHD,
      isTangTD,
      isPrefix,
      isSurfix,
      isReset,
    };

    const dichVuCollection = collection(db, 'dichVu');
    const dichVuDoc = doc(dichVuCollection, key);

    getDoc(dichVuDoc)
      .then((docSnapshot) => {
        if (docSnapshot.exists()) {
          updateDoc(dichVuDoc, updatedData)
            .then(() => {
              console.log('Đã cập nhật dữ liệu thành công');
              dispatch(selectDV({ ...selectedDV, ...updatedData }) as any);
              setMaDV('');
              setTenDV('');
              setMoTa('');
              setTrangThaiHD('');
              setIsTangTD(false);
              setIsPrefix(false);
              setIsSurfix(false);
              setIsReset(false);
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
    if (selectedDV) {
      setMaDV(selectedDV.maDV || '');
      setTenDV(selectedDV.tenDV || '');
      setMoTa(selectedDV.moTa || '');
      setTrangThaiHD(selectedDV.trangThaiHD || '');
      setIsTangTD(selectedDV.isTangTD || '');
      setIsPrefix(selectedDV.isPrefix || '');
      setIsSurfix(selectedDV.isSurfix || '');
      setIsReset(selectedDV.isReset || '');

    }
  }, [selectedDV]);

  const handleHuy = () => {
    navigate('/dichvu');
  }

  return (
    <div style={{ display: 'flex' }}>
      <Navbar />
      <div className='right' style={{ backgroundColor: 'rgb(246,246,246,1)', width: '1225px' }}>
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
            <Button className='btnHuyBoThemDV' onClick={handleHuy}>Hủy bỏ</Button>
            <Button className='btnThemDVThem' onClick={handleCapNhat}>Thêm dịch vụ</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CapNhatDV