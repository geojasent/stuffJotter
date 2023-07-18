import { useState, useEffect } from "react";

const LocationForm = () => {
  const [location, setLocation] = useState({});

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocation({ ...location, [event.target.name]: event.target.value });
  };

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    (async () => {
      try {
        await fetch("http://localhost:5000/", {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(location),
        });
        window.location.reload();
      } catch (err) {
        console.log(err);
      }
    })();
  }
  return (
    <form method="post" onSubmit={handleSubmit}>
      <div>
        <label>
          Location:
          <input type="newLocation" name="place" onChange={handleInputChange} />
        </label>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default LocationForm;
