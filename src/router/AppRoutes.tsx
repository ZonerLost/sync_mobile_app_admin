import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import DashboardLayout from "../Components/layout/DashboardLayout/DashboardLayout";
import ProtectedRoute from "../routes/ProtectedRoute";

// Auth pages
import LoginPage from "../pages/auth/LoginPage";
import ForgotPasswordSentPage from "../pages/auth/ForgotPasswordSentPage";
import ResetPasswordPage from "../pages/auth/ResetPasswordPage";

// Main pages
import NotificationsPage from "../pages/notification/NotificationsPage";
import AdminProfilePage from "../pages/admin-profile/AdminProfilesPage";
import DashboardPage from "../pages/dashboard/DashboardPage";

// Management
import LocksmithsPage from "../pages/management/LocksmithsPage";
import OperatorsPage from "../pages/management/OperatorsPage";
import AccountantsPage from "../pages/management/AccountantsPage";
import CompaniesPage from "../pages/management/CompaniesPage";
import EmailAddressesPage from "../pages/management/EmailAddressesPage";

// Company reports

import CompanyListPage from "../pages/company-report/CompanyListPage";
import DailyCompanyPage from "../pages/company-report/DailyCompanyPage";
import WeeklyCompanyPage from "../pages/company-report/WeeklyCompanyPage";

// Admin reports
import DailyLocksmithsPage from "../pages/reports/DailyLocksmithsPage";
import WeeklyLocksmithsPage from "../pages/reports/WeeklyLocksmithsPage";
import WeeklyCompaniesInPage from "../pages/reports/WeeklyCompaniesInPage";
import WeeklyCompaniesOutPage from "../pages/reports/WeeklyCompaniesOutPage";
import WeeklyCancelledPage from "../pages/reports/WeeklyCancelledPage";
import DailyOperatorsPage from "../pages/reports/DailyOperatorsPage";
import WeeklyOperatorsPage from "../pages/reports/WeeklyOperatorsPage";
import MonthlyOperatorsPage from "../pages/reports/MonthlyOperatorsPage";
import LocksmithRevenuePage from "../pages/reports/LocksmithRevenuePage";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* ---------- PUBLIC AUTH ROUTES ---------- */}
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/forgot-password/sent"
        element={<ForgotPasswordSentPage />}
      />
      <Route path="/reset-password/:token" element={<ResetPasswordPage />} />

      {/* Root shortcut – goes to dashboard (ProtectedRoute will redirect to /login if not authed) */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* ---------- PROTECTED ROUTES ---------- */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          {/* Admin overview */}
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />

          {/* Company reports */}
          <Route path="/company/list" element={<CompanyListPage />} />
          <Route path="/company/daily" element={<DailyCompanyPage />} />
          <Route path="/company/weekly" element={<WeeklyCompanyPage />} />

          {/* Admin reports (Owner access) */}
          <Route
            path="/reports/daily-locksmiths"
            element={<DailyLocksmithsPage />}
          />
          <Route
            path="/reports/weekly-locksmiths"
            element={<WeeklyLocksmithsPage />}
          />
          <Route
            path="/reports/weekly-cancelled"
            element={<WeeklyCancelledPage />}
          />
          <Route
            path="/reports/weekly-companies-in"
            element={<WeeklyCompaniesInPage />}
          />
          <Route
            path="/reports/weekly-companies-out"
            element={<WeeklyCompaniesOutPage />}
          />
          <Route
            path="/reports/daily-operators"
            element={<DailyOperatorsPage />}
          />
          <Route
            path="/reports/weekly-operators"
            element={<WeeklyOperatorsPage />}
          />
          <Route
            path="/reports/monthly-operators"
            element={<MonthlyOperatorsPage />}
          />
          <Route
            path="/reports/locksmith-revenue"
            element={<LocksmithRevenuePage />}
          />

          {/* Management */}
          <Route
            path="/management/view-locksmiths"
            element={<LocksmithsPage />}
          />
          <Route
            path="/management/view-operators"
            element={<OperatorsPage />}
          />
          <Route
            path="/management/view-accountants"
            element={<AccountantsPage />}
          />
          <Route path="/management/companies" element={<CompaniesPage />} />
          <Route
            path="/management/email-addresses"
            element={<EmailAddressesPage />}
          />

          {/* Profile */}
          <Route path="/profile" element={<AdminProfilePage />} />
        </Route>
      </Route>

      {/* ---------- FALLBACK ---------- */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

export default AppRoutes;
