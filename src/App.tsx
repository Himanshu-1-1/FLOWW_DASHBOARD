import React from 'react';
import { DashboardProvider } from './contexts/DashboardContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { ToastProvider } from './contexts/ToastContext';
import Dashboard from './components/Layout/Dashboard';

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <DashboardProvider>
          <Dashboard />
        </DashboardProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;