// shared config (dev and prod)
const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "development",
    entry: [
        "react-hot-loader/patch", // activate HMR for React
        "webpack-dev-server/client?http://localhost:8080",
        "static/scripts/index.ts"
    ],
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  context: resolve(__dirname, "static/scripts/"),
  module: {
    rules: [
      {
        test: [/\.jsx?$/, /\.tsx?$/, /\.ts?$/],
        use: ["babel-loader"],
        exclude: /node_modules/,
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
  plugins: [new HtmlWebpackPlugin({ template: "index.html.ejs" })],
  devServer: {
    hot: "only", // enable HMR on the server
    historyApiFallback: true, // fixes error 404-ish errors when using react router :see this SO question: https://stackoverflow.com/questions/43209666/react-router-v4-cannot-get-url 
  },
  devtool: "cheap-module-source-map",
  externals: {
    react: "React",
    "react-dom": "ReactDOM",
  },
  performance: {
    hints: false,
  },
};