// import React from 'react';
// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import { AuthProvider, useAuth } from './context/AuthContext';
// import { Toaster } from 'react-hot-toast';

// // Layout Components
// import Sidebar from './components/layout/Sidebar';
// import AdminLayout from './pages/admin/AdminLayout';

// // Client Pages
// import LandingPage from './pages/LandingPage';
// import SignInPage from './pages/SignInPage';
// import SignUpPage from './pages/SignUpPage';
// import DashboardPage from './pages/DashboardPage';
// import MembersPage from './pages/MembersPage';
// import MembershipsPage from './pages/MembershipsPage';
// import AttendancePage from './pages/AttendancePage';
// import DueDatesPage from './pages/DueDatesPage';

// // Admin Pages
// import AdminDashboardPage from './pages/admin/AdminDashboardPage';
// import GymOwnersPage from './pages/admin/GymOwnersPage';

// // Protected Route Component for Gym Owners
// const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
//   const { isAuthenticated, isLoading, user } = useAuth();
  
//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
//       </div>
//     );
//   }
  
//   // Redirect admin users to admin dashboard
//   if (isAuthenticated && user?.role === 'admin') {
//     return <Navigate to="/admin" replace />;
//   }
  
//   return isAuthenticated ? (
//     <div className="flex min-h-screen bg-gray-50">
//       <Sidebar />
//       <main className="flex-1 p-8">
//         {children}
//       </main>
//     </div>
//   ) : (
//     <Navigate to="/signin" replace />
//   );
// };

// function App() {
//   return (
//     <AuthProvider>
//       <BrowserRouter>
//         <Routes>
//           {/* Public Routes */}
//           <Route path="/" element={<LandingPage />} />
//           <Route path="/signin" element={<SignInPage />} />
//           <Route path="/signup" element={<SignUpPage />} />
          
//           {/* Admin Routes */}
//           <Route path="/admin" element={<AdminLayout />}>
//             <Route index element={<AdminDashboardPage />} />
//             <Route path="gym-owners" element={<GymOwnersPage />} />
//           </Route>
          
//           {/* Protected Gym Owner Routes */}
//           <Route
//             path="/dashboard"
//             element={
//               <ProtectedRoute>
//                 <DashboardPage />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/members"
//             element={
//               <ProtectedRoute>
//                 <MembersPage />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/memberships"
//             element={
//               <ProtectedRoute>
//                 <MembershipsPage />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/attendance"
//             element={
//               <ProtectedRoute>
//                 <AttendancePage />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/due-dates"
//             element={
//               <ProtectedRoute>
//                 <DueDatesPage />
//               </ProtectedRoute>
//             }
//           />
          
//           {/* Fallback route */}
//           <Route path="*" element={<Navigate to="/" replace />} />
//         </Routes>
//       </BrowserRouter>
      
//       <Toaster
//         position="top-right"
//         toastOptions={{
//           style: {
//             background: '#fff',
//             color: '#333',
//           },
//           duration: 3000,
//         }}
//       />
//     </AuthProvider>
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';

// Layout Components
import Sidebar from './components/layout/Sidebar';
import AdminLayout from './pages/admin/AdminLayout';

// Client Pages
import LandingPage from './pages/LandingPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import DashboardPage from './pages/DashboardPage';
import MembersPage from './pages/MembersPage';
import MembershipsPage from './pages/MembershipsPage';
import AttendancePage from './pages/AttendancePage';
import DueDatesPage from './pages/DueDatesPage';

// Admin Pages
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import GymOwnersPage from './pages/admin/GymOwnersPage';

// Protected Route Component for Gym Owners
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  // Admins are not allowed to access client pages
  if (isAuthenticated && user?.role === 'admin') {
    return <Navigate to="/admin" replace />;
  }

  return isAuthenticated ? (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  ) : (
    <Navigate to="/signin" replace />
  );
};

// Redirect component to handle landing page logic
const AuthRedirect = () => {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) return null;

  if (isAuthenticated) {
    if (user?.role === 'admin') {
      return <Navigate to="/admin" replace />;
    }
    return <Navigate to="/dashboard" replace />;
  }

  return <LandingPage />;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Dynamic Landing Page */}
          <Route path="/" element={<AuthRedirect />} />

          {/* Public Auth Routes */}
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboardPage />} />
            <Route path="gym-owners" element={<GymOwnersPage />} />
          </Route>

          {/* Gym Owner Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/members"
            element={
              <ProtectedRoute>
                <MembersPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/memberships"
            element={
              <ProtectedRoute>
                <MembershipsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/attendance"
            element={
              <ProtectedRoute>
                <AttendancePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/due-dates"
            element={
              <ProtectedRoute>
                <DueDatesPage />
              </ProtectedRoute>
            }
          />

          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>

      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#fff',
            color: '#333',
          },
          duration: 3000,
        }}
      />
    </AuthProvider>
  );
}

export default App;
