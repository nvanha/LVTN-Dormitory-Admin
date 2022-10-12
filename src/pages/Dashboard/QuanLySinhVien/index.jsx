import moment from 'moment';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import TableShowAll from '~/components/table/tableShowAll';
import { getDanhSachSinhVienRequest } from '~/redux/quanLySinhVien/actions';
import ModalPreview from './components/ModalPreview';

const QuanLySinhVien = () => {
  const { isGetDanhSachSinhVienRequest, danhSachSinhVienState } = useSelector(
    (store) => store.quanLySinhVien,
  );
  const dispatch = useDispatch();

  const [isShowModalPreview, setIsShowModalPreview] = useState(false);
  const [dataShow, setDataShow] = useState([]);
  const [dataActive, setDataActive] = useState(null);

  useEffect(() => {
    dispatch(getDanhSachSinhVienRequest());
  }, []);

  useEffect(() => {
    if (danhSachSinhVienState?.Items) {
      setDataShow(danhSachSinhVienState.Items);
    }
  }, [danhSachSinhVienState]);

  const columns = useMemo(
    () => [
      {
        Header: 'MSSV',
        accessor: 'mssv',
      },
      { Header: 'Họ & tên', accessor: 'hoTen' },
      {
        Header: 'Ngày sinh',
        accessor: 'ngaySinh',
        Cell: ({ value }) => (
          <div className="cs-text-center">
            {moment(value).format('DD/MM/YYYY')}
          </div>
        ),
      },
      {
        Header: 'Giới tính',
        accessor: 'gioiTinh',
        Cell: ({ value }) => (
          <div className="cs-text-center">{value ? 'Nữ' : 'Nam'}</div>
        ),
      },
      {
        Header: 'Khu',
        accessor: 'khuNha',
        Cell: ({ value }) => <div className="cs-text-center">{value}</div>,
      },
      {
        Header: 'Phòng thuê',
        accessor: 'maPhong',
        Cell: ({ value }) => <div className="cs-text-center">{value}</div>,
      },
      {
        Header: 'Kỳ hạn',
        accessor: 'kyHan',
        Cell: ({ value }) => <div className="cs-text-center">{value}</div>,
      },
    ],
    [],
  );

  const handleClickRow = (value) => {
    setDataActive(value);
    setIsShowModalPreview(true);
  };

  return (
    <div className="danh-sach-sinh-vien">
      <TableShowAll
        columns={columns}
        data={dataShow}
        isLoading={isGetDanhSachSinhVienRequest}
        onClickRow={handleClickRow}
        isUseRowSelect={false}
      />

      {isShowModalPreview && (
        <ModalPreview
          show
          handleClose={() => {
            setIsShowModalPreview(false);
            setDataActive(null);
          }}
          data={dataActive}
        />
      )}
    </div>
  );
};

export default QuanLySinhVien;
