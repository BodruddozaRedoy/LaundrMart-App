export default {
  expo: {
    name: "LaundrMart",
    slug: "LaundrMart",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "laundrmart",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,

    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.bodruddozaredoy.LaundrMart",
      config: {
        googleMapsApiKey: "AIzaSyB4twiza6Il9zmHzow14ifPkLmTNxUUbVw",
      },
      infoPlist: {
        NSLocationWhenInUseUsageDescription:
          "LaundrMart needs access to your location to show nearby pickup addresses and help you find laundry services.",
        NSLocationAlwaysAndWhenInUseUsageDescription:
          "LaundrMart needs access to your location to provide location-based services.",
        NSBonjourServices: ["_http._tcp."],
        NSAppTransportSecurity: {
          NSAllowsArbitraryLoads: true,
        },
      },
    },

    android: {
      softwareKeyboardLayoutMode: "resize",
      adaptiveIcon: {
        backgroundColor: "#ffffff",
        foregroundImage: "./assets/images/app-icon.png",
        backgroundImage: "./assets/images/app-icon.png",
        monochromeImage: "./assets/images/app-icon.png",
      },
      edgeToEdgeEnabled: true,
      predictiveBackGestureEnabled: false,
      package: "com.bodruddozaredoy.LaundrMart",
      config: {
        googleMaps: {
          apiKey: "AIzaSyB4twiza6Il9zmHzow14ifPkLmTNxUUbVw",
        },
      },
    },

    web: {
      output: "static",
      favicon: "./assets/images/icon.png",
      bundler: "metro",
    },

    plugins: [
      "expo-router",
      "./plugins/cleartext",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff",
          dark: {
            backgroundColor: "#000000",
          },
        },
      ],
      [
        "expo-location",
        {
          locationAlwaysAndWhenInUsePermission:
            "Allow LaundrMart to use your location to find nearby laundry services.",
          locationAlwaysPermission:
            "Allow LaundrMart to use your location.",
          locationWhenInUsePermission:
            "Allow LaundrMart to use your location to show nearby pickup addresses.",
        },
      ],
    ],

    experiments: {
      typedRoutes: true,
      reactCompiler: true,
    },
  },
};
