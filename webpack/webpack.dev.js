'use strict';

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const rootDir = path.resolve(__dirname, '..');

const { PROD_PATH, SRC_PATH } = require('./path');
const { selectedPreprocessor } = require('./loader');

module.exports = {
    entry: {
        main: `./${SRC_PATH}/index.ts`,
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    output: {
        path: path.resolve(__dirname, PROD_PATH),
        filename: '[name].[chunkhash].js',
    },
    devtool: 'source-map',
    devServer: {
        open: true,
    },

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
                        options: {
                            modules: false,
                            sourceMap: true,
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                    {
                        loader: selectedPreprocessor.loaderName,
                        options: {
                            sourceMap: true,
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'style.css',
        }),
        new HtmlWebpackPlugin({
            hash: false,
            filename: 'index.html',
            inject: true,
            template: path.resolve(rootDir, 'default.ejs'),
        }),
    ],
};
