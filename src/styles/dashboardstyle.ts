// styles/global.ts
import { createGlobalStyle } from "styled-components";

export const DashBoardStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  html, body, #root {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
    font-family: 'Roboto', sans-serif;
    background-color: #f3f3f3;
  }

  button {
    background: none;
    cursor: pointer;
    border: none;
  }

  :root {
    --primary-color: #D1107A;
    --third-color: #2694E3;

    --primary-background: #0D0E12;
    --second-background: #16171C;

    --primary-font-color: #fff;

    --shadow-black-color: rgba(0, 0, 0, 0.38);
  }
`;


export default DashBoardStyle;
