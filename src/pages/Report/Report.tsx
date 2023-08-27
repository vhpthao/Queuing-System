import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import './report.css'
import { Pagination, Table, Button, DatePicker } from 'antd'
import { fetchDataFromFirebaseCS, State as GiveNumberState, TableDataItemGiveNumber } from '../../store/giveNumberSlice'
import { ColumnsType } from 'antd/es/table'
import Header from '../../components/Header'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch } from '@reduxjs/toolkit'
import { format, parse } from 'date-fns';
import dayjs from 'dayjs';
import Papa from 'papaparse'

const exportAsCSV = (data: any, filename: string) => {
  const csv = Papa.unparse(data, { header: true }); 
  const csvWithBom = '\uFEFF' + csv; 
  const blob = new Blob([csvWithBom], { type: 'text/csv;charset=utf-8;' }); 
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a'); 
  link.setAttribute('href', url); 
  link.setAttribute('download', filename); 
  link.style.visibility = 'hidden'; 
  document.body.appendChild(link); 
  link.click(); 
  document.body.removeChild(link); 
};

interface RootState {
  giveNumber: GiveNumberState;
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

const columns: ColumnsType<TableDataItemGiveNumber> = [
  {
    title: 'STT',
    dataIndex: 'stt',
    key: 'stt',
    sorter: (a: any, b: any) => a.stt - b.stt,
  },
  {
    title: 'Tên dịch vụ',
    dataIndex: 'tenDV',
    key: 'tenDV',
    sorter: (a: any, b: any) => a.tenDV - b.tenDV,
  },
  {
    title: 'Thời gian cấp',
    dataIndex: 'tgCap',
    key: 'tgCap',
    render: (text: string, record: TableDataItemGiveNumber) => {
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
    sorter: (a: any, b: any) => a.tgCap - b.tgCap,
  },

  {
    title: 'Trạng thái ',
    dataIndex: 'trangThai',
    key: 'trangThai',
    render: (text: string, record: TableDataItemGiveNumber) => (
      <span>
        {getStatusIcon(record.trangThai)}{' '}
        {getDefaultValue(text, 'Đang chờ')}
      </span>
    ),
    sorter: (a: any, b: any) => a.trangThai - b.trangThai,
  },
  {
    title: 'Nguồn cấp ',
    dataIndex: 'nguonCap',
    key: 'nguonCap',
    sorter: (a: any, b: any) => a.nguonCap - b.nguonCap,
  },
];


const getDefaultValue = (value: any, defaultValue: any) => {
  return value || defaultValue;
};

function Report() {

  const dispatch = useDispatch<Dispatch>();
  const giveNumber = useSelector((state: RootState) => state.giveNumber);

  useEffect(() => {
    dispatch(fetchDataFromFirebaseCS() as any);
  }, [dispatch, giveNumber]);

  // lọc dữ liệu
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

  const filterData = (dataSource: TableDataItemGiveNumber[]): TableDataItemGiveNumber[] => {
    return dataSource.filter((TableDataItem) => {
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

      return true;
    });
  };
  const filteredData = filterData(giveNumber.giveNumberList);

  // phân trang
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);

  const getCurrentPageData = (data: TableDataItemGiveNumber[]): TableDataItemGiveNumber[] => {
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

  const handleExportCSV = () => {
    const dataToExport = filteredData.map(item => {
      const tgCapDate = parse(`${item.ngayCap} ${item.tgCap}`, 'dd/MM/yyyy HH:mm', new Date());
      const formattedTgCap = isNaN(tgCapDate.getTime())
        ? 'Invalid Time'
        : `${format(tgCapDate, 'HH:mm')} - ${format(tgCapDate, 'dd/MM/yyyy')}`;
  
      return {
        'STT': item.stt,
        'Tên dịch vụ': item.tenDV,
        'Thời gian cấp': formattedTgCap,
        'Trạng thái': item.trangThai,
        'Nguồn cấp': item.nguonCap,
      };
    });
  
    exportAsCSV(dataToExport, 'bao_cao.csv');
  };
  
  

  return (
    <div style={{ display: 'flex' }}>
      <Navbar />
      <div className='rightBaoCao' style={{width: '1231px', height:'740px'}}>
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
        <div >
          <Header />

          {/* chucnang */}
          <div style={{ display: 'flex' }}>
            {/* p2 */}
            <div className='kcChonTG'>
              <p className='nChonTG'>Chọn thời gian</p>
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

          </div>

          <div style={{ display: 'flex' }}>
            <div>
              <Table columns={columns} dataSource={getCurrentPageData(filteredData)} style={{ width: '1030px', marginLeft: '50px', marginTop: '30px' }} className='bangBaoCao custom-table' pagination={false} />
              <div style={{ marginTop: '16px', textAlign: 'center' }}>
                <Pagination
                  current={currentPage}
                  pageSize={pageSize}
                  total={filteredData.length}
                  onChange={handlePageChange}
                  onShowSizeChange={handlePageSizeChange} style={{ float: 'right' }} className="custom-pagination" />
              </div>
            </div>

            <Button className='btnTaiVeBaoCao' onClick={handleExportCSV} style={{marginLeft:'60px'}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <path d="M23.9166 11.888H20.545C17.78 11.888 15.5283 9.63634 15.5283 6.87134V3.49967C15.5283 2.85801 15.0033 2.33301 14.3616 2.33301H9.41496C5.82163 2.33301 2.91663 4.66634 2.91663 8.83134V19.168C2.91663 23.333 5.82163 25.6663 9.41496 25.6663H18.585C22.1783 25.6663 25.0833 23.333 25.0833 19.168V13.0547C25.0833 12.413 24.5583 11.888 23.9166 11.888ZM14.3266 18.4097L11.9933 20.743C11.9116 20.8247 11.8066 20.8947 11.7016 20.9297C11.5966 20.9763 11.4916 20.9997 11.375 20.9997C11.2583 20.9997 11.1533 20.9763 11.0483 20.9297C10.955 20.8947 10.8616 20.8247 10.7916 20.7547C10.78 20.743 10.7683 20.743 10.7683 20.7313L8.43496 18.398C8.09663 18.0597 8.09663 17.4997 8.43496 17.1613C8.77329 16.823 9.33329 16.823 9.67163 17.1613L10.5 18.013V13.1247C10.5 12.6463 10.8966 12.2497 11.375 12.2497C11.8533 12.2497 12.25 12.6463 12.25 13.1247V18.013L13.09 17.173C13.4283 16.8347 13.9883 16.8347 14.3266 17.173C14.665 17.5113 14.665 18.0713 14.3266 18.4097Z" fill="#FF7506" />
                  <path d="M20.335 10.2779C21.4434 10.2896 22.9834 10.2896 24.3017 10.2896C24.9667 10.2896 25.3167 9.50792 24.85 9.04125C23.17 7.34958 20.16 4.30458 18.4334 2.57792C17.955 2.09958 17.1267 2.42625 17.1267 3.09125V7.16292C17.1267 8.86625 18.5734 10.2779 20.335 10.2779Z" fill="#FF7506" />
                </svg> <br /> Tải về
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Report
