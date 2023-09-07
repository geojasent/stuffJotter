import { BrowserRouter, Routes, Route } from "react-router-dom";
import ResponsiveAppBar from "./components/Navbar";
import LandingPage from "./pages/LandingPage/LandingPage";
import Dashboard from "./pages/Dashboard/index";
import LocationCardEdit from "./pages/Dashboard/LocationCardEdit";
import LocationPage from "./pages/Location";
import Login from "./pages/Login/Login";
import NoPage from "./pages/NoPage";
import { Auth0ProviderWithNavigate } from "./auth0-provider-with-navigate";
import "./App.css";

export default function App() {
  document.title = "StuffJotter";

  return (
    <BrowserRouter>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
      <Auth0ProviderWithNavigate>
        <ResponsiveAppBar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/dashboard/edit/:location"
            element={<LocationCardEdit />}
          />
          <Route path="/locations" element={<LocationPage />} />
          <Route path="/*" element={<NoPage />} />
        </Routes>
      </Auth0ProviderWithNavigate>
    </BrowserRouter>
  );
}
