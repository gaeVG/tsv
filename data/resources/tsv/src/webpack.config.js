const webpack = require('webpack');
const path = require('path');
const RemovePlugin = require('remove-files-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const buildPath = path.resolve(__dirname, '../dist/');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const DotEnv = require('dotenv-webpack');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const server = {
  entry: './server',
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.tsx?$/,
        use: ['ts-loader'],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({ 'global.GENTLY': false }),
    new RemovePlugin({
      before: { include: [path.resolve(buildPath)] },
      watch: { include: [path.resolve(buildPath)] },
    }),
    new ESLintPlugin(),
    new DotEnv(),
  ],
  optimization: {
    minimize: process.env.NODE_ENV === 'production' ? true : false,
  },
  resolve: {
    plugins: [
      // Resolve paths from tsconfig.json
      new TsconfigPathsPlugin({
        configFile: path.resolve('./server/tsconfig.json'),
      }),
    ],

    extensions: ['.tsx', '.ts', '.js'],
    fallback: {
      path: require.resolve('path-browserify'),
    },
  },
  externals: [nodeExternals()],
  output: {
    filename: 'server.js',
    path: path.resolve(buildPath),
  },
  target: 'node',
  node: {
    __dirname: true,
    __filename: true,
    global: true,
  },
};
const client = {
  entry: './client',
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.tsx?$/,
        use: ['ts-loader'],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({ 'global.GENTLY': false }),
    new RemovePlugin({
      before: {
        include: [path.resolve(buildPath)],
      },
      watch: {
        include: [path.resolve(buildPath)],
      },
    }),
    new ESLintPlugin(),
    new DotEnv(),
  ],
  optimization: {
    minimize: false,
  },
  resolve: {
    plugins: [
      // Resolve paths from tsconfig.json
      new TsconfigPathsPlugin({
        configFile: path.resolve('./client/tsconfig.json'),
      }),
    ],
    extensions: ['.tsx', '.ts', '.js'],
    fallback: {
      path: require.resolve('path-browserify'),
    },
  },
  output: {
    filename: 'client.js',
    path: path.resolve(buildPath),
  },

  target: 'node',
};
const web = {
  entry: './web',
  target: 'web',
  mode: 'development',
  output: {
    path: path.resolve(buildPath),
    filename: 'ui.js',
  },
  resolve: {
    plugins: [
      // Resolve paths from tsconfig.json
      new TsconfigPathsPlugin({
        configFile: path.resolve('./web/tsconfig.json'),
      }),
    ],
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        loader: 'babel-loader',
      },
      {
        test: /\.(ts|tsx)$/,
        loader: 'ts-loader',
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              // options...
            },
          },
        ],
      },
      {
        test: /\.node$/,
        loader: 'node-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './web/index.html',
      filename: 'index.html',
    }),

    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
    new DotEnv(),
    new ESLintPlugin(),
  ],
};
const loadscreen = {
  entry: './screen',
  target: 'web',
  mode: 'development',
  output: {
    path: path.resolve(buildPath),
    filename: 'loadscreen.js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        loader: 'babel-loader',
      },
      {
        test: /\.(ts|tsx)$/,
        loader: 'ts-loader',
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              // options...
            },
          },
        ],
      },
      {
        test: /\.node$/,
        loader: 'node-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './screen/index.html',
      filename: 'loadscreen.html',
    }),

    new MiniCssExtractPlugin({
      filename: 'loadscreen.css',
    }),
    new DotEnv(),
    new ESLintPlugin(),
  ],
};

module.exports = [server, client, web /*loadscreen*/];
