import moment from 'moment';
import { useEffect, useMemo, useState } from 'react';
import { Nav, Tab } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { ButtonCustom } from '~/components/form';
import TableShowAll from '~/components/table/tableShowAll';
import { ToastSuccess } from '~/helpers/toastHelpers';
import {
  getDanhSachNhanVienRequest,
  resetQuanLyNhanVienState,
  resetThemNhanVienState,
} from '~/redux/quanLyNhanVien/actions';
import ModalChiTietNhanVien from './components/ModalChiTietNhanVien';
import ModalThemNhanVien from './components/ModalThemNhanVien';

const QuanLyNhanVien = () => {
  const { userData } = useSelector((store) => store.auth);
  const {
    isGetDanhSachNhanVienRequest,
    danhSachNhanVien,
    isThemNhanVienSuccess,
    isXacNhanDangKyTaiKhoanNhanVienSuccess,
  } = useSelector((store) => store.quanLyNhanVien);
  const dispatch = useDispatch();

  const [dataShow, setDataShow] = useState([]);
  const [dataActive, setDataActive] = useState(null);
  const [isShowModalChiTietNhanVien, setIsShowModalChiTietNhanVien] = useState(false);
  const [isShowModalThemNhanVien, setIsShowModalThemNhanVien] = useState(false);

  const columns = useMemo(
    () => [
      {
        Header: 'Mã nhân viên',
        accessor: 'msnv',
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
          <div className="cs-text-center">{parseInt(value) ? 'Nữ' : 'Nam'}</div>
        ),
      },
      {
        Header: 'Chức vụ',
        accessor: 'tenChucVu',
      },
      {
        Header: 'Số điện thoại',
        accessor: 'soDienThoai',
        Cell: ({ value }) => <div className="cs-text-center">{value}</div>,
      },
    ],
    [],
  );

  const handleClickRow = (value) => {
    setDataActive(value);
    setIsShowModalChiTietNhanVien(true);
  };

  useEffect(() => {
    dispatch(getDanhSachNhanVienRequest());

    return () => {
      dispatch(resetQuanLyNhanVienState());
    };
  }, []);

  useEffect(() => {
    if (danhSachNhanVien?.Items?.length > 0) {
      setDataShow(danhSachNhanVien.Items);
    }
  }, [danhSachNhanVien]);

  useEffect(() => {
    if (isThemNhanVienSuccess && isXacNhanDangKyTaiKhoanNhanVienSuccess) {
      setIsShowModalThemNhanVien(false);
      dispatch(resetThemNhanVienState());
      dispatch(getDanhSachNhanVienRequest());
    }
  }, [isThemNhanVienSuccess, isXacNhanDangKyTaiKhoanNhanVienSuccess]);

  return (
    <div className="quan-ly-nhan-vien">
      {userData?.isAdmin && (
        <ButtonCustom
          variant="outline-secondary"
          customClassName="btn-them-nv"
          onClick={() => {
            setIsShowModalThemNhanVien(true);
          }}
        >
          Thêm nhân viên
        </ButtonCustom>
      )}

      <Tab.Container defaultActiveKey="1">
        <Nav variant="pills" className="align-items-center">
          <Nav.Item>
            <Nav.Link eventKey="1">Danh sách nhân viên</Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content className="mt-0 pr0" style={{ height: '100%' }}>
          <Tab.Pane eventKey="1">
            <TableShowAll
              columns={columns}
              data={dataShow}
              isLoading={isGetDanhSachNhanVienRequest}
              onClickRow={handleClickRow}
              isUseRowSelect={false}
            />

            {isShowModalChiTietNhanVien && (
              <ModalChiTietNhanVien
                show
                handleClose={() => {
                  setIsShowModalChiTietNhanVien(false);
                  setDataActive(null);
                }}
                data={dataActive}
              />
            )}

            {isShowModalThemNhanVien && (
              <ModalThemNhanVien
                show
                handleClose={() => {
                  setIsShowModalThemNhanVien(false);
                }}
                data={dataActive}
              />
            )}

            {isXacNhanDangKyTaiKhoanNhanVienSuccess && (
              <ToastSuccess
                show
                content="Thêm nhân viên thành công"
                theme="dark"
              />
            )}
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </div>
  );
};

export default QuanLyNhanVien;
