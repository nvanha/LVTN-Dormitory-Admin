import { useEffect } from 'react';

const Helmet = ({ title, children }) => {
  document.title = title
    ? `${title} | Hệ thống quản lý ký túc xá`
    : 'Hệ thống quản lý ký túc xá';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return children;
};

export default Helmet;
