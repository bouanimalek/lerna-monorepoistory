import React from "react";
import { Image } from "@themesberg/react-bootstrap";

import Loader from "react-loader-spinner";
import ReactLogo from "../assets/img/technologies/react-logo-transparent.svg";

export default (props) => {
  const { show } = props;

  return (
    <div
      className={`preloader bg-soft flex-column justify-content-center align-items-center ${
        show ? "" : "show"
      }`}
    >
      {/* <Image className="loader-element animate__animated animate__jackInTheBox" src={ReactLogo} height={40} /> */}

      {/* exemple of loader with react-loader-spinner */}

      {/* <Loader type="Audio" color="#00BFFF" height={80} width={80} timeout={1000} />
      <Loader type="BallTriangle" color="#00BFFF" height={80} width={80} timeout={1000} />
      <Loader type="Bars" color="#00BFFF" height={80} width={80} timeout={1000} />
      <Loader type="Circles" color="#00BFFF" height={80} width={80} timeout={1000} />
      <Loader type="Grid" color="#00BFFF" height={80} width={80} timeout={1000} />
      <Loader type="Hearts" color="#00BFFF" height={80} width={80} timeout={1000} />
      <Loader type="Oval" color="#00BFFF" height={80} width={80} timeout={1000} />
      <Loader type="Puff" color="#00BFFF" height={100} width={100} timeout={1000} />
      <Loader type="Rings" color="#00BFFF" height={80} width={80} timeout={1000} />
      <Loader type="TailSpin" color="#00BFFF" height={80} width={80} timeout={1000} />
      <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} timeout={1000} /> */}

      <Loader
        type="Grid"
        color="#00BFFF"
        height={80}
        width={80}
        timeout={1000}
      />
    </div>
  );
};
