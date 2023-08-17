import React, { useEffect, useState } from 'react'
import Navbar from '../../layout/Navbar'
import '../css/thietbi.css'
import '../css/dichvu.css'
import './capso.css'
import { Button, DatePicker, DatePickerProps, Input, Pagination, Select, Space, Table } from 'antd'
import { fetchDataFromFirebaseCS, State as CapSoState, TableDataItemCapSo } from '../../store/capSoSlice'
import { ColumnsType } from 'antd/es/table'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../../layout/Header'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch } from '@reduxjs/toolkit'
import { format, parse } from 'date-fns';
import dayjs from 'dayjs';

const loaiDichVu = [{ value: 'Tất cả', label: 'Tất cả' }, { value: 'Khám mắt', label: 'Khám mắt' }, { value: 'Khám tai mũi họng', label: 'Khám tai mũi họng' }, { value: 'Khám tổng quát', label: 'Khám tổng quát' }];
const loaiTinhTrang = [{ value: 'Tất cả', label: 'Tất cả' }, { value: 'Đang chờ', label: 'Đang chờ' }, { value: 'Bỏ qua', label: 'Bỏ qua' }, { value: 'Đã sử dụng', label: 'Đã sử dụng' }];
const loaiNguonCap = [{ value: 'Tất cả', label: 'Tất cả' }, { value: 'Kiosk', label: 'Kiosk' }, { value: 'Hệ thống', label: 'Hệ thống' }];

interface RootState {
  capSo: CapSoState;
}

// Hàm chuyển đổi dữ liệu trạng thái thành biểu tượng SVG
const getStatusIcon = (status: string) => {
  if (status === 'Đã sử dụng') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="8" height="9" viewBox="0 0 8 9" fill="none">
        <circle cx="4" cy="4.5" r="4" fill="#7E7D88" />
      </svg>
    );
  }
  else if (status === 'Đang chờ') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="8" height="9" viewBox="0 0 8 9" fill="none">
        <circle cx="4" cy="4.5" r="4" fill="#4277FF" />
      </svg>
    );
  }
  else {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="8" height="9" viewBox="0 0 8 9" fill="none">
        <circle cx="4" cy="4.5" r="4" fill="#E73F3F" />
      </svg>
    );
  }
};

const columns: ColumnsType<TableDataItemCapSo> = [
  {
    title: 'STT',
    dataIndex: 'stt',
    key: 'stt',
  },

  {
    title: 'Tên khách hàng',
    dataIndex: 'tenKH',
    key: 'tenKH',
    render: (text: string, record: TableDataItemCapSo) =>
      getDefaultValue(text, 'Huỳnh Lam Minh'),
  },
  {
    title: 'Tên dịch vụ',
    dataIndex: 'tenDV',
    key: 'tenDV',
  },
  {
    title: 'Thời gian cấp',
    dataIndex: 'tgCap',
    key: 'tgCap',
    render: (text: string, record: TableDataItemCapSo) => {
      const tgCapDate = parse(`${record.ngayCap} ${record.tgCap}`, 'dd/MM/yyyy HH:mm', new Date());

      if (isNaN(tgCapDate.getTime())) {
        console.error("Invalid tgCapDate:", record.tgCap, record.ngayCap);
        return null;
      }
      return (
        <span>
          {format(tgCapDate, 'HH:mm')} - {format(tgCapDate, 'dd/MM/yyyy')}
        </span>
      );
    },
  },

  {
    title: 'Hạn sử dụng',
    dataIndex: 'tgSD',
    key: 'tgSD',
    render: (text: string, record: TableDataItemCapSo) => {
      const tgSDDate = parse(`${record.ngaySD} ${record.tgSD}`, 'dd/MM/yyyy HH:mm', new Date());

      if (isNaN(tgSDDate.getTime())) {
        console.error("Invalid tgSDDate:", record.ngaySD, record.ngaySD);
        return null;
      }

      return (
        <span>
          {format(tgSDDate, 'HH:mm')} - {format(tgSDDate, 'dd/MM/yyyy')}
        </span>
      );
    },
  },

  {
    title: 'Trạng thái ',
    dataIndex: 'trangThai',
    key: 'trangThai',
    render: (text: string, record: TableDataItemCapSo) => (
      <span>
        {getStatusIcon(record.trangThai)}{' '}
        {getDefaultValue(text, 'Đang chờ')}
      </span>
    ),
  },
  {
    title: 'Nguồn cấp ',
    dataIndex: 'nguonCap',
    key: 'nguonCap'
  },
  {
    title: ' ',
    dataIndex: 'chiTiet',
    key: 'chiTiet',
    render: (_, record) => (
      <Space size="middle">
        <Link to={`/capso/chitietcs/${record.key}`} style={{ textDecoration: 'underline' }}>
          Chi tiết
        </Link>
      </Space>
    ),
  },
];

const getDefaultValue = (value: any, defaultValue: any) => {
  return value || defaultValue;
};

