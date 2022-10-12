import { Auth } from 'aws-amplify';
import { useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';

import { LoadingPage } from '~/pages/Other';

const AuthLayout = (props) => {
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
    if (isAuth) return <Redirect to="/" />;

    return (
      <div className="auth-layout-wrapper">
        <Route {...props} />
      </div>
    );
  };

  return render();
};

export default AuthLayout;
