const baseUrl = "https://fortigames.danielzotti.it";

export const config = {
  baseUrl,
  title: "Fortigames",
  pageTitle: (title: string) => `${title} | Convention 2023`,
  description: "Fortigames description",
  websiteImage: {
    url: `${baseUrl}/static/images/brand/TODO.png`, // TODO
    width: 1200,
    height: 627,
    alt: "Fortigames | Convention 2023",
  },
  jwtTokenLocalStorageName: "sb-iszvergenpotigthgvtr-auth-token",
  themeColor: "#1976d2", // TODO: choose color
  manifest: "/manifest.json",
  faviconUrl: "/static/icons/favicon.png",
  faviconAppleUrl: "/static/icons/favicon-apple.png", // TODO: create icon
  themes: ["light", "dark", "os default"],
  themeLocalStorageName: "fortigames__theme",
  colors: {
    black: "#0f0f0f", // TODO: choose colors
    gray: "#d0d0d0", // TODO: choose colors
    white: "#ffffff", // TODO: choose colors
    blue: "#2daae1", // TODO: choose colors
  },
  dates: {
    luxon: {
      date: "dd/MM/yyyy",
      time: "HH:mm",
    },
  },
  urls: {
    // TODO: set urls here
    home: "/",
    login: "/login",
    auth: "/auth",
    profile: "/profile",
    admin: "/admin",
    teams: "/teams",
    games: "/games/",
    boardGames: "/board-games",
    info: "/info",
  },
  teams: {
    tigers: {
      label: "Tigers",
    },
    dragons: {
      label: "Dragons",
    },
  },
  games: {
    soccer: {
      db_key: "is_playing_soccer",
      label: "Calcio",
      team: true,
      icon: "fa fa-soccer-ball",
    },
    table_tennis: {
      db_key: "is_playing_pingpong",
      label: "Ping Pong",
      team: true,
      icon: "fa fa-table-tennis-paddle-ball",
    },
    volley: {
      db_key: "is_playing_volley",
      label: "Volley",
      team: true,
      icon: "fa fa-volleyball-ball",
    },
    board_games: {
      db_key: "is_playing_boardgames",
      label: "Boardgames",
      team: false,
      icon: "fa fa-chess-rook",
    },
  },
  // apis: {
  //   baseUrl: `${baseUrl}/api`,
  // },
  imageUrls: {
    icons: "/static/images/icons",
    brand: "/static/images/brand",
  },
  fontUrls: [
    // "https://fonts.googleapis.com/css?family=Exo:100,200,300,400,500,600,700,800,900&display=swap",
    // "https://fonts.googleapis.com/css?family=Roboto+Condensed:300,400,700|Roboto:100,300,400,500,700,900&display=swap",
  ],
};
