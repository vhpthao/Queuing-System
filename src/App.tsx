import React from 'react';
import './App.css';
import {Routes, Route} from 'react-router-dom'
import DangNhap from './pages/DangNhap/DangNhap';
import DatLaiMKMoi from './pages/DangNhap/DatLaiMKMoi';
import QuenMK from './pages/DangNhap/QuenMK';
import TTCaNhan from './pages/CaiDatHeThong/TTCaNhan';
import TrangChu from './pages/TrangChu/TrangChu';
import ThietBi from './pages/ThietBi/ThietBi';
import DichVu from './pages/DichVu/DichVu';
import CapSo from './pages/CapSo/CapSo';
import BaoCao from './pages/BaoCao/BaoCao';
import CaiDatHeThong from './pages/CaiDatHeThong/CaiDatHeThong';
import QuanLyVaiTro from './pages/CaiDatHeThong/QuanLyVaiTro';
import NhatKyNguoiDung from './pages/CaiDatHeThong/NhatKyNguoiDung';
import QuanLyTaiKhoan from './pages/CaiDatHeThong/QuanLyTaiKhoan';
import ThemThietBi from './pages/ThietBi/ThemThietBi';
import CTThietBi from './pages/ThietBi/CTThietBi';
import CapNhatTB from './pages/ThietBi/CapNhatTB';
import ThemDichVu from './pages/DichVu/ThemDichVu';
import CTDichVu from './pages/DichVu/CTDichVu';
import CapNhatDV from './pages/DichVu/CapNhatDV';

function App() {
  return (
    <div className="App">
      <Routes>
       <Route path="/dangnhap" element={<DangNhap/>}/>
       <Route path="/quenmk" element={<QuenMK/>}/>
       <Route path="/datlaimkmoi" element={<DatLaiMKMoi/>}/>

       <Route path="/ttcanhan" element={<TTCaNhan/>}/>
       <Route path='/trangchu' element={<TrangChu/>}/>

       <Route path='/thietbi' element={<ThietBi/>}/>
       <Route path='/thietbi/themtb' element={<ThemThietBi/>}/>
       <Route path='/thietbi/capnhattb' element={<CapNhatTB/>}/>
       <Route path='/thietbi/cttb' element={<CTThietBi/>}/>

       <Route path='/dichvu' element={<DichVu/>}/>
       <Route path='/dichvu/themdv' element={<ThemDichVu/>}/>
       <Route path='/dichvu/chitietdv' element={<CTDichVu/>}/>
       <Route path='/dichvu/capnhatdv' element={<CapNhatDV/>}/>


       <Route path='/capso' element={<CapSo/>}/>
       <Route path='/baocao' element={<BaoCao/>}/>
       <Route path='/cdht' element={<CaiDatHeThong/>}/>

       <Route path='/qlvt' element={<QuanLyVaiTro/>}/>
       <Route path='/qltk' element={<QuanLyTaiKhoan/>}/>
       <Route path='/nknd' element={<NhatKyNguoiDung/>}/>
      </Routes>
    </div>
  );
}

export default App;
