import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Routes from './Routes';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux'
import configureStore from './store';

ReactDOM.render(
    <Provider store={ configureStore() }>
        <Routes />
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();
