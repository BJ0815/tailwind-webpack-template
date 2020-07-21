const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");

const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  context: path.resolve(__dirname, "./src"),
  entry: {
    // multiple entry points
    index: "./js/index.js",
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "./js/[name].js?[hash:8]"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        // Extract any SCSS content and minimize
        test: /\.(sass|scss)$/,
        use: [                       
            MiniCssExtractPlugin.loader,
            'css-loader',                   
            'postcss-loader',
            'sass-loader'                    
        ]
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: "css-loader", options: { importLoaders: 1 } },
          "postcss-loader",
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
              name: "[path][name].[ext]?[hash:8]"
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|ttf|eot)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[path][name].[ext]?[hash:8]"
            }
          }
        ]
      }
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          name: "vendor",
          chunks: "initial",
          enforce: true
        }
      }
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name].css?[hash:8]',
      chunkFilename: devMode ? '[id].css' : '[id].css?[hash:8]',
    }),

    new CopyWebpackPlugin({patterns: [
        { from: 'images', to: 'images' },
      ]}),

    new HtmlWebPackPlugin({
      title: "首頁",
      template: "index.html",
      filename: "index.html",
      // chunks: ["vendor", "main", "index"]
    }),
  ],
  devServer: {
    compress: true,
    watchContentBase: true,
    contentBase: path.resolve(__dirname, "public"),
    open: true,
    port: 9527,
    stats: {
      assets: true,
      cached: false,
      chunkModules: false,
      chunkOrigins: false,
      chunks: false,
      colors: true,
      hash: false,
      modules: false,
      reasons: false,
      source: false,
      version: false,
      warnings: false
    }
  },
};