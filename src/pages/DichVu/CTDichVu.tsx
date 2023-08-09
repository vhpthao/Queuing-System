import React from 'react'
import Navbar from '../../layout/Navbar'
import { Avatar, Button, Checkbox, DatePicker, DatePickerProps, Dropdown, Input, MenuProps, Space, Table } from 'antd'
import { ColumnsType } from 'antd/es/table';
import { Link } from 'react-router-dom';


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
    soTT: string;
    trangThai: string,
   
  }
  // Hàm chuyển đổi dữ liệu trạng thái thành biểu tượng SVG
const getStatusIcon = (status: string) => {
    if (status === 'Đã hoàn thành') {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="9" viewBox="0 0 8 9" fill="none">
          <circle cx="4" cy="4.5" r="4" fill="#34CD26"/>
        </svg>
      );
    }
    else if(status === 'Đang thực hiện'){
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="8" height="9" viewBox="0 0 8 9" fill="none">
            <circle cx="4" cy="4.70703" r="4" fill="#5490EB"/>
          </svg>
          );
    }
     else {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="9" viewBox="0 0 8 9" fill="none">
        <circle cx="4" cy="4.70703" r="4" fill="#6C7585"/>
      </svg>
      );
    }
  };


  const columns: ColumnsType<DataType> = [
    {
      title: 'Số thứ tự',
      dataIndex: 'soTT',
      key: 'soTT',
    },
  
    {
      title: 'Trạng thái ',
      dataIndex: 'trangThai',
      key: 'trangThai',
      render: (_, record) => (
        <span>
          {getStatusIcon(record.trangThai)} {record.trangThai}
        </span>
      ),
    },
 
  ];
  
  const data: DataType[] = [
    {
      key: '1',
     soTT:'0001',
     trangThai:'Đã hoàn thành'
   
    },
    {
      key: '2',
      soTT:'0001',
     trangThai:'Đã hoàn thành'
  
    },
    {
      key: '3',
      soTT:'0001',
     trangThai:'Đang thực hiện'
    }
    ,
    {
      key: '4',
      soTT:'0001',
      trangThai:'Vắng'
  
    },
    {
      key: '5',
      soTT:'0005',
      trangThai:'Đang thực hiện'
  
    },
  ];

