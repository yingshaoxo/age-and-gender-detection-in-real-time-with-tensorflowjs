const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin')

module.exports = {
    mode: "development",
    devtool: 'inline-source-map',
    entry: [
        "./src/video_test.js"
    ],
    plugins: [
        new CopyWebpackPlugin(['models', 'age_models', 'hi.mp4']),
        new HtmlWebpackPlugin({
            template: './src/video_test.html'
        })
    ]
}
