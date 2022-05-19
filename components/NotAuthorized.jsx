import React from "react";
import Link from "next/link";

const NotAuthorized = () => {
  return (
    <div className="NotAuth">
      <img src="/accessdenied.gif" alt="" />
      <h2 style={{ color: "red" }}>Not Authorized</h2>
      <p>Please Login First to access this resource.</p>
      <Link href="/login">
        <a className="btn btn-success ">Login First</a>
      </Link>
    </div>
  );
};

export default NotAuthorized;
