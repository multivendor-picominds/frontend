"use client";
import React from "react";
import ViewMoreTitle from "../Helpers/ViewMoreTitle";
import SectionStyleTwo from "../Helpers/SectionStyleTwo";

export default function HotDeals({ 
  products, 
  sectionTitle = "HOT DEALS",
  seeMoreUrl = "/products?highlight=top_product",
  className = ""
}) {
  if (!products || products.length === 0) return null;

  return (
    <ViewMoreTitle
      className={`hot-deals-section md:mb-[60px] mb-[30px] ${className}`}
      seeMoreUrl={seeMoreUrl}
      categoryTitle={sectionTitle}
    >
      <SectionStyleTwo products={products} />
    </ViewMoreTitle>
  );
}

