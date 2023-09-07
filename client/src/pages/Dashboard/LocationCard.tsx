import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

interface formData {
  place: string;
  item: string;
  itemQuantity: string;
  purchasePrice: string;
  totalAmount: string;
  datePurchased: any;
  itemDescription: string;
  itemFilename: string;
  itemFilePath: string;
  formInvalid: boolean;
  formType: string;
}

const initialFormData: formData = {
  place: "",
  item: "",
  itemQuantity: "",
  purchasePrice: "",
  totalAmount: "",
  datePurchased: new Date(),
  itemDescription: "",
  itemFilename: "",
  itemFilePath: "",
  formInvalid: false,
  formType: "create",
};

const LocationCard = (prop: any) => {
  const [locationData] = useState<any>(prop.data);
  const [inputPlaceholder] = useState<any>(initialFormData);
  const imagePath: string = "";
  let urlLocationParam;

  const navigate = useNavigate();

  const handleClick = (location: string) => {
    urlLocationParam = location.toLowerCase();
    navigate(`/dashboard/edit/${urlLocationParam}`);
  };

  return (
    <>
      {Object.keys(locationData).map((key: string) => {
        const words = key.split(" ");
        for (let i = 0; i < words.length; i++) {
          words[i] =
            words[i][0].toUpperCase() + words[i].slice(1).toLowerCase();
        }
        const location = words.join(" ");
        return (
          <Card sx={{ display: "flex" }} key={location}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <CardContent
                sx={{ flex: "1 0 auto", width: "150px", paddingBottom: "0px" }}
              >
                <Typography component="div" variant="h6">
                  {location}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  {locationData[key]} items
                </Typography>
              </CardContent>
              <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
                <Stack direction="row" spacing={2}>
                  <LocationCardDialog
                    key={location}
                    area={location}
                    edit={false}
                    {...inputPlaceholder}
                  />
                  <IconButton
                    aria-label="edit"
                    size="small"
                    onClick={() => {
                      handleClick(location);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                </Stack>
              </Box>
            </Box>
            <CardMedia
              component="img"
              sx={{ width: 111, objectFit: "contain" }}
              image={imagePath || add_a_photo}
            />
          </Card>
        );
      })}
    </>
  );
};

export default LocationCard;
