import { v4 as uuidv4 } from 'uuid';

import {
  // CSBillSolid,
  // CSCalendarSolid,
  // CSDollarSolid,
  // CSEditSolid,
  CSEmployeeSolid,
  CSGroupSolid,
  CSOfficeBuildingSolid,
  CSRoleSolid,
  CSRoleTagSolid,
  CSShieldCheckSolid,
} from '~/components/iconography/Solid';

export default [
  {
    id: uuidv4(),
    title: 'Quản lý phòng',
    slug: '/',
    icon: <CSOfficeBuildingSolid customClassName="fill-white" />,
  },
  // {
  //   id: uuidv4(),
  //   title: 'Các khoản phí',
  //   slug: '/cac-khoan-phi',
  //   icon: <CSDollarSolid customClassName="fill-white" />,
  // },
  // {
  //   id: uuidv4(),
  //   title: 'Đăng ký phòng',
  //   slug: '/dang-ky-phong',
  //   icon: <CSEditSolid customClassName="fill-white" />,
  // },
  // {
  //   id: uuidv4(),
  //   title: 'Gia hạn phòng',
  //   slug: '/gia-han-phong',
  //   icon: <CSCalendarSolid customClassName="fill-white" />,
  // },
  {
    id: uuidv4(),
    title: 'Quản lý thuê phòng',
    slug: '/quan-ly-thue-phong',
    icon: <CSEmployeeSolid customClassName="fill-white" />,
  },
  // {
  //   id: uuidv4(),
  //   title: 'Quản lý yêu cầu',
  //   slug: '/quan-ly-yeu-cau',
  //   icon: <CSBillSolid customClassName="fill-white" />,
  // },
  {
    id: uuidv4(),
    title: 'Quản lý sinh viên',
    slug: '/quan-ly-sinh-vien',
    icon: <CSGroupSolid customClassName="fill-white" />,
  },
  {
    id: uuidv4(),
    title: 'Quản lý nhân viên',
    slug: '/quan-ly-nhan-vien',
    icon: <CSRoleSolid customClassName="fill-white" />,
  },
  {
    id: uuidv4(),
    title: 'Quản lý chức vụ',
    slug: '/quan-ly-chuc-vu',
    icon: <CSRoleTagSolid customClassName="fill-white" />,
  },
  {
    id: uuidv4(),
    title: 'Quản lý tài khoản',
    slug: '/quan-ly-tai-khoan',
    icon: <CSShieldCheckSolid customClassName="fill-white" />,
  },
];
