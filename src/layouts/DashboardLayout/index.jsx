import { Auth } from 'aws-amplify';
import { useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';

import BoxContent from '~/components/boxContent/BoxContent';
import ContainerCustom from '~/components/containerCustom/ContainerCustom';
import Header from '~/components/header/Header';
import SideBar from '~/components/sideBar/SideBar';
import { LoadingPage } from '~/pages/Other';
import sidebar from '~/constants/sidebar';

const DashboardLayout = (props) => {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = async () => {
    try {
      await Auth.currentSession();
      setIsAuth(true);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const render = () => {
    if (isLoading) return <LoadingPage />;
    if (!isAuth) return <Redirect to="/login" />;

    return (
      <div className="dashboard-layout-wrapper">
        <SideBar />
        <Header />
        <div className="content">
          <ContainerCustom>
            <h1 className="cs-fz-32 cs-fw-600 cs-text-black mb-4">
              {
                sidebar.find(
                  (sidebarItem) => sidebarItem.slug === window.location.pathname,
                ).title
              }
            </h1>
            <BoxContent>
              <Route {...props} />
            </BoxContent>
          </ContainerCustom>
        </div>
      </div>
    );
  };

  return render();
};

export default DashboardLayout;
