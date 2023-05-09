import React from "react";
import { Route, Routes } from "react-router-dom";

import "leaflet/dist/leaflet.css";


import Layout from "./components/Layout";
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Contact from "./pages/Contact";
import ChartAndMaps from "./pages/ChartAndMaps";


const routes = [
  { path: "/", component: <Contact /> , title: "Contact Page" },
  { path: "/charts-and-maps", component: <ChartAndMaps /> , title: "Chart And Map Page" },
];

function App() {
  return (
    <React.Fragment>
      <ToastContainer />
      <Routes>
        {routes.map((route, idx) => (
          <Route
            key={idx}
            path={route.path}
            element={
              <Layout title={route.title}>
                {route.component }
             </Layout>
            }
          />
        ))}
      </Routes>
    </React.Fragment>
  );
}

export default App;
