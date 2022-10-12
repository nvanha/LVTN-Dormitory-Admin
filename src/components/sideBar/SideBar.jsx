import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';

import LogoURL from '~/assets/logo/logo.png';
import sidebar from '~/constants/sidebar';

const SideBar = () => {
  const { userData } = useSelector((store) => store.auth);

  const [sidebarState, setSideBarState] = useState(sidebar);

  useEffect(() => {
    if (userData?.isAdmin === 0) {
      setSideBarState(sidebar.filter((item) => item.slug !== '/quan-ly-chuc-vu'));
    }
  }, [userData]);

  return (
    <div className="sidebar">
      <div className="logo">
        <Link to="/">
          <img src={LogoURL} alt="harry-logo" width={30} />
        </Link>
      </div>
      <div className="sidebar-inner">
        {sidebarState?.map((sidebarItem) => (
          <NavLink
            key={sidebarItem.id}
            to={sidebarItem.slug}
            className="cs-fz-14 cs-fw-400 cs-text-white sidebar-item"
            activeClassName="sidebar-item--active"
            exact
          >
            {sidebarItem.icon} <span>{sidebarItem.title}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
