import React, { useEffect, useState } from 'react'
import Navbar from '../../../layout/Navbar'
import './nguoidung.css'
import { Button, DatePicker, DatePickerProps, Input, Pagination, Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import Header from '../../../layout/Header'
import { State as NhatKyState, TableDataItemNhatKy, fetchDataFromFirebase } from '../../../store/nhatKySlice'
import { format, parse } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch } from '@reduxjs/toolkit'
import dayjs from 'dayjs';

interface RootState {
  nhatKy: NhatKyState;
}

const columns: ColumnsType<TableDataItemNhatKy> = [
  {
    title: 'Tên đăng nhập',
    dataIndex: 'tenDN',
    key: 'tenDN',
  },
  {
    title: 'Thời gian tác động',
    dataIndex: 'tgTD',
    key: 'tgTD',
    render: (text: string, record: TableDataItemNhatKy) => {
      const ngayTacDong = parse(`${record.ngayTD} ${record.tgTD}`, 'dd/MM/yyyy HH:mm', new Date());

      if (isNaN(ngayTacDong.getTime())) {
        console.error("Invalid ngayTacDong:", record.ngayTD, record.tgTD);
        return null;
      }

      return (
        <span>
          {format(ngayTacDong, 'dd/MM/yyyy')} - {format(ngayTacDong, 'HH:mm')}
        </span>
      );
    },
  },
  {
    title: 'IP thực hiện',
    dataIndex: 'ipThucHien',
    key: 'ipThucHien',
  },

  {
    title: 'Thao tác thực hiện',
    dataIndex: 'tenThaoTac',
    key: 'tenThaoTac',
  },

];


function NhatKyNguoiDung() {
  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
  };

  const dispatch = useDispatch<Dispatch>();
  const nhatKy = useSelector((state: RootState) => state.nhatKy);


  // đọc dlieu từ firestore
  useEffect(() => {
    dispatch(fetchDataFromFirebase() as any);
  }, [dispatch, nhatKy])

  // lọc dữ liệu
  const [ngayTD, setNgayTD] = useState<dayjs.Dayjs | null>(null);

  const [filterKeyword, setFilterKeyword] = useState<string>('');

  const handleNgayTDChange = (date: dayjs.Dayjs | null, dateString: string) => {
    if (date) {
      setNgayTD(date);
    } else {
      setNgayTD(null);
    }
  };


  const filterData = (dataSource: TableDataItemNhatKy[]): TableDataItemNhatKy[] => {
    return dataSource.filter((TableDataItem) => {

      if (ngayTD) {
        const formattedNgayTD = ngayTD.format('DD/MM/YYYY');
        if (TableDataItem.ngayTD !== formattedNgayTD) {
          return false;
        }
      }

      if (filterKeyword) {
        const lowerCaseKeyword = filterKeyword.toLowerCase();
        return (
          (TableDataItem.tenDN && TableDataItem.tenDN.toLowerCase().includes(lowerCaseKeyword)) ||
          (TableDataItem.ipThucHien && TableDataItem.ipThucHien.toLowerCase().includes(lowerCaseKeyword)) ||
          (TableDataItem.tenThaoTac && TableDataItem.tenThaoTac.toLowerCase().includes(lowerCaseKeyword))
        );
      }

      return true;
    });
  };
  const filteredData = filterData(nhatKy.nhatKyList);


  const handleFilterKeyword = (value: string) => {
    setFilterKeyword(value);
  };


  // phân trang
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);

  const getCurrentPageData = (data: TableDataItemNhatKy[]): TableDataItemNhatKy[] => {
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
          {/* chucnang */}
          <div style={{ display: 'flex' }}>
            {/* p2 */}
            <div className='kcChonTG'>
              <p className='nChonTG'>Chọn thời gian</p>
              <DatePicker
                onChange={handleNgayTDChange}
                style={{ height: '43px', marginRight: '5px', width: '130px' }}
                format={'DD/MM/YYYY'}
                placeholder='Chọn ngày'
                value={ngayTD ? (ngayTD) : null} />
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="10" viewBox="0 0 12 10" fill="none" style={{ marginLeft: '5px' }} >
                <path d="M8.13346 4.46129L6.9735 3.75776L5.08342 2.61138C4.68302 2.37211 4 2.54353 4 2.88637V5.11126V7.11474C4 7.45758 4.68302 7.629 5.08342 7.38616L8.13346 5.53624C8.62218 5.2434 8.62218 4.75771 8.13346 4.46129Z" fill="#535261" />
              </svg>
              <DatePicker onChange={onChange} className='toDate' placeholder='Chọn ngày' />
            </div>

            {/* p3 */}
            <div className='kcTuKhoaNKND'>
              <p className='nTuKhoaNKND'>Từ khóa</p>
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
              <Table columns={columns} dataSource={getCurrentPageData(filteredData)} className='bangNKND custom-table' pagination={false} />
              <div style={{ marginTop: '16px', textAlign: 'center' }}>
                <Pagination
                  current={currentPage}
                  pageSize={pageSize}
                  total={filteredData.length}
                  onChange={handlePageChange}
                  onShowSizeChange={handlePageSizeChange} style={{ float: 'right' }} className="custom-pagination" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NhatKyNguoiDung