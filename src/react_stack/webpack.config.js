var path = require('path');
module.exports = {
	entry: {
		main: [
			'./src/components/Root.js'
		]
	},
	output: {
		filename: './public/[name].js'
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query:
				{
					presets: ['react']
				}
			},
			{
  				test: /\.css$/,
  				loader: 'style-loader!css-loader?modules',
  				include: path.join(__dirname, 'node_modules/flexboxgrid/')
			}
		]
	}
};