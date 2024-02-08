import { useState } from "react";

export default function ProfilePage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    day: "",
    month: "",
    year: "",
    about: "",
    url: "",
  });

  const handleChange = (evt) => {
    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value,
      error: "",
    });
  };

  console.log(formData);

  const handleSubmit = () => {
    console.log("submitted");
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
              required=""
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
                placeholder="Day"
                value={formData.day}
                onChange={handleChange}
                required=""
              />

              <input
                type="number"
                name="month"
                id="month"
                placeholder="Month"
                value={formData.month}
                onChange={handleChange}
                required=""
              />

              <input
                type="number"
                name="year"
                id="year"
                placeholder="Year"
                value={formData.year}
                onChange={handleChange}
                required=""
              />
            </div>

            <label htmlFor="about">About Me</label>
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

          <input type="submit" />

          <section>
            <label htmlFor="url">Profile Photo</label>
            <input
              type="url"
              name="url"
              id="url"
              onChange={handleChange}
              required=""
            />

            <div className="profilePicture">
              <img src={formData.url} />
            </div>
          </section>
        </form>
      </div>
    </>
  );
}
