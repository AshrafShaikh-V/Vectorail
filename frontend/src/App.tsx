import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from '@/layouts/AppLayout';
import { DashboardPage } from '@/pages/DashboardPage';
import { LoginPage } from '@/pages/LoginPage';
import { SettingsPage } from '@/pages/SettingsPage';
import { PlaceholderPage } from '@/pages/PlaceholderPage';
import { AlertsPage } from '@/pages/AlertsPage';
import { TrainsPage } from '@/pages/TrainsPage';
import { TrainDetailsPage } from '@/pages/TrainDetailsPage';
import { ProtectedRoute } from '@/auth/ProtectedRoute';
import { useAuth } from '@/hooks/useAuth';

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) return null;
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <>{children}</>;
};

export const App: React.FC = () => {
  return (
    <Routes>
      {/* Standalone login route */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />

      {/* Main shell layout routes */}
      <Route
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route
          path="/network"
          element={
            <PlaceholderPage
              title="Network Visualization"
              subtitle="Interactive topological track layout and signal node management."
              moduleName="Network Infrastructure"
            />
          }
        />
        <Route
          path="/trains"
          element={<TrainsPage />}
        />
        <Route
          path="/trains/:trainId"
          element={<TrainDetailsPage />}
        />
        <Route
          path="/alerts"
          element={<AlertsPage />}
        />
        <Route
          path="/analytics"
          element={
            <PlaceholderPage
              title="Analytics & Reporting"
              subtitle="Punctuality index, bottleneck analysis, and capacity utilization."
              moduleName="Operations Analytics"
            />
          }
        />
        <Route
          path="/optimization"
          element={
            <PlaceholderPage
              title="AI-Assisted Traffic Optimization"
              subtitle="Automated dispatch recommendations and conflict resolution suggestions."
              moduleName="Optimization Engine"
            />
          }
        />
        <Route
          path="/simulation"
          element={
            <PlaceholderPage
              title="Traffic Simulation"
              subtitle="What-if disruption scenarios, weather impact, and bottleneck modeling."
              moduleName="Simulation Sandbox"
            />
          }
        />
        <Route
          path="/settings"
          element={<SettingsPage />}
        />
      </Route>

      {/* Catch-all route */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

export default App;