function CTDichVu() {
    const onChange: DatePickerProps['onChange'] = (date, dateString) => {
        console.log(date, dateString);
      };

  return (
    <div style={{display:'flex'}}>
        <Navbar/>
        <div className='right' style={{backgroundColor:'rgb(246,246,246,1)', width: '1225px'}}>
        <div style={{display:'flex',}} className='ddChung'>
    <p className='ddTB'>Dịch vụ {'>'}</p>
    <p className='ddTB'><Link to={'/dichvu'} style={{textDecoration:'none', color:'rgb(126, 125, 136,1)'}}>Danh sách dịch vụ {'>'}</Link></p>
    <p className='ddDSTB'>Chi tiết</p>

    <div className='tbNtk' style={{marginLeft:'450px'}}>
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

  <p className='ttQLTB'>Quản lý dịch vụ</p>

{/* giao diện thêm thiết bị */}
<div style={{display:'flex'}}>
  <section className='scTTDVLeft'>
    <p className='lbTTTBcssDV'>Thông tin dịch vụ</p>

    {/* h1 */}
    <div style={{display:'flex'}} className='kcTTDVcssDV'>
        <p className='lbID'>Mã dịch vụ: </p>
       <p>201</p>
    </div>
       
       {/* h2 */}
       <div style={{display:'flex'}} className='kcTTDVcssDV'>
     
     <p className='lbID'>Tên dịch vụ :</p>
    <p>Khám tim mạch</p>
 </div>

 {/* h3 */}
 <div style={{display:'flex', marginBottom:'0px'}} className='kcTTDVcssDV'>
     
     <p className='lbID' >Mô tả:</p>
    <p>Khám tim mạch </p>
 </div>

 <p className='lbQTCScssDV'>Quy tắc cấp số</p>
 <div style={{display:'flex'}} className='kcQTCS2'>
    <p style={{marginRight:'10px'}} className='lbID2'>Tăng tự động </p>
    <Input value={'0001'} style={{width:'90px', height:'50px'}}/>
    <p style={{marginLeft:'10px', marginRight:'10px'}} className='lbID2'>đến</p> 
    <Input value={'9999'} style={{width:'90px', height:'50px'}}/>
 </div>

 <div style={{display:'flex', marginTop:'10px'}} className='kcQTCS2'>
    <p className='lbID2' style={{marginRight:'65px'}}>Prefix</p>
    <Input value={'0001'} style={{width:'90px', height:'50px'}}/>
 </div>
 <p className='lbID2' style={{marginLeft:'-230px'}}>Reset mỗi ngày</p>
  </section>

<section className='scTTDVRight'>
      {/* chucnang */}
  <div style={{display:'flex'}}>
    {/* p1 */}
    <div style={{marginLeft:'50px'}}>
    <p style={{marginLeft:'-60px'}}>Trạng thái</p>
    <Dropdown menu={{ items }} placement="bottom" arrow className='drTCcssDV'>
  <button>
    Tất cả
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" >
<path d="M6 9L12 15L18 9" fill="#FF7506"/>
<path d="M6 9L12 15L18 9H6Z" stroke="#FF7506" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
  </button>
</Dropdown>
</div>

{/* p2 */}
<div style={{marginLeft:'10px'}}>
    <p style={{marginLeft:'-140px'}}>Chọn thời gian</p>
   <div style={{display:'flex'}}>
   <DatePicker onChange={onChange} style={{height:'43px', marginRight:'10px',width:'120px'}} />
    <DatePicker onChange={onChange} style={{height:'43px', width:'120px'}}/>
   </div>
    
</div>

{/* p3 */}
<div style={{marginLeft:'10px'}}>
    <p style={{marginLeft:'-180px'}}>Từ khóa</p>
    <Input
        placeholder='Nhập từ khóa'
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
  <Table columns={columns} dataSource={data} style={{ width: '620px', marginLeft: '20px', marginTop: '30px' }} className='custom-table' />
  <style>
  {`
    .ant-table-thead th {
      background-color: orange !important;
      color: white !important;

    }
  `}
</style>
</section>

<div style={{display:'vertical', marginLeft:'22px'}}>
<Button className='btnCNDScssDV'>
    <Link to={'/dichvu/capnhatdv'}>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M17.443 0.552097C19.1213 0.447205 20.7762 1.02994 22.0233 2.17209C23.1655 3.41913 23.7482 5.07409 23.655 6.764V17.6494C23.7599 19.3393 23.1655 20.9943 22.035 22.2413C20.7879 23.3835 19.1213 23.9662 17.443 23.8613H6.55751C4.86758 23.9662 3.21261 23.3835 1.96556 22.2413C0.823397 20.9943 0.240662 19.3393 0.345554 17.6494V6.764C0.240662 5.07409 0.823397 3.41913 1.96556 2.17209C3.21261 1.02994 4.86758 0.447205 6.55751 0.552097H17.443ZM10.8115 17.8592L18.6551 9.99233C19.366 9.26974 19.366 8.10428 18.6551 7.39335L17.14 5.87825C16.4174 5.15567 15.2519 5.15567 14.5293 5.87825L13.7485 6.67077C13.6319 6.78731 13.6319 6.98544 13.7485 7.10199C13.7485 7.10199 15.6016 8.94341 15.6365 8.99003C15.7647 9.12989 15.8463 9.31636 15.8463 9.52614C15.8463 9.94571 15.5083 10.2953 15.0771 10.2953C14.879 10.2953 14.6925 10.2138 14.5643 10.0856L12.618 8.1509C12.5247 8.05766 12.3616 8.05766 12.2683 8.1509L6.70902 13.7101C6.32442 14.0948 6.10298 14.6076 6.09132 15.1553L6.02139 17.9175C6.02139 18.069 6.06801 18.2088 6.17291 18.3137C6.2778 18.4186 6.41765 18.4769 6.56917 18.4769H9.30802C9.86745 18.4769 10.4036 18.2554 10.8115 17.8592Z" fill="#FF7506"/>
</svg> <br />
Cập nhật <br /> danh dách
    </Link>
</Button>

<Button className='btnCNDScssDV'>
    <Link to={'/dichvu'}>
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="29" viewBox="0 0 28 29" fill="none">
  <path d="M18.8885 2.54004H9.1235C4.86516 2.54004 2.3335 5.07171 2.3335 9.31837V19.0834C2.3335 23.33 4.86516 25.8617 9.11183 25.8617H18.8768C23.1235 25.8617 25.6552 23.33 25.6552 19.0834V9.31837C25.6668 5.07171 23.1352 2.54004 18.8885 2.54004Z" fill="#FF7506"/>
  <path d="M16.2398 10.1H10.2315L10.6165 9.71503C10.9548 9.37669 10.9548 8.81669 10.6165 8.47836C10.2782 8.14003 9.71818 8.14003 9.37985 8.47836L7.54818 10.31C7.20985 10.6484 7.20985 11.2084 7.54818 11.5467L9.37985 13.3784C9.55485 13.5534 9.77652 13.635 9.99818 13.635C10.2198 13.635 10.4415 13.5534 10.6165 13.3784C10.9548 13.04 10.9548 12.48 10.6165 12.1417L10.3132 11.8384H16.2398C17.7332 11.8384 18.9582 13.0517 18.9582 14.5567C18.9582 16.0617 17.7448 17.275 16.2398 17.275H10.4998C10.0215 17.275 9.62485 17.6717 9.62485 18.15C9.62485 18.6284 10.0215 19.025 10.4998 19.025H16.2398C18.7015 19.025 20.7082 17.0184 20.7082 14.5567C20.7082 12.095 18.7015 10.1 16.2398 10.1Z" fill="#FFF2E7"/>
</svg> <br />
Quay lại
    </Link>
</Button>
</div>

</div>
        </div>
    </div>
  )
}

export default CTDichVu