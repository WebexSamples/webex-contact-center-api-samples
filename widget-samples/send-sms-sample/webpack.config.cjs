const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const config = {
  mode: "production",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "src/build"),
    filename: "digital-sms-bundle.js",
    publicPath: "build/"
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          "raw-loader",
          {
            loader: "sass-loader",
            options: {
              sassOptions: {
                includePaths: [path.resolve(__dirname, "node_modules")]
              }
            }
          }
        ]
      }
    ]
  }
};

module.exports = config;
