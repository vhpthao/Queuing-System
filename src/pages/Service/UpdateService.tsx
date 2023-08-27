import React, {useState, useEffect} from 'react'
import Navbar from '../../components/Navbar'
import { Button, Checkbox, Input} from 'antd'
import './css/addService.css'
import Header from '../../components/Header';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchDataFromFirebaseDV, selectDV } from '../../store/serviceSlice';
import { useSelector } from 'react-redux';
import {NguoiDungState as UserState} from '../../store/userSlice'
import { addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import TextArea from 'antd/es/input/TextArea';
import moment from 'moment';

const ttHoatDong = [ { value: 'Hoạt động', label: 'Hoạt động' }, { value: 'Ngưng hoạt động', label: 'Ngưng hoạt động' }];

interface RootState {
  user: UserState;
}

function UpdateService() {
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

  const selectedService = useSelector((state: any) => state.service.selectedService);
  const navigate = useNavigate();

  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  const handleCapNhat = async () => {
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
  
    try {
      const docSnapshot = await getDoc(dichVuDoc);
      if (docSnapshot.exists()) {
        await updateDoc(dichVuDoc, updatedData);
        console.log('Đã cập nhật dữ liệu thành công');
  
        await taoLog();
  
        dispatch(selectDV({ ...selectedService, ...updatedData }) as any);
  
        setMaDV('');
        setTenDV('');
        setMoTa('');
        setTrangThaiHD('');
        setIsTangTD(false);
        setIsPrefix(false);
        setIsSurfix(false);
        setIsReset(false);
      } else {
        console.log('Không tìm thấy dữ liệu');
      }
    } catch (error) {
      console.error('Lỗi khi cập nhật dữ liệu:', error);
    }
  };

  useEffect(() => {
    if (selectedService) {
      setMaDV(selectedService.maDV || '');
      setTenDV(selectedService.tenDV || '');
      setMoTa(selectedService.moTa || '');
      setTrangThaiHD(selectedService.trangThaiHD || '');
      setIsTangTD(selectedService.isTangTD || '');
      setIsPrefix(selectedService.isPrefix || '');
      setIsSurfix(selectedService.isSurfix || '');
      setIsReset(selectedService.isReset || '');
     
    }
  }, [selectedService]);

  const handleHuy = () => {
    navigate('/dichvu');
  }

   const taoLog = async () => {
    const logEntry = {
      tenDN: currentUser?.tenDN,
      tgTD: moment().format('HH:mm'),
      ngayTD: moment().format('DD/MM/YYYY'),
      ipThucHien: '125.126.1.3',
      tenThaoTac: `Cập nhật dịch vụ ${maDV}`,
    };

    try {
      await addDoc(collection(db, 'nhatKy'), logEntry);
    } catch (error) {
      console.error('Lỗi khi tạo log:', error);
    }
  };

  return (
    <div style={{display:'flex'}}>
        <Navbar/>
        <div style={{backgroundColor:'rgb(246,246,246,1)',width: '1230px', height:'740px'}}>
<Header/>

<p className='nQLDVThemDV'>Quản lý dịch vụ</p>

<div>
  <section className='bgThemDV'>
    <p className='nTTDV'>Thông tin dịch vụ</p>
    <div style={{display:'flex'}}>
       <div>
        <p className='nMaDV'>Mã dịch vụ <span style={{color:'red'}}>*</span></p>
    <Input size='large' className='ipMaDVThem' value={maDV} onChange={(e) => setMaDV(e.target.value)}/>
        <p className='nTenDVThem'>Tên dịch vụ <span style={{color:'red'}}>*</span></p>
    <Input size='large' style={{width:'450px', marginLeft:'30px'}} value={tenDV} onChange={(e) => setTenDV(e.target.value)}/>
    </div>
    <div>
        <p className='nMoTaThem'>Mô tả</p>
    <TextArea size='large' className='ipMotaThem' value={moTa} onChange={(e) => setMoTa(e.target.value)}/>
  
    </div>
    </div>

    {/* h2 */}
    <p className='nQuyTacCSThem'>Quy tắc cấp số</p>
    <div style={{display:'flex'}} className='kcQuyTacCS'>
        <Checkbox checked={isTangTD}
         onChange={(e) => setIsTangTD(e.target.checked)}>
         <div style={{display:'flex'}}>
         <p className='nTangTDTu'>Tăng tự động từ: </p>
        <Input size='large' className='ipTangTDTu' value={'0001'}/>
        <p className='nDen'>đến: </p>
        <Input size='large' className='ipDen' value={'9999'}/>
         </div>
        </Checkbox>
    </div>
    <div style={{display:'flex'}} className='kcQuyTacCS'>
        <Checkbox checked={isPrefix}
         onChange={(e) => setIsPrefix(e.target.checked)}>
          <div style={{display:'flex'}}>
          <p className='nPrefixThem'>Prefix: </p>
        <Input size='large' className='ipPrefixThem' value={'0001'}/>
          </div>
        </Checkbox>
    </div>
    <div style={{display:'flex'}} className='kcQuyTacCS'>
        <Checkbox checked={isSurfix}
         onChange={(e) => setIsSurfix(e.target.checked)}>
          <div style={{display:'flex'}}>
          <p className='nSurfixThem'>Surfix: </p>
        <Input size='large' className='ipSurfixThem' value={'0001'}/>
          </div>
          </Checkbox> 
      
    </div>
    <div className='nResetMNThem kcQuyTacCS'>
        <Checkbox checked={isReset}
         onChange={(e) => setIsReset(e.target.checked)}>
        <p className='nResetMNn'>Reset mỗi ngày </p>
        </Checkbox>
    </div>
    <p className='nTruongBatBuocThemDV'><span style={{color:'red'}}>*</span> Là trường thông tin bắt buộc</p>
  </section>
  <div className='kcCacNutThemDV'>
    <Button className='btnHuyBoThemDV' onClick={handleHuy}>Hủy bỏ</Button>
    <Button className='btnThemDVThem' onClick={handleCapNhat}>Cập nhật</Button>
  </div>
</div>
        </div>
    </div>
  )
}

export default UpdateService
