import { useState } from 'react';
import { Nav, Tab } from 'react-bootstrap';

import DanhSachChuaDuyet from './sections/DanhSachChuaDuyet';
import DanhSachChuaVaoO from './sections/DanhSachChuaVaoO';

const QuanLyThuePhong = () => {
  const [eventKey, setEventKey] = useState('1');

  const changeEventKey = (key) => {
    setEventKey(key);
  };

  return (
    <div className="quan-ly-thue-phong">
      <Tab.Container
        defaultActiveKey="1"
        activeKey={eventKey}
        onSelect={changeEventKey}
      >
        <Nav variant="pills" className="align-items-center">
          <Nav.Item>
            <Nav.Link eventKey="1">Danh sách chưa được duyệt</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="2">Danh sách chưa vào ở</Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content className="mt-0 pr0" style={{ height: '100%' }}>
          {String(eventKey) === '1' && (
            <Tab.Pane eventKey="1">
              <DanhSachChuaDuyet />
            </Tab.Pane>
          )}
          {String(eventKey) === '2' && (
            <Tab.Pane eventKey="2">
              <DanhSachChuaVaoO />
            </Tab.Pane>
          )}
        </Tab.Content>
      </Tab.Container>
    </div>
  );
};

export default QuanLyThuePhong;
