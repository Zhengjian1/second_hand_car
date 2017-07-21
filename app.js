var express 	             = require("express");
var app 		= express();
var fs 			= require("fs");
var url 		            = require("url");
var formidable 	            = require('formidable');
var mongoose              = require('mongoose');
var session                   = require('express-session')
var registCtrl 		= require("./controllers/registCtrl.js");
var loginCtrl 		= require("./controllers/loginCtrl.js");

 
 //链接数据库
 mongoose.connect('mongodb://localhost/ershouche',(err)=>{
 	if(err) console.log("亲爱的，你没开数据库！请用mongod开机！");
 });

//设置session
app.set('trust proxy', 1) 
app.use(session({
	secret: 'keyboard cat',
	saveUninitialized: true,
	resave : false,
	cookie: { maxAge: 7 * 1000 * 60 * 60 * 24 }
}));



app.use(express.static("www"));

//设置模板引擎
app.set("view engine" , "ejs");

app.post("/cardata",function(req,res){
	fs.readFile("./database/cardata.json",function(err,data){
		var list = JSON.parse(data.toString()).list;
	 	var form = new formidable.IncomingForm();

	    form.parse(req, function(err, fields, files) {
	    	//拿到过滤器，并且换为对象
	    	var filter = JSON.parse(fields.filter);

	    	//拿到分页属性，并且转为对象
	    	var pagination = JSON.parse(fields.pagination);


	    	//-------------------------过滤器-------------------------
	    	if(filter.hasOwnProperty("country")){
	    		var country = filter["country"];
	    		list = list.filter((item)=>{
	    			return item.country == country;
	    		});
	    	}

	    	if(filter.hasOwnProperty("brand")){
	    		var brand = filter["brand"];
	    		list = list.filter((item)=>{
	    			return item.brand == brand;
	    		});
	    	}

	    	if(filter.hasOwnProperty("type")){
	    		var type = filter["type"];
	    		list = list.filter((item)=>{
	    			return item.type == type;
	    		});
	    	}


	    	if(filter.hasOwnProperty("seat")){
	    		var seat = filter["seat"];
	    		 
	    		list = list.filter((item)=>{
	    			return seat.indexOf(item.seat) != -1;
	    		});
	    	}

	    	if(filter.hasOwnProperty("price")){
	    		var min = filter["price"][0];
	    		var max = filter["price"][1];
	    		 
	    		list = list.filter((item)=>{
	    			return item.price <= max && item.price >= min;
	    		});
	    	}

	    	if(filter.hasOwnProperty("date")){
	    		var min = filter["date"][0];
	    		var max = filter["date"][1];

	    		 
	    		list = list.filter((item)=>{
	    			const timestamp = Date.parse(new Date(item.date));
	    			// console.log(min , max , timestamp);
	    			return timestamp<= max && timestamp >= min;
	    		});
	    	}

	    	//-------------------------排序-------------------------
	    	var {page,pageamount,pagesize,sortby,sortdirection} = pagination;

	    	if(sortby == "id" || sortby == "price" || sortby == "seat" || sortby == "type" || sortby == "country" || sortby == "brand"){
	    		//决定一会儿sort的返回正方向
	    		var n = sortdirection == "ascend" ? 1 : -1;
	    		//排序
	    		list.sort(function(a,b){
	    			return a[sortby] > b[sortby] ? n : -n;
	    		});
	    	}else if(sortby == "date"){
	    		//决定一会儿sort的返回正方向（这里想不通不想了，try try see）
	    		var n = sortdirection == "ascend" ? 1 : -1;
	    		list.sort(function(a,b){
	    			return Date.parse(new Date(a["date"])) > Date.parse(new Date(b["date"])) ? n : -n;
	    		});
	    	}

	    	//-------------------------分页-------------------------
	    	//记录总数
	    	var totalamount = list.length;

	    	//用户传入的几个参数：页码、每页多少：
	    	var {page , pagesize} = pagination;
 		
 			//分页就是原数组的子数组
	    	list = list.slice((page - 1) * pagesize , page * pagesize);

	  

	    	res.json({"results" : list , totalamount});
	    });
	});
});

//carshow路由
app.get("/car/:carname" , (req,res) => {
	var carname = req.params.carname;
	//最终返回结果
	var result = {};
	//读取颜色文件夹
	var colordirs = fs.readdirSync(`./www/car_images/${carname}`);
	//循环
	for(let i = 0 ; i < colordirs.length ; i++){
		result[colordirs[i]] = {};
		//读取相册（中控、外观、细节）文件夹
		var albumdirs = fs.readdirSync(`./www/car_images/${carname}/${colordirs[i]}`);
		//遍历
		for(let j = 0 ; j < albumdirs.length ; j++){
			var pics = fs.readdirSync(`./www/car_images/${carname}/${colordirs[i]}/${albumdirs[j]}`);
			//加对象
			result[colordirs[i]][albumdirs[j]] = pics.slice(0,pics.length-1);

		}
	}
	res.json({"result" : result});
});



//登录和注册路由
app.get          ("/regist"               ,  registCtrl.showRegist);
app.checkout ("/regist"               ,  registCtrl.check);
app.post        ("/regist"               ,  registCtrl.doRegist);
app.get          ("/login"                 ,  loginCtrl.showLogin);
app.post         ("/login"                ,  loginCtrl.doLogin);


app.listen(3000,(err)=>{
    console.log("3000端口");
});