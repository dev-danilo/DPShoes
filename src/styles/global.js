import { createGlobalStyle } from 'styled-components';

import 'react-toastify/dist/ReactToastify.css';

import background from '../assets/images/background.svg';

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');
  * {
    margin: 0;
    padding:0;
    outline:0;
    box-sizing: border-box;
  }

  body {
    background: #7159c1 url(${background}) no-repeat;
    -webkit-font-smoothing: antialiased;

    &::before {
      content: '';
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      position: absolute;
      background:  url(${background}) no-repeat center -60px/101vw;
      z-index: -5;

      @media (max-width: 1200px) {
        background: url(${background}) no-repeat center top ;
      }
  }

  body, input, button {
    font: 14px Roboto, sans-serif;
  }

  #root {
    max-width: 1024px;
    margin: 0 auto;
    padding: 0 20px 50px;
  }

  button {
    cursor: pointer;
  }
  }`;
