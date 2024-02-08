import { useState } from "react";
import { getUser } from "../utilities/users-service";

export default function LoginForm({ setIsNewAccount, setUser }) {
  const handleClick = () => {
    setIsNewAccount(true);
  };

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (evt) => {
    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value,
    });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const token = await response.json();
      localStorage.setItem("token", token.token);
      setUser(getUser());
    } else {
      setError("Invalid username or password. Please try again.");
    }
  };

  return (
    <section>
      <h1 className="logIn">Log in to your account:</h1>
      <form action="#" autoComplete="off" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Your email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="your@email.com"
            value={formData.email}
            onChange={handleChange}
            required=""
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            required=""
          />
        </div>
        <button type="submit">Sign in</button>
        <p>
          Don’t have an account yet?{" "}
          <button onClick={handleClick}>Sign up</button>
        </p>
        {error && <p>{error}</p>}
      </form>
    </section>
  );
}
