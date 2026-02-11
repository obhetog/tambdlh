import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/lib/auth-context";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import DetailPermohonanPage from "./pages/DetailPermohonanPage";
import PermohonanBaruPage from "./pages/PermohonanBaruPage";
import PermohonanListPage from "./pages/PermohonanListPage";
import StatistikPage from "./pages/StatistikPage";
import ProfilPage from "./pages/ProfilPage";
import MonitoringPage from "./pages/MonitoringPage";
import DashboardLayout from "./components/layout/DashboardLayout";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <DashboardLayout>{children}</DashboardLayout>;
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) return <Navigate to="/dashboard" replace />;
  return <>{children}</>;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<PublicRoute><LandingPage /></PublicRoute>} />
            <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
            <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />
            <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
            <Route path="/permohonan/baru" element={<ProtectedRoute><PermohonanBaruPage /></ProtectedRoute>} />
            <Route path="/permohonan/:id" element={<ProtectedRoute><DetailPermohonanPage /></ProtectedRoute>} />
            <Route path="/permohonan" element={<ProtectedRoute><PermohonanListPage /></ProtectedRoute>} />
            <Route path="/verifikasi" element={<ProtectedRoute><PermohonanListPage /></ProtectedRoute>} />
            <Route path="/monitoring" element={<ProtectedRoute><MonitoringPage /></ProtectedRoute>} />
            <Route path="/statistik" element={<ProtectedRoute><StatistikPage /></ProtectedRoute>} />
            <Route path="/profil" element={<ProtectedRoute><ProfilPage /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
