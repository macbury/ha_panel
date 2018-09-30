const path = require('path')
const webpack = require('webpack')
const CompressionPlugin = require('compression-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MinifyPlugin = require('babel-minify-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const envirmoment = process.env.NODE_ENV || 'development'
const isProduction = envirmoment == 'production'

const definePlugin = new webpack.DefinePlugin({
  PANEL_ENV: envirmoment
})

const htmlPlugin = new HtmlWebpackPlugin({
  inject: 'body',
  alwaysWriteToDisk: true,
  filename: 'index.html',
  template: path.resolve('src', 'index.html')
})

let settings = {
  entry: path.resolve(__dirname, 'src/index.js'),

  output: {
    pathinfo: true,
    path: path.resolve(__dirname, 'dist/panel'),
    filename: '[name].bundle.js'
  },

  plugins: [
    definePlugin,
    htmlPlugin
  ],

  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@components': path.resolve('src/components'),
      '@reducers': path.resolve('src/reducers'),
      '@actions': path.resolve('src/actions'),
      '@containers': path.resolve('src/containers')
    }
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        }
      },
      {
        test: /\.jsx$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        }
      },
      {
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader?modules=true' },
          { loader: 'sass-loader' }
        ],
        test: /\.scss$/i
      },

      {
        test: /\.(ttf|woff|eot|woff2)$/i,
        use: [
          {
            loader: 'file-loader'
          }
        ]
      },


      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true,
            },
          },
        ],
      }
    ]
  }
}

if (isProduction) {
  settings.mode = 'production'
  settings.plugins.push(new CleanWebpackPlugin(['dist/']))
  settings.plugins.push(new MinifyPlugin({
    keepClassName: true,
  }, {
    comments: false,
    sourceMap: false
  }))
  settings.plugins.push(new CompressionPlugin())
  settings.optimization = {
    minimize: false
  }
} else {
  settings.plugins.push(new webpack.HotModuleReplacementPlugin())
  settings.watch = true
  settings.mode = 'development'
  settings.devtool = 'eval-source-map'
  settings.devServer = {
    port: 9000,
    host: '0.0.0.0',
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    }
  }
  settings.output.publicPath = settings.devServer.publicPath = 'http://localhost:9000/'
}

module.exports = settings
