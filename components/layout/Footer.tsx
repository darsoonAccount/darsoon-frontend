import React from "react";
import styled from "styled-components";
import { themeVars } from "../../styles/GlobalStyles";
import En from "../translation/En";
import Fa from "../translation/Fa";

const Footer = () => {
  return (
    <StyledFooter>
      <h3 className="site-title">
        <En>Darsoon</En>
        <Fa>درسون</Fa>
      </h3>
      <div className="links-in-footer">
        <div className="flex-column">
          <h4>
            <En>About Us</En>
            <Fa>درباره ما</Fa>
          </h4>
          <p>
            <En>Who we are</En>
            <Fa>ما که هستیم</Fa>
          </p>
          <p>
            <En>Our values</En>
            <Fa>ارزش‌های ما</Fa>
          </p>
        </div>
        <div className="flex-column">
          <h4>
            <En>Contact Us</En>
            <Fa>ارتباط با ما</Fa>
          </h4>
          <p>
            <En>Customer Care</En>
            <Fa>پشتیبانی مشتریان</Fa>
          </p>
          <p>
            <En>Become a teacher</En>
            <Fa>معلم شوید</Fa>
          </p>
        </div>
        <div className="flex-column">
          <h4>
            <En>Terms of Service</En>
            <Fa>شرایط خدمات</Fa>
          </h4>
          <p>
            <En>Privacy Policy</En>
            <Fa>سیاست محرمانگی</Fa>
          </p>
          <p>
            <En>Cookies</En>
            <Fa>کوکی‌ها</Fa>
          </p>
        </div>

        <div className="flex-column">
          <h4>
            <En>Social Media</En>
            <Fa>شبکه‌های اجتماعی</Fa>
          </h4>
          <p>
            <En>Instagram</En>
            <Fa>اینستاگرام</Fa>
          </p>
          <p>
            <En>Twitter</En>
            <Fa>توییتر</Fa>
          </p>
        </div>
      </div>
    </StyledFooter>
  );
};

export default Footer;

const StyledFooter = styled.footer`
  z-index: 0;
  flex: 0;
  padding-top: 1rem;
  background: ${themeVars.darkColor};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
    padding-block: 4rem;
    padding-inline: 2rem;
    display: grid;
    grid-template-columns: repeat( auto-fit, minmax(200px , 1fr));
    gap: 4rem;
  }

  h3 {
    padding: 1rem;
  }

  div {
    color: white;
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
      text-align: start;
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
