import React, { useEffect, useState } from 'react'
import Navbar from '../../../components/Navbar'
import './role.css'
import { Button, Input, Pagination, Space, Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../../../components/Header'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { fetchDataFromFirebase, TableDataItemRole, State as RoleState } from '../../../store/roleSlice'
import { Dispatch } from 'redux';

interface RootState {
  role: RoleState;
}

const columns: ColumnsType<TableDataItemRole> = [
  {
    title: 'Tên vai trò',
    dataIndex: 'tenVT',
    key: 'tenVT',
  },
  {
    title: 'Số người dùng',
    dataIndex: 'soND',
    key: 'soND',
    render: (_, record: TableDataItemRole) => record.soND, // Hiển thị số người dùng
  },
  {
    title: 'Mô tả',
    dataIndex: 'moTa',
    key: 'moTa',
  },

  {
    title: ' ',
    key: 'capNhat',
    render: (_, record) => (
      <Space size="middle">
        <Link to={`/manaRole/updateRole/${record.key}`} style={{ textDecoration: 'underline' }}>Cập nhật</Link>
      </Space>
    ),
  },
];

function ManaRole() {
  const dispatch = useDispatch<Dispatch>();
  const role = useSelector((state: RootState) => state.role);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchDataFromFirebase() as any);
  }, [dispatch, role]);
  console.log(role)

  const handleThemVaiTroQLVT = () => {
    navigate('/manaRole/addRole');
  }

  // lọc dữ liệu
  const [filterKeyword, setFilterKeyword] = useState<string>('');

  const filterData = (dataSource: TableDataItemRole[]): TableDataItemRole[] => {
    return dataSource.filter((TableDataItem) => {
      if (filterKeyword) {
        const lowerCaseKeyword = filterKeyword.toLowerCase();
        return (
          TableDataItem.tenVT.toLowerCase().includes(lowerCaseKeyword) ||
          TableDataItem.moTa.toLowerCase().includes(lowerCaseKeyword)
        );
      }

      return true;
    });
  };

  const filteredData = filterData(role.roleList);

  const handleFilterKeyword = (value: string) => {
    setFilterKeyword(value);
  };

  // phân trang
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);

  const getCurrentPageData = (data: TableDataItemRole[]): TableDataItemRole[] => {
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
      <div className='right' style={{ backgroundColor: 'rgb(246,246,246,1)', width: '1231px', height: '740px' }}>
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
          <p className='tieude'>Danh sách vai trò</p>
          {/* p3 */}
          <div style={{ marginLeft: '680px' }}>
            <p style={{ marginLeft: '-180px' }}>Từ khóa</p>
            <Input
              placeholder='Nhập từ khóa'
              suffix={
                <Button style={{ border: 'none' }}>   <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M9.16667 15.8333C12.8486 15.8333 15.8333 12.8486 15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333Z" stroke="#FF7506" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M17.5 17.5L13.875 13.875" stroke="#FF7506" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg></Button>
              }
              style={{ backgroundColor: 'white', color: 'orange', width: '250px', height: '43px' }}
              onChange={(e) => handleFilterKeyword(e.target.value)}
            />
          </div>
          <div style={{ display: 'flex' }}>
            <div>
              <Table
                columns={columns}
                dataSource={getCurrentPageData(filteredData)}
                className='bangThietBi custom-table'
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
            <Button className='btnTTB' onClick={handleThemVaiTroQLVT} style={{ marginLeft: '60px' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path d="M18.8884 2.33301H9.11171C4.86504 2.33301 2.33337 4.86467 2.33337 9.11134V18.8763C2.33337 23.1347 4.86504 25.6663 9.11171 25.6663H18.8767C23.1234 25.6663 25.655 23.1347 25.655 18.888V9.11134C25.6667 4.86467 23.135 2.33301 18.8884 2.33301ZM18.6667 14.8747H14.875V18.6663C14.875 19.1447 14.4784 19.5413 14 19.5413C13.5217 19.5413 13.125 19.1447 13.125 18.6663V14.8747H9.33337C8.85504 14.8747 8.45837 14.478 8.45837 13.9997C8.45837 13.5213 8.85504 13.1247 9.33337 13.1247H13.125V9.33301C13.125 8.85467 13.5217 8.45801 14 8.45801C14.4784 8.45801 14.875 8.85467 14.875 9.33301V13.1247H18.6667C19.145 13.1247 19.5417 13.5213 19.5417 13.9997C19.5417 14.478 19.145 14.8747 18.6667 14.8747Z" fill="#FF9138" />
              </svg> <br /> Thêm <br /> vai trò
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ManaRole
