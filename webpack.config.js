module.exports = {
    entry: {
        frame: './frame/main.ts',
        reseau: './reseau/main.ts',
        courtepaille: './courtepaille/main.ts'
    },
    output: {
        filename: "./[name]/[name].js",
        path: __dirname + '/dist'
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
            { test: /\.js$/, loader: "source-map-loader" },
            { test: /\.txt$/, loader: "file"}
        ],
    },
    target: "node",
    mode: "none"

    // Other options...
};