import React, { Suspense, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/private/ProtectedRoute";
import ShopSection from "./components/private/ShopSection";
import Profile from "./components/private/Profile";
import RemedyDetail from "./components/private/RemedyDetail";
import EditRemedy from "./components/private/EditRemedy";
const Login = React.lazy(() => import("./components/public/Login"));
const Signup = React.lazy(() => import("./components/public/Signup"));
const Content = React.lazy(() => import("./components/private/Content"));
const Homepage = React.lazy(() => import("./components/private/Homepage"));
const FaceCare = React.lazy(() => import("./components/private/FaceCare"));
const HairCareDetails = React.lazy(() => import("./components/private/HairCareDetails"));
const HairCare = React.lazy(() => import("./components/private/HairCare"));
const HairCareRemedies = React.lazy(() => import("./components/private/HairCareRemedies"));
const BodyCare = React.lazy(() => import("./components/private/BodyCare"));
const FrontSection = React.lazy(() => import("./components/private/FrontSection"));
const AdminPanel = React.lazy(() => import("./components/private/AdminPanel"));
const FaceCareRemedies = React.lazy(() => import("./components/private/FaceCareRemedies"));
const FaceCareDetails = React.lazy(() => import("./components/private/FaceCareDetails"));
const BodyCareRemedies = React.lazy(() => import("./components/private/BodyCareRemedies"));
const BodyCareDetails = React.lazy(() => import("./components/private/BodyCareDetails"));
const UserDashboard = React.lazy(() => import("./components/private/UserDashboard"));
const AboutUs = React.lazy(() => import("./components/private/AboutUs")); 
const ContactUs = React.lazy(() => import("./components/private/ContactUs"));


function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/face-care/remedies/:id" element={<RemedyDetail />} />
          <Route path="/admin/edit/:id" element={<EditRemedy />} />
          {/* Protected Routes */}
          <Route path="/shopsection" element={<ProtectedRoute element={<ShopSection />} />} />
          <Route path="/facecare" element={<ProtectedRoute element={<FaceCare />} />} />
          <Route path="/frontsection" element={<ProtectedRoute element={<FrontSection />} />} />
          <Route path="/content" element={<ProtectedRoute element={<Content />} />} />
          <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
          {/* Face Care Routes */}
          <Route path="/face-care/remedies" element={<ProtectedRoute element={<FaceCareRemedies />} />} />
          <Route path="/face-care/remedies/:id" element={<ProtectedRoute element={<FaceCareDetails />} />} />

          {/* Protected Admin Route */}
          <Route path="/admin" element={<ProtectedRoute element={<AdminPanel />} role="admin" />} />

          {/* Protected User Dashboard */}
          <Route path="/user-dashboard" element={<ProtectedRoute element={<UserDashboard />} />} />

          {/* Default Homepage */}
          <Route path="/homepage" element={<ProtectedRoute element={<Homepage />} />} />

          {/* Fallback: Redirect unmatched routes to homepage */}
          <Route path="*" element={<Navigate to="/homepage" />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
