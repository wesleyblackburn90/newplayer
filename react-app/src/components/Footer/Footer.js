import React from "react";
import './Footer.css'

function Footer() {
  return (
    <div id="footer-wrap">
      <div id="footer-div">
        <h1>About Wes</h1>
        <a href="https://www.linkedin.com/in/wesley-blackburn-333286232/">
          <img className="about-me-links" src="/images/linkedin.png"></img>
        </a>
        <a href="https://github.com/wesleyblackburn90">
          <img className="about-me-links" src="/images/github.png"></img>
        </a>
      </div>
    </div>
  )
}

export default Footer
