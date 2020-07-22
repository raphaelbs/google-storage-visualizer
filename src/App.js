import React from "react";

import Login from "./Login";
import Header from "./Header";
import Storage from "./Storage";

function App() {
  const [user, setUser] = React.useState(null);

  return (
    <div>
      <header>
        {user ? <Header user={user} /> : <Login onLogin={setUser} />}
      </header>
      <main>{user ? <Storage /> : null}</main>
    </div>
  );
}

export default App;
