import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import HomeScreen from './screens/HomeScreen';
import PrivateRoutes from './components/PrivateRoutes';
import LoginScreen from './screens/LoginScreen';
import RegistrationScreen from './screens/RegistrationScreen';
import QuestionnaireScreen from './screens/QuestionnaireScreen';
import ProfileScreen from './screens/ProfileScreen';

const router = createBrowserRouter (
  createRoutesFromElements (
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/signup" element={<RegistrationScreen />} />
      <Route element={<PrivateRoutes />}>
        <Route path="/questionnaire" element={<QuestionnaireScreen />} />
        <Route path="/profile" exact element={<ProfileScreen />} />
      </Route>
    </Route>
  )
);

const root = ReactDOM.createRoot (document.getElementById ('root'));
root.render (
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
