import { createBrowserRouter } from "react-router-dom";
// Routes
import Head from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Admin from './components/Admin';


export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
      <Head/>
      <Home/>
    </>),
  },
  {
      path: "/login",
        element: (
        <>
          <Head/>
          <Login/>
        </>
        ),
  },
  {
    path: "/signup",
    element: (
      <>
        <Head/>
        <Signup/>
      </>
      ),
  },
  {
    path: "/admin",
    element: (
      <>
        <Head/>
        <Admin/>
      </>
      ),
  },
  {
    path: "*",
    element: (
      <>
        <Head/>
        <div>Not Found</div>
      </>
      ),
  },
]);