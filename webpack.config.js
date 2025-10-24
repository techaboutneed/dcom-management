const path = require("path");

/** @type {import('webpack').Configuration} */

module.exports = {
  mode: "production",
  entry: { app: "./src/index.ts" },
  output: {
    path: path.resolve(__dirname, "build"),
    clean: true,
    publicPath: "auto",
    filename: "main.js",
    chunkFilename: "chunks/[name].[contenthash].js",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        options: {
          transpileOnly: true,
        },
        exclude: /node_modules/,
      },
      {
        test: /\.json$/i,
        type: "json",
        parser: { parse: JSON.parse },
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
    runtimeChunk: false,
  },
};
