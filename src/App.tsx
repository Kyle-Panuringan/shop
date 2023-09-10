import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { RootLayout } from "./layout/RootLayout";
import { ThemeProvider } from "@mui/material";
import { Home } from "./components/Home";
import { theme } from "./theme";
import { StoreLayout } from "./layout/StoreLayout";
import { StoreItems, storeLoader } from "./components/StoreItems";
import { StoreDetails, storeDetailsLoader } from "./components/StoreItem";
import { NotFound } from "./components/NotFound";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />

      <Route path="store" element={<StoreLayout />}>
        <Route index element={<StoreItems />} loader={storeLoader} />
        <Route
          path=":id"
          element={<StoreDetails />}
          loader={storeDetailsLoader}
        />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
