import React, { useState } from 'react'
import Navbar from '../../layout/Navbar'
import { Button, Input, Select } from 'antd'
import { collection, addDoc } from 'firebase/firestore';
import '././css/themNcapnhat.css'
import Header from '../../layout/Header';
import { db } from '../../firebase/firebaseConfig';

const loaiThietBi = [{ value: 'Kiosk', label: 'Kiosk' }, { value: 'Display counter', label: 'Display counter' }];
const ttHoatDong = [{ value: 'Hoạt động', label: 'Hoạt động' }, { value: 'Ngưng hoạt động', label: 'Ngưng kết nối' }];
const ttKettNoi = [{ value: 'Kết nối', label: 'Kết nối' }, { value: 'Mất kết nối', label: 'Mất kết nối' }];
const dichvuSD = [{ value: 'Khám tổng quát', label: 'Khám tổng quát' }, { value: 'Khám tai mũi họng', label: 'Khám tai mũi họng' },  { value: 'Khám mắt', label: 'Khám mắt' }];

function ThemThietBi() {
  const [maTB, setMaTB] = useState('');
  const [loaiTB, setLoaiTB] = useState('');
  const [ttHD, setTtHD] = useState('');
  const [ttKN, setTtKN] = useState('');
  const [tenTB, setTenTB] = useState('');
  const [tenDN, setTenDN] = useState('');
  const [dcIP, setDcIP] = useState('');
  const [matKhau, setMatKhau] = useState('');
  const [dvSD, setDvSD] = useState('');


  const handleThemThietBi = async () => {
    const thietBi = {
      maTB: maTB,
      loaiTB: loaiTB,
      tenTB: tenTB,
      tenDN: tenDN,
      ttHD: ttHD,
      ttKN: ttKN,
      dcIP: dcIP,
      matKhau: matKhau,
      dvSD: dvSD,
    };

    try {
      const docRef = await addDoc(collection(db, 'thietBi'), thietBi);
      console.log('Thêm thiết bị thành công. ID:', docRef.id);
      setMaTB('');
      setLoaiTB('');
      setTenTB('');
      setTtHD('');
      setTtKN('');
      setTenDN('');
      setDcIP('');
      setMatKhau('');
      setDvSD('');
    } catch (error) {
      console.error('Lỗi khi thêm thiết bị:', error);
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <Navbar />
      <div className='right' style={{ backgroundColor: 'rgb(246,246,246,1)', width: '1225px' }}>
        <Header />

        <p className='nQuanLyTTTB'>Quản lý thiết bị</p>

        {/* giao diện thêm thiết bị */}
        <div>
          <section className='scThemTB'>
            <p className='nThongTinTB'>Thông tin thiết bị</p>

            {/* h1 */}
            <div style={{ display: 'flex' }}>
              <div>
                <p className='nMaTB'>
                  Mã thiết bị <span style={{ color: 'red' }}>*</span>
                </p>
                <Input size='large' className='ipMaTB' value={maTB} onChange={(e) => setMaTB(e.target.value)} />
              </div>

              <div className='kcLoaiTB'>
                <p className='nLoaiTB'>
                  Loại thiết bị <span style={{ color: 'red' }}>*</span>
                </p>
                <Select
                  placeholder='Chọn loại thiết bị'
                  style={{ width: 500, textAlign: 'left' }}
                  options={loaiThietBi}
                  size='large'
                  value={loaiTB || undefined}
                  onChange={(value) => setLoaiTB(value)}
                />
              </div>
            </div>
            {/* h2 */}
            <div style={{ display: 'flex' }}>
              <div>
                <p className='nTenTB'>
                  Tên thiết bị <span style={{ color: 'red' }}>*</span>
                </p>
                <Input size='large' className='ipTenTB' value={tenTB} onChange={(e) => setTenTB(e.target.value)} />
              </div>

              <div className='kcTenDN'>
                <p className='nTenDN'>
                  Tên đăng nhập <span style={{ color: 'red' }}>*</span>
                </p>
                <Input size='large' className='ipTenDN' value={tenDN} onChange={(e) => setTenDN(e.target.value)} />
              </div>
            </div>

            {/* h3 */}
            <div style={{ display: 'flex' }}>
              <div>
                <p className='nDiaChiIP'>
                  Địa chỉ IP <span style={{ color: 'red' }}>*</span>
                </p>
                <Input size='large' className='ipDiaChiIP' value={dcIP} onChange={(e) => setDcIP(e.target.value)} />
              </div>

              <div className='kcMatKhau'>
                <p className='nMatKhau'>
                  Mật khẩu <span style={{ color: 'red' }}>*</span>
                </p>
                <Input size='large' className='ipMatKhau' value={matKhau} onChange={(e) => setMatKhau(e.target.value)} />
              </div>
            </div>

            {/* h4 */}
            <div style={{ display: 'flex' }}>
              <div>
                <p className='nTinhTrangHDThem'>
                  Tình trạng hoạt động <span style={{ color: 'red' }}>*</span>
                </p>
                <Select
                  placeholder='Chọn trạng thái hoạt động'
                  className='slTinhTrangHD'
                  options={ttHoatDong}
                  size='large'
                  value={ttHD || undefined}
                  onChange={(value) => setTtHD(value)}
                />
              </div>

              <div className='kcTrangThaiKN'>
                <p className='nTrangThaiKN'>
                  Trạng thái kết nối <span style={{ color: 'red' }}>*</span>
                </p>
                <Select
                  placeholder='Chọn trạng thái kết nối'
                  style={{ width: 500, textAlign: 'left' }}
                  options={ttKettNoi}
                  size='large'
                  value={ttKN || undefined}
                  onChange={(value) => setTtKN(value)}
                />
              </div>
            </div>

            <div style={{ display: 'flex' }}>
              <div>
                <p className='nDichVuSD'>
                  Dịch vụ sử dụng <span style={{ color: 'red' }}>*</span>
                </p>
                <Select
                  placeholder='Chọn dịch vụ sử dụng'
                  className='slDichVuSD'
                  options={dichvuSD}
                  size='large'
                  value={dvSD || undefined}
                  onChange={(value) => setDvSD(value)}
                />
                <br />
                <div className='kcBatBuoc'>
                  <span className='nSaoBBThem'>* </span>
                  <p className='nBBThem'>Là trường thông tin bắt buộc</p>
                </div>
              </div>
            </div>
          </section>
          <div className='kcCacNut'>
            <Button className='btnHuyBo'>Hủy bỏ</Button>
            <Button className='btnThemTBThem' onClick={handleThemThietBi}>
              Thêm thiết bị
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ThemThietBi