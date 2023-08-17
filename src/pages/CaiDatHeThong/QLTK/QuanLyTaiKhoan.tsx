import React, { useEffect, useState } from 'react'
import Navbar from '../../../layout/Navbar'
import '././css/taikhoan.css'
import {  Button,  Input,  Pagination,  Select, Space, Table } from 'antd'
import Header from '../../../layout/Header'
import { ColumnsType } from 'antd/es/table'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { fetchNguoiDungDataFromFirebase, TableDataItemNguoiDung, NguoiDungState as TaiKhoanState } from '../../../store/nguoiDungSlice'
import { Dispatch } from 'redux';

const loaiVaiTro = [{ value: 'Tất cả', label: 'Tất cả' },{ value: 'Bác sĩ', label: 'Bác sĩ' },  { value: 'Kế toán', label: 'Kế toán' }, { value: 'Nhân viên', label: 'Nhân viên' }];

interface RootState {
  nguoiDung: TaiKhoanState;
}

// Hàm chuyển đổi dữ liệu trạng thái thành biểu tượng SVG
const getStatusIcon = (status: string) => {
  if (status === 'Hoạt động') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="8" height="9" viewBox="0 0 8 9" fill="none">
        <circle cx="4" cy="4.5" r="4" fill="#34CD26" />
      </svg>
    );
  } else {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="8" height="9" viewBox="0 0 8 9" fill="none">
        <circle cx="4" cy="4.5" r="4" fill="#EC3740" />
      </svg>
    );
  }
};

const columns: ColumnsType<TableDataItemNguoiDung> = [
  {
    title: 'Tên đăng nhập',
    dataIndex: 'tenDN',
    key: 'tenDN',
  },
  {
    title: 'Họ tên',
    dataIndex: 'hoTen',
    key: 'hoTen',
  },
  {
    title: 'Số điện thoại',
    dataIndex: 'sdt',
    key: 'sdt',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Vai trò',
    dataIndex: 'vaiTro',
    key: 'vaiTro',
  },
  {
    title: 'Trạng thái hoạt động',
    dataIndex: 'trangThaiHD',
    key: 'trangThaiHD',
    render: (_, record) => (
      <span>
        {getStatusIcon(record.trangThaiHD)} {`${record.trangThaiHD}`}
      </span>
    ),
  },
  {
    title: ' ',
    key: 'capNhat',
    render: (_, record) => (
      <Space size="middle">
        <Link to={`/qltk/capnhattk/${record.key}`} style={{ textDecoration: 'underline' }}>Cập nhật</Link>
      </Space>
    ),
  },
];

const customArrow = (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M6 9L12 15L18 9" fill="#FF7506" />
    <path d="M6 9L12 15L18 9H6Z" stroke="#FF7506" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
);

