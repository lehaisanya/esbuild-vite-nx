import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import { App } from './app/App';
import { AuthProvider } from './context/auth.context';

import '@mantine/core/styles.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <MantineProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </MantineProvider>
  </StrictMode>
);
