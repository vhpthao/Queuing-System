import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import './css/device.css'
import { Button, Input, Pagination, Select, Space, Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { fetchDataFromFirebase, State as DeviceState } from '../../store/deviceSlice'
import { Dispatch } from 'redux';
import Header from '../../components/Header'

interface RootState {
  device: DeviceState;
}

const ttHoatDong = [{ value: 'Tất cả', label: 'Tất cả' }, { value: 'Hoạt động', label: 'Hoạt động' }, { value: 'Ngưng hoạt động', label: 'Ngưng hoạt động' }];
const ttKetNoi = [{ value: 'Tất cả', label: 'Tất cả' }, { value: 'Kết nối', label: 'Kết nối' }, { value: 'Mất kết nối', label: 'Mất kết nối' }];

interface DataType {
  key: string;
  maTB: string;
  tenTB: string,
  dcIP: string;
  ttHD: string;
  ttKN: string;
  dvSD: string;
}
// Hàm chuyển đổi dữ liệu trạng thái thành biểu tượng SVG
const getStatusIcon = (status: string) => {
  if (status === 'Hoạt động' || status === 'Kết nối') {
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

const columns: ColumnsType<DataType> = [
  {
    title: 'Mã thiết bị',
    dataIndex: 'maTB',
    key: 'maTB',
  },
  {
    title: 'Tên thiết bị',
    dataIndex: 'tenTB',
    key: 'tenTB',
  },
  {
    title: 'Địa chỉ IP',
    dataIndex: 'dcIP',
    key: 'dcIP',
  },
  {
    title: 'Trạng thái hoạt động',
    dataIndex: 'ttHD',
    key: 'ttHD',
    render: (text: string, record) => (
      <span>
        {getStatusIcon(record.ttHD)}{' '}
        {getDefaultValue(text, 'Ngưng hoạt động')}
      </span>
    ),
  },
  {
    title: 'Trạng thái kết nối',
    dataIndex: 'ttKN',
    key: 'ttKN',
    render: (text: string, record) => (
      <span>
        {getStatusIcon(record.ttKN)}{' '}
        {getDefaultValue(text, 'Mất kết nối')}
      </span>
    ),
  },
  {
    title: 'Dịch vụ sử dụng',
    dataIndex: 'dvSD',
    key: 'dvSD',
  },
  {
    title: ' ',
    dataIndex: 'chiTiet',
    key: 'chiTiet',

    render: (_, record) => (
      <Space size="middle">
        <Link to={`/device/detailDevice/${record.key}`} style={{ textDecoration: 'underline' }}>Chi tiết</Link>
      </Space>
    ),
  },
  {
    title: ' ',
    key: 'capNhat',
    render: (_, record) => (
      <Space size="middle">
        <Link to={`/device/updateDevice/${record.key}`} style={{ textDecoration: 'underline' }}>Cập nhật</Link>
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

function Device() {
  const dispatch = useDispatch<Dispatch>();
  const device = useSelector((state: RootState) => state.device);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchDataFromFirebase() as any);
  }, [dispatch, device]);

  const handleThemTB = () => {
    navigate('/device/addDevice');
  }

  // lọc dữ liệu
  const [filterStatusHD, setFilterStatusHD] = useState<string | null>(null);
  const [filterStatusKN, setFilterStatusKN] = useState<string | null>(null);
  const [filterKeyword, setFilterKeyword] = useState<string>('');

  const filterData = (dataSource: DataType[]): DataType[] => {
    return dataSource.filter((TableDataItem) => {
      if (filterStatusHD && filterStatusHD !== 'Tất cả' && TableDataItem.ttHD !== filterStatusHD) {
        return false;
      }

      if (filterStatusKN && filterStatusKN !== 'Tất cả' && TableDataItem.ttKN !== filterStatusKN) {
        return false;
      }

      if (filterKeyword) {
        const lowerCaseKeyword = filterKeyword.toLowerCase();
        return (
          TableDataItem.maTB.toLowerCase().includes(lowerCaseKeyword) ||
          TableDataItem.tenTB.toLowerCase().includes(lowerCaseKeyword) ||
          TableDataItem.dcIP.toLowerCase().includes(lowerCaseKeyword) ||
          (typeof TableDataItem.dvSD === 'string' && TableDataItem.dvSD.toLowerCase().includes(lowerCaseKeyword))
        );
      }

      return true;
    });
  };

  const filteredData = filterData(device.deviceList);

  const handleFilterStatusHD = (value: string) => {
    setFilterStatusHD(value === 'Tất cả' ? null : value);
  };

  const handleFilterStatusKN = (value: string) => {
    setFilterStatusKN(value === 'Tất cả' ? null : value);
  };

  const handleFilterKeyword = (value: string) => {
    setFilterKeyword(value);
  };

  const [defaultFilterStatusHD, setDefaultFilterStatusHD] = useState<string>('Tất cả');
  const [defaultFilterStatusKN, setDefaultFilterStatusKN] = useState<string>('Tất cả');

  useEffect(() => {
    // Lấy giá trị mặc định từ localStorage nếu có
    const savedDefaultFilterStatusHD = localStorage.getItem('defaultFilterStatusHD');
    const savedDefaultFilterStatusKN = localStorage.getItem('defaultFilterStatusKN');

    if (savedDefaultFilterStatusHD) {
      setDefaultFilterStatusHD(savedDefaultFilterStatusHD);
    }

    if (savedDefaultFilterStatusKN) {
      setDefaultFilterStatusKN(savedDefaultFilterStatusKN);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('defaultFilterStatusHD', defaultFilterStatusHD);
    localStorage.setItem('defaultFilterStatusKN', defaultFilterStatusKN);
  }, [defaultFilterStatusHD, defaultFilterStatusKN]);

  // phân trang
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);

  const getCurrentPageData = (data: DataType[]): DataType[] => {
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
      <div style={{ backgroundColor: 'rgb(246,246,246,1)',width: '1230px', height:'740px' }}>
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
          <p className='nDanhSachTB'>Danh sách thiết bị</p>
          <div style={{ display: 'flex' }}>
            <div className='kcTrangThai'>
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
            <div className='kcTrangThaiKN'>
              <p className='nTrangThaiKNTB'>Trạng thái kết nối</p>
              <Select
                style={{ width: 250, textAlign: 'left' }}
                options={ttKetNoi}
                size='large'
                defaultValue={defaultFilterStatusKN}
                onChange={(value) => {
                  setFilterStatusKN(value === 'Tất cả' ? null : value);
                  setDefaultFilterStatusKN(value);
                }}
                suffixIcon={customArrow} />
            </div>

            <div className='kcTuKhoaTB'>
              <p className='nTuKhoaTB'>Từ khóa</p>
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
                className='bangThietBi custom-table'
                pagination={false}
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
            <Button className='btnThemTB' onClick={handleThemTB}>
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path d="M18.8884 2.33301H9.11171C4.86504 2.33301 2.33337 4.86467 2.33337 9.11134V18.8763C2.33337 23.1347 4.86504 25.6663 9.11171 25.6663H18.8767C23.1234 25.6663 25.655 23.1347 25.655 18.888V9.11134C25.6667 4.86467 23.135 2.33301 18.8884 2.33301ZM18.6667 14.8747H14.875V18.6663C14.875 19.1447 14.4784 19.5413 14 19.5413C13.5217 19.5413 13.125 19.1447 13.125 18.6663V14.8747H9.33337C8.85504 14.8747 8.45837 14.478 8.45837 13.9997C8.45837 13.5213 8.85504 13.1247 9.33337 13.1247H13.125V9.33301C13.125 8.85467 13.5217 8.45801 14 8.45801C14.4784 8.45801 14.875 8.85467 14.875 9.33301V13.1247H18.6667C19.145 13.1247 19.5417 13.5213 19.5417 13.9997C19.5417 14.478 19.145 14.8747 18.6667 14.8747Z" fill="#FF9138" />
              </svg> <br /> Thêm <br /> thiết bị
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Device
