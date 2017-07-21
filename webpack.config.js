const path = require('path');
 
 
module.exports = {
	entry	: 	"./www/app/main.js",
	output	: 	{
		path 	 	: path.resolve(__dirname , "./www/dist"),
		filename 	: "bundle.js"
	},
	module : {
		rules : [
			{
				test   : /.jsx?$/,
				include : [
					path.resolve(__dirname, "./www/app")
				],
				exclude: [
                    path.resolve(__dirname, "node_modules")
                ],
				loader : "babel-loader",
				options: {
          			presets: ["es2015","react","stage-3"],
          			plugins : [
          				["import", { libraryName: "antd", style: "css" }]
          				,
          				[
          					"transform-runtime", 
          					{
					      		"helpers": false, 
					      		"polyfill": false,  
					      		"regenerator": true,  
					      		"moduleName": "babel-runtime"  
					    	}
					    ]
					    ,
					    "transform-object-rest-spread"
          			]
        		}
			},
			{
	            test: /\.less$/,
	            use: [{
	                loader: "style-loader" // creates style nodes from JS strings
	            }, {
	                loader: "css-loader" // translates CSS into CommonJS
	            }, {
	                loader: "less-loader" // compiles Less to CSS
	            }]
        	},
        	{
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            }
		]
	},
	watch : true
}