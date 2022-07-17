import { ThemeProvider } from "styled-components";

import defaultTheme from "./style/themes/defaut";
import GlobalStyle from "./style/global";
import Todos from "./feature/todo";

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <Todos />
    </ThemeProvider>
  );
}

export default App;
