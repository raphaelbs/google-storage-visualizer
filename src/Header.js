import React from "react";

function Header({ user }) {
  return (
    <header>
      {user.displayName}
      <img className="user-avatar" alt="user avatar" src={user.photoURL} />
    </header>
  );
}

export default Header;
