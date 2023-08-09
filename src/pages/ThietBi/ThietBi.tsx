import React from 'react'
import Navbar from '../../layout/Navbar'
import '../css/thietbi.css'

import { Avatar, Button, Dropdown, Input, MenuProps, Space, Table, Tag } from 'antd'

import { ColumnsType } from 'antd/es/table'
import { Link } from 'react-router-dom'


const items: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
        1st menu item
      </a>
    ),
  },
  {
    key: '2',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
        2nd menu item
      </a>
    ),
  },
  {
    key: '3',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
        3rd menu item
      </a>
    ),
  },
];

interface DataType {
  key: string;
  maTB: string;
  tenTB: string,
  dcIP: string;
  ttHD: string;
  ttKN: string;
  dvSD: string;
}
// Hàm chuyển đổi dữ liệu trạng thái thành biểu tượng SVG
const getStatusIcon = (status: string) => {
  if (status === 'Hoạt động' || status === 'Kết nối') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="8" height="9" viewBox="0 0 8 9" fill="none">
        <circle cx="4" cy="4.5" r="4" fill="#34CD26"/>
      </svg>
    );
  } else {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="8" height="9" viewBox="0 0 8 9" fill="none">
        <circle cx="4" cy="4.5" r="4" fill="#EC3740"/>
      </svg>
    );
  }
};

const columns: ColumnsType<DataType> = [
  {
    title: 'Mã thiết bị',
    dataIndex: 'maTB',
    key: 'maTB',
  },
  {
    title: 'Tên thiết bị',
    dataIndex: 'tenTB',
    key: 'tenTB',
  },
  {
    title: 'Địa chỉ IP',
    dataIndex: 'dcIP',
    key: 'dcIP',
  },
  {
    title: 'Trạng thái hoạt động',
    dataIndex: 'ttHD',
    key: 'ttHD',
    render: (_, record) => (
      <span>
        {getStatusIcon(record.ttHD)} {record.ttHD}
      </span>
    ),
  },
  {
    title: 'Trạng thái kết nối',
    dataIndex: 'ttKN',
    key: 'ttKN',
    render: (_, record) => (
      <span>
        {getStatusIcon(record.ttKN)} {record.ttKN}
      </span>
    ),
  },
      {
    title: 'Dịch vụ sử dụng',
    dataIndex: 'dvSD',
    key: 'dvSD',
  },
  {
    title: ' ',
    dataIndex: 'chiTiet',
    key: 'chiTiet',
    
    render: (_, record) => (
      <Space size="middle">
      <Link to={'/thietbi/cttb'} style={{ textDecoration: 'underline' }}>Chi tiết</Link>
      </Space>
    ),
  },
  {
    title: ' ',
    key: 'capNhat',
    render: (_, record) => (
      <Space size="middle">
        <Link to={'/thietbi/capnhattb'} style={{ textDecoration: 'underline' }}>Cập nhật</Link>
      </Space>
    ),
  },
];

const data: DataType[] = [
  {
    key: '1',
    maTB: 'abc',
    tenTB: 'abc',
    dcIP: 'New York No. 1 Lake Park',
    ttHD: 'Hoạt động',
    ttKN: 'Mất kết nối',
    dvSD:'Khám tim mạch,...',
 
  },
  {
    key: '2',
    maTB: 'abc',
    tenTB: 'abc',
    dcIP: 'New York No. 1 Lake Park',
    ttHD: 'Ngưng hoạt động',
    ttKN: 'Mất kết nối',
    dvSD:'Khám tim mạch,...',

  },
  {
    key: '3',
    maTB: 'abc',
    tenTB: 'abc',
    dcIP: 'New York No. 1 Lake Park',
    ttHD: 'Hoạt động',
    ttKN: 'Mất kết nối',
    dvSD:'Khám tim mạch,...',
  }
  ,
  {
    key: '4',
    maTB: 'abc',
    tenTB: 'abc',
    dcIP: 'New York No. 1 Lake Park',
    ttHD: 'Ngưng hoạt động',
    ttKN: 'Kết nối',
    dvSD:'Khám tim mạch,...',

  },
  {
    key: '5',
    maTB: 'abc',
    tenTB: 'abc',
    dcIP: 'New York No. 1 Lake Park',
    ttHD: 'Hoạt động',
    ttKN: 'Kết nối',
    dvSD:'Khám tim mạch,...',

  },
];

