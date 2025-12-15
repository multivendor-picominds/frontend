import appConfig from "@/appConfig";

export const checkUrlImage = (url) => {
  if (url.includes("https://") || url.includes("http://")) {
    return url;
  } else {
    return appConfig.BASE_URL + url;
  }
};
