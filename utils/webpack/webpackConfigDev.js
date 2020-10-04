'use strict';

import webpackMerge from 'webpack-merge';

import webpackConfigBase from './webpackConfigBase';

export default webpackMerge(
  webpackConfigBase,
  {
    devServer: {
      proxy: {
        '*': 'http://localhost:3000'
      }
    },
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            'style-loader',
            'css-loader',
            'sass-loader'
          ]
        }
      ]
    }
  }
);
