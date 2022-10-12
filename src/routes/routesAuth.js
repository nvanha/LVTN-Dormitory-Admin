import { v4 as uuidv4 } from 'uuid';

import config from '~/configs';
import { LoginPage } from '~/pages/Auth';

export default [
  {
    id: `auth-${uuidv4()}`,
    path: config.routesAuth.login,
    component: LoginPage,
  },
];
