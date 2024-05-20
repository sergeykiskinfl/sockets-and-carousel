import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Layout from "./Components/Layout";
import HomePage from "./Components/pages/HomePage";
import Dashboard from "./Components/pages/Dashboard";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route path="/" element={<HomePage />} />
      <Route path="dashboard" element={<Dashboard />} />
    </Route>
  )
);
