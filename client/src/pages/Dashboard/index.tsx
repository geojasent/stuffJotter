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

  const { user, getAccessTokenSilently } = useAuth0();
  const userSub = user?.sub ? user?.sub.split("|")[1] : "";

  useEffect(() => {
    document.title = "Dashboard";

    const createUser = async () => {
      const accessToken = await getAccessTokenSilently();
      try {
        await fetch(`http://localhost:5000/account/${userSub}`, {
          method: "post",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(user),
        });
      } catch (err) {
        console.log(err);
      }
    };

    const getLocationData = async () => {
      const accessToken = await getAccessTokenSilently();
      if (userSub) {
        try {
          const getUserAccount = await fetch(
            `http://localhost:5000/account/${userSub}`,
            {
              headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          getUserAccount.json().then((userAccount) => {
            if (!userAccount) {
              createUser();
            }
          });
          const data = await fetch(`http://localhost:5000/${userSub}`, {
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
      }
    };

    getLocationData();
  }, [getAccessTokenSilently, userSub, user]);

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
