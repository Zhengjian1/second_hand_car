var User = require("../models/User.js");
var formidable = require("formidable");
var crypto = require("crypto");

exports.showRegist = (req,res) => {
    res.render("regist",{
    		"programa" : "regist",	
    		"login" : req.session.login,
		"email" : req.session.email
    });
}

//检查email是否可用
exports.check = (req,res) => {
    //拿到要检查的email
	//下面两句话来自formidable，来自：https://www.npmjs.com/package/formidable
	var form = new formidable.IncomingForm();
	form.parse(req, function(err, fields, files) {
		var email = fields.email;
		User.find({"email" : email} , (err,docs)=>{
			res.json({"result" : docs.length == 0});
		});
	});
}

//提交注册表单
exports.doRegist = (req,res) => {
    //拿到要注册的email、密码
	//下面两句话来自formidable，来自：https://www.npmjs.com/package/formidable
	var form = new formidable.IncomingForm();
	form.parse(req, function(err, fields, files) {
		var email = fields.email;
		var pwd = fields.pwd;

		//这里再次验证email是否合法
		if(!/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/.test(email)){
			res.send({"result" : -4});
			return;
		}
		
		//这里再次验证email是否被占用
		User.find({"email":email},(err,docs)=>{
			if(docs.length > 0){
				res.send({"result" : -2});
				return;
			}

			//这里再次验证密码强度
			var score = 0;
			if(/[a-z]/.test(pwd)) score++;
			if(/[A-Z]/.test(pwd)) score++;
			if(/[\d]/.test(pwd)) score++;
			if(/[\~\`\@\#\$\%\^\&\*\(\)\_\-\+\=\[\]\{\}\\\|\?\/\>\<\,\.\!]/.test(pwd)) score++;
			console.log(pwd , score)
			if(score < 3){
				res.send({"result" : -3});
				return;
			}

			//用sha256加密。
			pwd = crypto.createHash('sha256').update("我爱" + pwd + "前端").digest("hex");
			//持久化
			var u = new User({
				"email" : email,
				"pwd" : pwd
			});
			u.save((err)=>{
				if(err){
					res.json({"result" : -1});
				}else{
					res.json({"result" : 1});
				}
			});
		});
	});
}