import React from "react";
import Footer from "../Footer";
import NavBar from "../NavBar";
import "./Loading.css";

export default function Loading() {
  return (
    <div className="loader">
      {/* <NavBar /> */}
      <div className="loadingio-spinner-double-ring-sps9acplpie">
        <div className="ldio-dq0fl7ccams">
          <div></div>
          <div></div>
          <div>
            <div></div>
          </div>
          <div>
            <div></div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
