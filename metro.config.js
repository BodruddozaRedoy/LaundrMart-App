const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// Ensure Metro bundles Epson SDK text blobs (treated as assets)
config.resolver.assetExts = [...config.resolver.assetExts, "txt"];

module.exports = withNativeWind(config, { input: "./global.css" });