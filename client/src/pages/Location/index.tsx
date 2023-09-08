import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import "./index.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import add_a_photo from "../../images/add_a_photo.svg";

export default function LocationPage() {
  const [locationInfo, setLocationInfo] = useState<any>();
  const { getAccessTokenSilently } = useAuth0();
  const imagePath = "";

  if (locationInfo) {
    console.log(locationInfo);
  }

  useEffect(() => {
    document.title = "Locations";
    const getLocations = async () => {
      const accessToken = await getAccessTokenSilently();
      try {
        const data = await fetch(`http://localhost:5000/${1}`, {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });
        data.json().then((res) => setLocationInfo(res));
      } catch (err) {
        console.log(err);
      }
    };
    getLocations();
  }, [getAccessTokenSilently]);
  return (
    <>
      <div>
        <h1>Locations</h1>
        <div id="card-container">
          {locationInfo &&
            Object.keys(locationInfo).map((key: string) => {
              const words = key.split(" ");
              for (let i = 0; i < words.length; i++) {
                words[i] =
                  words[i][0].toUpperCase() + words[i].slice(1).toLowerCase();
              }
              const location = words.join(" ");
              return (
                <Card
                  key={key}
                  sx={{
                    minWidth: 300,
                  }}
                >
                  <CardActionArea
                    component={RouterLink}
                    to={`/dashboard/edit/${key}`}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={imagePath || add_a_photo}
                      alt={`${key} image`}
                      sx={{ objectFit: "contain" }}
                    />
                    <CardContent className="location-card">
                      <Typography variant="h6" component="div">
                        {location}
                      </Typography>
                      <Typography variant="body1" color="text.primary">
                        {locationInfo[key]} items
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions className="card-action-container">
                    <Button size="small" color="primary">
                      Edit Photo
                    </Button>
                    <Button size="small" color="primary">
                      Rename
                    </Button>
                    <Button size="small" sx={{ color: "red" }}>
                      Delete
                    </Button>
                  </CardActions>
                </Card>
              );
            })}
        </div>
      </div>
    </>
  );
}
