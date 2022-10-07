// Dependencies
import React from 'react';
import { createRoot } from 'react-dom/client';
// Providers
import { Provider } from 'react-redux';
import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
// Components
import App from './app';
// Styles
import './styles/main.scss';
// Stores
import { appStore } from '@store';

const container = document.getElementById('root');
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!);
root.render(
  <Provider store={appStore}>
    <MantineProvider withGlobalStyles>
      <NotificationsProvider>
        <App />
      </NotificationsProvider>
    </MantineProvider>
  </Provider>,
);
