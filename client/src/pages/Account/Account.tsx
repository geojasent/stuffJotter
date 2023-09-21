import { useAuth0 } from "@auth0/auth0-react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";

export default function Account() {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } =
    useAuth0();

  const userSub = user?.sub ? user?.sub.split("|")[1] : "";
  const [subscriptionStatus, setSubscriptionStatus] = useState<boolean>(false);

  //   const getUserInfo = async (userSub: string) => {
  //     const accessToken = await getAccessTokenSilently();
  //     try {
  //       console.log(1);
  //       const data = await fetch(`http://localhost:5000/account/${userSub}`, {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       });
  //       await data.json().then((res) => {
  //         console.log(res);
  //         setSubscriptionStatus(res.subscription);
  //       });
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   if (!isLoading && user?.sub) {
  //     console.log(user);
  //     userSub = user?.sub.split("|")[1];
  //     // getUserInfo(userSub);
  //   }
  // const [userSub, setUserSub] = useState<string | undefined>("");

  //   let userSub: string | undefined;

  //   useEffect(() => {

  //       if (user?.sub) {
  //           userSub = user?.sub.split("|")[1];
  //           getUserInfo(userSub);
  //         }
  //     })

  //   console.log(userSub);
  //   if (!isLoading) {
  //   }

  useEffect(() => {
    if (userSub) {
      const getUserInfo = async () => {
        const accessToken = await getAccessTokenSilently();
        console.log(1);
        try {
          const data = await fetch(`http://localhost:5000/account/${userSub}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          await data.json().then((res) => {
            console.log(res.subscription);
            setSubscriptionStatus(res.subscription);
          });
        } catch (err) {
          console.log(err);
        }
      };

      getUserInfo();
    }
  });

  return (
    <div>
      <h1 style={{ marginLeft: "20px" }}>Account</h1>
      {isAuthenticated && (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            "& > :not(style)": {
              m: 1,
              minWidthidth: 300,
              height: 200,
            },
          }}
        >
          <Paper
            variant="outlined"
            sx={{
              display: "flex",
              flexDirection: "column",
              paddingLeft: "10px",
            }}
          >
            <div style={{ width: "300px", margin: "5px" }}>
              <p style={{ color: "gray" }}>Email: </p>
              <p>{user?.email}</p>
            </div>
            <div style={{ width: "300px", margin: "5px" }}>
              <p style={{ color: "gray" }}> Status</p>
              <p>{subscriptionStatus ? "Subscribed" : "Free Trial"}</p>
            </div>
          </Paper>
          <div></div>
        </Box>
      )}
    </div>
  );
}
