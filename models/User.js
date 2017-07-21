//引包
var mongoose = require('mongoose');
//创建一个schema
var userSchema = new mongoose.Schema({
	"email"  	: String,
 	"pwd"	 	: String 	
});

//创建一个模型
var User = mongoose.model("user" , userSchema);

//暴露
module.exports = User;