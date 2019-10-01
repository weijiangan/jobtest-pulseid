const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const dotenv = require("dotenv");

const env = dotenv.config().parsed;
const envKeys = env
  ? Object.keys(env).reduce((prev, next) => {
      prev[`process.env.${next}`] = JSON.stringify(env[next]);
      return prev;
    }, {})
  : {};

module.exports = {
  mode: "production",
  devtool: "source-map",
  entry: "./src/index.js",
  resolve: {
    extensions: [".mjs", ".js", ".jsx"]
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "..", "dist"),
    publicPath: "/"
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            exclude: /node_modules|packages/,
            test: /\.jsx?$/,
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
              babelrc: false,
              plugins: [
                "react-remove-properties",
                "@babel/plugin-syntax-dynamic-import",
                ["@babel/plugin-proposal-class-properties", { loose: false }]
              ],
              presets: [
                [
                  "@babel/preset-env",
                  {
                    targets: {
                      browsers: [
                        "last 2 Chrome versions",
                        "not Chrome < 60",
                        "last 2 Firefox versions",
                        "last 2 Safari versions",
                        "not Safari < 10.1"
                      ]
                    },
                    modules: false
                  }
                ],
                "@babel/preset-react"
              ]
            }
          },
          {
            test: /\.css$/,
            include: [path.resolve(__dirname, "..", "src")],
            use: [
              { loader: MiniCssExtractPlugin.loader },
              {
                loader: "css-loader",
                options: { modules: true, importLoaders: 1 }
              },
              {
                loader: "postcss-loader",
                options: {
                  ident: "postcss",
                  plugins: [require("autoprefixer")]
                }
              }
            ]
          },
          {
            test: /\.css$/,
            exclude: [path.resolve(__dirname, "..", "src")],
            use: [MiniCssExtractPlugin.loader, "css-loader"]
          },
          {
            loader: "file-loader",
            // Exclude `js` files to keep "css" loader working as it injects
            // it's runtime that would otherwise processed through "file" loader.
            // Also exclude `html` and `json` extensions so they get processed
            // by webpacks internal loaders.
            exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/],
            options: {
              name: "static/media/[name].[hash:8].[ext]"
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production"),
      "process.env.BABEL_ENV": JSON.stringify("production"),
      ...envKeys
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // all options are optional
      filename: "[name].[hash].css",
      chunkFilename: "[id].css",
      ignoreOrder: false // Enable to remove warnings about conflicting order
    }),
    new HtmlWebpackPlugin({
      template: "src/index.html"
    })
  ]
};
