const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin')

module.exports = {
    //devtool: 'inline-source-map',
    entry: [
        "./src/index.js"
    ],
    plugins: [
        //new CopyWebpackPlugin(['models', 'age_models']),
        new CopyWebpackPlugin([{from: 'models', to: 'models'}, {from: 'age_models', to: 'age_models'}]),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ]
}
