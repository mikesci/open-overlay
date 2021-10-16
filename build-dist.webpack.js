const path = require('path');

module.exports = {
    mode: "production",
    entry: {
        OverlayEditor: "./src/OverlayEditor.jsx",
        BrowserRenderer: "./src/browser-renderer/BrowserRenderer.js"
    },
    performance: { hints: false },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: "[name].js",
        chunkFilename: "[name].bundle.js",
        library: "OverlayEditor",
        libraryTarget: "umd"
    },
    optimization: { minimize: true },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [ "@babel/preset-env" ],
                        plugins: [
                            "@babel/plugin-transform-react-jsx",
                            "@babel/plugin-proposal-class-properties",
                            "@babel/plugin-proposal-object-rest-spread",
                            ["@babel/plugin-transform-runtime", { "regenerator": true }]
                        ]
                    }
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