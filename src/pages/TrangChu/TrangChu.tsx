import React from 'react'
import Navbar from '../../layout/Navbar'
import Header from '../../layout/Header'
import './trangchu.css'
import { Select } from 'antd'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';


const chonTheo = [{ value: 'Ngày', label: 'Ngày' }, { value: 'Tháng', label: 'Tháng' }, { value: 'Năm', label: 'Năm' }];

const customArrow = (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" style={{marginTop:'-10px'}}>
    <path d="M6 9L12 15L18 9" fill="#FF7506" />
    <path d="M6 9L12 15L18 9H6Z" stroke="#FF7506" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
);

interface DataPoint {
  name: string;
  value: number;
}


const data: DataPoint[] = [
  { name: 'Jan', value: 20 },
  { name: 'Feb', value: 45 },
  { name: 'Mar', value: 28 },
  { name: 'Apr', value: 80 },
  { name: 'May', value: 60 },
  { name: 'Jun', value: 90 },
];

function TrangChu() {

  return (
    <div style={{display:'flex'}}>
    <Navbar/>
<div style={{backgroundColor:'rgb(246,246,246,1)', width: '1225px', height:'743px'}}>
  <Header/>
  <p className='nBieuDoCS'>Biểu đồ cấp số</p>
  <div style={{display:'flex'}}>
  <div className='dasLeft' >
    <div style={{display:'flex'}}>
  {/* p1 */}
  <div className='c1'>
    <div style={{display:'flex', padding:'10px'}}>
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none" className='tron1'>
  <circle opacity="0.15" cx="24" cy="24" r="23.5" fill="#6695FB" stroke="#DADADA"/>
</svg>
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className='i1'>
  <path d="M5.25 0C5.44891 0 5.63968 0.0790176 5.78033 0.21967C5.92098 0.360322 6 0.551088 6 0.75V1.5H18V0.75C18 0.551088 18.079 0.360322 18.2197 0.21967C18.3603 0.0790176 18.5511 0 18.75 0C18.9489 0 19.1397 0.0790176 19.2803 0.21967C19.421 0.360322 19.5 0.551088 19.5 0.75V1.5H21C21.7956 1.5 22.5587 1.81607 23.1213 2.37868C23.6839 2.94129 24 3.70435 24 4.5V21C24 21.7956 23.6839 22.5587 23.1213 23.1213C22.5587 23.6839 21.7956 24 21 24H3C2.20435 24 1.44129 23.6839 0.87868 23.1213C0.316071 22.5587 0 21.7956 0 21V4.5C0 3.70435 0.316071 2.94129 0.87868 2.37868C1.44129 1.81607 2.20435 1.5 3 1.5H4.5V0.75C4.5 0.551088 4.57902 0.360322 4.71967 0.21967C4.86032 0.0790176 5.05109 0 5.25 0V0ZM1.5 6V21C1.5 21.3978 1.65804 21.7794 1.93934 22.0607C2.22064 22.342 2.60218 22.5 3 22.5H21C21.3978 22.5 21.7794 22.342 22.0607 22.0607C22.342 21.7794 22.5 21.3978 22.5 21V6H1.5Z" fill="#6493F9"/>
</svg>
<p className='cc1'>Số thứ tự <br /> đã cấp</p>
<p className='ccc1'>235</p>
</div>
  </div>
{/* p2 */}
  <div className='c2'>
    <div style={{display:'flex'}}>
    <svg xmlns="http://www.w3.org/2000/svg" width="49" height="48" viewBox="0 0 49 48" fill="none" className='tron2'>
  <circle opacity="0.15" cx="24.75" cy="24" r="23" fill="#35C75A" stroke="#35C75A" stroke-width="2"/>
</svg>
    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none" className='i2'>
  <path d="M17.031 10.7194C17.1008 10.789 17.1563 10.8718 17.1941 10.9629C17.2319 11.054 17.2513 11.1517 17.2513 11.2504C17.2513 11.349 17.2319 11.4467 17.1941 11.5378C17.1563 11.6289 17.1008 11.7117 17.031 11.7814L12.531 16.2814C12.4613 16.3512 12.3786 16.4066 12.2875 16.4444C12.1963 16.4822 12.0987 16.5017 12 16.5017C11.9014 16.5017 11.8037 16.4822 11.7126 16.4444C11.6214 16.4066 11.5387 16.3512 11.469 16.2814L9.219 14.0314C9.14927 13.9616 9.09396 13.8788 9.05622 13.7877C9.01848 13.6966 8.99905 13.599 8.99905 13.5004C8.99905 13.4017 9.01848 13.3041 9.05622 13.213C9.09396 13.1219 9.14927 13.0391 9.219 12.9694C9.35983 12.8285 9.55084 12.7494 9.75 12.7494C9.84862 12.7494 9.94627 12.7688 10.0374 12.8066C10.1285 12.8443 10.2113 12.8996 10.281 12.9694L12 14.6899L15.969 10.7194C16.0387 10.6495 16.1214 10.5941 16.2126 10.5563C16.3037 10.5185 16.4014 10.499 16.5 10.499C16.5987 10.499 16.6963 10.5185 16.7875 10.5563C16.8786 10.5941 16.9613 10.6495 17.031 10.7194Z" fill="#35C75A"/>
  <path d="M6 0C6.19891 0 6.38968 0.0790176 6.53033 0.21967C6.67098 0.360322 6.75 0.551088 6.75 0.75V1.5H18.75V0.75C18.75 0.551088 18.829 0.360322 18.9697 0.21967C19.1103 0.0790176 19.3011 0 19.5 0C19.6989 0 19.8897 0.0790176 20.0303 0.21967C20.171 0.360322 20.25 0.551088 20.25 0.75V1.5H21.75C22.5456 1.5 23.3087 1.81607 23.8713 2.37868C24.4339 2.94129 24.75 3.70435 24.75 4.5V21C24.75 21.7956 24.4339 22.5587 23.8713 23.1213C23.3087 23.6839 22.5456 24 21.75 24H3.75C2.95435 24 2.19129 23.6839 1.62868 23.1213C1.06607 22.5587 0.75 21.7956 0.75 21V4.5C0.75 3.70435 1.06607 2.94129 1.62868 2.37868C2.19129 1.81607 2.95435 1.5 3.75 1.5H5.25V0.75C5.25 0.551088 5.32902 0.360322 5.46967 0.21967C5.61032 0.0790176 5.80109 0 6 0V0ZM2.25 6V21C2.25 21.3978 2.40804 21.7794 2.68934 22.0607C2.97064 22.342 3.35218 22.5 3.75 22.5H21.75C22.1478 22.5 22.5294 22.342 22.8107 22.0607C23.092 21.7794 23.25 21.3978 23.25 21V6H2.25Z" fill="#35C75A"/>
</svg>
<p className='cc2'>Số thứ tự <br /> đã sử dụng</p> 
<p className='ccc2'>235</p>
</div>
  </div>

  <div className='c3'>
    <div style={{display:'flex'}}>
    <svg xmlns="http://www.w3.org/2000/svg" width="49" height="48" viewBox="0 0 49 48" fill="none" className='tron3'>
  <circle opacity="0.15" cx="24.25" cy="24" r="23.5" fill="#FFAC6A" stroke="#DADADA"/>
</svg>
<svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none" className='i3'>
  <path d="M19.2505 8.9625L20.155 8.058C20.2767 7.93778 20.4308 7.85549 20.5984 7.82114C20.766 7.78679 20.94 7.80185 21.0992 7.8645L22.2017 8.304C22.3627 8.36959 22.5007 8.48137 22.5983 8.62525C22.6958 8.76913 22.7486 8.93867 22.75 9.1125V11.1315C22.748 11.3637 22.6539 11.5856 22.4884 11.7485C22.3229 11.9113 22.0995 12.0018 21.8672 12L21.8297 11.9985C14.1077 11.5185 12.55 4.977 12.2552 2.4735C12.2425 2.35915 12.2525 2.24341 12.2845 2.1329C12.3165 2.02239 12.37 1.91927 12.4418 1.82942C12.5137 1.73958 12.6026 1.66477 12.7034 1.60928C12.8042 1.55379 12.9149 1.51869 13.0292 1.506C13.0631 1.50199 13.0972 1.49998 13.1312 1.5H15.0812C15.2552 1.50063 15.4249 1.55323 15.5687 1.65106C15.7125 1.74888 15.8238 1.88746 15.8882 2.049L16.3285 3.1515C16.3932 3.31023 16.4098 3.48452 16.376 3.65259C16.3423 3.82066 16.2597 3.97506 16.1387 4.0965L15.2342 5.001C15.2342 5.001 15.7547 8.526 19.2505 8.9625Z" fill="#FFAC6A"/>
  <path d="M12.25 22.5H10.75V18.75C10.7494 18.1534 10.5122 17.5815 10.0903 17.1597C9.6685 16.7378 9.09655 16.5006 8.5 16.5H5.5C4.90345 16.5006 4.3315 16.7378 3.90967 17.1597C3.48784 17.5815 3.2506 18.1534 3.25 18.75V22.5H1.75V18.75C1.75119 17.7558 2.14666 16.8027 2.84966 16.0997C3.55267 15.3967 4.5058 15.0012 5.5 15H8.5C9.4942 15.0012 10.4473 15.3967 11.1503 16.0997C11.8533 16.8027 12.2488 17.7558 12.25 18.75V22.5Z" fill="#FFAC6A"/>
  <path d="M7 7.5C7.44501 7.5 7.88002 7.63196 8.25004 7.87919C8.62005 8.12643 8.90843 8.47783 9.07873 8.88896C9.24903 9.3001 9.29359 9.7525 9.20677 10.189C9.11995 10.6254 8.90566 11.0263 8.59099 11.341C8.27632 11.6557 7.87541 11.87 7.43896 11.9568C7.0025 12.0436 6.5501 11.999 6.13896 11.8287C5.72783 11.6584 5.37643 11.37 5.1292 11C4.88196 10.63 4.75 10.195 4.75 9.75C4.75 9.15326 4.98705 8.58097 5.40901 8.15901C5.83097 7.73705 6.40326 7.5 7 7.5ZM7 6C6.25832 6 5.5333 6.21993 4.91661 6.63199C4.29993 7.04404 3.81928 7.62971 3.53545 8.31494C3.25162 9.00016 3.17736 9.75416 3.32206 10.4816C3.46675 11.209 3.8239 11.8772 4.34835 12.4017C4.8728 12.9261 5.54098 13.2833 6.26841 13.4279C6.99584 13.5726 7.74984 13.4984 8.43506 13.2145C9.12029 12.9307 9.70596 12.4501 10.118 11.8334C10.5301 11.2167 10.75 10.4917 10.75 9.75C10.75 9.25754 10.653 8.76991 10.4646 8.31494C10.2761 7.85997 9.99987 7.44657 9.65165 7.09835C9.30343 6.75013 8.89004 6.47391 8.43506 6.28545C7.98009 6.097 7.49246 6 7 6Z" fill="#FFAC6A"/>
</svg>
<p className='cc3'>Số thứ tự <br /> đang chờ</p>
<p className='ccc3'>235</p>
</div>

  </div>

  <div className='c4'>
    <div style={{display:'flex'}}>
    <svg xmlns="http://www.w3.org/2000/svg" width="49" height="48" viewBox="0 0 49 48" fill="none" className='tron4'>
  <circle opacity="0.15" cx="24.5" cy="24" r="23.5" fill="#F86D6D" stroke="#DADADA"/>
</svg>
<svg xmlns="http://www.w3.org/2000/svg" width="19" height="24" viewBox="0 0 19 24" fill="none" className='i4'>
  <path d="M9.26002 6.15C9.28194 6.10502 9.31607 6.06711 9.35851 6.04058C9.40094 6.01406 9.44997 6 9.50001 6C9.55006 6 9.59909 6.01406 9.64152 6.04058C9.68396 6.06711 9.71809 6.10502 9.74001 6.15L10.691 8.0775C10.7101 8.11649 10.7383 8.15025 10.7733 8.17587C10.8084 8.20148 10.8491 8.21817 10.892 8.2245L13.022 8.5335C13.2395 8.565 13.328 8.8335 13.169 8.988L11.63 10.4895C11.599 10.5198 11.5758 10.5572 11.5624 10.5985C11.5491 10.6398 11.546 10.6838 11.5535 10.7265L11.9165 12.8475C11.9247 12.8965 11.919 12.9468 11.9002 12.9927C11.8813 13.0386 11.85 13.0784 11.8098 13.1075C11.7696 13.1367 11.7221 13.154 11.6726 13.1576C11.6231 13.1613 11.5735 13.151 11.5295 13.128L9.62452 12.126C9.58632 12.106 9.54386 12.0956 9.50076 12.0956C9.45766 12.0956 9.41521 12.106 9.37702 12.126L7.47201 13.128C7.42805 13.1506 7.37869 13.1605 7.32942 13.1567C7.28015 13.1529 7.2329 13.1355 7.19294 13.1064C7.15298 13.0773 7.12187 13.0377 7.10308 12.992C7.08429 12.9463 7.07856 12.8963 7.08651 12.8475L7.44952 10.7265C7.45717 10.6839 7.45434 10.64 7.44128 10.5987C7.42821 10.5575 7.4053 10.52 7.37452 10.4895L5.82952 8.988C5.79413 8.95325 5.76911 8.90934 5.75728 8.86117C5.74545 8.81301 5.74727 8.7625 5.76253 8.71531C5.77779 8.66812 5.8059 8.62612 5.84369 8.59401C5.88149 8.56189 5.92748 8.54094 5.97652 8.5335L8.10652 8.2245C8.14944 8.21817 8.19018 8.20148 8.2252 8.17587C8.26022 8.15025 8.28848 8.11649 8.30751 8.0775L9.26002 6.15Z" fill="#F86D6D"/>
  <path d="M0.5 3C0.5 2.20435 0.81607 1.44129 1.37868 0.87868C1.94129 0.316071 2.70435 0 3.5 0L15.5 0C16.2956 0 17.0587 0.316071 17.6213 0.87868C18.1839 1.44129 18.5 2.20435 18.5 3V23.25C18.4999 23.3857 18.4631 23.5188 18.3933 23.6351C18.3236 23.7515 18.2236 23.8468 18.104 23.9108C17.9844 23.9748 17.8497 24.0052 17.7142 23.9988C17.5787 23.9923 17.4474 23.9492 17.3345 23.874L9.5 19.6515L1.6655 23.874C1.55256 23.9492 1.42135 23.9923 1.28584 23.9988C1.15033 24.0052 1.0156 23.9748 0.895999 23.9108C0.776399 23.8468 0.676406 23.7515 0.606671 23.6351C0.536936 23.5188 0.50007 23.3857 0.5 23.25V3ZM3.5 1.5C3.10218 1.5 2.72064 1.65804 2.43934 1.93934C2.15804 2.22064 2 2.60218 2 3V21.849L9.0845 18.126C9.20759 18.0441 9.35215 18.0004 9.5 18.0004C9.64785 18.0004 9.79241 18.0441 9.9155 18.126L17 21.849V3C17 2.60218 16.842 2.22064 16.5607 1.93934C16.2794 1.65804 15.8978 1.5 15.5 1.5H3.5Z" fill="#F86D6D"/>
</svg>
<p className='cc4'>Số thứ tự <br /> đã bỏ qua</p>
<p className='ccc4'>235</p>
</div>
  </div>
  </div>

  <div className='bgThongKe'>
    <div style={{display:'flex'}}>
    <p className='nTKTC'>Bảng thống kê theo tháng</p>
    <div className='nChonThang'>
    <p className='nXemTheo'>Xem theo</p>
    <Select placeholder='Chọn' options={chonTheo} className='slThang' style={{textAlign:'left'}} suffixIcon={customArrow}/>
    </div>
    </div>
    <p className='nNam'>Năm 2023</p>
    <AreaChart width={710} height={300} data={data} className='area'>
  <defs>
    <linearGradient id="gradientFill" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#CEDDFF" />
      <stop offset="100%" stopColor="rgba(206, 221, 255, 0.00)" />
    </linearGradient>
  </defs>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="name" />
  <YAxis />
  <Tooltip />
  <Area type="monotone" dataKey="value" stroke="#5185F7" fill="url(#gradientFill)" />
</AreaChart>

</div>
  </div>
  <div className='dasRight'>
    <p className='nTongQuan'>Tổng quan</p>
    {/* rnTB */}
    <div style={{display:'flex'}} className='rn1'>
   <div style={{marginLeft:'220px'}}>
   <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" fill="none" className='v1'>
  <path d="M50 25C50 38.8071 38.8071 50 25 50C11.1929 50 0 38.8071 0 25C0 11.1929 11.1929 0 25 0C38.8071 0 50 11.1929 50 25ZM2.51045 25C2.51045 37.4206 12.5794 47.4895 25 47.4895C37.4206 47.4895 47.4895 37.4206 47.4895 25C47.4895 12.5794 37.4206 2.51045 25 2.51045C12.5794 2.51045 2.51045 12.5794 2.51045 25Z" fill="#EAEAEC"/>
</svg>
<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60" fill="none" className='vm1'>
  <path d="M30 1.25209C30 0.56058 30.5609 -0.00272785 31.2518 0.0261116C37.9469 0.305574 44.3698 2.82033 49.4834 7.18782C54.9151 11.8269 58.5132 18.2518 59.6306 25.307C60.7481 32.3621 59.3115 39.5845 55.5792 45.675C51.8469 51.7654 46.064 56.3244 39.2705 58.5317C32.477 60.739 25.1188 60.4499 18.5195 57.7164C11.9201 54.9828 6.51269 49.9843 3.2698 43.6197C0.0269051 37.2552 -0.83862 29.9424 0.828905 22.9966C2.39881 16.4575 6.11688 10.6478 11.3691 6.48641C11.9111 6.05697 12.696 6.183 13.1024 6.74245C13.5089 7.30189 13.3828 8.0827 12.8425 8.51419C8.07188 12.3236 4.6946 17.6219 3.26389 23.5812C1.73556 29.9472 2.52884 36.6496 5.50104 42.4828C8.47324 48.3161 13.4293 52.8975 19.4778 55.4028C25.5263 57.9082 32.2703 58.1732 38.4967 56.1501C44.7231 54.127 50.0233 49.9486 53.444 44.3665C56.8648 38.7844 58.1814 32.1649 57.1573 25.6987C56.1331 19.2325 52.8354 13.3438 47.8571 9.09202C43.1969 5.11179 37.3503 2.81045 31.2517 2.53267C30.5609 2.5012 30 1.9436 30 1.25209Z" fill="#FF7506"/>
</svg>
<p className='pt1'>90%</p>
   </div>
   <div>
    <p className='nSoTB'>4.322</p> <br />
     </div>

<p className='nTBTC'>
<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none" className='iTB'>
  <path d="M3.75663 1.16699H10.2375C12.3141 1.16699 12.8333 1.68616 12.8333 3.75699V7.44949C12.8333 9.52616 12.3141 10.0395 10.2433 10.0395H3.75663C1.68579 10.0453 1.16663 9.52616 1.16663 7.45533V3.75699C1.16663 1.68616 1.68579 1.16699 3.75663 1.16699Z" stroke="#FF7506" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M7 10.0449V12.8333" stroke="#FF7506" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M1.16663 7.58301H12.8333" stroke="#FF7506" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M4.375 12.833H9.625" stroke="#FF7506" stroke-linecap="round" stroke-linejoin="round"/>
</svg> Thiết bị</p>

<div className='p3TBTC'>
  <div style={{display:'flex', marginBottom:'0px'}}>
  <p className='nTBHDTC'>Đang hoạt động</p>
  <p className='nSoTBHDTC'>3779</p>
</div>

<div style={{display:'flex', marginTop:'0px'}}>
<p className='nTBNHDTC'>Ngưng hoạt động</p>
<p className='nSoTBNHDTC'>2300</p>
</div>
</div>
    </div>

    {/* rnDV */}
  <div style={{display:'flex'}} className='rn2'>
   <div style={{marginLeft:'220px'}}>
   <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" fill="none" className='v1'>
  <path d="M50 25C50 38.8071 38.8071 50 25 50C11.1929 50 0 38.8071 0 25C0 11.1929 11.1929 0 25 0C38.8071 0 50 11.1929 50 25ZM2.51045 25C2.51045 37.4206 12.5794 47.4895 25 47.4895C37.4206 47.4895 47.4895 37.4206 47.4895 25C47.4895 12.5794 37.4206 2.51045 25 2.51045C12.5794 2.51045 2.51045 12.5794 2.51045 25Z" fill="#EAEAEC"/>
</svg>
<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60" fill="none" className='vm1'>
  <path d="M30 1.25209C30 0.56058 30.5609 -0.00272752 31.2518 0.0261201C36.8261 0.258866 42.2344 2.04233 46.8625 5.18758C51.8363 8.5678 55.6795 13.3648 57.8933 18.9563C60.1071 24.5477 60.5894 30.6754 59.2775 36.5443C57.9656 42.4132 54.9202 47.7524 50.5364 51.8691C46.1526 55.9857 40.6327 58.6899 34.693 59.6306C28.7533 60.5714 22.668 59.7053 17.2266 57.1448C11.7852 54.5843 7.23898 50.4475 4.17774 45.2712C1.32929 40.4548 -0.111064 34.9452 0.00666527 29.3673C0.0212572 28.6759 0.618672 28.1515 1.30882 28.1949C1.99896 28.2383 2.52025 28.8332 2.50828 29.5246C2.42044 34.6012 3.74031 39.6122 6.33319 43.9965C9.1389 48.7407 13.3057 52.5322 18.2928 54.879C23.28 57.2257 28.8574 58.0195 34.3013 57.1573C39.7452 56.2951 44.8043 53.8166 48.8222 50.0436C52.8401 46.2705 55.6313 41.377 56.8336 35.998C58.036 30.619 57.594 25.0028 55.565 19.8781C53.536 14.7534 50.0136 10.3568 45.4549 7.25874C41.2421 4.39568 36.3239 2.76378 31.2518 2.53268C30.561 2.50121 30 1.9436 30 1.25209Z" fill="#4277FF"/>
</svg>
<p className='pt1'>76%</p>
   </div>
   <div>
    <p className='nSoTB'>276</p> <br />
     </div>

<p className='nDVTC'>
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 16 15" fill="none" className='iTB'>
  <path d="M14.7704 5.7304C14.7704 7.04284 14.0591 8.22267 12.9266 9.04368C12.8874 9.07098 12.8658 9.11778 12.8639 9.16459L12.8149 10.4419C12.809 10.6135 12.6189 10.713 12.4739 10.6213L11.3864 9.94074C11.3864 9.94074 11.3864 9.94074 11.3845 9.94074C11.3218 9.89978 11.2453 9.88808 11.1748 9.90954C10.5282 10.1104 9.82472 10.2216 9.08797 10.2216C9.07817 10.2216 9.06837 10.2216 9.05857 10.2216C9.07817 10.0928 9.08797 9.96219 9.08797 9.82958C9.08797 7.99841 7.2108 6.51436 4.89472 6.51436C4.41857 6.51436 3.96201 6.57676 3.53485 6.69182C3.44863 6.38175 3.40356 6.05802 3.40356 5.7265C3.40356 3.24398 5.94695 1.2334 9.08601 1.2334C12.227 1.2373 14.7704 3.24983 14.7704 5.7304Z" stroke="#4277FF" stroke-width="1.10526" stroke-miterlimit="10"/>
  <path d="M3.53675 6.69531C1.88884 7.14189 0.703369 8.37828 0.703369 9.83308C0.703369 10.8003 1.22851 11.6721 2.06324 12.2785C2.09263 12.3 2.1083 12.3331 2.11026 12.3682L2.14553 13.3102C2.14945 13.4369 2.29053 13.5091 2.3983 13.4428L3.20168 12.9396C3.20756 12.9357 3.2154 12.9299 3.22128 12.926C3.25067 12.9026 3.28986 12.8948 3.32513 12.9065C3.81108 13.0625 4.34013 13.1483 4.89662 13.1483C7.04419 13.1483 8.81555 11.871 9.06048 10.2251" stroke="#4277FF" stroke-width="1.10526" stroke-miterlimit="10"/>
</svg> Dịch vụ</p>

<div className='p3TBTC'>
  <div style={{display:'flex', marginBottom:'0px'}}>
  <p className='nDVHDTC'>Đang hoạt động</p>
  <p className='nSoDVHDTC'>373</p>
</div>

<div style={{display:'flex', marginTop:'0px'}}>
<p className='nTBNHDTC'>Ngưng hoạt động</p>
<p className='nSoDVNHDTC'>222</p>
</div>
</div>
    </div>

    {/* rnCS */}
      <div style={{display:'flex'}} className='rn3'>
   <div style={{marginLeft:'220px'}}>
   <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" fill="none" className='v1'>
  <path d="M50 25C50 38.8071 38.8071 50 25 50C11.1929 50 0 38.8071 0 25C0 11.1929 11.1929 0 25 0C38.8071 0 50 11.1929 50 25ZM2.51045 25C2.51045 37.4206 12.5794 47.4895 25 47.4895C37.4206 47.4895 47.4895 37.4206 47.4895 25C47.4895 12.5794 37.4206 2.51045 25 2.51045C12.5794 2.51045 2.51045 12.5794 2.51045 25Z" fill="#EAEAEC"/>
</svg>
<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60" fill="none" className='vm1'>
  <path d="M30 1.25209C30 0.56058 30.5609 -0.0027286 31.2518 0.0261127C37.6258 0.292188 43.7615 2.58475 48.7573 6.58709C54.0793 10.8508 57.7899 16.8006 59.2775 23.4557C60.7651 30.1108 59.9409 37.0742 56.9408 43.1982C53.9407 49.3222 48.9437 54.2413 42.7734 57.1448C36.603 60.0484 29.6276 60.763 22.9966 59.1711C16.3657 57.5791 10.475 53.7756 6.29535 48.3872C2.11571 42.9989 -0.103415 36.3473 0.00370115 29.5288C0.104249 23.1283 2.2489 16.9393 6.10682 11.8584C6.525 11.3077 7.31654 11.2346 7.84936 11.6754C8.38218 12.1162 8.45426 12.9038 8.03818 13.4561C4.54199 18.0971 2.59918 23.7369 2.50757 29.5681C2.4094 35.8175 4.44329 41.9138 8.27404 46.8524C12.1048 51.791 17.5038 55.277 23.5812 56.7361C29.6587 58.1952 36.0519 57.5401 41.7071 54.879C47.3624 52.2178 51.9423 47.7093 54.692 42.0965C57.4417 36.4837 58.1971 30.1016 56.8336 24.002C55.4702 17.9024 52.0694 12.4493 47.1916 8.54143C42.6401 4.89504 37.0562 2.79709 31.2517 2.53267C30.5609 2.50121 30 1.9436 30 1.25209Z" fill="#35C75A"/>
</svg>
<p className='pt1'>86%</p>
   </div>
   <div>
    <p className='nSoTB'>4.322</p> <br />
     </div>

<p className='nCSTC'>
<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none" className='iTB'>
  <g clip-path="url(#clip0_201_18603)">
    <path d="M1.16663 9.91699L6.99996 12.8337L12.8333 9.91699" stroke="#35C75A" stroke-width="1.16667" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M1.16663 7L6.99996 9.91667L12.8333 7" stroke="#35C75A" stroke-width="1.16667" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M6.99996 1.16699L1.16663 4.08366L6.99996 7.00033L12.8333 4.08366L6.99996 1.16699Z" stroke="#35C75A" stroke-width="1.16667" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
  <defs>
    <clipPath id="clip0_201_18603">
      <rect width="14" height="14" fill="white"/>
    </clipPath>
  </defs>
</svg> Cấp số</p>

<div className='p3TBTC'>
  <div style={{display:'flex', marginBottom:'0px'}}>
  <p className='nTBHDTC'>Đẫ sử dụng</p>
  <p className='nSoCSHDTC'>3779</p>
</div>

<div style={{display:'flex', marginTop:'0px', marginBottom:'0px'}}>
<p className='nTBNHDTC'>Đang chờ</p>
<p className='nSoCSDCTC'>2300</p>
</div>

<div style={{display:'flex', marginTop:'-20px'}}>
<p className='nTBNHDTC'>Bỏ qua</p>
<p className='nSoCSDCTC'>2300</p>
</div>
</div>
    </div>

  </div>
  </div>

  </div>
</div>
  )
}

export default TrangChu