const customArrow = (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M6 9L12 15L18 9" fill="#FF7506" />
    <path d="M6 9L12 15L18 9H6Z" stroke="#FF7506" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
);

function CapSo() {
  const dispatch = useDispatch<Dispatch>();
  const capSo = useSelector((state: RootState) => state.capSo);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchDataFromFirebaseCS() as any);
  }, [dispatch, capSo]);

  const handleCapSoMoi = () => {
    navigate('/capso/capsomoi');
  }

  // lọc dữ liệu
  const [filterTenDV, setFilterTenDV] = useState<string | null>(null);
  const [filterTinhTrang, setFilterTinhTrang] = useState<string | null>(null);
  const [filterNguonCap, setFilterNguonCap] = useState<string | null>(null);

  const [filterKeyword, setFilterKeyword] = useState<string>('');

  const [ngayCap, setNgayCap] = useState<dayjs.Dayjs | null>(null);
  const [ngaySD, setNgaySD] = useState<dayjs.Dayjs | null>(null);

  const handleNgayCapChange = (date: dayjs.Dayjs | null, dateString: string) => {
    if (date) {
      setNgayCap(date);
    } else {
      setNgayCap(null);
    }
  };

  const handleNgaySDChange = (date: dayjs.Dayjs | null, dateString: string) => {
    if (date) {
      setNgaySD(date);
    } else {
      setNgaySD(null);
    }
  };

  const filterData = (dataSource: TableDataItemCapSo[]): TableDataItemCapSo[] => {
    return dataSource.filter((TableDataItem) => {
      if (filterTenDV && filterTenDV !== 'Tất cả' && TableDataItem.tenDV && TableDataItem.tenDV !== filterTenDV) {
        return false;
      }

      if (filterTinhTrang && filterTinhTrang !== 'Tất cả' && TableDataItem.trangThai && TableDataItem.trangThai !== filterTinhTrang) {
        return false;
      }

      if (filterNguonCap && filterNguonCap !== 'Tất cả' && TableDataItem.nguonCap && TableDataItem.nguonCap !== filterNguonCap) {
        return false;
      }
      if (ngayCap) {
        const formattedNgayCap = ngayCap.format('DD/MM/YYYY');
        if (TableDataItem.ngayCap !== formattedNgayCap) {
          return false;
        }
      }

      if (ngaySD) {
        const formattedNgaySD = ngaySD.format('DD/MM/YYYY');
        if (TableDataItem.ngaySD !== formattedNgaySD) {
          return false;
        }
      }

      if (filterKeyword) {
        const lowerCaseKeyword = filterKeyword.toLowerCase();
        return (
          (TableDataItem.tenKH && TableDataItem.tenKH.toLowerCase().includes(lowerCaseKeyword)) ||
          (TableDataItem.tenDV && TableDataItem.tenDV.toLowerCase().includes(lowerCaseKeyword)) ||
          (TableDataItem.nguonCap && TableDataItem.nguonCap.toLowerCase().includes(lowerCaseKeyword))
        );
      }

      return true;
    });
  };
  const filteredData = filterData(capSo.capSoList);

  const handleFilterTenDV = (value: string) => {
    setFilterTenDV(value === 'Tất cả' ? null : value);
  };

  const handleFilterTrangThai = (value: string) => {
    setFilterTinhTrang(value === 'Tất cả' ? null : value);
  };

  const handleFilterNguonCap = (value: string) => {
    setFilterNguonCap(value === 'Tất cả' ? null : value);
  };

  const handleFilterKeyword = (value: string) => {
    setFilterKeyword(value);
  };

  // lưu trạng thái mặc định với gtri tất cả
  const [defaultFilterTenDV, setDefaultFilterTenDV] = useState<string>('Tất cả');
  const [defaultFilterTinhTrang, setDefaultFilterTinhTrang] = useState<string>('Tất cả');
  const [defaultFilterNguonCap, setDefaultFilterNguonCap] = useState<string>('Tất cả');

  useEffect(() => {
    const savedDefaultFilterTenDV = localStorage.getItem('defaultFilterTenDV');
    const savedDefaultFilterTinhTrang = localStorage.getItem('defaultFilterTinhTrang');
    const savedDefaultFilterNguonCap = localStorage.getItem('defaultFilterNguonCap');

    if (savedDefaultFilterTenDV) {
      setDefaultFilterTenDV(savedDefaultFilterTenDV);
    }

    if (savedDefaultFilterTinhTrang) {
      setDefaultFilterTinhTrang(savedDefaultFilterTinhTrang);
    }

    if (savedDefaultFilterNguonCap) {
      setDefaultFilterNguonCap(savedDefaultFilterNguonCap);
    }

  }, []);

  useEffect(() => {
    localStorage.setItem('defaultFilterTenDV', defaultFilterTenDV);
    localStorage.setItem('defaultFilterTinhTrang', defaultFilterTinhTrang);
    localStorage.setItem('defaultFilterNguonCap', defaultFilterNguonCap);
  }, [defaultFilterTenDV, defaultFilterTinhTrang, defaultFilterNguonCap]);

  // phân trang
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);

  const getCurrentPageData = (data: TableDataItemCapSo[]): TableDataItemCapSo[] => {
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
      <div className='right' style={{ backgroundColor: 'rgb(246,246,246,1)', width: '1225px' }}>
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
          <p className='nQuanLyCS'>Quản lý cấp số</p>
          <div style={{ display: 'flex' }}>
            <div style={{ marginLeft: '50px' }}>
              <p style={{ marginLeft: '-30px' }}>Tên dịch vụ</p>
              <Select
                style={{ width: 120, textAlign: 'left' }}
                options={loaiDichVu}
                size='large'
                defaultValue={defaultFilterTenDV}
                onChange={(value) => {
                  setFilterTenDV(value === 'Tất cả' ? null : value);
                  setDefaultFilterTenDV(value);
                }}

                suffixIcon={customArrow} />
            </div>
            <div style={{ marginLeft: '30px' }}>
              <p style={{ marginLeft: '-40px' }}>Tình trạng</p>
              <Select
                style={{ width: 120, textAlign: 'left' }}
                options={loaiTinhTrang}
                size='large'
                defaultValue={defaultFilterTinhTrang}
                onChange={(value) => {
                  setFilterTinhTrang(value === 'Tất cả' ? null : value);
                  setDefaultFilterTinhTrang(value);
                }}
                suffixIcon={customArrow} />
            </div>
            <div style={{ marginLeft: '30px' }}>
              <p style={{ marginLeft: '-35px' }}>Nguồn cấp</p>
              <Select
                style={{ width: 120, textAlign: 'left' }}
                options={loaiNguonCap}
                size='large'
                defaultValue={defaultFilterNguonCap}
                onChange={(value) => {
                  setFilterNguonCap(value === 'Tất cả' ? null : value);
                  setDefaultFilterNguonCap(value);
                }}
                suffixIcon={customArrow} />
            </div>

            {/* p2 */}
            <div style={{ marginLeft: '50px' }}>
              <p style={{ marginLeft: '-170px' }}>Chọn thời gian</p>
              <DatePicker
                onChange={handleNgayCapChange}
                style={{ height: '43px', marginRight: '5px', width: '130px' }}
                format={'DD/MM/YYYY'}
                placeholder='Chọn ngày'
                value={ngayCap ? (ngayCap) : null} />
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="10" viewBox="0 0 12 10" fill="none">
                <path d="M8.13346 4.46129L6.9735 3.75776L5.08342 2.61138C4.68302 2.37211 4 2.54353 4 2.88637V5.11126V7.11474C4 7.45758 4.68302 7.629 5.08342 7.38616L8.13346 5.53624C8.62218 5.2434 8.62218 4.75771 8.13346 4.46129Z" fill="#535261" />
              </svg>
              <DatePicker
                onChange={handleNgaySDChange}
                style={{ height: '43px', marginRight: '5px', width: '130px' }}
                format={'DD/MM/YYYY'}
                placeholder='Chọn ngày'
                value={ngaySD ? (ngaySD) : null} />
            </div>

            <div style={{ marginLeft: '30px' }}>
              <p style={{ marginLeft: '-185px' }}>Từ khóa</p>
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
              <Table columns={columns} dataSource={getCurrentPageData(filteredData)} style={{ width: '1030px', marginLeft: '50px', marginTop: '30px' }} className='custom-table' pagination={false} />
              <div style={{ marginTop: '16px', textAlign: 'center' }}>
                <Pagination
                  current={currentPage}
                  pageSize={pageSize}
                  total={filteredData.length}
                  onChange={handlePageChange}
                  onShowSizeChange={handlePageSizeChange} style={{ float: 'right' }} className="custom-pagination" />
              </div>
            </div>
            <Button className='btnTTB' onClick={handleCapSoMoi}>
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path d="M18.8884 2.33301H9.11171C4.86504 2.33301 2.33337 4.86467 2.33337 9.11134V18.8763C2.33337 23.1347 4.86504 25.6663 9.11171 25.6663H18.8767C23.1234 25.6663 25.655 23.1347 25.655 18.888V9.11134C25.6667 4.86467 23.135 2.33301 18.8884 2.33301ZM18.6667 14.8747H14.875V18.6663C14.875 19.1447 14.4784 19.5413 14 19.5413C13.5217 19.5413 13.125 19.1447 13.125 18.6663V14.8747H9.33337C8.85504 14.8747 8.45837 14.478 8.45837 13.9997C8.45837 13.5213 8.85504 13.1247 9.33337 13.1247H13.125V9.33301C13.125 8.85467 13.5217 8.45801 14 8.45801C14.4784 8.45801 14.875 8.85467 14.875 9.33301V13.1247H18.6667C19.145 13.1247 19.5417 13.5213 19.5417 13.9997C19.5417 14.478 19.145 14.8747 18.6667 14.8747Z" fill="#FF9138" />
              </svg> <br /> Cấp <br /> số mới
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CapSo