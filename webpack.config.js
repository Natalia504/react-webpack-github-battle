var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin'); //creates index.html file and puts it in 'dist'
var webpack = require('webpack');


var config = {
    entry: './app/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index_bundle.js',
        publicPath: '/'
    },
    module: {
        rules: [
            { test: /\.(js)$/, use: 'babel-loader' },
            { test: /\.css$/, use: ['style-loader', 'css-loader'] }
        ]
    },
    devServer: {
        historyApiFallback: true
    },
    plugins: [new HtmlWebpackPlugin({
        template: 'app/index.html'
    })
    ],
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development'
};

// if we're building for production.
// when we run npm run build the process.env.NODE_ENV will === 'production

// if (process.env.NODE_ENV === 'production') {
//     config.plugins.push(
//         new webpack.DefinePlugin({
//             'process.env': {
//                 'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
//             }
//         }),
//         // new webpack.optimize.UglifyJsPlugin()
//         new webpack.config.optimization.minimize()
//     )
// }
//  "build": "NODE_ENV='production' webpack -p"  add this line to package.json file

module.exports = config;