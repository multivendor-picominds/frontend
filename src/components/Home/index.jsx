"use client";
import { useEffect, useState } from "react";
import settings from "../../utils/settings";
import SectionStyleFour from "../Helpers/SectionStyleFour";
import SectionStyleOne from "../Helpers/SectionStyleOne";
import SectionStyleThree from "../Helpers/SectionStyleThree";
import ViewMoreTitle from "../Helpers/ViewMoreTitle";
import Ads from "./Ads";
import BestSellers from "./BestSellers";
import BrandSection from "./BrandSection";
import CampaignCountDown from "./CampaignCountDown";
import TwoColumnAds from "./ProductAds/TwoColumnAds";
import OneColumnAdsOne from "./ProductAds/OneColumnAdsOne";
import OneColumnAdsTwo from "./ProductAds/OneColumnAdsTwo";
import HeroSection from "./HeroSection";
import HotDeals from "./HotDeals";
import { checkUrlImage } from "@/utils/image";

export default function Home({ homepageData }) {
  const getsectionTitles = homepageData.section_title;
  const [sectionTitles, setSectionTitles] = useState(null);
  useEffect(() => {
    if (!sectionTitles) {
      let tem =
        getsectionTitles &&
        getsectionTitles.map((item, i) => {
          return {
            [item.key]: item.custom ? item.custom : item.default,
          };
        });
      setSectionTitles(Object.assign.apply(Object, tem));
    }
  }, [sectionTitles]);

  const [homepage] = useState(homepageData);
  const { enable_multivendor } = settings();
  const [isMultivendor, setIsMultivendor] = useState(false);
  useEffect(() => {
    if (!isMultivendor) {
      setIsMultivendor(enable_multivendor && parseInt(enable_multivendor));
    }
  }, [isMultivendor]);
  return (
    <div className="w-full pt-[30px] pb-[60px]">
      {/* Ads Section */}
      <Ads />
      
      {/* Hero Section: Left Categories + Right Product Slider */}
      <HeroSection 
        homepageData={homepageData} 
        className="md:mb-[60px] mb-[30px]" 
      />
      
      {/* Hot Deals Section */}
      <HotDeals
        products={
          homepage?.topRatedProducts?.length > 0
            ? homepage?.topRatedProducts
            : []
        }
        sectionTitle={sectionTitles && sectionTitles.Top_Rated_Products || "HOT DEALS"}
        seeMoreUrl={`/products?highlight=top_product`}
      />

      {/* New Products Grid */}
      <ViewMoreTitle
        className="new-products md:mb-[60px] mb-[30px]"
        seeMoreUrl={`/products?highlight=new_arrival`}
        categoryTitle={sectionTitles && sectionTitles.New_Arrivals || "NEW PRODUCTS"}
      >
        <SectionStyleThree
          products={
            homepage?.newArrivalProducts?.length > 0
              ? homepage?.newArrivalProducts?.slice(
                  0,
                  homepage?.newArrivalProducts?.length > 16
                    ? 16
                    : homepage?.newArrivalProducts?.length
                )
              : []
          }
        />
      </ViewMoreTitle>

      {/* Other Sections Below */}
      <BrandSection
        brands={homepage?.brands?.length > 0 ? homepage.brands : []}
        sectionTitle={sectionTitles && sectionTitles.Shop_by_Brand}
        className="brand-section-wrapper md:mb-[60px] mb-[30px]"
      />
      
      <CampaignCountDown
        className="md:mb-[60px] mb-[30px]"
        flashSaleData={homepage?.flashSale}
        downloadData={homepage?.flashSaleSidebarBanner}
        lastDate={homepage?.flashSale?.end_time}
      />
      {isMultivendor === 1 && (
        <ViewMoreTitle
          className="best-sallers-section md:mb-[60px] mb-[30px]"
          seeMoreUrl="/sellers"
          categoryTitle={sectionTitles && sectionTitles.Best_Seller}
        >
          <BestSellers
            sallers={homepage?.sellers?.length > 0 ? homepage.sellers : []}
          />
        </ViewMoreTitle>
      )}
      <TwoColumnAds
        bannerOne={
          homepage?.twoColumnBannerOne &&
          parseInt(homepage?.twoColumnBannerOne?.status) === 1
            ? homepage?.twoColumnBannerOne
            : null
        }
        bannerTwo={
          homepage?.twoColumnBannerTwo &&
          parseInt(homepage?.twoColumnBannerTwo?.status) === 1
            ? homepage?.twoColumnBannerTwo
            : null
        }
      />
      <SectionStyleOne
        categories={
          homepage?.featuredCategories?.length > 0
            ? homepage?.featuredCategories
            : []
        }
        categoryBackground={checkUrlImage(
          homepage.featuredCategorySidebarBanner
        )}
        categoryTitle={sectionTitles && sectionTitles.Featured_Products}
        products={
          homepage?.featuredCategoryProducts?.length > 0
            ? homepage?.featuredCategoryProducts
            : []
        }
        sectionTitle={sectionTitles && sectionTitles.Featured_Products}
        seeMoreUrl={`/products?highlight=featured_product`}
        className="category-products md:mb-[60px] mb-[30px]"
      />
      <OneColumnAdsOne
        data={
          homepage?.singleBannerOne &&
          parseInt(homepage?.singleBannerOne?.status) === 1
            ? homepage?.singleBannerOne
            : null
        }
      />
      <div className="w-full text-white md:mb-[60px] mb-[30px]">
        <div className="container-x mx-auto">
          <OneColumnAdsTwo
            data={
              homepage?.singleBannerTwo &&
              parseInt(homepage?.singleBannerTwo?.status) === 1
                ? homepage?.singleBannerTwo
                : null
            }
          />
        </div>
      </div>
      <SectionStyleFour
        products={
          homepage?.bestProducts?.length > 0 ? homepage?.bestProducts : []
        }
        sectionTitle={sectionTitles && sectionTitles.Best_Products}
        seeMoreUrl={`/products?highlight=best_product`}
        className="category-products md:mb-[60px] mb-[30px]"
      />
    </div>
  );
}
