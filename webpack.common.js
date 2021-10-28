const pkg = JSON.parse(require('fs').readFileSync('./package.json'));

module.exports = {
    entry: ['./src/main.ts'],
    output: {
        path: __dirname,
        filename: 'build/main@v' + pkg.version + '.js'
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [{
            test: /\.(css|scss)$/,
            loader: ['./scss-loader.js']
        }, {
            test: /\.ts$/,
            loader: ['awesome-typescript-loader']
        }, {
            test: /\.js$/,
            loader: ['babel-loader'],
            exclude: /node_modules/
        }, {
            test: /\.html$/,
            loader: ['./html-loader.js']
        }]
    }
};
