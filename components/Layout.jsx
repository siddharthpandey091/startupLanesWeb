import React from "react";
import Footer from "./Footer";
import Header from "./Header";

function Layout({ children, checkAuth }) {
  return (
    <>
      <Header checkAuth={checkAuth} />
      {children}
      <Footer />
    </>
  );
}

export default Layout;
