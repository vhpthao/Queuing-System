import React from 'react'
import {BellFilled } from '@ant-design/icons';
import { Avatar } from 'antd';
import Navbar from '../../layout/Navbar';

function TTCaNhan() {
  return (
    <div>
      <Navbar/>
      <div>
        <header>
            <p style={{color:'orange',fontSize:'20px'}}>Thông tin cá nhân</p>

            <BellFilled></BellFilled>
            <Avatar shape="circle" size={50} src="https://i.pinimg.com/564x/fa/85/05/fa8505aa42f880dd74e2eee9bba79647.jpg" alt="gojo" style={{marginTop:'0px'}} />
            <div>
                <p>Xin chào!</p>
                <p>Võ Hoàng Phương Thảo</p>
            </div>
        </header>

        <section>
            kkkkk
        </section>
        </div>
    </div>
  )
}

export default TTCaNhan