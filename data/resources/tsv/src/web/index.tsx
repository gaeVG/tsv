// DEPENDENCIES
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
// COMPONENTS
import App from './app';
// STYLES
import './styles/main.scss';
// STORES
import { appStore } from './stores/store'

const container = document.getElementById('root');
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!);
root.render(
  <Provider store={appStore}>
    <App />
  </Provider>
);
