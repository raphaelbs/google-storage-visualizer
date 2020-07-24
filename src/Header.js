import React from "react";

function Header({ user }) {
  return (
    <header id="userLogin">
      <h1>Monitor</h1>

      <div>
        <p>{user.displayName}</p>
        <img alt="user avatar" src={user.photoURL} />
      </div>

    </header>
  );
}

export default Header;
