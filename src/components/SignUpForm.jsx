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
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow border border-jade-700 md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1>Create an account</h1>
              <form
                className="space-y-4 md:space-y-6"
                action="#"
                autoComplete="off"
                onSubmit={handleSubmit}
              >
                <div>
                  <label
                    htmlFor="user-name"
                    className="block mb-2 text-sm font-medium"
                  >
                    Your username
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="bg-zinc-50 border border-zinc-300 text-zinc-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="username"
                    value={formData.name}
                    onChange={handleChange}
                    required=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="user-email"
                    className="block mb-2 text-sm font-medium"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-zinc-50 border border-zinc-300 text-zinc-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={handleChange}
                    required=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-zinc-50 border border-zinc-300 text-zinc-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    value={formData.password}
                    onChange={handleChange}
                    required=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="confirm-password"
                    className="block mb-2 text-sm font-medium"
                  >
                    Confirm password
                  </label>
                  <input
                    type="password"
                    name="confirm"
                    id="confirm"
                    placeholder="••••••••"
                    className="bg-zinc-50 border border-zinc-300 text-zinc-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    value={formData.confirm}
                    onChange={handleChange}
                    required=""
                  />
                </div>
                <div className="flex items-start">
                  {/* <div className="flex items-center h-5">
                    <input
                      id="terms"
                      aria-describedby="terms"
                      type="checkbox"
                      className="w-4 h-4 border border-zinc-300 rounded bg-zinc-50 focus:ring-3 focus:ring-primary-300 dark:bg-zinc-700 dark:border-zinc-600 dark:focus:ring-primary-600 dark:ring-offset-zinc-800"
                      required=""
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="terms" className="font-light text-jade-500">
                      I accept the{" "}
                      <a
                        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                        href="#"
                      >
                        Terms and Conditions
                      </a>
                    </label>
                  </div> */}
                </div>
                <button
                  type="submit"
                  disabled={disable}
                  className="w-full bg-jade-500"
                >
                  Create an account
                </button>
                <p className="text-sm font-light">
                  Already have an account?{" "}
                  <span
                    className="font-medium text-jade-500 cursor-pointer"
                    onClick={handleClick}
                  >
                    Login here
                  </span>
                </p>
              </form>

              <p className="error-message text-jade-500">
                &nbsp;{formData.error}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
