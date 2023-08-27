import React, { useState } from 'react'
import Navbar from '../../components/Navbar'
import { Button, Input, Select } from 'antd'
import { collection, addDoc } from 'firebase/firestore';
import '././css/addNupdate.css'
import Header from '../../components/Header';
import { db } from '../../firebase/firebaseConfig';
import {NguoiDungState as UserState} from '../../store/userSlice'
import { useSelector } from 'react-redux';
import moment from 'moment';

const loaiThietBi = [{ value: 'Kiosk', label: 'Kiosk' }, { value: 'Display counter', label: 'Display counter' }];
const dichvuSD = [{ value: 'Khám tổng quát', label: 'Khám tổng quát', color: 'orange' }, { value: 'Khám tai mũi họng', label: 'Khám tai mũi họng', color: 'blue' },  { value: 'Khám mắt', label: 'Khám mắt', color: 'green' }];

interface RootState {
  user: UserState;
}

function AddDevice() {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

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

      await taoLog();
    } catch (error) {
      console.error('Lỗi khi thêm thiết bị:', error);
    }
  };

    // Hàm tạo log để lưu thông tin khi người dùng thêm mới tbi
    const taoLog = async () => {
      const logEntry = {
        tenDN: currentUser?.tenDN,
        tgTD: moment().format('HH:mm'),
        ngayTD: moment().format('DD/MM/YYYY'),
        ipThucHien: '125.126.1.3',
        tenThaoTac: `Thêm thiết bị mới mã ${maTB}`,
      };
  
      try {
        await addDoc(collection(db, 'nhatKy'), logEntry);
      } catch (error) {
        console.error('Lỗi khi tạo log:', error);
      }
    };
  

  const customArrow = (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M6 9L12 15L18 9" fill="#FF7506" />
      <path d="M6 9L12 15L18 9H6Z" stroke="#FF7506" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  );

  return (
    <div style={{ display: 'flex' }}>
      <Navbar />
      <div style={{ backgroundColor: 'rgb(246,246,246,1)',width: '1230px', height:'740px' }}>
        <Header />

        <p className='nQuanLyTTTB'>Quản lý thiết bị</p>
        <div>
          <section className='scThemTB'>
            <p className='nThongTinTB'>Thông tin thiết bị</p>
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
                  suffixIcon={customArrow}
                />
              </div>
            </div>
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
                  mode="multiple"
                  value={dvSD || undefined}
                  onChange={(value) => setDvSD(value)}
                  optionLabelProp="label"
                  suffixIcon={customArrow}
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

export default AddDevice
