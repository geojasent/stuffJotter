import { useState, useEffect } from "react";
import LocationCard from "./LocationCard";
import LocationForm from "./LocationForm";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

const Dashboard = () => {
  const [showLocationCard, setLocationCard] = useState<boolean>(false);
  const [locationData, setLocationData] = useState<any[]>([]);
  const [showLocationForm, setShowLocationForm] = useState<boolean>(false);

  // function addLocationProp(data: any) {
  //   let arr = [];
  //   for (let key in data) {
  //     console.log(data[key]);
  //     console.log(key);
  //     arr.push([key, data[key]]);
  //   }
  //   setLocationData(arr);
  //   console.log(arr);
  // }
  useEffect(() => {
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
    // const getUserItems = async () => {
    //   try {
    //     const data = await fetch(`http://localhost:5000/${1}`);
    //     data.json().then((res) => {
    //       // if (res[0]) {
    //       //   //TODO:fetch locations for user and save local copy of fetched data
    //       //   setLocationCard(true);
    //       //   addLocationProp(res);
    //       // }
    //       console.log(res);
    //     });
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };
    getLocationData();
    // getUserItems();
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
