import { SignIn } from './screens/sign-in/SignIn'
import './App.css';
import { AddPlaceType } from './screens/add-place-type/AddPlaceType';
import React from 'react';

import { Routes, Route, useLocation } from 'react-router-dom';
import { NavigationBar } from './components/NavigationBar';
import { AuthenticatedRedirect } from './components/AuthenticatedRedirect';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import "./App.css";
function App() {
  let location = useLocation();
  return (
    <div>
      <NavigationBar />
      <TransitionGroup>
        <CSSTransition
          key={location.pathname}
          timeout={300}
          classNames="page-transition"
          unmountOnExit>
          <Routes>
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/add-place" element={
              <AuthenticatedRedirect>
                <AddPlaceType />
              </AuthenticatedRedirect>
            } />
          </Routes>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
}

export default App;



const styles = {};

styles.fill = {
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0
};

styles.content = {
  ...styles.fill,
  top: "40px",
  textAlign: "center"
};