function ThietBi() {

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  return (
    <div style={{display:'flex'}}>
    <Navbar/>
<div className='right' style={{backgroundColor:'rgb(246,246,246,1)', width: '1225px'}}>
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
{/* 
 trang danh sách thiết bị */}
<div>
  <div style={{display:'flex',}} className='ddChung'>
    <p className='ddTB'>Thiết bị {'>'}</p>
    <p className='ddDSTB'>Danh sách thiết bị</p>

    <div className='tbNtk' style={{marginLeft:'550px'}}>
<div style={{float:'right', display:'flex'}}>
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" style={{marginRight:'10px', marginTop:'25px'}}>
<path d="M16.1167 12.0753L15.2833 10.692C15.1083 10.3837 14.95 9.80033 14.95 9.45866V7.35033C14.95 5.39199 13.8 3.70033 12.1417 2.90866C11.7083 2.14199 10.9083 1.66699 9.99166 1.66699C9.08333 1.66699 8.26666 2.15866 7.83333 2.93366C6.20833 3.74199 5.08333 5.41699 5.08333 7.35033V9.45866C5.08333 9.80033 4.92499 10.3837 4.74999 10.6837L3.90833 12.0753C3.57499 12.6337 3.49999 13.2503 3.70833 13.817C3.90833 14.3753 4.38333 14.8087 4.99999 15.017C6.61666 15.567 8.31666 15.8337 10.0167 15.8337C11.7167 15.8337 13.4167 15.567 15.0333 15.0253C15.6167 14.8337 16.0667 14.392 16.2833 13.817C16.5 13.242 16.4417 12.6087 16.1167 12.0753Z" fill="#FFAC6A"/>
<path d="M12.3584 16.6753C12.0084 17.642 11.0834 18.3337 10 18.3337C9.34169 18.3337 8.69169 18.067 8.23336 17.592C7.96669 17.342 7.76669 17.0087 7.65002 16.667C7.75836 16.6837 7.86669 16.692 7.98336 16.7087C8.17502 16.7337 8.37502 16.7587 8.57502 16.7753C9.05002 16.817 9.53336 16.842 10.0167 16.842C10.4917 16.842 10.9667 16.817 11.4334 16.7753C11.6084 16.7587 11.7834 16.7503 11.95 16.7253C12.0834 16.7087 12.2167 16.692 12.3584 16.6753Z" fill="#FFAC6A"/>
</svg>
<Avatar shape="circle" size={50} src="https://i.pinimg.com/564x/fa/85/05/fa8505aa42f880dd74e2eee9bba79647.jpg" alt="gojo" style={{marginTop:'15px',marginRight:'5px'}} />
    <div style={{marginTop:'5px'}}>
    <p style={{marginBottom:'0px'}}>Xin chào!</p>
    <p style={{marginTop:'0px',marginRight:'-120px', fontWeight:'600'}}>Võ Hoàng Phương Thảo</p>
</div>
    </div>
    </div>
  </div>

  <p className='tieude'>Danh sách thiết bị</p>

  {/* chucnang */}
  <div style={{display:'flex'}}>
    {/* p1 */}
    <div style={{marginLeft:'50px'}}>
    <p style={{marginLeft:'-150px'}}>Trạng thái hoạt động</p>
    <Dropdown menu={{ items }} placement="bottom" arrow className='drHD'>
  <button>
    Tất cả
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
<path d="M6 9L12 15L18 9" fill="#FF7506"/>
<path d="M6 9L12 15L18 9H6Z" stroke="#FF7506" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
  </button>
</Dropdown>
</div>

{/* p2 */}
<div style={{marginLeft:'30px'}}>
    <p style={{marginLeft:'-170px'}}>Trạng thái kết nối</p>
    <Dropdown menu={{ items }} placement="bottom" arrow className='drHD'>
  <button> 
    Tất cả
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
<path d="M6 9L12 15L18 9" fill="#FF7506"/>
<path d="M6 9L12 15L18 9H6Z" stroke="#FF7506" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
  </button>
</Dropdown>
</div>

{/* p3 */}
<div style={{marginLeft:'150px'}}>
    <p style={{marginLeft:'-185px'}}>Từ khóa</p>
    <Input
        placeholder='Nhập từ khóa tìm kiếm'
        suffix={
<Button style={{border:'none'}}>   <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
<path d="M9.16667 15.8333C12.8486 15.8333 15.8333 12.8486 15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333Z" stroke="#FF7506" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M17.5 17.5L13.875 13.875" stroke="#FF7506" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg></Button>
        }
        style={{backgroundColor:'white', color:'orange', width:'250px', height:'43px'}}
      />
</div>

  </div>

<div style={{display:'flex'}}>
  <Table columns={columns} dataSource={data} style={{ width: '1030px', marginLeft: '50px', marginTop: '30px' }} className='custom-table' />

  <Button className='btnTTB'>
    <Link to={'/thietbi/themtb'} style={{textDecoration:'none'}}>
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
<path d="M18.8884 2.33301H9.11171C4.86504 2.33301 2.33337 4.86467 2.33337 9.11134V18.8763C2.33337 23.1347 4.86504 25.6663 9.11171 25.6663H18.8767C23.1234 25.6663 25.655 23.1347 25.655 18.888V9.11134C25.6667 4.86467 23.135 2.33301 18.8884 2.33301ZM18.6667 14.8747H14.875V18.6663C14.875 19.1447 14.4784 19.5413 14 19.5413C13.5217 19.5413 13.125 19.1447 13.125 18.6663V14.8747H9.33337C8.85504 14.8747 8.45837 14.478 8.45837 13.9997C8.45837 13.5213 8.85504 13.1247 9.33337 13.1247H13.125V9.33301C13.125 8.85467 13.5217 8.45801 14 8.45801C14.4784 8.45801 14.875 8.85467 14.875 9.33301V13.1247H18.6667C19.145 13.1247 19.5417 13.5213 19.5417 13.9997C19.5417 14.478 19.145 14.8747 18.6667 14.8747Z" fill="#FF9138"/>
</svg> <br /> Thêm <br /> thiết bị
    </Link>
</Button>

</div>
</div>



</div>
</div>
  )
}

export default ThietBi