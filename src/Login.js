import React from "react";
import { firebase } from "./firebase";

function getLoginProvider() {
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope("https://www.googleapis.com/auth/userinfo.email");
  provider.addScope("https://www.googleapis.com/auth/userinfo.profile");
  firebase.auth().languageCode = "pt";

  return provider;
}

function firebaseLogin() {
  return firebase
    .auth()
    .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(() => firebase.auth().signInWithPopup(getLoginProvider()));
}

function Login({ onLogin }) {
  React.useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        onLogin && onLogin(user);
      }
    });
  }, [onLogin]);

  function performLogin() {
    firebaseLogin().catch(function (error) {
      console.error(error);
    });
  }

  return <button onClick={performLogin}>Login</button>;
}

export default Login;
