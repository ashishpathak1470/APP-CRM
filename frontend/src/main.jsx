import React from "react";
import ReactDOM from "react-dom/client";
import Layout from "./Layout.jsx";
import Home from "./components/Home.jsx";
import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import AudienceForm from "./components/AudienceForm.jsx";
import Campaigns from "./components/Campaigns.jsx";
import { Auth0Provider } from "@auth0/auth0-react";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Home />} />
      <Route path="audience" element={<AudienceForm />} />
      <Route path="campaigns" element={<Campaigns />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-n6d6jp0fgijakf5v.us.auth0.com"
      clientId="ESQk6f5IqQRiAtqUvXSMFrD51xidSKrm"
      cacheLocation="localstorage"
      authorizationParams={{
        redirect_uri: "https://app-crm-beta.vercel.app/audience?code=uX52rcLLPjNaYrLNgVSbFmrn8E6mj3hSTeJmHRWKzrBwc&state=Q2sxRGZkb2FrcGoxaHd5aC1LMHRXdDFEZFROWkkxa2dYTkdtVUlOeUtJRA%3D%3D",
      }}
    >
      <RouterProvider router={router} />
    </Auth0Provider>
  </React.StrictMode>
);
