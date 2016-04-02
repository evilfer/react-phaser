var gulp = require('gulp'),
    path = require('path'),
    gutil = require('gulp-util'),

    webpack = require('webpack'),

    phaserModule = path.join(__dirname, '/node_modules/phaser/'),
    phaser = path.join(phaserModule, 'build/custom/phaser-split.js'),
    pixi = path.join(phaserModule, 'build/custom/pixi.js'),
    p2 = path.join(phaserModule, 'build/custom/p2.js'),

    jsTaskGen = function (mode) {
        var isProd = mode === 'prod',
            doWatch = mode === 'watch',
            output = './examples/';

        return function () {
            return webpack({
                entry: {
                    'part8/part8': './src/examples/part8.js'
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
