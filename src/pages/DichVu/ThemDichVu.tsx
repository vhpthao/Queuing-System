import React from 'react'
import Navbar from '../../layout/Navbar'
import { Avatar, Button, Checkbox, Input, MenuProps } from 'antd'
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

function ThemDichVu() {
  return (
    <div style={{display:'flex'}}>
        <Navbar/>
        <div className='right' style={{backgroundColor:'rgb(246,246,246,1)', width: '1225px'}}>
        <div style={{display:'flex',}} className='ddChung'>
    <p className='ddTB'>Dịch vụ {'>'}</p>
    <p className='ddTB'><Link to={'/dichvu'} style={{textDecoration:'none', color:'rgb(126, 125, 136,1)'}}>Danh sách dịch vụ {'>'}</Link></p>
    <p className='ddDSTB'>Thêm dịch vụ</p>

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
<div>
  <section className='scThemDV'>
    <p className='lbTTTB'>Thông tin dịch vụ</p>

    {/* h1 */}
    <div style={{display:'flex'}}>
       <div>
        <p style={{marginLeft:'-330px'}}>Mã dịch vụ <span style={{color:'red'}}>*</span></p>
    <Input size='large' style={{width:'450px', marginLeft:'30px'}}/>
       
        <p style={{marginLeft:'-330px'}}>Tên dịch vụ <span style={{color:'red'}}>*</span></p>
    <Input size='large' style={{width:'450px', marginLeft:'30px'}}/>
    </div>

    <div>
        <p style={{marginLeft:'-300px'}}>Mô tả</p>
    <Input size='large' style={{width:'450px', marginLeft:'100px', height:'130px'}}/>
    </div>
    </div>

    {/* h2 */}
    <p className='qtCapSo'>Quy tắc cấp số</p>
    <div style={{display:'flex'}} className='qtcsKC'>
        <Checkbox/> <p style={{fontWeight:'500',marginRight:'20px', marginLeft:'20px'}}>Tăng tự động từ: </p>
        <Input size='large' style={{width:'80px', height:'40px'}}/>
        <p style={{fontWeight:'500',marginRight:'20px', marginLeft:'20px'}}>đến: </p>
        <Input size='large' style={{width:'80px',height:'40px'}}/>
    </div>
    <div style={{display:'flex'}} className='qtcsKC'>
        <Checkbox/> <p style={{fontWeight:'500',marginRight:'95px', marginLeft:'20px'}}>Prefix: </p>
        <Input size='large' style={{width:'80px',height:'40px'}}/>
    
    </div>
    <div style={{display:'flex'}} className='qtcsKC'>
        <Checkbox/> <p style={{fontWeight:'500',marginRight:'95px', marginLeft:'20px'}}>Surfix: </p>
        <Input size='large' style={{width:'80px',height:'40px'}}/>
      
    </div>
    <div style={{display:'flex', paddingBottom:'100px !important'}} className='qtcsKC'>
        <Checkbox/> <p style={{fontWeight:'500', marginLeft:'20px'}}>Reset mỗi ngày </p>
       
    </div>



  </section>
  <div style={{display:'flex', marginLeft:'420px'}}>
    <Button className='btnHuyBo'>Hủy bỏ</Button>
    <Button className='scbtnTTB'>Thêm dịch vụ</Button>
  </div>
</div>

        </div>
    </div>
  )
}

export default ThemDichVu