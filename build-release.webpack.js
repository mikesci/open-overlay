const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: "production",
    //entry: ['./src/OverlayEditor-entry.js'],
    entry: {
        'OverlayEditor': './src/OverlayEditor-entry.js',
        'OverlayRenderer': './src/OverlayRenderer-entry.js',
        'ElementEditor': './src/ElementEditor-entry.js',
        'overlay': './src/overlay.js',
        'element': './src/element.js',
        'autobinder': './src/autobinder.js'
    },
    output: {
        path: path.resolve(__dirname, './release'),
        filename: '[name].js'
    },
    optimization: { minimize: true },
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    },
    plugins: [
        new CopyPlugin([
            { from: 'src/index.html', to: 'index.html' },
            { from: 'src/LocalStorageDAL.js', to: 'LocalStorageDAL.js' },
            { from: 'node_modules/react/umd/react.production.min.js', to: 'react.js' },
            { from: 'node_modules/react-dom/umd/react-dom.production.min.js', to: 'react-dom.js' }
        ])
    ],
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env'
                        ],
                        plugins: [
                            "@babel/plugin-transform-react-jsx",
                            "@babel/plugin-proposal-class-properties",
                            "@babel/plugin-proposal-object-rest-spread"
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