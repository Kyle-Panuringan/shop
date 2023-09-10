import { useLoaderData } from "react-router-dom";
import { Store } from "./StoreItems";

export const StoreDetails = () => {
  const storeDetails = useLoaderData() as Store;

  return <div>{storeDetails.title}</div>;
};

export const storeDetailsLoader = async ({ params }: any) => {
  const { id } = params;
  const res = await fetch("https://fakestoreapi.com/products/" + id);
  return res.json();
};
