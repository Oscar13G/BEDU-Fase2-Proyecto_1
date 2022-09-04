const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  entry: {
    index: "./src/js/index.js",
    aboutUs: "./src/js/aboutUs.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "indexBundle.js",
    filename: "[name]Bundle.js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      scriptLoading: "defer",
      template: "./src/index.html",
      chunks: ["index"],
    }),
    new HtmlWebpackPlugin({
      filename: "aboutUs.html",
      scriptLoading: "defer",
      template: "./src/aboutUs.html",
      chunks: ["aboutUs"],
    }),
  ],
  devServer: {
    static: path.resolve(__dirname, "dist"),
    compress: true,
    port: 9000,
  },
};
