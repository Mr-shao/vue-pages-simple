const path = require("path");
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin'); /*每次编译之前，先删除之编译好的文件夹*/
const ExtractTextPlugin = require("extract-text-webpack-plugin"); /*提取css到为单独文件*/
const HtmlWebpackPlugin = require('html-webpack-plugin'); /*生成html*/
const CopyWebpackPlugin = require('copy-webpack-plugin'); /*复制文件*/
const CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');/*精简输出*/
// const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
	entry: {
		'pages/store/index': path.resolve(__dirname, './pages/store/index.js'),
	},
	output: {
		path: path.resolve(__dirname, "./build"),
		filename: "[name].[chunkhash:8].js",    //输出的文件加入hash值
	},
	module: {
		loaders: [
			{
				test: /\.vue$/,
				use: {
					loader: "vue-loader"
				},
				exclude: /node_modules/
			},
			{
				test: /(\.jsx|\.js)$/,
				use: {
					loader: "babel-loader",
					options: {
						presets: [
							"es2015"
						]
					}
				},
				exclude: /node_modules/
			},
			
			{
				test: /(\.scss|\.css)$/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: "css-loader!sass-loader!postcss-loader",
				})

			},
			 {
			 	//提取html里面的img文件
		        test: /\.(htm|html)$/i,
		        loader: 'html-withimg-loader',
		   },
			   {
			   	//图片打包
			   	test:/(\.jpg|\.png|\.gif|\.jpeg)$/, 
			   	use:{
			   		loader:'file-loader',
			   		 options: {
			   		 	outputPath: 'icon',
			   		 	name:'[name].[ext]',		   		 	
				      	useRelativePath:true
				    }
			   	}
			   },			 
		]
	},
	plugins: [
		// new VueLoaderPlugin(),
		new ExtractTextPlugin('./css/[name].[chunkhash:8].css'),
		// html文件输出
		new HtmlWebpackPlugin({
			title: 'NAS小卖部',
			filename: 'index.html',
			template: '/pages/store/index.html',
			hash:false,
			cach:false,
			minify:{
				caseSensitive:false, //是否大小写敏感
				removeComments:true, //去除注释
				removeEmptyAttributes:true,//去除空属性
				collapseWhitespace:true //是否去除空格
			},
			inject:'body'
		}),	
		// new CopyWebpackPlugin([{
		//     from: __dirname + '/data',
		//     to:'data/'
		// }]),
		
		// new CommonsChunkPlugin({
		//       name:"rem",
		//  }),
		new UglifyJsPlugin(),
		// new CleanWebpackPlugin(['build']) //编译前先清除文件夹
	],


}