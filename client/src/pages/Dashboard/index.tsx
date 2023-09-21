import { useState, useEffect } from "react";
import LocationCard from "./LocationCard";
import LocationForm from "./LocationForm";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { useAuth0 } from "@auth0/auth0-react";

const Dashboard = () => {
  const [showLocationCard, setLocationCard] = useState<boolean>(false);
  const [locationData, setLocationData] = useState<any[]>([]);
  const [showLocationForm, setShowLocationForm] = useState<boolean>(false);

  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    document.title = "Dashboard";
    const getLocationData = async () => {
      const accessToken = await getAccessTokenSilently();
      try {
        const data = await fetch(`http://localhost:5000/${1}`, {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });
        data.json().then((res) => {
          if (res) {
            setLocationCard(true);
            setLocationData(res);
          }
        });
      } catch (err) {
        console.log(err);
      }
    };

    getLocationData();
  }, [getAccessTokenSilently]);

  const toggleLocationForm = () => {
    setShowLocationForm(!showLocationForm);
  };

  return (
    <div>
      <h1 style={{ marginLeft: "20px" }}>Dashboard</h1>
      <div
        id="container"
        style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
      >
        {showLocationCard && <LocationCard data={locationData} />}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          margin: "10px",
          gap: "10px",
        }}
      >
        <Fab
          color="primary"
          aria-label="add"
          id="addLocationButton"
          onClick={toggleLocationForm}
        >
          <AddIcon />
        </Fab>
        {showLocationForm && <LocationForm />}
      </div>
    </div>
  );
};

export default Dashboard;
