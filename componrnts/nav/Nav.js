/** @format */

import React, { useEffect, useState } from "react";
import styles from "./Nav.module.css";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

import { magic } from "../../lib/magic-client";

const NavBar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [username, setUsername] = useState("");
  const router = useRouter();
  const handleOnCLickHome = (e) => {
    e.preventDefault();
    router.push("/");
  };

  const handleSignout = async () => {
    try {
      await magic.user.logout();
      console.log(await magic.user.isLoggedIn()); // => `false`
      router.push("/login");
    } catch (error) {
      console.log({ "Error logging out": error });
      router.push("/login");

      // Handle errors if required!
    }
  };

  const handleOnMyList = (e) => {
    e.preventDefault();
    router.push("browse/my-list");
  };

  const handleShowDropDown = (e) => {
    setShowDropdown(!showDropdown);
  };

  useEffect(() => {
    const getUsername = async () => {
      try {
        const { email, publicAddress } = await magic.user.getMetadata();
        console.log({ email });
        setUsername(email);
      } catch (error) {
        console.log({ error });
        // Handle errors if required!
      }
    };

    getUsername();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Link href='/'>
          <a className={styles.logoLink}>
            <div className={styles.logoWrapper}>
              <Image
                src={"/static/netflix.svg"}
                alt='Netflix Logo'
                width={128}
                height={34}
              />
            </div>
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
            <button
              onClick={(e) => {
                handleShowDropDown(e);
              }}
              className={styles.usernameBtn}
            >
              <p className={styles.username}>{username}</p>
              <Image
                src={"/static/expand_more.svg"}
                alt='Expand more'
                width={24}
                height={24}
              />
            </button>
            {showDropdown && (
              <div className={styles.navDropdown}>
                <div>
                  <a
                    className={styles.linkName}
                    onClick={(e) => {
                      handleSignout(e);
                    }}
                  >
                    Sign out
                  </a>

                  <div className={styles.lineWrapper}></div>
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default NavBar;
