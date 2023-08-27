import React, { useState } from 'react'
import Navbar from '../../../components/Navbar'
import { Button, Input, Select } from 'antd'
import Header from '../../../components/Header';
import './css/addAccount.css'
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../../firebase/firebaseConfig';

const loaiVaiTro = [{ value: 'Bác sĩ', label: 'Bác sĩ' }, { value: 'Kế Toán', label: 'Kế Toán' }, { value: 'Nhân viên', label: 'Nhân viên' }];
const loaiTinhTrang = [{ value: 'Hoạt động', label: 'Hoạt động' }, { value: 'Ngưng hoạt động', label: 'Ngưng hoạt động' }];

const customArrow = (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M6 9L12 15L18 9" fill="#FF7506" />
    <path d="M6 9L12 15L18 9H6Z" stroke="#FF7506" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
);

function AddAccount() {
  const [hoTen, setHoTen] = useState('');
  const [tenDN, setTenDN] = useState('');
  const [sdt, setSdt] = useState('');
  const [matKhau, setMatKhau] = useState('');
  const [matKhauNL, setMatKhauNL] = useState('');
  const [vaiTro, setVaiTro] = useState('');
  const [trangThaiHD, setTrangThaiHD] = useState('');
  const [email, setEmail] = useState('');

  const handleThemTKMoi = async () => {
    const nguoiDung = {
      tenDN: tenDN,
      hoTen: hoTen,
      sdt: sdt,
      matKhau: matKhau,
      email: email, 
      vaiTro: vaiTro,
      trangThaiHD: trangThaiHD
    };

    try {
      const docRef = await addDoc(collection(db, 'nguoiDung'), nguoiDung);
      console.log('Thêm tài khoản mới thành công. ID:', docRef.id);
      setHoTen('');
      setTenDN('');
      setSdt('');
      setMatKhau('');
      setMatKhauNL('');
      setEmail('');
      setVaiTro('');
      setTrangThaiHD('');
     
    } catch (error) {
      console.error('Lỗi khi thêm tài khoản:', error);
    }
  }
  return (
    <div style={{ display: 'flex' }}>
      <Navbar />
      <div className='right' style={{ backgroundColor: 'rgb(246,246,246,1)', width: '1231px', height:'740px' }}>
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
                <Input.Password size='large' className='ipNhapLaiMK' value={matKhauNL} onChange={(e) => setMatKhauNL(e.target.value)}/>
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
            <Button className='btnHuyBo'>Hủy bỏ</Button>
            <Button className='scbtnTTB' onClick={handleThemTKMoi}>Thêm </Button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default AddAccount