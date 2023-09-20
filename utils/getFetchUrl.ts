export const getFetchUrl = (route: string) =>
  `${
    process.env.NODE_ENV === "production"
      ? process.env.VERCEL_URL!
      : "http://127.0.0.1:3000"
  }/${route}`;