import { useState, useEffect } from "react";
import LocationCard from "./LocationCard";
import LocationForm from "./LocationForm";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

const Dashboard = () => {
  const [showLocationCard, setLocationCard] = useState<boolean>(false);
  const [locationData, setLocationData] = useState<any[]>([]);
  const [showLocationForm, setShowLocationForm] = useState<boolean>(false);

  function addLocationProp(locs: any[]) {
    let arr = [];
    for (let i = 0; i < locs.length; i++) {
      arr.push(locs[i].place);
    }
    setLocationData(arr);
  }
  useEffect(() => {
    const getLocations = async () => {
      try {
        const data = await fetch("http://localhost:5000/");
        data.json().then((res) => {
          if (res[0]) {
            //TODO:fetch locations for user and save local copy of fetched data
            setLocationCard(true);
            addLocationProp(res);
          }
        });
      } catch (err) {
        console.log(err);
      }
    };
    getLocations();
  }, []);

  const toggleLocationForm = () => {
    setShowLocationForm(!showLocationForm);
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <div>
        <div id="container">
          {showLocationCard && <LocationCard areas={locationData} />}
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
