import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import Home from "./components/Home";
import { theme } from "./theme";
import { StoreLayout } from "./layout/StoreLayout";
import { Store, StoreItems } from "./components/StoreItems";
import { StoreItem, storeDetailsLoader } from "./components/StoreItem";
import { NotFound } from "./components/NotFound";
import { useEffect, useState } from "react";
import { About } from "./components/About";
import axios from "axios";
import { RootLayout } from "./layout/RootLayout";

export interface CartItem {
  details: Store;
  quantity: number;
}

const getInitialFilterCategory = () => {
  const items = localStorage.getItem("filterCategory");
  return items
    ? JSON.parse(items)
    : {
        search: "",
        priceSort: { sortActive: false, sortAscend: false },
        starFilter: "AllStar",
        category: "All",
      };
};

const App = () => {
  const [storeData, setStoreData] = useState<Store[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  // Filter
  const [filterCategory, setFilterCategory] = useState(
    getInitialFilterCategory
  );
  // Filter Save In Local Storage
  useEffect(() => {
    localStorage.setItem("filterCategory", JSON.stringify(filterCategory));
  }, [filterCategory]);
  // Handle Filter Reset
  function handleReset() {
    const { search, priceSort, starFilter, category } = filterCategory;
    if (priceSort.sortActive || starFilter || category !== "All" || search) {
      setFilterCategory({
        search: "",
        priceSort: { sortActive: false, sortAscend: false },
        starFilter: "AllStar",
        category: "All",
      });
    }
    location.reload();
  }
  // Handle Filter
  function handleFilterCategory(
    e?: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | null,
    data?: string | null,
    categoryData?: string
  ) {
    const { priceSort, search } = filterCategory;
    // Search Filter
    if (e) {
      setFilterCategory({
        ...filterCategory,
        search: e.target.value.toLowerCase(),
      });
    }
    // Search Filter Clear
    if (search) {
      if (data === "SearchClear") {
        setFilterCategory({
          ...filterCategory,
          search: "",
        });
      }
    }
    // Price Sort Filter
    if (data === "priceButton") {
      if (priceSort.sortAscend) {
        setStoreData(storeData.sort((a, b) => a.price - b.price));
      } else {
        setStoreData(storeData.sort((a, b) => b.price - a.price));
      }
      setFilterCategory({
        ...filterCategory,
        priceSort: { sortActive: true, sortAscend: !priceSort.sortAscend },
      });
    }
    // Star Filter
    if (
      data === "AllStar" ||
      data === "1" ||
      data === "2" ||
      data === "3" ||
      data === "4" ||
      data === "5"
    ) {
      setFilterCategory({ ...filterCategory, starFilter: data });
    }
    // Category Filter
    if (categoryData) {
      setFilterCategory({ ...filterCategory, category: categoryData });
    }
  }
  // Add Cart Item
  function handleAddCartItem(productData: Store, qty: number) {
    const exist = cartItems.find(
      (cartItems) => cartItems.details.id === productData.id
    );
    if (exist) {
      setOpenSB(true);
    } else {
      setCartItems([
        ...cartItems,
        { details: { ...productData }, quantity: qty },
      ]);
    }
  }
  // Remove Cart Item
  function handleRemoveCartItem(productID: string) {
    const newCartItems = cartItems.filter(
      (cartItem) => cartItem.details.id !== productID
    );
    setCartItems(newCartItems);
  }
  // CartQuantity
  function handleCartItemQuantity(item: CartItem, data: string) {
    if (data === "+") {
      if (item.quantity !== 99) {
        setCartItems(
          cartItems.map((cartItem) => {
            if (item.details.id === cartItem.details.id) {
              ++cartItem.quantity;
            }
            return cartItem;
          })
        );
      }
    }
    if (data === "-") {
      if (item.quantity !== 1) {
        setCartItems(
          cartItems.map((cartItem) => {
            if (item.details.id === cartItem.details.id) {
              --cartItem.quantity;
            }
            return cartItem;
          })
        );
      }
    }
  }
  // CartItemQuantityClick
  function handleCartItemQuantityInput(
    item: CartItem,
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    +e.target.value > 99
      ? setCartItems(
          cartItems.map((cartItem) => {
            if (item.details.id === cartItem.details.id) {
              cartItem.quantity = 99;
            }
            return cartItem;
          })
        )
      : +e.target.value <= 0
      ? setCartItems(
          cartItems.map((cartItem) => {
            if (item.details.id === cartItem.details.id) {
              cartItem.quantity = 1;
            }
            return cartItem;
          })
        )
      : setCartItems(
          cartItems.map((cartItem) => {
            if (item.details.id === cartItem.details.id) {
              cartItem.quantity = +e.target.value;
            }
            return cartItem;
          })
        );
  }
  // QuantityClick
  function handleQuantityClick(data: string) {
    if (data === "+") {
      if (quantity !== 99) {
        setQuantity(quantity + 1);
      }
    }
    if (data === "-") {
      if (quantity !== 1) {
        setQuantity(quantity - 1);
      }
    }
  }
  // QuantityInput
  function handleQuantityInput(e: React.ChangeEvent<HTMLInputElement>) {
    +e.target.value > 99
      ? setQuantity(99)
      : +e.target.value <= 0
      ? setQuantity(1)
      : setQuantity(+e.target.value);
  }
  // Snackbar For Cart
  const [openSB, setOpenSB] = useState(false);
  function handleClose(_event: React.SyntheticEvent | Event, reason?: string) {
    if (reason === "clickaway") {
      return;
    }
    setOpenSB(false);
  }
  // Fetch API by Axios
  function getStoreItems() {
    axios.get("https://fakestoreapi.com/products").then((res) => {
      setStoreData(res.data);
      setIsLoading(false);
    });
  }
  useEffect(() => {
    getStoreItems();
  }, []);
  // Router
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path="/shop"
        element={
          <RootLayout
            cartItems={cartItems}
            handleCartItemQuantity={handleCartItemQuantity}
            handleCartItemQuantityInput={handleCartItemQuantityInput}
            handleRemoveCartItem={handleRemoveCartItem}
          />
        }
      >
        <Route
          path="/shop"
          element={<Home handleFilterCategory={handleFilterCategory} />}
        />

        <Route path="store" element={<StoreLayout />}>
          <Route
            index
            element={
              <StoreItems
                storeData={storeData}
                isLoading={isLoading}
                handleReset={handleReset}
                filterCategory={filterCategory}
                handleFilterCategory={handleFilterCategory}
              />
            }
          />
          <Route
            path=":id"
            element={
              <StoreItem
                handleAddCartItem={handleAddCartItem}
                quantity={quantity}
                handleQuantityClick={handleQuantityClick}
                handleQuantityInput={handleQuantityInput}
                openSB={openSB}
                handleClose={handleClose}
              />
            }
            loader={storeDetailsLoader}
          />
        </Route>
        <Route path="about" element={<About />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );

  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
