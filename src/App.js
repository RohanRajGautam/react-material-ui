import React, { useState } from "react";
import "./App.css";
import Header from "./component/ui/Header";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./component/ui/Theme";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Footer from "./component/ui/Footer";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route
            exact
            path='/'
            component={() => <div style={{ minHeight: "100vh" }}>Home</div>}
          />
          <Route
            path='/training'
            component={() => <div style={{ minHeight: "100vh" }}>Training</div>}
          />
          <Route
            path='/skills'
            component={() => <div style={{ minHeight: "100vh" }}>Skills</div>}
          />
          <Route
            path='/projects'
            component={() => <div style={{ minHeight: "100vh" }}>projects</div>}
          />
          <Route
            path='/contact'
            component={() => <div style={{ minHeight: "100vh" }}>contact</div>}
          />
          <Route
            exact
            path='/project1'
            component={() => (
              <div style={{ minHeight: "100vh" }}>Project 1</div>
            )}
          />
          <Route
            path='/project2'
            component={() => (
              <div style={{ minHeight: "100vh" }}>Project 2</div>
            )}
          />
          <Route
            path='/project3'
            component={() => (
              <div style={{ minHeight: "100vh" }}>Project 3</div>
            )}
          />
        </Switch>
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
