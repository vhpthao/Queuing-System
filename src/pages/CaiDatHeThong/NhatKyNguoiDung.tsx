import React from 'react'
import Navbar from '../../layout/Navbar'

function NhatKyNguoiDung() {
  return (
    <div style={{display:'flex'}}>
        <Navbar/>
        <div className='right' style={{backgroundColor:'rgb(246,246,246,1)', width: '1225px'}}>
            nhật ký người dùng
        </div>
    </div>
  )
}

export default NhatKyNguoiDung