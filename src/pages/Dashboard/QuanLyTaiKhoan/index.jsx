import React, { useState } from 'react';
import { Nav, Tab } from 'react-bootstrap';
import DoiMatKhau from './section/DoiMatKhau';
import ThongTinCaNhan from './section/ThongTinCaNhan';

const QuanLyTaiKhoan = () => {
  const [eventKey, setEventKey] = useState('1');

  const changeEventKey = (key) => {
    setEventKey(key);
  };

  return (
    <div className="quan-ly-tai-khoan">
      <Tab.Container
        defaultActiveKey="1"
        activeKey={eventKey}
        onSelect={changeEventKey}
      >
        <Nav variant="pills" className="align-items-center">
          <Nav.Item>
            <Nav.Link eventKey="1">Thông tin cá nhân</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="2">Đổi mật khẩu</Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content className="mt-0 pr0" style={{ height: '100%' }}>
          {String(eventKey) === '1' && (
            <Tab.Pane eventKey="1">
              <ThongTinCaNhan />
            </Tab.Pane>
          )}
          {String(eventKey) === '2' && (
            <Tab.Pane eventKey="2">
              <DoiMatKhau />
            </Tab.Pane>
          )}
        </Tab.Content>
      </Tab.Container>
    </div>
  );
};

export default QuanLyTaiKhoan;
