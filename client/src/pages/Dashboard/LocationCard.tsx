import { useEffect, useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import "./LocationCard.css";
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
import { useAuth0 } from "@auth0/auth0-react";

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
  const [imagesForLocation, setImagesForLocation] = useState<any>({});
  const { getAccessTokenSilently } = useAuth0();

  const navigate = useNavigate();

  let urlLocationParam;
  const handleClick = (location: string) => {
    urlLocationParam = location.toLowerCase();
    navigate(`/dashboard/edit/${urlLocationParam}`);
  };

  useEffect(() => {
    let locationToFileName: any = {};

    const getImages = async () => {
      const accessToken = await getAccessTokenSilently();

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
    };
    getImages();
  }, [getAccessTokenSilently, locationData]);

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
          <Card className="card" key={location}>
            <Box className="box">
              <CardContent
                className="card-content"
                component={RouterLink}
                to={`/dashboard/edit/${key}`}
              >
                <Typography component="div" variant="h6">
                  {location}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  {locationData[key].count} items
                </Typography>
              </CardContent>
              <Box className="stack-container">
                <Stack direction="row" className="action-container">
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
              sx={{ width: 200, objectFit: "contain" }}
              image={imagesForLocation[key] || add_a_photo}
              component={RouterLink}
              to={`/dashboard/edit/${key}`}
            />
          </Card>
        );
      })}
    </>
  );
};

export default LocationCard;
