import { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { Padding } from "@mui/icons-material";

const LocationCard = (prop: any) => {
  const [locationData] = useState(prop);
  return locationData.areas.map((data: string) => {
    return (
      <Card sx={{ display: "flex" }}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto", paddingBottom: "0px" }}>
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
              <IconButton aria-label="add" size="small">
                <AddIcon />
              </IconButton>
              <IconButton aria-label="edit" size="small">
                <EditIcon />
              </IconButton>
            </Stack>
          </Box>
        </Box>
        <CardMedia
          component="img"
          sx={{ width: 151 }}
          image="/user/images/location/location.jpg"
          alt="location image"
        />
      </Card>
    );
  });
};

export default LocationCard;
