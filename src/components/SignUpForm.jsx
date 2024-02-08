import { useState } from "react";

export default function SignUpForm({ setIsNewAccount }) {
  const handleClick = () => {
    setIsNewAccount(false);
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "",
    height: "",
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

    if (!formData.gender) {
      setFormData({ ...formData, error: "Please select a gender" });
      return;
    }

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
        const errorData = await response.json();
        if (errorData.error === "Email already in use") {
          setFormData({
            ...formData,
            error:
              "Email has already been used. Please choose a different email.",
          });
        } else if (
          errorData.error === "Too tall for a male, max height is 165cm"
        ) {
          setFormData({
            ...formData,
            error:
              "Dude you are too tall! Perhaps this is not the place for yer.",
          });
        } else if (
          errorData.error === "Too tall for a female, max height is 155cm"
        ) {
          setFormData({
            ...formData,
            error: "Yer tall gal! Find your prince charming elsewhere please ~",
          });
        } else if (errorData.error === "password too short") {
          setFormData({
            ...formData,
            error:
              "Password too short. Please input a password that are at least 3 characters",
          });
        }
        // else {
        //   setFormData({ ...formData, error: "Something failed" });
        // }
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
        <form onSubmit={handleSubmit}>
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
              placeholder="@something.com"
              value={formData.email}
              onChange={handleChange}
              required=""
            />
          </div>
          <div>
            <label htmlFor="user-gender">Your gender</label>
            <select
              className="user-gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div>
            <label htmlFor="user-height">Your height</label>
            <input
              type="height"
              name="height"
              id="height"
              placeholder="your REAL height in cm"
              value={formData.height}
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
              placeholder="3 character or more"
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
              placeholder="3 character or more"
              value={formData.confirm}
              onChange={handleChange}
              required=""
            />
          </div>
          <button type="submit" disabled={disable}>
            Create an account
          </button>
          <p>
            Already have an account?
            <button onClick={handleClick}>Login here</button>
          </p>
        </form>

        <p>&nbsp;{formData.error}</p>
      </section>
    </div>
  );
}
