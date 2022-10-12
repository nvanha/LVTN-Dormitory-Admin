import { v4 as uuidv4 } from 'uuid';

import config from '~/configs';
import {
  CacKhoanPhi,
  DangKyPhong,
  GiaHanPhong, QuanLyPhong, QuanLyNhanVien, QuanLySinhVien, QuanLyTaiKhoan, QuanLyThuePhong,
  QuanLyYeuCau,
  QuanLyChucVu,
} from '~/pages/Dashboard';

export default [
  {
    id: `user-${uuidv4()}`,
    path: config.routesDashboard.home,
    component: QuanLyPhong,
  },
  {
    id: `user-${uuidv4()}`,
    path: config.routesDashboard.cacKhoanPhi,
    component: CacKhoanPhi,
  },
  {
    id: `user-${uuidv4()}`,
    path: config.routesDashboard.dangKyPhong,
    component: DangKyPhong,
  },
  {
    id: `user-${uuidv4()}`,
    path: config.routesDashboard.giaHanPhong,
    component: GiaHanPhong,
  },
  {
    id: `user-${uuidv4()}`,
    path: config.routesDashboard.quanLyThuePhong,
    component: QuanLyThuePhong,
  },
  {
    id: `user-${uuidv4()}`,
    path: config.routesDashboard.quanLyYeuCau,
    component: QuanLyYeuCau,
  },
  {
    id: `user-${uuidv4()}`,
    path: config.routesDashboard.quanLySinhVien,
    component: QuanLySinhVien,
  },
  {
    id: `user-${uuidv4()}`,
    path: config.routesDashboard.quanLyNhanVien,
    component: QuanLyNhanVien,
  },
  {
    id: `user-${uuidv4()}`,
    path: config.routesDashboard.quanLyChucVu,
    component: QuanLyChucVu,
  },
  {
    id: `user-${uuidv4()}`,
    path: config.routesDashboard.quanLyTaiKhoan,
    component: QuanLyTaiKhoan,
  },
];
