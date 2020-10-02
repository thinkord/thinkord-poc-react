require("@babel/polyfill");
module.exports = [
    {
        mode: 'development',
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
        devtool: 'source-map',
        entry: ['@babel/polyfill', './main/electron.ts'],
        target: 'electron-main',
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    exclude: /node_modules/,
                    use: [{ loader: 'babel-loader' }]
                }
            ]
        },
        node: {
            __dirname: false
        },
        output: {
            path: __dirname + '/public',
            filename: 'electron.js'
        }
    }
];