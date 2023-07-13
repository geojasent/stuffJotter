import { useState, useEffect } from "react";

const LocationForm = () => {
  const [location, setLocation] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(event.target.value);
  };

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    (async () => {
      try {
        console.log(location);
      } catch (err) {
        console.log(err);
      }
    })();
  }
  return (
    <form method="post" onSubmit={handleSubmit}>
      <div>
        <label>Location: </label>
        <input
          type="newLocation"
          name="newLocation"
          onChange={handleInputChange}
        />
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default LocationForm;
