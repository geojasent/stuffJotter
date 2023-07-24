import { useState } from "react";
import LocationCardDialog from "./LocationCardDialog";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import add_a_photo from "../../images/add_a_photo.svg";

const LocationCard = (prop: any) => {
  const [locationData] = useState(prop);
  const imagePath: string = "";
  return locationData.areas.map((data: string) => {
    const words = data.split(" ");
    for (let i = 0; i < words.length; i++) {
      words[i] = words[i][0].toUpperCase() + words[i].slice(1).toLowerCase();
    }
    data = words.join(" ");

    return (
      <Card sx={{ display: "flex" }} key={data}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent
            sx={{ flex: "1 0 auto", width: "150px", paddingBottom: "0px" }}
          >
            <Typography component="div" variant="h5">
              123
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              {data}
            </Typography>
          </CardContent>
          <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
            <Stack direction="row" spacing={2}>
              <LocationCardDialog key={data} area={data} />
              <IconButton aria-label="edit" size="small">
                <EditIcon />
              </IconButton>
            </Stack>
          </Box>
        </Box>
        <CardMedia
          component="img"
          sx={{ width: 111 }}
          image={imagePath || add_a_photo}
        />
      </Card>
    );
  });
};

export default LocationCard;
