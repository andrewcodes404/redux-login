import React from 'react';
import ReactDOM from 'react-dom';

// redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

// middleware
import thunk from 'redux-thunk';

// style
import 'antd/dist/antd.css';
import './style/custom.css';
import 'react-quill/dist/quill.snow.css'

import reducers from './reducers'
import App from './components/App'

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

const Routes = (
    <Provider store={createStoreWithMiddleware(reducers)}>
        <App />
    </Provider>
)

ReactDOM.render(Routes, document.querySelector('#root'));