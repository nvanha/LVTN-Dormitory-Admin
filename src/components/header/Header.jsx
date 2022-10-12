import { Auth } from 'aws-amplify';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useOnClickOutside from '~/hooks/useOnClickOutside';
import { getUserDataRequest, signOutRequest } from '~/redux/auth/actions';
import avtStaticURL from '~/assets/avtStatic.svg';
import { CSChevronDownNavigational } from '../iconography/Navigational';
import { CSLogoutOutline } from '../iconography/Outline';
import SkeletonCustom from '../skeleton/SkeletonCustom';

const Header = () => {
  const { isGetUserDataRequest, userData } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const [isShowMenu, setIsShowMenu] = useState(false);

  const dropdownRef = useRef(null);

  useOnClickOutside(dropdownRef, () => {
    setIsShowMenu(false);
  });

  useEffect(async () => {
    const authState = await Auth.currentSession();
    dispatch(getUserDataRequest({ email: authState.idToken.payload.email }));
  }, []);

  return (
    <div className="header flex-center-space">
      <div className="flex-center-center">
        <h1 className="cs-fz-28 cs-weight-600 cs-text-primary mb-0">
          Hệ thống quản lý ký túc xá
        </h1>
      </div>
      <div className={`user-info ${isShowMenu ? 'show' : ''}`}>
        <div
          className="flex-center-center"
          onClick={() => setIsShowMenu(!isShowMenu)}
          style={{ gap: '10px', cursor: 'pointer' }}
        >
          {isGetUserDataRequest ? (
            <>
              <div style={{ borderRadius: '100%', overflow: 'hidden' }}>
                <SkeletonCustom length={1} width="40px" height="40px" />
              </div>
              <SkeletonCustom length={1} width="100px" height="22px" />
            </>
          ) : (
            <>
              <img src={userData?.hinhDaiDien || avtStaticURL} alt="avt" className="avt" />
              <p className="cs-fz-14 cs-fw-600 cs-text-black mb-0">
                {userData?.hoTen}
              </p>
              <CSChevronDownNavigational customClassName="stroke-orange dropdown-icon" />
            </>
          )}
        </div>
        {isShowMenu && (
          <ul className="user-info--dropdown" ref={dropdownRef}>
            <li
              onClick={() => {
                dispatch(signOutRequest());
              }}
            >
              <p className="cs-fz-14 cs-fw-400 cs-text-black mb-0">
                <CSLogoutOutline customClassName="stroke-black" />
                Đăng xuất
              </p>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Header;
