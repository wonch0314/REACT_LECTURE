import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import "./css/style.css";

import "./charts/ChartjsConfig";

// Import pages
import Main from "./pages/Main";
import SignIn from "./pages/SignIn";
import Codes from "./pages/Codes";
import Users from "./pages/Users";
import Error404 from "./pages/Error404";

function App() {
  const location = useLocation();

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route exact path="/signin" element={<SignIn />} />
        <Route exact path="/manage/codes" element={<Codes />} />
        <Route exact path="/manage/users" element={<Users />} />
        <Route exact path="*" element={<Error404 />} />
      </Routes>
    </>
  );
}

export default App;
