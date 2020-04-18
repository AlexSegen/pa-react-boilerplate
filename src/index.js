import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

//Services
import ApiService from './services/api.service'
import { TokenService } from './services/storage.service'

//Store
import { Provider } from 'react-redux'
import store from './store';


ApiService.init(process.env.REACT_APP_ROOT_API)
// If token exists set header
if (TokenService.getToken()) {
  ApiService.setHeader()
}

ReactDOM.render(
    <React.StrictMode>
      <Suspense fallback={'Cargando...'}>
      <Provider store={store}>
        <App />
      </Provider>
      </Suspense>
    </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
