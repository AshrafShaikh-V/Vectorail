import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import {
  DashboardPage,
  NetworkPage,
  TrainsPage,
  AlertsPage,
  AnalyticsPage,
  OptimizationPage,
  SimulationPage,
  SettingsPage,
  LoginPage,
  NotFoundPage,
} from './pages';
import { ToastProvider } from './components/ui/toast';
import { TooltipProvider } from './components/ui/tooltip';

export function App() {
  return (
    <TooltipProvider>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            {/* Standalone Authentication Route */}
            <Route path="/login" element={<LoginPage />} />

            {/* Application Shell with Sidebar + Top Header Layout */}
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="network" element={<NetworkPage />} />
              <Route path="trains" element={<TrainsPage />} />
              <Route path="alerts" element={<AlertsPage />} />
              <Route path="analytics" element={<AnalyticsPage />} />
              <Route path="optimization" element={<OptimizationPage />} />
              <Route path="simulation" element={<SimulationPage />} />
              <Route path="settings" element={<SettingsPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </TooltipProvider>
  );
}

export default App;
