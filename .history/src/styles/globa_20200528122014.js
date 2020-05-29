import { createGlobalStyle } from 'styled-components';
import background from 'react-toastify';

export default createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

* {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box
  }

  #root {
    max-width: 1020px;
    margin: 0 auto;
  }

  body {
    -webkit-font-smoothing: antialiased;
  }

  button {
    cursor: pointer;
  }
`;
