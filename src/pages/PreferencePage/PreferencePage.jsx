import { useState } from "react";

const PreferencePage = () => {
  const [ageRange, setAgeRange] = useState({ min: 18, max: 30 });
  const [heightRange, setHeightRange] = useState({ min: 120, max: 165 });
  const [distance, setDistance] = useState(50);
  const [interests, setInterests] = useState([]);

  const handleAgeRangeChange = (event) => {
    const { name, value } = event.target;
    setAgeRange({ ...ageRange, [name]: parseInt(value) });
  };

  const handleHeightRangeChange = (event) => {
    const { name, value } = event.target;
    setHeightRange({ ...heightRange, [name]: parseInt(value) });
  };

  const handleDistanceChange = (event) => {
    setDistance(parseInt(event.target.value));
  };

  const handleInterestChange = (event) => {
    const { value } = event.target;
    if (event.target.checked) {
      setInterests([...interests, value]);
    } else {
      setInterests(interests.filter((interest) => interest !== value));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/preferences", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ageRange,
          distance,
          interests,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save preferences");
      }

      alert("Preferences saved successfully!");
    } catch (error) {
      console.error("Error saving preferences:", error);
      alert(
        "An error occurred while saving preferences. Please try again later."
      );
    }
  };

  return (
    <div>
      <h2>Preferences</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Age Range:
          <input
            type="number"
            name="minAge"
            value={ageRange.min}
            onChange={handleAgeRangeChange}
          />
          <span> to </span>
          <input
            type="number"
            name="maxAge"
            value={ageRange.max}
            onChange={handleAgeRangeChange}
          />
        </label>
        <br />
        <label>
          Height Range (in cm):
          <input
            type="number"
            name="minHeight"
            value={heightRange.min}
            onChange={handleHeightRangeChange}
          />
          <span> to </span>
          <input
            type="number"
            name="maxHeight"
            value={heightRange.max}
            onChange={handleHeightRangeChange}
          />
        </label>
        <br />
        <label>
          Distance (in km):
          <input
            type="number"
            value={distance}
            onChange={handleDistanceChange}
          />
        </label>
        <br />
        <label>
          Interests:
          <div>
            <label>
              <input
                type="checkbox"
                value="tableTennis"
                checked={interests.includes("tableTennis")}
                onChange={handleInterestChange}
              />{" "}
              Travelling
            </label>
            <label>
              <input
                type="checkbox"
                value="playingVideoGames"
                checked={interests.includes("playingVideoGames")}
                onChange={handleInterestChange}
              />{" "}
              Playing Video Games
            </label>
            <label>
              <input
                type="checkbox"
                value="sleeping"
                checked={interests.includes("sleeping")}
                onChange={handleInterestChange}
              />{" "}
              Sleeping
            </label>
            <label>
              <input
                type="checkbox"
                value="snorkeling"
                checked={interests.includes("snorkeling")}
                onChange={handleInterestChange}
              />{" "}
              Snorkeling
            </label>
            <label>
              <input
                type="checkbox"
                value="playPiano"
                checked={interests.includes("playPiano")}
                onChange={handleInterestChange}
              />{" "}
              Playing Piano
            </label>
          </div>
        </label>
        <br />
        <button type="submit">Save Preferences</button>
      </form>
    </div>
  );
};

export default PreferencePage;
