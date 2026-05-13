import { useState } from "react";
import Dashboard from "./Dashboard";

function Login() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const res = await fetch(
  "https://itam-backend-jgzp.onrender.com/api/login",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
        body: JSON.stringify({
          username,
          password,
        }),
      }
    );

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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">

      <div className="bg-white p-10 rounded-2xl shadow-xl w-96">

        <h1 className="text-3xl font-bold text-center mb-8">
          IT Asset Management
        </h1>

        <input
          type="text"
          placeholder="Username"
          className="w-full border p-3 rounded-lg mb-4"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded-lg mb-6"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
        >
          Login
        </button>

      </div>
    </div>
  );
}

export default Login;