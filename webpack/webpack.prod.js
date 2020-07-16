const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackMd5Hash = require("webpack-md5-hash");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const { prod_Path, src_Path } = require("./path");
const { selectedPreprocessor } = require("./loader");

const rootDir = path.resolve(__dirname, '..');

module.exports = {
  entry: {
    main: "./" + src_Path + "/index.ts"
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(rootDir, 'build'),
    chunkFilename: '[name].[chunkhash].bundle.js',
    publicPath: './',
  },
  //devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: selectedPreprocessor.fileRegexp,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: "css-loader"
          },
          {
            loader: "postcss-loader"
          },
          {
            loader: selectedPreprocessor.loaderName
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'assets/css/[name].[contenthash:8].css',
      chunkFilename: 'assets/css/[name].[contenthash:8].chunk.css',
    }),
    new HtmlWebpackPlugin({
      hash: false,
      filename: 'index.html',
      inject: true,
      inlineSource: /runtime~.+[.]js/,
      template: path.resolve(rootDir, 'default.ejs'),
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
      },
    }),
  ]
};
