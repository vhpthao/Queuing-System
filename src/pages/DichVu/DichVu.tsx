import React, { useEffect, useState } from 'react'
import Navbar from '../../layout/Navbar'
import { Button, DatePicker, DatePickerProps, Input, Pagination, Select, Space, Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../../layout/Header'
import './css/dichvu.css'
import { useDispatch, useSelector } from 'react-redux';
import { fetchDataFromFirebaseDV, State as DichVuState } from '../../store/dichVuSlice'
import { Dispatch } from 'redux';

const ttHoatDong = [{ value: 'Tất cả', label: 'Tất cả' }, { value: 'Hoạt động', label: 'Hoạt động' }, { value: 'Ngưng hoạt động', label: 'Ngưng hoạt động' }];

interface RootState {
  dichVu: DichVuState;
}

interface DataTypeDV {
  key: string;
  maDV: string;
  tenDV: string,
  moTa: string;
  trangThaiHD: string;
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

const columns: ColumnsType<DataTypeDV> = [
  {
    title: 'Mã dịch vụ',
    dataIndex: 'maDV',
    key: 'maDV',
  },
  {
    title: 'Tên dịch vụ',
    dataIndex: 'tenDV',
    key: 'tenDV',
  },
  {
    title: 'Mô tả',
    dataIndex: 'moTa',
    key: 'moTa',
  },
  {
    title: 'Trạng thái hoạt động',
    dataIndex: 'trangThaiHD',
    key: 'trangThaiHD',
    render: (text: string, record) => (
      <span>
        {getStatusIcon(record.trangThaiHD)}{' '}
        {getDefaultValue(text, 'Ngưng hoạt động')}
      </span>
    ),
  },
  {
    title: ' ',
    dataIndex: 'chiTiet',
    key: 'chiTiet',

    render: (_, record) => (
      <Space size="middle">
        <Link to={`/dichvu/chitietdv/${record.key}`} style={{ textDecoration: 'underline' }}>Chi tiết</Link>
      </Space>
    ),
  },
  {
    title: ' ',
    key: 'capNhat',
    render: (_, record) => (
      <Space size="middle">
        <Link to={`/dichvu/capnhatdv/${record.key}`} style={{ textDecoration: 'underline' }}>Cập nhật</Link>
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

const getDefaultValue = (value: any, defaultValue: any) => {
  return value || defaultValue;
};

function DichVu() {
  const dispatch = useDispatch<Dispatch>();
  const dichVu = useSelector((state: RootState) => state.dichVu);

  useEffect(() => {
    dispatch(fetchDataFromFirebaseDV() as any);
  }, [dispatch, dichVu]);

  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
  };

  const navigate = useNavigate();

  const handleThemDVDV = () => {
    navigate('/dichvu/themdv');
  }

  // lọc dữ liệu
  const [filterStatusHD, setFilterStatusHD] = useState<string | null>(null);
  const [filterKeyword, setFilterKeyword] = useState<string>('');

  const filterData = (dataSource: DataTypeDV[]): DataTypeDV[] => {
    return dataSource.filter((TableDataItem) => {
      if (filterStatusHD && filterStatusHD !== 'Tất cả' && TableDataItem.trangThaiHD !== filterStatusHD) {
        return false;
      }

      if (filterKeyword) {
        const lowerCaseKeyword = filterKeyword.toLowerCase();
        return (
          TableDataItem.maDV.toLowerCase().includes(lowerCaseKeyword) ||
          TableDataItem.tenDV.toLowerCase().includes(lowerCaseKeyword) ||
          TableDataItem.moTa.toLowerCase().includes(lowerCaseKeyword)
        );
      }

      return true;
    });
  };

  const filteredData = filterData(dichVu.dichVuList);

  const handleFilterStatusHD = (value: string) => {
    setFilterStatusHD(value === 'Tất cả' ? null : value);
  };

  const handleFilterKeyword = (value: string) => {
    setFilterKeyword(value);
  };

  const [defaultFilterStatusHD, setDefaultFilterStatusHD] = useState<string>('Tất cả');

  useEffect(() => {
    const savedDefaultFilterStatusHD = localStorage.getItem('defaultFilterStatusHD');
    if (savedDefaultFilterStatusHD) {
      setDefaultFilterStatusHD(savedDefaultFilterStatusHD);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('defaultFilterStatusHD', defaultFilterStatusHD);
  }, [defaultFilterStatusHD]);

  // phân trang
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);

  const getCurrentPageData = (data: DataTypeDV[]): DataTypeDV[] => {
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
      <div className='right' >
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
          <p className='nQuanLyDVDV'>Quản lý dịch vụ</p>

          {/* chucnang */}
          <div style={{ display: 'flex' }}>
            {/* p1 */}
            <div className='kcTrangThaiHDDV'>
              <p className='nTrangThaiHD'>Trạng thái hoạt động</p>
              <Select
                style={{ width: 250, textAlign: 'left' }}
                options={ttHoatDong}
                size='large'
                defaultValue={defaultFilterStatusHD} 
                onChange={(value) => {
                  setFilterStatusHD(value === 'Tất cả' ? null : value);
                  setDefaultFilterStatusHD(value); 
                }}
                suffixIcon={customArrow} />
            </div>

            {/* p2 */}
            <div className='kcChonTGDV'>
              <p className='nChonTGDV'>Chọn thời gian</p>
              <DatePicker onChange={onChange} className='fromDateDV' format={'DD/MM/YYYY'} placeholder='Chọn ngày' />
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="10" viewBox="0 0 12 10" fill="none" style={{marginLeft:'-15px', marginRight:'5px'}}>
                <path d="M8.13346 4.46129L6.9735 3.75776L5.08342 2.61138C4.68302 2.37211 4 2.54353 4 2.88637V5.11126V7.11474C4 7.45758 4.68302 7.629 5.08342 7.38616L8.13346 5.53624C8.62218 5.2434 8.62218 4.75771 8.13346 4.46129Z" fill="#535261" />
              </svg>
              <DatePicker onChange={onChange} className='toDateDV' format={'DD/MM/YYYY'} placeholder='Chọn ngày' />
            </div>

            {/* p3 */}
            <div className='kcTuKhoaDV'>
              <p className='nTuKhoaDV'>Từ khóa</p>
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
              <Table
                columns={columns}
                dataSource={getCurrentPageData(filteredData)}
                className='custom-table'
                pagination={false}
                style={{ width: '1030px', marginLeft: '50px', marginTop: '30px' }}
              />

              <div style={{ marginTop: '16px', textAlign: 'center' }}>
                <Pagination
                  current={currentPage}
                  pageSize={pageSize}
                  total={filteredData.length}
                  onChange={handlePageChange}
                  onShowSizeChange={handlePageSizeChange} style={{ float: 'right' }} className="custom-pagination" />
              </div>
            </div>
            <Button className='btnThemDVDV' onClick={handleThemDVDV}>
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path d="M18.8884 2.33301H9.11171C4.86504 2.33301 2.33337 4.86467 2.33337 9.11134V18.8763C2.33337 23.1347 4.86504 25.6663 9.11171 25.6663H18.8767C23.1234 25.6663 25.655 23.1347 25.655 18.888V9.11134C25.6667 4.86467 23.135 2.33301 18.8884 2.33301ZM18.6667 14.8747H14.875V18.6663C14.875 19.1447 14.4784 19.5413 14 19.5413C13.5217 19.5413 13.125 19.1447 13.125 18.6663V14.8747H9.33337C8.85504 14.8747 8.45837 14.478 8.45837 13.9997C8.45837 13.5213 8.85504 13.1247 9.33337 13.1247H13.125V9.33301C13.125 8.85467 13.5217 8.45801 14 8.45801C14.4784 8.45801 14.875 8.85467 14.875 9.33301V13.1247H18.6667C19.145 13.1247 19.5417 13.5213 19.5417 13.9997C19.5417 14.478 19.145 14.8747 18.6667 14.8747Z" fill="#FF9138" />
              </svg> <br /> Thêm <br /> dịch vụ
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DichVu
