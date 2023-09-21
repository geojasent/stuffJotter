import "./LandingPage.css";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";
import demoDashboard from "../../images/demoDashboard.png";

export default function LandingPage() {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  const handleSignUp = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/dashboard",
      },
      authorizationParams: {
        screen_hint: "signup",
      },
    }).then((res) => {
      console.log(res);
    });
  };

  return (
    <div id="landing-page-container">
      <div id="landing-page-content">
        <h1 className="slogan">Your stuff is here</h1>
        <h4>
          Keeping track of your stuff is easy. <br />
          Jot it down with us!
        </h4>
        <div>
          <form>
            Don't have an account?
            {!isAuthenticated && (
              <Button sx={{ color: "#FBBF3D" }} onClick={handleSignUp}>
                Sign up for a free trial!
              </Button>
            )}
          </form>
        </div>
      </div>
      <img
        id="landing-image"
        src={demoDashboard}
        alt="landing page"
        style={{
          minWidth: "300px",
        }}
        width={500}
      />
    </div>
  );
}
