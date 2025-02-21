const config = {
  URL: {
    WEB: process.env.NEXT_PUBLIC_WEB_URL,
    BLOG: "https://medium.com/@unifaires",
    TWITTER: "https://twitter.com/unifaires/",
    LINKEDIN: "https://www.linkedin.com/company/unifaires/",
    FACEBOOK: "https://web.facebook.com/unifaires/",
  },
  SEO: {
    image: "/logo.png",
    title: "Unifaires",
    description:
      "A broad selection of solutions, Educational and Career Resources all for you at your fingertips.",
  },
  API: {
    FRONT_END_URL: process.env.NEXT_PUBLIC_FRONT_END_URL,
    API_URL: process.env.NEXT_PUBLIC_API_URL,
    API_URL2: process.env.NEXT_PUBLIC_API_URL2,
    API_DOCUMENTATION: process.env.NEXT_PUBLIC_API_DOCUMENTATION,
    JWT_KEY: process.env.NEXT_PUBLIC_JWT_KEY,
    HOME_URL: process.env.NEXT_PUBLIC_HOME_URL,
    GUIDE_VIDEO_LINK: process.env.NEXT_PUBLIC_GUIDE_VIDEO_LINK,
  },
  ROLE_LIST: {
    manager: "manager",
    contributor: "contributor",
  },
};

export default config;
