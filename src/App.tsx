import React from 'react';
import { DashboardProvider } from './contexts/DashboardContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Dashboard from './components/Layout/Dashboard';

function App() {
  return (
    <ThemeProvider>
      <DashboardProvider>
        <Dashboard />
      </DashboardProvider>
    </ThemeProvider>
  );
}

export default App;