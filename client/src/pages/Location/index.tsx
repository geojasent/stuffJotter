import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link as RouterLink } from "react-router-dom";
import CardActionsDialog from "./CardActionsDialog";
import "./index.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import add_a_photo from "../../images/add_a_photo.svg";

export default function LocationPage() {
  const [locationInfo, setLocationInfo] = useState<any>();
  const [open, setOpen] = useState<boolean>(false);
  const [location, setLocation] = useState<string>("null");
  const [action, setAction] = useState<string>("null");
  const [imagesForLocation, setImagesForLocation] = useState<any>({});
  const { user, getAccessTokenSilently } = useAuth0();

  const userSub = user?.sub ? user?.sub.split("|")[1] : "";

  const handlePhotoOpen = (e: any) => {
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    document.title = "Locations";
    let locationToFileName: any = {};
    const getLocations = async () => {
      const accessToken = await getAccessTokenSilently();
      if (userSub) {
        try {
          const data = await fetch(`http://localhost:5000/${userSub}`, {
            headers: {
              "content-type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          });

          const locationData = await data.json();
          setLocationInfo(locationData);

          let imageRequests = Object.keys(locationData).map(
            async (location: any) => {
              const filename = locationData[location].file;
              if (filename) {
                const fetchImage = await fetch(
                  `http://localhost:5000/images/${filename}`,
                  {
                    headers: {
                      "content-type": "application/json",
                      Authorization: `Bearer ${accessToken}`,
                    },
                  }
                );
                return fetchImage.blob().then((res) => {
                  const imageObjectURL = URL.createObjectURL(res);
                  locationToFileName[location] = imageObjectURL;
                });
              }
            }
          );
          Promise.all(imageRequests).then(() => {
            setImagesForLocation(locationToFileName);
          });
        } catch (err) {
          console.log(err);
        }
      }
    };
    getLocations();
  }, [getAccessTokenSilently, userSub]);

  return (
    <>
      <div>
        <h1 style={{ marginLeft: "20px" }}>Locations</h1>
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
                    minWidth: 325,
                  }}
                >
                  <CardActionArea
                    component={RouterLink}
                    to={`/dashboard/edit/${key}`}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={imagesForLocation[key] || add_a_photo}
                      alt={`${key} image`}
                      sx={{ objectFit: "contain" }}
                    />
                    <CardContent className="location-card">
                      <Typography variant="h6" component="div">
                        {location}
                      </Typography>
                      <Typography variant="body1" color="text.primary">
                        {locationInfo[key].count} items
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions className="card-action-container">
                    <Button
                      size="small"
                      component="span"
                      color="primary"
                      id={key}
                      onClick={(e) => {
                        handlePhotoOpen(e.target);
                        setLocation(key);
                        setAction("photo");
                      }}
                    >
                      Change Image
                    </Button>
                    <Button
                      size="small"
                      color="primary"
                      onClick={(e) => {
                        setLocation(key);
                        setOpen(true);
                        setAction("rename");
                      }}
                    >
                      Rename
                    </Button>
                    <Button
                      size="small"
                      sx={{ color: "red" }}
                      onClick={(e) => {
                        setLocation(key);
                        setOpen(true);
                        setAction("remove");
                      }}
                    >
                      Remove
                    </Button>
                  </CardActions>
                </Card>
              );
            })}
        </div>
        {open && (
          <CardActionsDialog
            open={open}
            location={location}
            action={action}
            handleDialogClose={handleDialogClose}
            locationInfo={locationInfo}
          />
        )}
      </div>
    </>
  );
}
