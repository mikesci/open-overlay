const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: "development",
    entry: {
        OverlayEditor: "./src/OverlayEditor.jsx",
        BrowserRenderer: "./src/browser-renderer/BrowserRenderer.js"
    },
    performance: { hints: false },
    output: {
        path: path.resolve(__dirname, './test'),
        filename: "[name].js",
        chunkFilename: "[name].bundle.js",
        library: "OverlayEditor",
        libraryTarget: "umd"
    },
    optimization: {
        minimize: false
    },
    externals: {
        "react": "React"
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": "{}"
        })
    ],
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.scss$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
                    { loader: 'sass-loader', options: { sourceMap: true } }
                ]
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts/'
                        }
                    }
                ]
            }
        ]
    }
}