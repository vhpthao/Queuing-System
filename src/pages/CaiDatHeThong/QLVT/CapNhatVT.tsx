import React, { useEffect, useState } from 'react'
import Navbar from '../../../layout/Navbar'
import '../../css/thietbi.css'
import '../../css/dichvu.css'
import '../../css/capso.css'
import '../../css/vaitro.css'
import { Button, Checkbox, Input, } from 'antd'
import Header from '../../../layout/Header'
import TextArea from 'antd/es/input/TextArea'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { fetchDataFromFirebase, selectVT } from '../../../store/vaiTroSlice'
import { collection, doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '../../../firebase/firebaseConfig'

function CapNhatVT() {
  const dispatch = useDispatch();
  const { key } = useParams();

  useEffect(() => {
    dispatch(fetchDataFromFirebase() as any);

    if (key) {
      dispatch(selectVT(key) as any);
    }
  }, [dispatch, key]);

  const selectedVT = useSelector((state: any) => state.vaiTro.selectedVT);
  const navigate = useNavigate();

  const [tenVT, setTenVT] = useState('');
  const [moTa, setMoTa] = useState('');


  const [isSelectedTCA, setIsSelectedTCA] = useState(false);
  const [isSelectedXA, setIsSelectedXA] = useState(false);
  const [isSelectedYA, setIsSelectedYA] = useState(false);
  const [isSelectedZA, setIsSelectedZA] = useState(false);

  const [isSelectedTCB, setIsSelectedTCB] = useState(false);
  const [isSelectedXB, setIsSelectedXB] = useState(false);
  const [isSelectedYB, setIsSelectedYB] = useState(false);
  const [isSelectedZB, setIsSelectedZB] = useState(false);

  const handleCapNhat = () => {
    const updatedData = {
      tenVT,
      moTa,
      isSelectedTCA,
      isSelectedXA,
      isSelectedYA,
      isSelectedZA,
      isSelectedTCB,
      isSelectedXB,
      isSelectedYB,
      isSelectedZB,

    };

    const vaiTroCollection = collection(db, 'vaiTro');
    const vaiTroDoc = doc(vaiTroCollection, key);

    getDoc(vaiTroDoc)
      .then((docSnapshot) => {
        if (docSnapshot.exists()) {
          updateDoc(vaiTroDoc, updatedData)
            .then(() => {
              console.log('Đã cập nhật dữ liệu thành công');
              dispatch(selectVT({ ...selectedVT, ...updatedData }) as any);
              setTenVT('');
              setMoTa('');
              setIsSelectedTCA(false);
              setIsSelectedXA(false);
              setIsSelectedYA(false);
              setIsSelectedZA(false);
              setIsSelectedTCB(false);
              setIsSelectedXB(false);
              setIsSelectedYB(false);
              setIsSelectedZB(false);
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
    if (selectedVT) {
      setTenVT(selectedVT.tenVT || '');
      setMoTa(selectedVT.moTa || '');

      setIsSelectedTCA(selectedVT.isSelectedTCA || false);
      setIsSelectedXA(selectedVT.isSelectedXA || false);
      setIsSelectedYA(selectedVT.isSelectedYA || false);
      setIsSelectedZA(selectedVT.isSelectedZA || false);

      setIsSelectedTCB(selectedVT.isSelectedTCB || false);
      setIsSelectedXB(selectedVT.isSelectedXB || false);
      setIsSelectedYB(selectedVT.isSelectedYB || false);
      setIsSelectedZB(selectedVT.isSelectedZB || false);


    }
  }, [selectedVT]);

  const handleHuy = () => {
    navigate('/thietbi');
  }

  return (
    <div style={{ display: 'flex' }}>
      <Navbar />
      <div className='right' style={{ backgroundColor: 'rgb(246,246,246,1)', width: '1225px' }}>
        <style>
          {`
    .ant-table-thead th {
      background-color: orange !important;
      color: white !important;

    }

    .ant-table-thead>tr>th {
      background: #fdfdfd;
      color: white;
    }
  `}
        </style>
        <div>
          <Header />
          <p className='tieude'>Danh sách vai trò</p>
          <section className='scThemVaiTro' >
            <p className='lbTTVT'>Thông tin vai trò</p>
            <div style={{ display: 'flex' }}>
              <div className='themVTLeft'>
                <div style={{ display: 'flex' }}>
                  <p>Tên vai trò <span style={{ color: 'red' }}>*</span></p>
                </div>
                <Input placeholder='Nhập tên vai trò' className='ipTVT' value={tenVT} onChange={(e) => setTenVT(e.target.value)} />
                <p style={{ marginLeft: '-350px' }}>Mô tả:</p>
                <TextArea className='ipMT' value={moTa} onChange={(e) => setMoTa(e.target.value)} />
                <p style={{ marginLeft: '-180px' }}><span style={{ color: 'red' }}>*</span> Là trường thông tin bắt buộc</p>
              </div>

              <div className='themVTRight'>
                <p style={{ display: 'flex', float: 'left', marginBottom: '20px' }}>Phân quyền chức năng <span style={{ color: 'red', float: 'right' }}>*</span></p>
                <div className='bgVTRight'>
                  <p className='lbCNA'>Nhóm chức năng A:</p>
                  <div className='kcCBCNA'>
                    <Checkbox className='cbTC font' checked={isSelectedTCA} onChange={(e) => setIsSelectedTCA(e.target.checked)}>Tất cả</Checkbox> <br />
                    <Checkbox className='font' checked={isSelectedXA} onChange={(e) => setIsSelectedXA(e.target.checked)}>Chức năng x</Checkbox> <br />
                    <Checkbox className='font' checked={isSelectedYA} onChange={(e) => setIsSelectedYA(e.target.checked)}>Chức năng y</Checkbox> <br />
                    <Checkbox className='font' checked={isSelectedZA} onChange={(e) => setIsSelectedZA(e.target.checked)}>Chức năng z</Checkbox>
                  </div>
                  <p className='lbCNA'>Nhóm chức năng B</p>
                  <div className='kcCBCNA'>
                    <Checkbox className='cbTC font' checked={isSelectedTCB} onChange={(e) => setIsSelectedTCB(e.target.checked)}>Tất cả</Checkbox> <br />
                    <Checkbox className='font' checked={isSelectedXB} onChange={(e) => setIsSelectedXB(e.target.checked)}>Chức năng x</Checkbox> <br />
                    <Checkbox className='font' checked={isSelectedYB} onChange={(e) => setIsSelectedYB(e.target.checked)}>Chức năng y</Checkbox> <br />
                    <Checkbox className='font' checked={isSelectedZB} onChange={(e) => setIsSelectedZB(e.target.checked)}>Chức năng z</Checkbox>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <div style={{ display: 'flex', marginLeft: '400px', marginTop: '15px' }}>
            <Button className='btnHuyBoCSM' onClick={handleHuy} >Hủy bỏ</Button>
            <Button className='scbtnInso' onClick={handleCapNhat}>Cập nhật</Button>
          </div>
        </div>
      </div>
    </div>

  )
}

export default CapNhatVT