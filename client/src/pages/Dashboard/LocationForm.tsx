import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const LocationForm = () => {
  const [location, setLocation] = useState({});

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    setLocation({ ...location, place: event.target.value });
  };

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    (async () => {
      try {
        await fetch(`http://localhost:5000/newPlace`, {
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
      <Box>
        <div>
          <TextField
            id="standard-basic"
            label="Location"
            variant="standard"
            onChange={handleInputChange}
          />
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </div>
      </Box>
    </form>
  );
};

export default LocationForm;
