import React from "react";
import Link from "next/link";
import styles from "./DashboardCard.module.css";

function DashboardCard({ img, title, number }) {
  return (
    // <Link href="/" style={{ textDecoraton: "none" }}>
    //   <a>
    <div className={styles.DashboardCard}>
      <div>
        <p>{title}</p>
        <h1>{number}</h1>
      </div>
      <div>
        <img src={img} />
      </div>
    </div>
    //   </a>
    // </Link>
  );
}

export default DashboardCard;
