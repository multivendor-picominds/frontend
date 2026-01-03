"use client";
import React from "react";
import Link from "next/link";
import { checkUrlImage } from "@/utils/image";

export default function HeroSection({ homepageData, className = "" }) {
  // Get categories for left sidebar
  const sidebarCategories = homepageData?.homepage_categories?.slice(0, 3) || [];
  
  // Get featured products for slider (first 3 products) - try all available product sources
  const getAllProducts = () => {
    // Collect all available products from different sources
    const allProducts = [
      ...(homepageData?.featuredCategoryProducts || []),
      ...(homepageData?.popularCategoryProducts || []),
      ...(homepageData?.newArrivalProducts || []),
      ...(homepageData?.topRatedProducts || []),
      ...(homepageData?.bestProducts || []),
    ];
    
    // Remove duplicates based on product id
    const uniqueProducts = allProducts.filter((product, index, self) =>
      index === self.findIndex((p) => p.id === product.id)
    );
    
    // Return first 3 unique products
    return uniqueProducts.slice(0, 3);
  };
  
  const featuredProducts = getAllProducts();

  return (
    <div className={`w-full bg-gray-50 py-8 ${className}`}>
      <div className="container-x mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-6 items-stretch">
          {/* Left Sidebar - Categories */}
          <div className="w-full lg:w-[30%] flex flex-col">
            <h2 className="text-xl font-semibold mb-0 text-gray-800 uppercase">
              Product Categories
            </h2>
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8 w-full flex-1">
              <div className="space-y-4">
                {sidebarCategories.length > 0 ? (
                  sidebarCategories.map((category, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-4 rounded-lg hover:bg-gray-50 transition-colors group border border-transparent hover:border-orange-200"
                    >
                      <div className="w-32 h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 flex-shrink-0 relative rounded overflow-hidden bg-gray-100">
                        <img
                          src={checkUrlImage(category.image)}
                          alt={category.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          onError={(e) => {
                            e.target.src = "/assets/images/spinner.gif";
                          }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-800 group-hover:text-orange-600 transition-colors text-sm md:text-base leading-tight whitespace-normal">
                          {category.name}
                        </h3>
                        <Link
                          href={{
                            pathname: "/products",
                            query: { category: category.slug },
                          }}
                          className="mt-14 inline-block  text-orange-600 px-4 py-2 rounded font-semibold hover:bg-orange-700 transition-colors text-xs md:text-sm whitespace-nowrap"
                        >
                          Shop Now
                        </Link>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">No categories available</p>
                )}
              </div>
            </div>
          </div>

          {/* Right Main Content - Product Slider (3 big cards) */}
          <div className="w-full lg:w-[70%] flex">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch w-full h-full">
              {featuredProducts.length > 0 ? (
                featuredProducts.map((product, index) => {
                  const productImage = checkUrlImage(
                    product.thumbnail_image || product.image || product.thumb_image
                  );
                  const productName = product.name || product.title || "Product";
                  const productSlug = product.slug || "";

                  return (
                    <div
                      key={index}
                      className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col hover:shadow-xl transition-shadow duration-300"
                    >
                      {/* Image */}
                      <div className="relative flex-1 bg-gray-100 flex-shrink-0 min-h-0">
                        <img
                          src={productImage}
                          alt={productName}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = "/assets/images/spinner.gif";
                          }}
                        />
                      </div>
                      
                      {/* Orange Banner at Bottom */}
                      <div className="bg-orange-600 text-white p-5 flex-shrink-0 h-[140px] flex items-center">
                        <div className="w-full h-full flex flex-col justify-center">
                          <h3 className="text-base md:text-lg lg:text-xl font-bold uppercase mb-2 leading-tight line-clamp-2">
                            {productName}
                          </h3>
                          <p className="text-xs md:text-sm opacity-90 font-medium">
                            30 DAYS MONEY BACK GUARANTEE
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="bg-white rounded-lg shadow-md p-12 text-center">
                  <p className="text-gray-500 text-lg">No products available</p>
                  <p className="text-gray-400 text-sm mt-2">
                    Products will appear here once available
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

