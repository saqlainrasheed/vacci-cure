import React, { useState } from "react";
import "./forms.css";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [body, setBody] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const innerBody = {
      email,
      password,
    };
    setBody(innerBody);
    console.log("submitted : ", body);
  };

  return (
    <>
      <div className="container">
        <main className="forms">
          <legend className="h1">Login</legend>
          <form method="get" onSubmit={(e) => handleSubmit(e)}>
            <label className="form-label mt-4" htmlFor="email">
              Email
            </label>
            <input
              className="form-control"
              type="email"
              name="email"
              id="email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />

            <label className="form-label mt-3" htmlFor="password">
              Password
            </label>
            <input
              className="form-control"
              type="password"
              name="password"
              id="password"
              autoComplete="current-password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="submit"
              name="submit"
              value="email"
              className="btn btn-primary mt-4"
            />
          </form>

          <div className="form-text mt-2">
            Not have an account?
            <span>
              <a href="/register">register</a>
            </span>
          </div>
        </main>
      </div>
    </>
  );
}
export default Login;