function QuanLyTaiKhoan() {
  const dispatch = useDispatch<Dispatch>();
  const nguoiDung = useSelector((state: RootState) => state.nguoiDung);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchNguoiDungDataFromFirebase() as any);
  }, [dispatch, nguoiDung]);

  const handleThemTK = () => {
    navigate('/qltk/themtk');
  }

  // lọc dữ liệu
  const [filterVaiTro, setFilterVaiTro] = useState<string | null>(null);
  const [filterKeyword, setFilterKeyword] = useState<string>('');

  const filterData = (dataSource: TableDataItemNguoiDung[]): TableDataItemNguoiDung[] => {
    return dataSource.filter((TableDataItem) => {
      if (filterVaiTro && filterVaiTro !== 'Tất cả' && TableDataItem.vaiTro !== filterVaiTro) {
        return false;
      }

      if (filterKeyword) {
        const lowerCaseKeyword = filterKeyword.toLowerCase();
        return (
          TableDataItem.tenDN.toLowerCase().includes(lowerCaseKeyword) ||
          TableDataItem.sdt.toLowerCase().includes(lowerCaseKeyword) ||
          TableDataItem.vaiTro.toLowerCase().includes(lowerCaseKeyword) ||
          TableDataItem.trangThaiHD.toLowerCase().includes(lowerCaseKeyword) ||
          TableDataItem.email.toLowerCase().includes(lowerCaseKeyword) ||
          TableDataItem.hoTen.toLowerCase().includes(lowerCaseKeyword)
        );
      }

      return true;
    });
  };

  const filteredData = filterData(nguoiDung.nguoiDungList);

  const handleFilterVaiTro= (value: string) => {
    setFilterVaiTro(value === 'Tất cả' ? null : value);
  };

  const handleFilterKeyword = (value: string) => {
    setFilterKeyword(value);
  };

  const [defaultFilterVaiTro, setDefaultFilterVaiTro] = useState<string>('Tất cả');

  useEffect(() => {
    const savedDefaultFilterVaiTro= localStorage.getItem('defaultFilterVaiTro');

    if (savedDefaultFilterVaiTro) {
      setDefaultFilterVaiTro(savedDefaultFilterVaiTro);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('defaultFilterVaiTro', defaultFilterVaiTro);
  }, [defaultFilterVaiTro]);

  // phân trang
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);

  const getCurrentPageData = (data: TableDataItemNguoiDung[]): TableDataItemNguoiDung[] => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return data.slice(startIndex, endIndex);
  };

  const handlePageChange = (page: number, pageSize?: number | undefined) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (current: number, size: number) => {
    setPageSize(size);
    setCurrentPage(1); 
  };

  return (
    <div style={{ display: 'flex' }}>
      <Navbar />
      <div className='right'>
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

        <div>
          <Header />
          <p className='nDanhSachTK'>Danh sách tài khoản</p>

          <div style={{ display: 'flex' }}>
            <div className='kcVaiTro'>
              <p style={{ marginLeft: '-220px' }}>Tên vai trò</p>
              <Select
                style={{ width: 300, textAlign: 'left' }}
                options={loaiVaiTro}
                size='large'
                defaultValue={defaultFilterVaiTro} // Sử dụng giá trị mặc định ở đây
                onChange={(value) => {
                  setFilterVaiTro(value === 'Tất cả' ? null : value);
                  
                }}
                suffixIcon={customArrow}
                 />
            </div>

            <div className='kcTuKhoaQLTK'>
              <p className='nTuKhoa'>Từ khóa</p>
              <Input
                placeholder='Nhập từ khóa tìm kiếm'
                suffix={
                  <Button style={{ border: 'none' }}>   <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M9.16667 15.8333C12.8486 15.8333 15.8333 12.8486 15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333Z" stroke="#FF7506" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M17.5 17.5L13.875 13.875" stroke="#FF7506" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg></Button>
                }
                style={{ backgroundColor: 'white', color: 'orange', width: '250px', height: '43px' }}
                onChange={(e) => handleFilterKeyword(e.target.value)} />
            </div>

          </div>

          <div style={{ display: 'flex' }}>
            <div>
          <Table columns={columns} dataSource={getCurrentPageData(filteredData)} pagination={false} className='bangQLTK custom-table' />
      
          <div style={{ marginTop: '16px', textAlign: 'center' }}>
                <Pagination
                  current={currentPage}
                  pageSize={pageSize}
                  total={filteredData.length}
                  onChange={handlePageChange}
                  onShowSizeChange={handlePageSizeChange} style={{ float: 'right' }} className="custom-pagination" />
              </div>
              </div>
            <Button className='btnThemTK' onClick={handleThemTK}>
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <path d="M18.8884 2.33301H9.11171C4.86504 2.33301 2.33337 4.86467 2.33337 9.11134V18.8763C2.33337 23.1347 4.86504 25.6663 9.11171 25.6663H18.8767C23.1234 25.6663 25.655 23.1347 25.655 18.888V9.11134C25.6667 4.86467 23.135 2.33301 18.8884 2.33301ZM18.6667 14.8747H14.875V18.6663C14.875 19.1447 14.4784 19.5413 14 19.5413C13.5217 19.5413 13.125 19.1447 13.125 18.6663V14.8747H9.33337C8.85504 14.8747 8.45837 14.478 8.45837 13.9997C8.45837 13.5213 8.85504 13.1247 9.33337 13.1247H13.125V9.33301C13.125 8.85467 13.5217 8.45801 14 8.45801C14.4784 8.45801 14.875 8.85467 14.875 9.33301V13.1247H18.6667C19.145 13.1247 19.5417 13.5213 19.5417 13.9997C19.5417 14.478 19.145 14.8747 18.6667 14.8747Z" fill="#FF9138" />
                </svg> <br /> Thêm <br /> tài khoản
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuanLyTaiKhoan