import React from "react";
import Link from "next/dist/client/link";
import classes from "./footer.module.css";

function Footer() {
  return (
    <section className={classes.section}>
      <footer className={classes.footer}>
        <div className={classes.newsletter}>
          <div>
            <p>SUBSCRIBE TO BLOG VIA EMAIL</p>
            <span>Join 4,050 other subscribers</span>
          </div>
          <div>
            <img src="/email.png" />
            <input type="email" placeholder="enter your email here" /> <br />
            <button>SUBSCRIBE</button>
          </div>
        </div>
        <div>
          <div className={classes.links}>
            <p>QUICK LINKS</p>
            <ul className={classes.first}>
              <li>
                <Link href="payment-policy">Payment policy</Link>
              </li>
              <li>
                <Link href="privacy-policy">Privacy policy</Link>
              </li>
            </ul>
          </div>
          <div className={classes.social}>
            <div>
              <span>Connect with us on social networks</span>
            </div>
            <div className={classes.socialLinks}>
              <a href="#">
                <img src="/Facebook.svg" />
              </a>
              <a href="#">
                <img src="/Instagram.svg" />
              </a>
              <a href="#">
                <img src="/LinkedIN.svg" />
              </a>
              <a href="#">
                <img src="/Youtube.svg" />
              </a>
              <a href="#">
                <img src="/Twitter.svg" />
              </a>
            </div>
          </div>
        </div>
      </footer>
      <div className={classes.credit}>
        © 2019 StartupLanes | New York | San Francisco | Singapore | Jakarta |
        Bangkok | London | Dubai | New Delhi | Mumbai | Chennai | Hyderabad |
        Pune | All rights reserved
      </div>
    </section>
  );
}

export default Footer;
