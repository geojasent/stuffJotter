import { useState, useEffect } from "react";
import LocationCard from "./LocationCard";
import LocationForm from "./LocationForm";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

const Dashboard = () => {
  const [showLocationCard, setLocationCard] = useState<boolean>(false);
  const [locationData, setLocationData] = useState<any[]>([]);
  const [showLocationForm, setShowLocationForm] = useState<boolean>(false);

  useEffect(() => {
    document.title = "StuffJotter Dashboard";
    const getLocationData = async () => {
      try {
        const data = await fetch(`http://localhost:5000/${1}`);
        data.json().then((res) => {
          if (res) {
            //TODO:fetch locations for user and save local copy of fetched data
            setLocationCard(true);
            setLocationData(res);
          }
        });
      } catch (err) {
        console.log(err);
      }
    };

    getLocationData();
  }, []);

  const toggleLocationForm = () => {
    setShowLocationForm(!showLocationForm);
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <div>
        <div id="container">
          {showLocationCard && <LocationCard data={locationData} />}
        </div>
        <div>
          <Fab
            color="primary"
            aria-label="add"
            id="addLocationButton"
            onClick={toggleLocationForm}
          >
            <AddIcon />
          </Fab>
        </div>
        <div>{showLocationForm && <LocationForm />}</div>
      </div>
    </div>
  );
};

export default Dashboard;
