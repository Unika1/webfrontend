import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ShopSection from './components/private/ShopSection';
import ProtectedRoute from './components/private/ProtectedRoute';




const Login = React.lazy(() => import('./components/public/Login'));
const Signup = React.lazy(() => import('./components/public/Signup'));
const Content = React.lazy(() => import('./components/private/Content'));
const Homepage = React.lazy(() => import('./components/private/Homepage'));
const FaceCare = React.lazy(() => import('./components/private/FaceCare'));
const HairCareDetails = React.lazy(() => import('./components/private/HairCareDetails'));
const HairCare = React.lazy(() => import('./components/private/HairCare'));
const HairCareRemedies = React.lazy(() => import('./components/private/HairCareRemedies'));
const BodyCare = React.lazy(() => import('./components/private/BodyCare'));
const FrontSection = React.lazy(() => import('./components/private/FrontSection'));
const AdminPanel = React.lazy(() => import('./components/private/AdminPanel'));
const FaceCareRemedies = React.lazy(() => import('./components/private/FaceCareRemedies'));
const FaceCareDetails = React.lazy(() => import('./components/private/FaceCareDetails'));
const BodyCareRemedies = React.lazy(() => import('./components/private/BodyCareRemedies'));
const BodyCareDetails = React.lazy(() => import('./components/private/BodyCareDetails'));
const UserDashboard = React.lazy(() => import('./components/private/UserDashboard')); 
const care = React.lazy(() => import('./components/private/Care')); 
const profile=React.lazy (() => import('./components/private/Profile'));
const EditRemedy=React.lazy (() => import('./components/private/EditRemedy'));
const ReviewSection=React.lazy (() => import('./components/private/ReviewPage'));


// const AdminPanel = React.lazy(() => import('./components/private/AdminPanel')); 


function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/content" element={<Content />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/shopsection" element={<ShopSection />} />
          <Route path="/facecare" element={<FaceCare />} />
          <Route path="/haircare" element={<HairCare />} />
          <Route path="/bodycare" element={<BodyCare />} />
          <Route path="/frontsection" element={<FrontSection />} />
          {/* <Route path="/care" element={<Care/>}/> */}
          <Route path="/admin/dashboard" element={<AdminPanel/>}/>
          <Route path="/userdashboard" element={<UserDashboard/>}/>
          <Route path="/edit-remedy/:id" element={<EditRemedy/>}/>
          
          <Route path="/review/:id" element={<ReviewSection/>} />


          {/* Protected Admin Route */}
          {/* <Route path="/admin" element={
            <ProtectedRoute adminOnly={true}>
              <AdminPanel />
            </ProtectedRoute>
          } />
          <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <UserDashboard />
                </ProtectedRoute>
              }
            /> */}
          {/* Face Care Remedies Routes */}
          <Route path="/face-care/remedies" element={<FaceCareRemedies />} />
          <Route path="/face-care/remedies/:id" element={<FaceCareDetails />} />
          {/* Hair Care Routes */}
          <Route path="/hair-care/remedies" element={<HairCareRemedies />} />
          <Route path="/hair-care/remedies/:id" element={<HairCareDetails />} />
          {/* Body Care Routes */}
          <Route path="/body-care/remedies" element={<BodyCareRemedies />} />
          <Route path="/body-care/remedies/:id" element={<BodyCareDetails />} />
          {/* Fallback: redirect unmatched routes to homepage */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
