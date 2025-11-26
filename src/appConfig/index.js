const appConfig = {
  BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  PWA_STATUS: process.env.NEXT_PWA_STATUS || "enabled",
  APPLICATION_URL: process.env.NEXT_APPLICATION_URL || "",
};

export default appConfig;
