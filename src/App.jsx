import React from "react";
import { Route, Routes } from "react-router";
import Home from "@pages/Home";
import Forecast from "@pages/Forecast";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/forecast/:prov" element={<Forecast />} />
    </Routes>
  );
};

export default App;
