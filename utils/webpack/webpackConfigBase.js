'use strict';

import path from 'path';
import webpack from 'webpack';

const mediaAssetsRegExp =
/\.(otf|eot|svg|ttf|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/;

export default {
  entry: {
    bundle: [
      path.join(
        process.cwd(),
        'js/client'
      )
    ]
  },
  output: {
    path: path.join(
      process.cwd(),
      'dist/client'
    ),
    filename: '[name].js',
    publicPath: '/'
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendor.bundle'
        }
      }
    }
  },
  plugins: [
    new webpack.ProvidePlugin(
      {
        $: 'jquery',
        jQuery: 'jquery',
        Bootstrap: 'bootstrap/dist/js/bootstrap',
        Popper: 'popper.js'
      }
    )
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-react'
              ],
              plugins: [
                [
                  'babel-plugin-relay',
                  {
                    schema: path.join(
                      process.cwd(),
                      'schema.json'
                    )
                  }
                ]
              ]
            }
          }
        ]
      },
      {
        test: mediaAssetsRegExp,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000
            }
          }
        ]
      }
    ]
  },
  resolve: {
    modules: [
      'node_modules',
      'js/client'
    ]
  }
};
