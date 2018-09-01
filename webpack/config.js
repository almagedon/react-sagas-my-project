const webpack = require('webpack');
const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const paths = {
  source: path.join(__dirname, '../src'),
  assets: path.join(__dirname, '../src/assets/'),
  css: path.join(__dirname, '../src/css/'),
  fonts: path.join(__dirname, '../src/assets/fonts/'),
  images: path.join(__dirname, '../src/assets/img'),
  javascript: path.join(__dirname, '../src/js'),
  svg: path.join(__dirname, '../src/assets/svg'),
  build: path.join(__dirname, '../build'),
  public: path.join(__dirname, '../public'),
};

const outputFiles = require('./output-files').outputFiles;

const NODE_ENV = process.env.NODE_ENV || 'development';
const IS_DEVELOPMENT = NODE_ENV == 'development';
const IS_PRODUCTION = NODE_ENV === 'production';

const appHtmlTitle = 'Webpack Boilerplate';

const entry = [
  path.join(paths.source, 'index.js'),
];

  console.log(JSON.stringify(NODE_ENV), IS_DEVELOPMENT, IS_PRODUCTION,process.env.NODE_ENV)
// ----------
// PLUGINS
// ----------

// Shared plugins
const plugins = [
  // Extracts CSS to a file
  new MiniCssExtractPlugin({
    filename: outputFiles.css,
    //filename: "css/[name].css",
  }),
  // Injects env variables to our app
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(NODE_ENV),
    },
  }),
];
console.log('hot module '+IS_DEVELOPMENT)
if (IS_DEVELOPMENT) {
  // Shared development plugins
  plugins.push(
    // Enables HMR
    new webpack.HotModuleReplacementPlugin(),
    // Don't emmit build when there was an error while compiling
    // No assets are emitted that include errors
    new webpack.NamedModulesPlugin()
  );
  // For IE babel-polyfill has to be loaded before react-hot-loader
  entry.unshift('babel-polyfill');
}

// ----------
// RULES
// ----------

// Shared rules
const rules = [
  // Babel loader
  {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    use: ['babel-loader'],
  },
  // SVG are imported as react components
  {
    test: /\.svg$/,
    use: [
      {
        loader: 'babel-loader',
      },
      {
        loader: 'react-svg-loader',
        options: {
          svgo: {
            plugins: [
              {
                removeTitle: true,
              },
            ],
            floatPrecision: 3,
          },
        },
      },
    ],
    include: paths.svg,
  },
  // Images
      {
        test: /\.(gif|jpg|png)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        include: paths.images,
        use: [
          {
            loader: 'url-loader',
            options: {
              fallback:'file-loader',
              limit: 10000,
            },
          },
          {
            loader: 'file-loader',
            options: {
              name: "img/[ext]/[name].[hash].[ext]",
            },
          }
        ],
      },
  // Fonts
  {
    test: /\.(eot|ttf|woff|woff2)$/,
    include: paths.fonts,
    use: [
      {
        loader: 'file-loader',
        options: {
          name: 'client/fonts/[name]-[hash].[ext]',
        },
      },
    ],
  },
];

rules.push(
  {
    test: /\.(sa|sc|c)ss$/,
    include: paths.css,
    use: [
      MiniCssExtractPlugin.loader,
      "css-loader",
      "sass-loader"
    ]
  }, 
);

// ----------
// RESOLVE
// ----------

const resolve = {
  extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.js', '.jsx'],
  modules: [
    'node_modules',
    paths.javascript,
    paths.assets,
    paths.css,
  ],
};

// ----------
// CLI STATS
// ----------

const stats = {
  colors: true,
  assets: true,
  children: false,
  chunks: false,
  hash: false,
  modules: false,
  publicPath: false,
  timings: true,
  version: false,
  warnings: true,
};

module.exports = {
  IS_DEVELOPMENT,
  IS_PRODUCTION,
  NODE_ENV,
  outputFiles,
  paths,
  plugins,
  resolve,
  rules,
  stats,
};