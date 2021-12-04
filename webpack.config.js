// shared config (dev and prod)
const  HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require('path');

module.exports = {
  mode: "development",
  entry: [
    // "react-hot-loader/patch", // activate HMR for React
    // "webpack-dev-server/client?http://localhost:8080",
    "./static/scripts/index.ts"
  ],
  output: {
    path: path.resolve(__dirname, './static/js'),
    filename: 'index.js'
  },
  resolve: {
    extensions: [".js", ".ts", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /(node_modules|docs|public|data)$/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(scss|sass)$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          "file-loader?hash=sha512&digest=hex&name=img/[contenthash].[ext]",
          "image-webpack-loader?bypassOnDebug&optipng.optimizationLevel=7&gifsicle.interlaced=false",
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin()
  ],
  devtool: "cheap-module-source-map",
  externals: {
    react: "React",
    "react-dom": "ReactDOM",
  },
  performance: {
    hints: false
  }
};
