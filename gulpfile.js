var gulp = require('gulp'),
    path = require('path'),
    gutil = require('gulp-util'),

    webpack = require('webpack'),

    jsTaskGen = function (mode) {
        var isProd = mode === 'prod',
            doWatch = mode === 'watch',
            output = './examples/';

        return function () {
            return webpack({
                entry: {
                    'part5/part5': './src/examples/part5.js',
                    'part6/part6': './src/examples/part6.js',
                    'part7/part7': './src/examples/part7.js',
                    'part8/part8': './src/examples/part8.js',
                    'button/button': './src/examples/button.js'
                },
                watch: doWatch,
                module: {
                    loaders: [{
                        test: /.jsx?$/,
                        loader: 'babel-loader',
                        exclude: /node_modules/,
                        query: {
                            presets: ['es2015', 'react']
                        }
                    }]
                },
                plugins: isProd ? [new webpack.optimize.UglifyJsPlugin()] : [],
                output: {
                    path: path.join(__dirname, output),
                    filename: '[name].' + (isProd ? 'min.js' : 'js')
                },
                devtool: !isProd && '#inline-source-map'
            }, function (err, stats) {
                if (err) throw new gutil.PluginError("webpack", err);
                gutil.log("[webpack]", stats.toString({}));
            });
        }
    };


gulp.task('js-dev', jsTaskGen('dev', 'web'));
gulp.task('js-prod', jsTaskGen('prod', 'web'));
gulp.task('js-watch', jsTaskGen('watch', 'web'));
