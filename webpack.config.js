var WebpackNotifierPlugin = require('webpack-notifier');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        osm: "./app/osm.ts"
    },
    output: {
        path: __dirname + "/dist",
        filename: "[name].js"
    },
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
    },
    module: {
        loaders: [
          // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
          { test: /\.tsx?$/, loader: "ts-loader" },
          { test: [/\.scss$/, /\.css$/], loader: ExtractTextPlugin.extract("style", "css!sass") },
          { test: /\.html$/, loader: "html" },
          { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' },
          {
              test: /\.(png|jpg|gif)$/,
              loader: "file-loader?name=img/[name].[ext]"
          },
          {
              test: /\.(rtf)$/,
              loader: "file-loader?name=files/[name].[ext]"
          },
        {
            //transfer php files 
            test: /\.php$/,
            loader: "file-loader?name=server/[name].[ext]"
        },
        {
            //transfer json mock files 
            test: /\.(json)$/,
            include: ["./server/mock/"],
            loader: "file-loader?name=data/[name].[ext]"
        }
        ]
    },

    plugins: [
          new WebpackNotifierPlugin({ alwaysNotify: true }),
          new ExtractTextPlugin('osm.css')

    ]
};