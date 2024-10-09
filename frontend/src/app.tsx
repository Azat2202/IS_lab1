import React from "react";
import { Route, Routes } from "react-router-dom";
import { MainPage } from "./views/MainPage";

export const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={ <MainPage/> }/>
      <Route path="*" element={ <MainPage/> }/>
    </Routes>
  );
};