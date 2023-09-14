import React from "react";
import { useFilterContext } from "../context/FilterContextProvider";
import GridView from "./GridView";
import ListView from "./ListView";

function ProductList() {
  const { filter_products, display_view } = useFilterContext();

  if (display_view === true) return <GridView products={filter_products} />;

  if (display_view === false) {
    return <ListView products={filter_products} />;
  }
}

export default ProductList;
