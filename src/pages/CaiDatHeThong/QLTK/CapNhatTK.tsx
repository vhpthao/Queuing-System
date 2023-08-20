import React , {useEffect, useState}from 'react'
import Navbar from '../../../layout/Navbar'
import {  Button, Input, Select } from 'antd'
import {  useNavigate, useParams } from 'react-router-dom';
import Header from '../../../layout/Header';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNguoiDungDataFromFirebase, selectND } from '../../../store/nguoiDungSlice';
import { updateDoc, doc, getDoc, collection } from 'firebase/firestore';
import { db } from '../../../firebase/firebaseConfig';

const loaiVaiTro = [{ value: 'Bác sĩ', label: 'Bác sĩ' }, { value: 'Kế Toán', label: 'Kế Toán' }, { value: 'Nhân viên', label: 'Nhân viên' }];
const loaiTinhTrang = [{ value: 'Hoạt động', label: 'Hoạt động' }, { value: 'Ngưng hoạt động', label: 'Ngưng hoạt động' }];

const customArrow = (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M6 9L12 15L18 9" fill="#FF7506" />
    <path d="M6 9L12 15L18 9H6Z" stroke="#FF7506" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
);

function CapNhatTK() {
  const dispatch = useDispatch();
  const { key } = useParams();

  useEffect(() => {
    dispatch(fetchNguoiDungDataFromFirebase() as any);

    if (key) {
      dispatch(selectND(key) as any);
    }
  }, [dispatch, key]);

  const selectedTK = useSelector((state: any) => state.nguoiDung.selectedND);
  const navigate = useNavigate();

  const [hoTen, setHoTen] = useState('');
  const [tenDN, setTenDN] = useState('');
  const [sdt, setSdt] = useState('');
  const [matKhau, setMatKhau] = useState('');
  const [matKhauNL, setMatKhauNL] = useState('');
  const [vaiTro, setVaiTro] = useState('');
  const [trangThaiHD, setTrangThaiHD] = useState('');
  const [email, setEmail] = useState('');

  const handleCapNhatTK = () => {
    const updatedData = {
      hoTen,
      tenDN,
      sdt,
      matKhau,
      vaiTro,
      trangThaiHD,
      email,
    };

    const nguoiDungCollection = collection(db, 'nguoiDung');
    const nguoiDungDoc = doc(nguoiDungCollection, key);

  getDoc(nguoiDungDoc)
  .then((docSnapshot) => {
    if (docSnapshot.exists()) {
      updateDoc(nguoiDungDoc, updatedData)
        .then(() => {
          console.log('Đã cập nhật dữ liệu thành công');
         
      dispatch(selectND({ ...selectedTK, ...updatedData }) as any);
          setHoTen('');
          setTenDN('');
          setEmail('');
          setMatKhau('');
          setMatKhauNL('');
          setSdt('');
          setTrangThaiHD('');
          setVaiTro('');
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
    if (selectedTK) {
      setEmail(selectedTK.email || '');
      setTenDN(selectedTK.tenDN || '');
      setHoTen(selectedTK.hoTen || '');
      setSdt(selectedTK.sdt || '')
      setMatKhau(selectedTK.matKhau || '');
      setTrangThaiHD(selectedTK.trangThaiHD || '');
      setVaiTro(selectedTK.vaiTro || '');
    }
  }, [selectedTK]);

  const handleHuy = () => {
    navigate('/qltk');
  }

  
  return (
    <div style={{ display: 'flex' }}>
      <Navbar />
      <div className='right' style={{ backgroundColor: 'rgb(246,246,246,1)', width: '1225px' }}>
        <Header />

        <p className='nQLTK'>Quản lý tài khoản</p>
        <div>
        <section className='scTTB'>
            <p className='lbTTTB'>Thông tin tài khoản</p>
            {/* h2 */}
            <div style={{ display: 'flex' }}>
              <div>
                <p className='nHoTen'>Họ tên <span style={{ color: 'red' }}>*</span></p>
                <Input size='large' className='ipHoTen' value={hoTen} onChange={(e) => setHoTen(e.target.value)} />
              </div>

              <div className='kcTenDN'>
                <p className='nTenDN'>Tên đăng nhập <span style={{ color: 'red' }}>*</span></p>
                <Input size='large' className='ipTenDN' value={tenDN} onChange={(e) => setTenDN(e.target.value)}/>
              </div>
            </div>

            {/* h3 */}
            <div style={{ display: 'flex' }}>
              <div>
                <p className='nSoDT'>Số điện thoại <span style={{ color: 'red' }}>*</span></p>
                <Input size='large' className='ipSoDT' value={sdt} onChange={(e) => setSdt(e.target.value)}/>
              </div>

              <div className='kcMatKhau'>
                <p className='nMatKhau'>Mật khẩu <span style={{ color: 'red' }}>*</span></p>
                <Input.Password size='large' className='ipMatKhau' value={matKhau} onChange={(e) => setMatKhau(e.target.value)} />
              </div>
            </div>
            {/* h3 */}
            <div style={{ display: 'flex' }}>
              <div>
                <p className='nEmail'>Email <span style={{ color: 'red' }}>*</span></p>
                <Input size='large' className='ipEmail' value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>

              <div className='kcNhapLaiMK'>
                <p className='nNhapLaiMK'>Nhập lại mật khẩu <span style={{ color: 'red' }}>*</span></p>
                <Input.Password size='large' className='ipNhapLaiMK' value={matKhau} onChange={(e) => setMatKhau(e.target.value)}/>
              </div>
            </div>

            {/* h1 */}
            <div style={{ display: 'flex' }}>
              <div className='kcVaiTroThem'>
                <p className='nVaiTroThem'>Vai trò <span style={{ color: 'red' }}>*</span></p>
                <Select placeholder='Chọn vai trò'
                  style={{ width: 450, textAlign: 'left' }}
                  options={loaiVaiTro}
                  size='large' suffixIcon={customArrow} 
                  value={vaiTro || undefined}
                  onChange={(value) => setVaiTro(value)} />
              </div>

              <div className='kcTinhTrang'>
                <p className='nTinhTrang'>Tình trạng <span style={{ color: 'red' }}>*</span></p>
                <Select placeholder='Chọn tình trạng'
                  style={{ width: 500, textAlign: 'left', marginLeft: '5px' }}
                  options={loaiTinhTrang}
                  size='large' suffixIcon={customArrow} 
                  value={trangThaiHD || undefined}
                  onChange={(value) => setTrangThaiHD(value)}/>
              </div>
            </div>

            <p className='nBatBuoc'><span style={{ color: 'red' }}>* </span>Là trường thông tin bắt buộc</p>

          </section>
          <div style={{ display: 'flex', marginLeft: '420px' }}>
            <Button className='btnHuyBo' onClick={handleHuy}>Hủy bỏ</Button>
            <Button className='scbtnTTB' onClick={handleCapNhatTK}>Cập nhật </Button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default CapNhatTK
