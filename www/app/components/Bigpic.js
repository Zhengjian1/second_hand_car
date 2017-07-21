import React from "react";
import { connect } from "dva";

class Bigpic extends React.Component{
	constructor(props){
		super(props);

	 	//图片路径
		this.src = "";
	}

	//门神，看数据是否准备好！！
	shouldComponentUpdate({picshow}){
		if(!picshow.data[picshow.nowcolor]) return false;
		//文件名
		var wenjianming = picshow.data[picshow.nowcolor][picshow.nowalbum][picshow.nowpicidx];
		//拼凑一个src
		this.src = `/car_images/${picshow.car}/${picshow.nowcolor}/${picshow.nowalbum}/${wenjianming}`;
		return true;
	}
		
	render(){
		return (
			<div>
				<img className="bigimg" src={this.src} />
				<div className="leftBtn"  onClick={()=>{this.props.dispatch({"type" : "picshow/goprev"})}}></div>
				<div className="rightBtn" onClick={()=>{this.props.dispatch({"type" : "picshow/gonext"})}}></div>
			</div>
		)
	}
}

export default connect(({picshow}) => {
	return {
		picshow
	}
})(Bigpic)