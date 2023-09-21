import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useAuth0 } from "@auth0/auth0-react";

const LocationForm = () => {
  const [location, setLocation] = useState({});
  const [accessToken, setAccessToken] = useState<string | undefined>();
  const { user, getAccessTokenSilently } = useAuth0();
  const userSub = user?.sub ? user?.sub.split("|")[1] : "";

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocation({ ...location, place: event.target.value });
  };

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    (async () => {
      try {
        await fetch(`http://localhost:5000/${userSub}`, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(location),
        });
        window.location.reload();
      } catch (err) {
        console.log(err);
      }
    })();
  }

  useEffect(() => {
    (async () => {
      setAccessToken(await getAccessTokenSilently());
    })();
  }, [getAccessTokenSilently]);

  return (
    <form method="post" onSubmit={handleSubmit}>
      <Box>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <TextField
            id="standard-basic"
            label="Location"
            variant="standard"
            onChange={handleInputChange}
          />
          <Button type="submit" variant="contained" size="small">
            Add
          </Button>
        </div>
      </Box>
    </form>
  );
};

export default LocationForm;
