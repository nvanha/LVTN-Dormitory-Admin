import Amplify from 'aws-amplify';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { store } from '~/redux/storeConfig/store';
import App from './App';
import awsconfig from './aws-exports';
import '~/styles/main.scss';
import reportWebVitals from './reportWebVitals';

Amplify.configure(awsconfig);

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root'),
);

reportWebVitals();
