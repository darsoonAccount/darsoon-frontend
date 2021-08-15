import React from "react";
import styled from "styled-components";
import { themeVars } from "./GlobalStyles";

const Footer = () => {
  return (
    <StyledFooter>
      <h3 className="site-title">
        Darsoon
      </h3>
      <div className="links-in-footer">
        <div className="flex-column">
          <h4>About Us</h4>
          <p>Who we are</p>
          <p>Our values</p>
        </div>
        <div className="flex-column">
          <h4>Contact Us</h4>
          <p>Customer Care</p>
          <p>Be an instructor</p>
        </div>
        <div className="flex-column">
          <h4>Terms of Service</h4>
          <p>Privacy Policy</p>
          <p>Cookies</p>
        </div>

        <div className="flex-column">
          <h4>Social Media</h4>
          <p>Instagram</p>
          <p>Twitter</p>
        </div>
      </div>
    </StyledFooter>
  );
};

export default Footer;

const StyledFooter = styled.footer`
flex: 0;
padding-top: 1rem;
background: ${themeVars.darkColor};

display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
width: 100%;

.site-title {
  font-weight: 900;
  font-size: 1.5em;
  span {
    color: white;
  }
}

.links-in-footer {
  width: 100%;
padding-block: 1rem;
padding-inline: 2rem;
}

h3 {
  padding:1rem;
  }

div {
color: white;
padding: 1rem;
display: flex;
flex-wrap: wrap;
justify-content: space-between;
}
h4 {
  padding: 1rem;
  color: white;
}

.flex-column {
  h4 {
    padding: 0;
    text-align: left;
    margin-bottom: 0.5rem;
  }
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

}

.footnote {
  padding-inline: 2rem;
  padding-block: 3rem;
  margin-top: 1rem;
  flex-direction: column;
  text-align: center;
  color: white;
  background: #1d132b;
}

`;
