import React from "react";
import './Footer.css'

function Footer() {
  return (
    <div id="footer-wrap">
      <div id="footer-div">
        <h1>About Wesley</h1>
        <a target="_blank" href="https://www.linkedin.com/in/wesley-blackburn-333286232/">
          <img className="about-me-links" src="/static/linkedin.png"></img>
        </a>
        <a target="_blank" href="https://github.com/wesleyblackburn90">
          <img className="about-me-links" src="/static/github.png"></img>
        </a>
      </div>
    </div>
  )
}

export default Footer
