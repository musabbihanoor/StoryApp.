import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Box } from "@material-ui/core";
import {} from "@material-ui/icons";
import Login from "./User/Login";
import Signup from "./User/Signup";

const Landing = ({
  authenticate,
  auth: { isAuthenticated, err },
  handleLogin,
  authOption,
  setAuthOption,
}) => {
  if (isAuthenticated) {
    return <Redirect to='/mainscreen' />;
  }

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     history.push("/mainscreen");
  //   }
  // }, [isAuthenticated]);

  return (
    <div>
      <div className='landing'>
        <div className='head'>
          <h1 className='fw-bold'>Welcome to the world of stories.</h1>
          <h5>People, stories, and more - all in one place.</h5>
          <button
            className='btn-green mt-5 fw-bold'
            onClick={() => setAuthOption("login")}
          >
            Get Started
          </button>
        </div>
        <img
          className='landing-books '
          src={process.env.PUBLIC_URL + "/images/landing_image.png"}
        />
        <div className='d-flex flex-column align-items-center'>
          <img
            className='contribute'
            src={process.env.PUBLIC_URL + "/images/Writer Contribution.png"}
          />

          <img
            className='logo'
            src={process.env.PUBLIC_URL + "/images/amueso-v2.png"}
          />
        </div>
      </div>

      {authOption === "login" && (
        <Login
          setAuth={setAuthOption}
          authenticate={authenticate}
          err={err}
          handleLogin={handleLogin}
        />
      )}
      {authOption === "signup" && (
        <Signup setAuth={setAuthOption} authenticate={authenticate} err={err} />
      )}
    </div>
  );
};

export default Landing;
