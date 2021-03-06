/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2015-08-06
 */
var path = require('path');
var webpack = require('webpack');
var HTMLPlugin = require('html-webpack-plugin');
var autoprefixer = require('autoprefixer');

module.exports = {
	devtool: 'source-map',
	entry: ['webpack-hot-middleware/client?path=/__webpack_hmr&reload=true', './src/app/app.js'],
	output: {
		path: path.join(__dirname, 'dist'),
		filename: '[name].js'
	},
	externals: {
		'angular': 'angular',
		'angular-resource': '\'ngResource\'',
		'angular-ui-router': '\'ui.router\''
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('production')
			}
		}),
		new HTMLPlugin({
			template: './src/index.html',
			filename: 'index.html',
			inject: false
		}),
		new webpack.optimize.UglifyJsPlugin({
			include: /\.min\.js$/,
			minimize: true
		}),
		new webpack.optimize.DedupePlugin(),
		new webpack.NoErrorsPlugin()
	],
	resolve: {
		extensions: ['', '.js']
	},
	eslint: {
		configFile: '.eslintrc',
		emitWarning: true,
		emitError: true,
		formatter: require('eslint-friendly-formatter')
	},
	postcss: [autoprefixer({browsers: ['Chrome > 35', 'Firefox > 30', 'Safari > 7']})],
	module: {
		preLoaders: [
			{
				test: /\.js?$/,
				loader: 'eslint-loader',
				exclude: /node_modules/,
				include: path.join(__dirname, 'src')
			}
		],

		loaders: [
			{
				test: /\.js?$/,
				loaders: ['babel'],
				exclude: /(node_modules|bower_components)/,
				include: [path.join(__dirname, 'src'), path.join(__dirname, 'demo')]
			},
			{
				test: /\.tpl\.html$/,
				loader: 'html',
				query: {interpolate: true},
				exclude: /(node_modules|bower_components)/,
				include: path.join(__dirname, 'src/components')
			},

			{
				test: /.html$/,
				loader: 'file?name=[path][name]-[hash:8].[ext]',
				exclude: /(node_modules|bower_components)/,
				include: path.join(__dirname, 'src/app')
			},
			{
				test: /\.css$/,
				loaders: ['style', 'css', 'postcss', 'resolve-url'],
				exclude: /(node_modules|bower_components)/
			},
			{
				test: /\.scss$/,
				loaders: ['style', 'css', 'postcss', 'resolve-url', 'sass?sourceMap'],
				exclude: /(node_modules|bower_components)/
			},
			{
				test: /\.(jpe?g|png|gif)$/i,
				loaders: [
					'file?hash=sha512&digest=hex&name=[hash:8].[ext]',
					'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
				]
			},
			{
				test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
				loader: 'url?limit=15000&mimetype=application/font-woff&prefix=fonts'
			},
			{
				test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
				loader: 'url?limit=15000&mimetype=application/octet-stream&prefix=fonts'
			},
			{
				test: /\.eot(\?#\w+)?$/,
				loader: 'url?limit=15000&mimetype=application/vnd.ms-fontobject&prefix=fonts'
			},
			{
				test: /\.svg(#\w+)?$/,
				loader: 'url?limit=15000&mimetype=image/svg+xml&prefix=fonts'
			}

		]
	}
};
