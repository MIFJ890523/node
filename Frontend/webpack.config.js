var extractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var webpack = require('webpack')
var path = require('path')

var GLOBALS = {
	"process.env.APP": JSON.stringify(process.env.APP),
	"process.env.baseURL": JSON.stringify(process.env.BACKEND_SERVER),
	"process.env.TIEMPO_SESION_INACTIVIDAD": JSON.stringify(process.env.TIEMPO_SESION_INACTIVIDAD),
	"process.env.TIEMPO_SESION_ALERTA": JSON.stringify(process.env.TIEMPO_SESION_ALERTA)
};

var use = [
	{
		loader: 'babel-loader',
		options: {
			presets: ['es2015', 'react', 'stage-0']
		}
	}
];

if (process.env.NODE_ENV != 'production') use.push( {loader: 'eslint-loader', options: { fix: true } } )

var plugins = [
	new webpack.optimize.OccurrenceOrderPlugin(),
	new webpack.optimize.AggressiveMergingPlugin(),
	new webpack.DefinePlugin(GLOBALS),
	new extractTextPlugin('style.css'),
	new webpack.IgnorePlugin(/^\.\/locale$/,/moment$/),
]

if (process.env.NODE_ENV == 'production') {
	plugins.push(new HtmlWebpackPlugin({filename: 'index.html'}))
	plugins.push(
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			filename: 'vendor.js',

			minChunks: function (module) {
				// This prevents stylesheet resources with the .css, .scss or .less extension
				// from being moved from their original chunk to the vendor chunk
				if(module.resource && (/^.*\.(css|scss|less)$/).test(module.resource)) {
					return false;
				}
				return module.context && module.context.includes("node_modules");
			}
		})
	)
}

module.exports = {
	entry: './src/index.js',
	devtool: process.env.NODE_ENV == 'production' ? "source-map" : "cheap-module-eval-source-map",
	output: {
		path: path.join(__dirname, 'dist'),
		publicPath: "/",
		filename: 'bundle.js',
		chunkFilename: "[id].[chunkhash].js"
	},

	plugins: plugins.filter (p => p),

	devServer: {
		inline: true,
		port: process.env.PORT || process.env.PORT_SERVER ,
		historyApiFallback: true,
		contentBase: 'src'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: '/(node_modules)/',
				include: path.join(__dirname, "src"),
				use: use
			},
			{ test: /\.less$|\.css$/, exclude: '/(node_modules)/', use: extractTextPlugin.extract({fallback: 'style-loader', use: 'css-loader!less-loader'}) },
			{ test: /\.(eot|png|jpg|jpeg|gif|woff|woff2|svg|ttf|html)$/, use: 'url-loader?limit=10000' },
			{ test: /\.tsx?$/, loader: 'ts-loader', options: {transpileOnly: true} }
		]
	},
	resolve: {
		alias: {
			Api: path.resolve(__dirname, 'src/api/'),
			Components: path.resolve(__dirname, 'src/components/'),
			Containers: path.resolve(__dirname, 'src/containers/'),
			Modules: path.resolve(__dirname, 'src/modules/'),
			Assets: path.resolve(__dirname, 'src/assets/')
		}
	}
}
