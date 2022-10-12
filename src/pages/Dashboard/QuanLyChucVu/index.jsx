import React, { useState } from 'react';
import { Nav, Tab } from 'react-bootstrap';
import DanhSachAdmin from './section/DanhSachAdmin';
import DanhSachChucVu from './section/DanhSachChucVu';

const QuanLyChucVu = () => {
  const [eventKey, setEventKey] = useState('1');

  const changeEventKey = (key) => {
    setEventKey(key);
  };

  return (
    <div className="quan-ly-chuc-vu">
      <Tab.Container
        defaultActiveKey="1"
        activeKey={eventKey}
        onSelect={changeEventKey}
      >
        <Nav variant="pills" className="align-items-center">
          <Nav.Item>
            <Nav.Link eventKey="1">Danh sách chức vụ</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="2">Danh sách admin</Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content className="mt-0 pr0" style={{ height: '100%' }}>
          {String(eventKey) === '1' && (
            <Tab.Pane eventKey="1">
              <DanhSachChucVu />
            </Tab.Pane>
          )}
          {String(eventKey) === '2' && (
            <Tab.Pane eventKey="2">
              <DanhSachAdmin />
            </Tab.Pane>
          )}
        </Tab.Content>
      </Tab.Container>
    </div>
  );
};

export default QuanLyChucVu;
