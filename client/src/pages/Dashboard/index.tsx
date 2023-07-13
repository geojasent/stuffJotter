import { useState, useEffect } from "react";
import LocationCard from "./LocationCard";
import LocationForm from "./LocationForm";

const Dashboard = () => {
  const [locationCard, setLocationCard] = useState<Boolean>(false);
  const [locationData, setLocationData] = useState([]);
  const [locationForm, setShowLocationForm] = useState<Boolean>(false);

  useEffect(() => {
    const getLocations = async () => {
      try {
        const data = await fetch("http://localhost:5000/");
        data.json().then((res) => {
          console.log(res[0]);
          if (res[0]) {
            setLocationCard(true);
            setLocationData(res[0]);
          }
        });
      } catch (err) {
        console.log(err);
      }
    };
    getLocations();
  }, []);

  const showLocationForm = () => {
    setShowLocationForm(!locationForm);
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <div>
        <div id="cardDiv">
          Location component
          {locationCard && <LocationCard areas={locationData} />}
        </div>
        <button id="addLocationButton" onClick={showLocationForm}>
          Add Location
        </button>
        <div>{locationForm && <LocationForm />}</div>
      </div>
    </div>
  );
};

export default Dashboard;
