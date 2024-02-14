import { useState } from "react";
import { useCookies } from "react-cookie";

export default function ProfilePage() {
  const [formData, setFormData] = useState({
    // name: "",
    // email: "",
    // gender: "",
    // height: "",
    // password: "",
    firstName: "",
    lastName: "",
    day: "",
    month: "",
    year: "",
    genderInterest: "",
    about: "",
    url: "",
    matches: [],
  });

  const handleChange = (evt) => {
    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value,
      error: "",
    });
  };

  // console.log(formData);

  // const handleSubmit = async (event) => {
  //   event.preventDefault();

  //   try {
  //     const response = await fetch("/api/profile", {
  //       method: "POST",
  //       body: JSON.stringify(formData),
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     if (response.ok) {
  //       console.log("Profile created successfully");
  //     } else {
  //       console.error("Failed to create profile");
  //     }
  //   } catch (error) {
  //     console.error("Error creating profile:", error);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/users/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      console.log(data);
      //     const success = response.status === 200;
      //     // if (success) navigate("/dashboard");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="profile">
        <h2>ProfilePage</h2>

        <form action="#" autoComplete="on" onSubmit={handleSubmit}>
          <section>
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              placeholder="Your First Name"
              value={formData.firstName}
              onChange={handleChange}
              // required=""
              required={true}
            />

            <br />

            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Your Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required=""
            />

            <br />

            <div className="birthdayInputs">
              <label>Birthday</label>
              <input
                type="number"
                name="day"
                id="day"
                placeholder="DD"
                value={formData.day}
                onChange={handleChange}
                required=""
              />

              <input
                type="number"
                name="month"
                id="month"
                placeholder="MM"
                value={formData.month}
                onChange={handleChange}
                required=""
              />

              <input
                type="number"
                name="year"
                id="year"
                placeholder="YYYY"
                value={formData.year}
                onChange={handleChange}
                required=""
              />
            </div>

            <label>Interested in: </label>

            <div className="all-gender-interests">
              <input
                id="man-gender-interest"
                type="radio"
                name="genderInterest"
                value="man"
                onChange={handleChange}
                checked={formData.genderInterest === "man"}
              />
              <label>Man</label>
              <input
                id="woman-gender-interest"
                type="radio"
                name="genderInterest"
                value="woman"
                onChange={handleChange}
                checked={formData.genderInterest === "woman"}
              />
              <label>Woman</label>
            </div>

            <label className="about-info">About Me</label>
            <input
              type="text"
              name="about"
              id="about"
              placeholder="Something special about yourself..."
              value={formData.about}
              onChange={handleChange}
              required=""
            />
          </section>

          <section>
            <label className="photo-url">Profile Photo</label>
            <input
              type="url"
              name="url"
              id="url"
              onChange={handleChange}
              required=""
            />

            <div>
              {formData.url && (
                <img
                  className="profilePicture"
                  src={formData.url}
                  alt="profile pic"
                />
              )}
            </div>

            <input type="submit" />
          </section>
        </form>
      </div>
    </>
  );
}
