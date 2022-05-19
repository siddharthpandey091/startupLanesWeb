/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaUserAlt } from "react-icons/fa";

const Nav = () => {
  const router = useRouter();
  const [checkAuthState, setCheckAuthState] = useState("");

  const ISSERVER = typeof window === "undefined";
  // function to logout a user
  const logout = () => {
    delete_cookie("SL_USER__AUTH");
    router.push("/");
  };

  function delete_cookie(name) {
    if (!ISSERVER)
      document.cookie =
        name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  }

  function checkAuth(name) {
    if (!ISSERVER) {
      var match = document.cookie.match(
        RegExp("(?:^|;\\s*)" + name + "=([^;]*)")
      );
      return match ? "LOGGED_IN" : "!LOGGED_IN";
    }
  }

  useEffect(() => {
    const res = checkAuth("SL_USER__AUTH");
    setCheckAuthState(res);
  }, []);

  return (
    <nav className="navbar navbar-expand-lg pageWrapper ">
      <div className="container-fluid">
        <Link href="/">
          <a className="navbar-brand">
            <img src="/logo-sl.png" />
          </a>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link href="/">
                <a className="nav-link">Source Vendor</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/explore-more">
                <a className="nav-link" aria-current="page">
                  Explore Users
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/startups">
                <a className="nav-link" aria-current="page">
                  Startups for Funding
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/about">
                <a className="nav-link">About Company</a>
              </Link>
            </li>
            {/* menu for logged in user */}
            {checkAuthState == "LOGGED_IN" && (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <FaUserAlt />
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <Link href="/profile">
                      <a className="dropdown-item">Profile</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/dashboard">
                      <a className="dropdown-item">Dashboard</a>
                    </Link>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      onClick={logout}
                      style={{ cursor: "pointer" }}
                    >
                      Logout
                    </a>
                  </li>
                </ul>
              </li>
            )}

            {checkAuthState == "!LOGGED_IN" && (
              <>
                <li className="nav-item">
                  <Link href="/login">
                    <a
                      className="nav-link btn btn-success"
                      role="button"
                      aria-current="page"
                    >
                      Login
                    </a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/register">
                    <a
                      className="nav-link btn btn-outline-success"
                      aria-current="page"
                    >
                      Signup
                    </a>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
