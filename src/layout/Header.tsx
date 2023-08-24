import { Link, useLocation, useParams } from 'react-router-dom';
import './layout.css';
import { Avatar, Button, Popover } from 'antd';
import { useSelector } from 'react-redux';
import {NguoiDungState as NDState} from '../store/nguoiDungSlice';
import {State as ThongBaoState, TypeDataThongBao, fetchDataFromFirebase} from '../store/thongBaoSlice'
import React, {useState, useEffect} from 'react'
import { useDispatch } from 'react-redux';
import './pop.css'

interface RootState {
  nguoiDung: NDState;
  thongBao: ThongBaoState;
}

const text = <span>Thông báo</span>;


function Header() {
  const location = useLocation();
  const path = location.pathname.split('/').filter(segment => segment !== '');

  const { key } = useParams();

  const breadcrumbNames = [
    { path: 'trangchu', name: 'Dashboard' },

    { path: 'thietbi', name: 'Thiết bị > Danh sách thiết bị', class: 'breadcrumb-item-gray breadcrumb-item-orange' },
    { path: 'themtb', name: '> Thêm thiết bị' },
    { path: 'cttb', name: '> Chi tiết thiết bị' },
    { path: 'capnhattb', name: '> Cập nhật thiết bị' },

    { path: 'dichvu', name: 'Dịch vụ > Danh sách dịch vụ' },
    { path: 'chitietdv', name: '> Chi tiết dịch vụ' },
    { path: 'themdv', name: '> Thêm dịch vụ' },
    { path: 'capnhatdv', name: '> Cập nhật dịch vụ' },

    { path: 'capso', name: 'Cấp số > Danh sách cấp số' },
    { path: 'chitietcs', name: '> Chi tiết cấp số' },
    { path: 'capsomoi', name: '> Cấp số mới' },

    { path: 'baocao', name: 'Báo cáo > Danh sách báo báo' },

    { path: 'qlvt', name: 'Cài đặt hệ thống > Quản lý vai trò' },
    { path: 'capnhatvt', name: '> Cập nhật vai trò' },
    { path: 'themvt', name: '> Thêm vai trò' },

    { path: 'qltk', name: 'Cài đặt hệ thống > Quản lý tài khoản' },
    { path: 'capnhattk', name: '> Cập nhật tài khoản' },
    { path: 'themtk', name: '> Thêm tài khoản' },

    { path: 'nknd', name: 'Cài đặt hệ thống > Nhật ký người dùng' },
    { path: 'ttcn', name: 'Thông tin cá nhân' },

    
  ];

  const renderBreadcrumb = () => {
    const isUpdatingPage = path.includes('capnhattb') 
                        || path.includes('cttb')
                        || path.includes('capnhattk')
                        || path.includes('capnhatvt')
                        || path.includes('chitietdv')
                        || path.includes('capnhatdv')
                        || path.includes('chitietcs'); 

    const breadcrumbItems = path.map((segment, index) => {
      const routeTo = `/${path.slice(0, index + 1).join('/')}`;
      const breadcrumbInfo = breadcrumbNames.find(item => item.path === segment);
      const breadcrumbName = breadcrumbInfo ? breadcrumbInfo.name : segment;

      // Nếu đang ở trang cập nhật và segment là key, thì ẩn segment
      const shouldHideSegment = isUpdatingPage && segment === key;

      return (
        <React.Fragment key={index}>
          {shouldHideSegment ? null : <Link to={routeTo}>{breadcrumbName}</Link>}
          {index < path.length - 1 && !shouldHideSegment && <span className="breadcrumb-separator"></span>}
        </React.Fragment>
      );
    });

    return (
      <div className="breadcrumb">
        {breadcrumbItems}
      </div>
    );
  };
  
  const [hinh, setHinh] = useState(localStorage.getItem('hinh') || '');
  const [hoTen, setHoTen] = useState(localStorage.getItem('hoTen') || '');

  const currentUser = useSelector((state: RootState) => state.nguoiDung.currentUser);
  const dispatch = useDispatch();

useEffect(() => {
  if (currentUser) {
    setHinh(currentUser.hinh);
    setHoTen(currentUser.hoTen);

    localStorage.setItem('hinh', currentUser.hinh);
    localStorage.setItem('hoTen', currentUser.hoTen);
  }
}, [currentUser]);


// phần thông báo
const thongBao = useSelector((state: RootState) => state.thongBao.thongBaoList);

// đọc dlieu từ firestore
useEffect(() => {
  dispatch(fetchDataFromFirebase() as any);
}, [dispatch, thongBao])

const content = (
  <div>
    {thongBao.map((item: TypeDataThongBao) => (
      <div key={item.key}>
        <p style={{paddingLeft:'10px', paddingRight:'10px', marginBottom:'0px'}} className='mauChuND'>Người dùng: {item.hoTen}</p>
        <p style={{paddingLeft:'10px', paddingRight:'10px', marginTop:'0px'}}>Thời gian nhận số: {item.tgCapSoMoi} - {item.ngayCapSoMoi}</p>
        <hr />
      </div>
    ))}
  </div>
);


  return (
    <div style={{display:'flex'}}>
      <div className='duongDan'>
      {renderBreadcrumb()}
      </div>

      <div className='rightCaNhan'>
      <Popover placement="bottomRight" title={text} content={content} trigger="click"  overlayClassName="custom-popover" style={{ borderRadius: '8px' }}>
        <Button className='chuong' >
       <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" >
          <path d="M16.1168 12.0743L15.2834 10.691C15.1084 10.3827 14.9501 9.79935 14.9501 9.45768V7.34935C14.9501 5.39102 13.8001 3.69935 12.1418 2.90768C11.7084 2.14102 10.9084 1.66602 9.99178 1.66602C9.08345 1.66602 8.26678 2.15768 7.83345 2.93268C6.20845 3.74102 5.08345 5.41602 5.08345 7.34935V9.45768C5.08345 9.79935 4.92511 10.3827 4.75012 10.6827L3.90845 12.0743C3.57512 12.6327 3.50012 13.2493 3.70845 13.816C3.90845 14.3743 4.38345 14.8077 5.00012 15.016C6.61678 15.566 8.31678 15.8327 10.0168 15.8327C11.7168 15.8327 13.4168 15.566 15.0334 15.0244C15.6168 14.8327 16.0668 14.391 16.2834 13.816C16.5001 13.241 16.4418 12.6077 16.1168 12.0743Z" fill="#FFAC6A" />
          <path d="M12.3582 16.6743C12.0082 17.641 11.0832 18.3327 9.9999 18.3327C9.34157 18.3327 8.69157 18.066 8.23324 17.591C7.96657 17.341 7.76657 17.0077 7.6499 16.666C7.75824 16.6827 7.86657 16.691 7.98324 16.7077C8.1749 16.7327 8.3749 16.7577 8.5749 16.7743C9.0499 16.816 9.53324 16.841 10.0166 16.841C10.4916 16.841 10.9666 16.816 11.4332 16.7743C11.6082 16.7577 11.7832 16.7493 11.9499 16.7243C12.0832 16.7077 12.2166 16.691 12.3582 16.6743Z" fill="#FFAC6A" />
        </svg>
        </Button>
      </Popover>
       

        <div style={{display:'flex', marginRight:'100px', marginLeft:'10px'}}>
          <Avatar shape="circle" size={50} src={hinh} alt="" className='avatar' />
          <div style={{ marginTop: '5px' }}>
            <p className='line1'>Xin chào!</p>
            <p className='line2'><Link to={'/ttcn'} className='link'>{hoTen}</Link></p>
          </div>

      </div>
      </div>
    </div>
  );
}

export default Header;
