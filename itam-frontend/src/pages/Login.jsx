import { useState } from "react";
import Dashboard from "./Dashboard";

function Login() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const res = await fetch("https://itam-backend-jgzp.onrender.com//api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      alert(data.message);
      setIsLoggedIn(true);
    } else {
      alert(data.message);
    }
  };

  if (isLoggedIn) {
    return <Dashboard />;
  }

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>IT Asset Management</h1>

      <input
        type="text"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />

      <br /><br />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <button onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}

export default Login;export default Login;