import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard/index";
import LocationCardEdit from "./pages/Dashboard/LocationCardEdit";
import NoPage from "./pages/NoPage";

export default function App() {
  return (
    <BrowserRouter>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
      <Routes>
        <Route path="/" element />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
          path="/dashboard/edit/:location"
          element={<LocationCardEdit />}
        />
        <Route path="/*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}
