import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
body {
  background-color: white;
  color: black;
  margin: 0;
  font-family: Arial, sans-serif;
}

a {
  color: #1e90ff;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
`;

export default GlobalStyle;