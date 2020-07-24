import React from "react";

import Login from "./Login";
import Header from "./Header";
import Storage from "./Storage";

function App() {
  const [user, setUser] = React.useState(null);

  return (
    <>
      {user ? <Header user={user} /> : <Login onLogin={setUser} />}
      <main>{user ? <Storage /> : null}</main>
    </>
  );
}

export default App;
