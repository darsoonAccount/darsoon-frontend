import { createGlobalStyle } from "styled-components";
import { useLang } from "../contexts/LangProvider";

export const themeVars = {
  primaryColor: "#ff7648",
  accentColor: "#727f9e",
  accent2Color: "#fbe4b1",
  accent3Color: "#f7ca65",
  darkColor: "#291b3d",
  lightGray: "#636f79",
  borderRadius: "10px",
  boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
  boxShadowHover: "rgba(100, 100, 111, 0.8) 0px 7px 29px 0px",

  headingFont: "Poppins, iransans,'Permanent Marker', Arial, Helvetica, sans-serif",
  contentFont: "Poppins, iransans,'Kosugi', Arial, Helvetica, sans-serif",
};

export default createGlobalStyle`
//Resrt Styles ***********************

*,
  *:before,
  *:after {
      box-sizing: border-box;
      -webkit-font-smoothing: antialiased;
  }

  html, body, div,
  input, button, select, option,
  h1, h2, h3, h4, h5, h6, p,
  text {
      /* font-family: sans-serif; */
  }

  html {
    direction: ltr;
  }
  
  html, body {
      max-width: 100vw;
  }

  //making website height at least 100% screen size.
  html,
  body,
  body > div:first-child,
  div#__next {
    height: 100%;
  }

  div#__next {
    display: grid;
    grid-template-rows: auto 1fr auto;
  }
  
  /* http://meyerweb.com/eric/tools/css/reset/
      v2.0 | 20110126
      License: none (public domain)
  */

  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
      margin: 0;
      padding: 0;
      border: 0;
      font-size: 100%;
      vertical-align: baseline;
  }

  html {
    font-size: 80%;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
      display: block;
  }
  body {
      line-height: 1;
      margin: 0;
  }
  p {
    line-height: 1.6;
    font-size: 1.2em;
    max-width: 50ch;
  }
  ol, ul {
      list-style: none;
  }
  blockquote, q {
      quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
      content: '';
      content: none;
  }


body {
  margin: 0;
  /* font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}
// Global Styles ***********************
h1,
h2,
h3,
h4,
h5,
h6 {
  color: ${themeVars.accentColor};
  font-family: ${themeVars.headingFont};
  text-align: center;
  /* max-width: 20ch; */
  line-height: 1.3;
}

label,
button {
  color: ${themeVars.accentColor};
  font-family: ${themeVars.headingFont};
  text-align: center;
}

div,
span,
p,
a,
li,
blockquote,
input,
textarea,
select, option, label, table, th, td {
  font-family: ${themeVars.contentFont};
}



a {
  color: inherit;
  text-decoration: none;
}

p a {
  color: ${themeVars.primaryColor};
}

h1 {
  font-size: 4em;
}

h2 {
  font-size: 2rem;
}

h3 {
  font-size: 1.5rem;
}

h2 {
  margin-top: 1rem;
  margin-bottom: 1rem;
}

button {
  border: none;
  display:grid;
  place-items: center;
  gap: 1rem;
}

 .button, .primary-button, .cta-button , .big-button, .small-button {
  border: none;
  border-radius: 600px;
  padding-inline: 2rem; 
  padding-block: 0.5em;
  min-width: 10rem;
  font-weight: 700;
  text-decoration: none;
  box-shadow: ${themeVars.boxShadow};

  background-color: white;
  color: ${themeVars.primaryColor};
  font-size: 1.5rem;
  cursor: pointer;
  &:hover {
  box-shadow: ${themeVars.boxShadowHover};
  }
}

.primary-button, .cta-button , .big-button , .small-button {
  background-color: ${themeVars.primaryColor};
  color: white;
}
.big-button {
  font-size: 2rem;
}

.small-button {
  font-size: 1rem;
  font-weight: 400;
  padding-inline: 1rem; 
}

option {
  border-radius: 1rem;
}

.center-text {
  text-align: center;
}

.center-item {
  margin: 0 auto;
}
//vertical-aligning react-icons
.react-icons {
  vertical-align: middle;  
}
`;
