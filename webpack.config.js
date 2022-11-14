const path = require('path')

config = {
	entry: './src/index.js',
	mode: 'production',
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		extensions: ['.js'],
	},
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, './build'),
	},
}

module.exports = config
