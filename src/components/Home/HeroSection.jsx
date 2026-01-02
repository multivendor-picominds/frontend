"use client";
import React from "react";
import Link from "next/link";
import { checkUrlImage } from "@/utils/image";

export default function HeroSection({ homepageData, className = "" }) {
  // Get categories for left sidebar
  const sidebarCategories = homepageData?.homepage_categories?.slice(0, 4) || [];
  
  // Get featured products for slider (first 3 products)
  const featuredProducts = 
    homepageData?.featuredCategoryProducts?.slice(0, 3) || 
    homepageData?.popularCategoryProducts?.slice(0, 3) || 
    homepageData?.newArrivalProducts?.slice(0, 3) || 
    [];

  return (
    <div className={`w-full bg-gray-50 py-8 ${className}`}>
      <div className="container-x mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar - Categories */}
          <div className="w-full lg:w-1/4">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <h2 className="text-xl font-semibold mb-6 text-gray-800 uppercase">
                Product Categories
              </h2>
              <div className="space-y-4">
                {sidebarCategories.length > 0 ? (
                  sidebarCategories.map((category, index) => (
                    <Link
                      key={index}
                      href={{
                        pathname: "/products",
                        query: { category: category.slug },
                      }}
                      className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors group border border-transparent hover:border-orange-200"
                    >
                      <div className="w-20 h-20 flex-shrink-0 relative rounded overflow-hidden bg-gray-100">
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
                        <h3 className="font-semibold text-gray-800 group-hover:text-orange-600 transition-colors text-sm md:text-base truncate">
                          {category.name}
                        </h3>
                        <span className="text-xs md:text-sm text-orange-600 font-medium inline-block mt-1">
                          Get Details →
                        </span>
                      </div>
                    </Link>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">No categories available</p>
                )}
              </div>
            </div>
          </div>

          {/* Right Main Content - Product Slider (3 big cards) */}
          <div className="w-full lg:w-3/4">
            <div className="grid grid-cols-1 gap-6">
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
                      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
                    >
                      <div className="relative h-64 md:h-80 lg:h-96 bg-gray-100">
                        <img
                          src={productImage}
                          alt={productName}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = "/assets/images/spinner.gif";
                          }}
                        />
                        {/* Orange Banner at Bottom */}
                        <div className="absolute bottom-0 left-0 right-0 bg-orange-600 text-white p-4 md:p-6">
                          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                            <div className="flex-1">
                              <h3 className="text-base md:text-lg lg:text-xl font-bold uppercase mb-1 line-clamp-2">
                                {productName}
                              </h3>
                              <p className="text-xs md:text-sm opacity-90 font-medium">
                                30 DAYS MONEY BACK GUARANTEE
                              </p>
                            </div>
                            {productSlug && (
                              <Link
                                href={`/single-product/${productSlug}`}
                                className="bg-white text-orange-600 px-6 py-2 md:py-3 rounded font-semibold hover:bg-gray-100 transition-colors whitespace-nowrap text-sm md:text-base"
                              >
                                Shop Now
                              </Link>
                            )}
                          </div>
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

