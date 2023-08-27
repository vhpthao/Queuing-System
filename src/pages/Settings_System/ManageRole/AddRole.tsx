import React , {useState} from 'react'
import Navbar from '../../../components/Navbar'
import '../../css/thietbi.css'
import'../../css/dichvu.css'
import '../../css/capso.css'
import '../../css/vaitro.css'
import { Button, Checkbox,Input } from 'antd'
import Header from '../../../components/Header'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../../../firebase/firebaseConfig'
import TextArea from 'antd/es/input/TextArea'

function AddRole() {
  const [tenVT, setTenVT] = useState("");
  const [moTa, setMoTa] = useState("");

  const [isSelectedTCA, setIsSelectedTCA] = useState(false);
  const [isSelectedXA, setIsSelectedXA] = useState(false);
  const [isSelectedYA, setIsSelectedYA] = useState(false);
  const [isSelectedZA, setIsSelectedZA] = useState(false);
  
  const [isSelectedTCB, setIsSelectedTCB] = useState(false);
  const [isSelectedXB, setIsSelectedXB] = useState(false);
  const [isSelectedYB, setIsSelectedYB] = useState(false);
  const [isSelectedZB, setIsSelectedZB] = useState(false);

  const handleThemVaiTro = async () => {
    const nhomChucNangA = {
      tatcaA: isSelectedTCA,
      chucNangX: isSelectedXA,
      chucNangY: isSelectedYA,
      chucNangZ: isSelectedZA,
    };
  
    const nhomChucNangB = {
      tatcaB: isSelectedTCB,
      chucNangX: isSelectedXB,
      chucNangY: isSelectedYB,
      chucNangZ: isSelectedZB,
    };

    const tenVaiTro = {
      tenVT: tenVT,
      moTa: moTa,
      nhomChucNangA: nhomChucNangA,
      nhomChucNangB: nhomChucNangB,
    };

    try {
      const docRef = await addDoc(collection(db, 'vaiTro'), tenVaiTro);
      console.log('Thêm vai trò thành công. ID:', docRef.id);
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
    
    } catch (error) {
      console.error('Lỗi khi thêm vai trò:', error);
    }
  };
  
  return (
    <div style={{display:'flex'}}>
    <Navbar/>
<div className='right' style={{backgroundColor:'rgb(246,246,246,1)',width: '1231px', height:'740px'}}>
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
<Header/>
  <p className='tieude'>Danh sách vai trò</p>
  <section className='scThemVaiTro' >
    <p className='lbTTVT'>Thông tin vai trò</p>
   
   <div style={{display:'flex'}}>
<div className='themVTLeft'>
    <div style={{display:'flex'}}>
        <p>Tên vai trò <span style={{color:'red'}}>*</span></p>
    </div>
    <Input placeholder='Nhập tên vai trò' className='ipTVT' value={tenVT} onChange={(e) => setTenVT(e.target.value)}/>
    <p style={{marginLeft:'-350px'}}>Mô tả:</p>
    <TextArea  className='ipMT' value={moTa} onChange={(e) => setMoTa(e.target.value)}/>
    <p style={{marginLeft:'-180px'}}><span style={{color:'red'}}>*</span> Là trường thông tin bắt buộc</p>
</div>

<div className='themVTRight'>
<p style={{display:'flex', float:'left', marginBottom:'20px'}}>Phân quyền chức năng <span style={{color:'red', float:'right'}}>*</span></p>
<div className='bgVTRight'>
  <p className='lbCNA'>Nhóm chức năng A:</p> 
  <div className='kcCBCNA'>
  <Checkbox className='cbTC font'
   checked={isSelectedTCA}
   onChange={(e) => setIsSelectedTCA(e.target.checked)}
   >Tất cả</Checkbox> <br />
  <Checkbox className='font'
   checked={isSelectedXA}
   onChange={(e) => setIsSelectedXA(e.target.checked)}
   >Chức năng x</Checkbox> <br />
  <Checkbox className='font'
   checked={isSelectedYA}
   onChange={(e) => setIsSelectedYA(e.target.checked)}>Chức năng y</Checkbox> <br />
  <Checkbox className='font'
   checked={isSelectedZA}
   onChange={(e) => setIsSelectedZA(e.target.checked)}>Chức năng z</Checkbox>
  </div>
  <p className='lbCNA'>Nhóm chức năng B</p>
  <div className='kcCBCNA'>
  <Checkbox className='cbTC font'
   checked={isSelectedTCB}
   onChange={(e) => setIsSelectedTCB(e.target.checked)}>Tất cả</Checkbox> <br />
  <Checkbox className='font'
   checked={isSelectedXB}
   onChange={(e) => setIsSelectedXB(e.target.checked)}>Chức năng x</Checkbox> <br />
  <Checkbox className='font'
   checked={isSelectedYB}
   onChange={(e) => setIsSelectedYB(e.target.checked)}>Chức năng y</Checkbox> <br />
  <Checkbox className='font'
   checked={isSelectedZB}
   onChange={(e) => setIsSelectedZB(e.target.checked)}>Chức năng z</Checkbox>
  </div>
  </div>
</div>
</div>
  </section>
  <div style={{display:'flex', marginLeft:'400px', marginTop:'15px'}}>
    <Button className='btnHuyBoCSM'>Hủy bỏ</Button>
    <Button className='scbtnInso' onClick={handleThemVaiTro}>Thêm</Button>
  </div>
</div>
  </div>
</div>

  )
}

export default AddRole
