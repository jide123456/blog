var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
	entry: {
		main: './src/main.js',
		vender: ['jquery', './src/assets/uikit.js'],
		vue: ['vue']
	},
	output: {
		path: path.resolve(__dirname, './dist'),
		publicPath: '/dist/',
		filename: '[name].build.js'
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
					loaders: {
						stylus: ExtractTextPlugin.extract({
							loader: ['css-loader', 'postcss-loader', 'stylus-loader'],
							fallbackLoader: 'vue-style-loader'
						})
					}
				}
			},
			{
				test: /\.css$/,
				loader: ['style-loader', 'css-loader']
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/
			},
			{
				test: /\.(png|jpg|gif|svg|otf|ttf|woff|woff2)$/,
				loader: 'file-loader',
				options: {
					name: '[name].[ext]?[hash]'
				}
			}
		]
	},
	plugins: [
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			'window.jQuery': 'jquery'
		}),
		new ExtractTextPlugin('style.css'),
		new webpack.optimize.CommonsChunkPlugin({
			names: ['vue', 'manifest']
		})
	],
	resolve: {
		alias: {
			'vue$': 'vue/dist/vue.common.js'
		}
	},
	devServer: {
		historyApiFallback: true,
		noInfo: true
	},
	performance: {
		hints: false
	},
	devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
	module.exports.devtool = '#source-map'
	module.exports.output.publicPath = 'http://jideblog.b0.upaiyun.com/static/blog/dist/'
	// module.exports.devtool = '#cheap-module-source-map'
	// http://vue-loader.vuejs.org/en/workflow/production.html
	module.exports.plugins = (module.exports.plugins || []).concat([
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"'
			}
		}),
		new webpack.optimize.UglifyJsPlugin({
			sourceMap: true,
			compress: {
				warnings: false
			}
		}),
		new webpack.LoaderOptionsPlugin({
			minimize: true
		})
	])
}
