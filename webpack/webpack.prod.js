'use strict';

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackCleanPlugin = require('webpack-clean');

const { SRC_PATH } = require('./path');
const { selectedPreprocessor } = require('./loader');

const rootDir = path.resolve(__dirname, '..');

module.exports = {
    entry: {
        main: `./${SRC_PATH}/index.ts`,
    },
    resolve: {
        extensions: ['.ts', '.js'],
        alias: {
            utils: path.resolve(rootDir, './src/utils'),
            constant: path.resolve(rootDir, './src/constant'),
            models: path.resolve(rootDir, './src/models'),
            types: path.resolve(rootDir, './src/types'),
        },
    },
    output: {
        filename: '[name].[hash].js',
        path: path.resolve(rootDir, 'dist'),
        chunkFilename: '[name].[chunkhash].bundle.js',
        publicPath: './',
    },
    // devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: selectedPreprocessor.fileRegexp,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'postcss-loader',
                    },
                    {
                        loader: selectedPreprocessor.loaderName,
                    },
                ],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader'],
            },
        ],
    },
    plugins: [
        new WebpackCleanPlugin(['dist']),
        new MiniCssExtractPlugin({
            filename: 'src/css/[name].[contenthash:8].css',
            chunkFilename: 'src/css/[name].[contenthash:8].chunk.css',
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
        new CopyWebpackPlugin({
            patterns: [{ from: 'src/static', to: 'src/static/' }],
        }),
    ],
};
