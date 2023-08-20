import React from 'react';
import './App.css';
import {Routes, Route} from 'react-router-dom'
import DangNhap from './pages/DangNhap/DangNhap';
import DatLaiMKMoi from './pages/DangNhap/DatLaiMKMoi';
import QuenMK from './pages/DangNhap/QuenMK';
import TTCaNhan from './pages/ThongTinCaNhan/TTCaNhan';
import TrangChu from './pages/TrangChu/TrangChu';
import ThietBi from './pages/ThietBi/ThietBi';
import DichVu from './pages/DichVu/DichVu';
import CapSo from './pages/CapSo/CapSo';
import BaoCao from './pages/BaoCao/BaoCao';
import QuanLyVaiTro from './pages/CaiDatHeThong/QLVT/QuanLyVaiTro';
import NhatKyNguoiDung from './pages/CaiDatHeThong/NKND/NhatKyNguoiDung';
import QuanLyTaiKhoan from './pages/CaiDatHeThong/QLTK/QuanLyTaiKhoan';
import ThemThietBi from './pages/ThietBi/ThemThietBi';
import CTThietBi from './pages/ThietBi/CTThietBi';
import CapNhatTB from './pages/ThietBi/CapNhatTB';
import ThemDichVu from './pages/DichVu/ThemDichVu';
import CTDichVu from './pages/DichVu/CTDichVu';
import CapNhatDV from './pages/DichVu/CapNhatDV';
import CapSoMoi from './pages/CapSo/CapSoMoi';
import CTCapSo from './pages/CapSo/CTCapSo';
import ThemVaiTro from './pages/CaiDatHeThong/QLVT/ThemVaiTro';
import CapNhatVT from './pages/CaiDatHeThong/QLVT/CapNhatVT';
import ThemTK from './pages/CaiDatHeThong/QLTK/ThemTK';
import CapNhatTK from './pages/CaiDatHeThong/QLTK/CapNhatTK';
import Test from './test/Test';

function App() {
  return (
    <div className="App">
      <Routes>
       <Route path="/dangnhap" element={<DangNhap/>}/>
       <Route path="/quenmk" element={<QuenMK/>}/>
       <Route path="/datlaimkmoi" element={<DatLaiMKMoi/>}/>

       <Route path='/ttcn' element={<TTCaNhan/>}/>
       <Route path='/trangchu' element={<TrangChu/>}/>

       <Route path='/thietbi' element={<ThietBi/>}/>
       <Route path='/thietbi/themtb' element={<ThemThietBi/>}/>
       <Route path='/thietbi/capnhattb/:key' element={<CapNhatTB/>}/>
       <Route path='/thietbi/cttb/:key' element={<CTThietBi/>}/>

       <Route path='/dichvu' element={<DichVu/>}/>
       <Route path='/dichvu/themdv' element={<ThemDichVu/>}/>
       <Route path='/dichvu/chitietdv/:key' element={<CTDichVu/>}/>
       <Route path='/dichvu/capnhatdv/:key' element={<CapNhatDV/>}/>

       <Route path='/capso' element={<CapSo/>}/>
       <Route path='/capso/capsomoi' element={<CapSoMoi/>}/>
       <Route path='/capso/chitietcs/:key' element={<CTCapSo/>}/>

       <Route path='/baocao' element={<BaoCao/>}/>

       <Route path='/qlvt' element={<QuanLyVaiTro/>}/>
       <Route path='/qlvt/themvt' element={<ThemVaiTro/>}/>
       <Route path='/qlvt/capnhatvt/:key' element={<CapNhatVT/>}/>

       <Route path='/qltk' element={<QuanLyTaiKhoan/>}/>
       <Route path='/qltk/themtk' element={<ThemTK/>}/>
       <Route path='/qltk/capnhattk/:key' element={<CapNhatTK/>}/>

       <Route path='/nknd' element={<NhatKyNguoiDung/>}/>


      </Routes>
    </div>
  );
}

export default App;
