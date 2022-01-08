/** @format */

import React, { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

import { magic } from "../lib/magic-client";

import styles from "../styles/Login.module.css";
const Login = () => {
  const [userMsg, setUserMsg] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLoginWithEmail = async (e) => {
    e.preventDefault();

    if (email) {
      if (email === "kagyeman@ymail.com") {
        try {
          setLoading(true);
          const didToken = await magic.auth.loginWithMagicLink({
            email: email,
          });

          console.log({ didToken });

          if (didToken) {
            router.push("/");
          }
        } catch (error) {
          // Handle errors if required!
          console.log("Login error", error);
          setLoading(false);
        }
      }
    } else {
      setUserMsg("Enter a valid email address");
      setLoading(false);
    }
  };

  const handleOnChangeEmail = (e) => {
    e.preventDefault();
    setUserMsg("");
    setEmail(e.target.value);
  };

  useEffect(() => {
    const handleComplete = () => {
      setLoading(false);
    };
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router.events]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Netflix SignIn</title>
        <meta name='description' content='Signin to Netflix' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <header className={styles.header}>
        <div className={styles.headerWrapper}>
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
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.mainWrapper}>
          <h1 className={styles.signinHeader}>Sign In</h1>
          <input
            className={styles.emailInput}
            type={"email"}
            placeholder='Emaill address'
            value={email}
            onChange={(e) => handleOnChangeEmail(e)}
          ></input>
          <p className={styles.userMsg}>{userMsg}</p>
          <button
            className={styles.loginBtn}
            onClick={(e) => handleLoginWithEmail(e)}
          >
            {loading ? "Loading" : "Sign In"}
          </button>
        </div>
      </main>
    </div>
  );
};

export default Login;
