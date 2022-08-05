import { SignIn } from './screens/sign-in/SignIn'
import './App.css';
import { AddPlaceType } from './screens/add-place-type/AddPlaceType';
import React from 'react';

import { Route, Routes, useLocation } from 'react-router-dom';
import { NavigationBar } from './components/navigation-bar/NavigationBar';
import { AuthenticatedRedirect } from './components/AuthenticatedRedirect';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { ReviewPlace } from './screens/review-place/ReviewPlace';
import SignUp from './screens/sign-up/SignUp';
import { Permission } from './components/permission/Permission';
import "./App.css";

function App() {
  const location = useLocation();
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
            <Route path="/" element={
              <AuthenticatedRedirect>
                <AddPlaceType />
              </AuthenticatedRedirect>} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />

            <Route path="/add-place" element={
              <AuthenticatedRedirect>
                <AddPlaceType />
              </AuthenticatedRedirect>
            } />
            <Route path="/review-place" element={
              <AuthenticatedRedirect>
                <Permission roles={['admin']} noAccess={<NoAccess />}>
                  <ReviewPlace />
                </Permission>
              </AuthenticatedRedirect>
            } />
          </Routes>
        </CSSTransition>
      </TransitionGroup>
    </div >
  );
}

function NoAccess() {
  return (<p className="text-center">You have no access to this content</p>)
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
