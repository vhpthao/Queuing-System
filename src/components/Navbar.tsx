import React, { useState } from 'react';
import { Button, Menu } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import logo from './imgLayout/logo.jpg'
import type { MenuProps } from 'antd/es/menu';
import das from './imgLayout/das.jpg'
import tb from './imgLayout/tb.jpg'
import dv from './imgLayout/dv.jpg'
import cs from './imgLayout/cs.jpg'
import bc from './imgLayout/bc.jpg'
import cdht from './imgLayout/cdht.jpg'
import dx from './imgLayout/dx.jpg'
import './layout.css'

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('Dashboard', '1', (
    <Link to="/dashboard" style={{ marginLeft: '-50px', color: 'black' }}>
      <img src={das} alt="das" className='imgMenu' />
    </Link>
  )),
  getItem('Thiết bị', '2', (
    <Link to="/device" style={{ marginLeft: '-70px' }}>
      <img src={tb} alt="tb" className='imgMenu' />
    </Link>
  )),
  getItem('Dịch vụ', '3', (
    <Link to="/service" style={{ marginLeft: '-70px' }}>
      <img src={dv} alt="dv" className='imgMenu' />
    </Link>
  )),
  getItem('Cấp số', '4', (
    <Link to="/giveNumber" style={{ marginLeft: '-70px' }}>
      <img src={cs} alt="cs" className='imgMenu' />
    </Link>
  )),
  getItem('Báo cáo', '5', (
    <Link to="/report" style={{ marginLeft: '-70px' }}>
      <img src={bc} alt="bc" className='imgMenu' />
    </Link>
  )),

  getItem('Cài đặt hệ thống', '6', <img src={cdht} alt="cdht" className='imgMenu' style={{marginLeft:'0px'}}/>
    , [
      getItem('Quản lý vai trò', undefined, (
        <Link to="/manaRole" style={{ marginLeft: '-20px' }}>
        </Link>
      )),
      getItem('Quản lý tài khoản', undefined, (
        <Link to="/manaAccount" style={{ marginLeft: '-20px' }}>
        </Link>
      )),
      getItem('Nhật ký người dùng', undefined, (
        <Link to="/userLog" style={{ marginLeft: '-20px' }}>
        </Link>
      )),
    ]),

];

function Navbar() {
  const [activeItem, setActiveItem] = useState<string>('');

  const [selectedKey, setSelectedKey] = useState<string>('');

  const handleMenuItemClick = (e: any) => {
    setSelectedKey(e.key === selectedKey ? '' : e.key);
  };

  const navigate = useNavigate();
  const handleDangXuat = () => {
    navigate('/login');
  }
  return (
    <div>
      <img src={logo} alt="logo" width={100} height={100} style={{ float: 'left', marginLeft: '30px', padding: '30px' }} />
      <Menu
        style={{ width: 256 }}
        mode="vertical"
        items={items}
        theme="light"
        inlineCollapsed={false}
        onClick={handleMenuItemClick}
        selectedKeys={[activeItem]}
        className="custom-menu"
      />
      <style>
        {`
          .ant-menu-item-selected a.ant-menu-title-content {
            color: #fff !important;
          }

          .ant-menu-item-selected {
            background-color: ${activeItem === 'thietbi' ? 'orange' : 'var(--gray-gray-100, #F5F5F7)'};
            color: #fff !important;
          }

          .ant-menu-item:hover {
            background-color: orange !important;
            color: white !important;
          }
        `}
      </style>

      <div style={{ marginTop: '230px', marginLeft: '30px' }}>
        {/* Nút đăng xuất */}
        <Button style={{ borderRadius: '8px', background: 'var(--orange-orange-50, #FFF2E7)', }} className='btnDX' onClick={handleDangXuat}>
          <img src={dx} alt="dx" className='imgMenu'  />
          Đăng xuất
        </Button>
      </div>
      <style>
        {`
                   .ant-menu-item-selected a.ant-menu-title-content {
                    color: #fff !important;
                  }
        
                  .ant-menu-item-selected {
                    background-color: orange !important;
                    color: #fff !important;
                  }
        
                  .ant-menu-item-selected, .ant-menu-item-selected:hover {
                    background-color: ${selectedKey ? 'orange !important' : 'var(--gray-gray-100, #F5F5F7) !important'};
                    color: #fff !important;
                  }
        
                  .ant-menu-item:hover {
                    background-color: orange !important;
                    color: white !important;
                  }
        `}
      </style>
    </div>
  );
}

export default Navbar;
