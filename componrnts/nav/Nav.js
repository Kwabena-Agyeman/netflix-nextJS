/** @format */

import React from "react";
import styles from "./Nav.module.css";
import { useRouter } from "next/router";
import Link from "next/link";

const NavBar = ({ username }) => {
  const router = useRouter();

  const handleOnCLickHome = (e) => {
    e.preventDefault();
    router.push("/");
  };

  const handleOnMyList = (e) => {
    e.preventDefault();
    router.push("browse/my-list");
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        Logo
        <Link href='/'>
          <a className={styles.logoLink}>
            <div className={styles.logoWrapper}>Netflix</div>
          </a>
        </Link>
        <ul className={styles.navItems}>
          <li
            onClick={(e) => {
              handleOnCLickHome(e);
            }}
            className={styles.navItem}
          >
            Home
          </li>
          <li
            onClick={(e) => {
              handleOnMyList(e);
            }}
            className={styles.navItem2}
          >
            My List
          </li>
        </ul>
        <nav className={styles.navContainer}>
          <div>
            <button className={styles.usernameBtn}>
              <p className={styles.username}>{username}</p>
              {/* {Expand more icons} */}
            </button>
            <div className={styles.navDropdown}>
              <div>
                <Link href='/login'>
                  <a className={styles.linkName}>Sign out</a>
                </Link>
                <div className={styles.lineWrapper}></div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default NavBar;
