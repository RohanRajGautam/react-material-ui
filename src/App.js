import React from "react";
import "./App.css";
import Header from "./component/ui/Header";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./component/ui/Theme";
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path='/' component={() => <div>Home</div>} />
          <Route path='/training' component={() => <div>Training</div>} />
          <Route path='/skills' component={() => <div>Skills</div>} />
          <Route path='/projects' component={() => <div>projects</div>} />
          <Route path='/contact' component={() => <div>contact</div>} />
          <Route
            exact
            path='/project1'
            component={() => <div>Project 1</div>}
          />
          <Route path='/project2' component={() => <div>Project 2</div>} />
          <Route path='/project3' component={() => <div>Project 3</div>} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
