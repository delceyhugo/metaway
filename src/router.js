import { createBrowserRouter } from "react-router-dom";
// Routes
import Head from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Admin from './components/Admin';
import Footer from './components/Footer';
import PrivacyPolicy from './components/PrivacyPolicy';
import Terms from './components/Terms';
import Three from './components/Three';


export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
      {/* <Head/> */}
      <Home/>
      <Footer/>
    </>),
  },
  {
      path: "/login",
        element: (
        <>
          <Head/>
          <Login/>
          <Footer/>
        </>
        ),
  },
  {
    path: "/signup",
    element: (
      <>
        <Head/>
        <Signup/>
        <Footer/>
      </>
      ),
  },
  {
    path: "/admin",
    element: (
      <>
        <Head/>
        <Admin/>
        <Footer/>
      </>
      ),
  },
  {
    path: "/privacy_policy",
    element: (
      <>
        <Head/>
        <PrivacyPolicy/>
        <Footer/>
      </>
      ),
  },
  {
    path: "/terms",
    element: (
      <>
        <Head/>
        <Terms/>
        <Footer/>
      </>
      ),
  },
  {
    path: "/3d",
    element: (
      <>
        <Three/>
      </>
      ),
  },
  {
    path: "*",
    element: (
      <>
        <Head/>
        <div>Not Found</div>
        <Footer/>
      </>
      ),
  },
]);