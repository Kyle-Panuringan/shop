import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { RootLayout } from "./layout/RootLayout.1";
import Home from "./components/Home";
import { StoreLayout } from "./layout/StoreLayout";
import { Store } from "@mui/icons-material";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />

      <Route path="store" element={<StoreLayout />}>
        <Route index element={<Store />} />
      </Route>
    </Route>
  )
);
