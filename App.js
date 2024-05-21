import React from 'react';
import AppNavigation from './navigation/appNavigation';
import { UserProvider } from './context/UserContext';
import { ProducProvider } from './context/ProductoContext';
import { CantProvider } from './context/CantContext';

export default function App() {
  return (
    <UserProvider>
      <ProducProvider>
        <CantProvider>
          <AppNavigation />
        </CantProvider>
      </ProducProvider>
    </UserProvider>
  );
}
