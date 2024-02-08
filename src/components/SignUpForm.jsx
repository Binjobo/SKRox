import { useState } from "react";

export default function SignUpForm({ setIsNewAccount }) {
  const handleClick = () => {
    setIsNewAccount(false);
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
    error: "",
  });

  const handleChange = (evt) => {
    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value,
      error: "",
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { ...dataToSend } = formData;

    try {
      const response = await fetch("/api/users/signup", {
        method: "POST",
        body: JSON.stringify(dataToSend),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const token = await response.json();
        localStorage.setItem("token", token.token);
        setFormData({ ...formData, error: "Account created successfully!" });
      } else {
        setFormData({
          ...formData,
          error:
            "Email has already been used. Please choose a different email.",
        });
      }
    } catch (error) {
      setFormData({ ...formData, error: "Something failed" });
      console.error("Error during token retrieval:", error);
    }
  };

  const disable = formData.password !== formData.confirm;

  return (
    <div>
      <section>
        <h1>Create an account</h1>
        <form action="#" autoComplete="off" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="user-name">Your username</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="username"
              value={formData.name}
              onChange={handleChange}
              required=""
            />
          </div>
          <div>
            <label htmlFor="user-email">Your email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="name@company.com"
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
          <div>
            <label htmlFor="confirm-password">Confirm password</label>
            <input
              type="password"
              name="confirm"
              id="confirm"
              placeholder="••••••••"
              value={formData.confirm}
              onChange={handleChange}
              required=""
            />
          </div>
          <button type="submit" disabled={disable}>
            Create an account
          </button>
          <p>
            Already have an account?{" "}
            <span onClick={handleClick}>Login here</span>
          </p>
        </form>

        <p>&nbsp;{formData.error}</p>
      </section>
    </div>
  );
}
