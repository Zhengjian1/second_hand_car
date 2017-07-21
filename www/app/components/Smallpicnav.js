import React from "react";
import cs from 'classnames'
import {connect} from "dva";

class Smallpicnav extends React.Component{
	constructor(props){
		super(props);

		//过继全局数据
		this.imageslist = [];

		//当前page在第几页，我们并没有使用local state，因为这里有动画的关系。用state会瞬间改变，没有动画了！
		this.nowpage = 0;
	};

	//显示page列表
	showlist(){
		var result = [];	//要返回的数组
		for(let i = 0; i < this.imageslist.length ; i += 6){
			let pagearr = this.imageslist.slice(i , i + 6);
			let _arr = [];
			for(let j = 0 ; j < pagearr.length ; j++){
				_arr.push(
					<li className={cs({'cur' : i * 6 + j == 1})} key={i*6 + j}>
						<img src={`/car_images/${this.props.picshow.car}/${this.props.picshow.nowcolor}/${this.props.picshow.nowalbum}/${pagearr[j]}`} />
					</li>
				);
			}
			result.push(
				<div className="page" key={i}><ul>{_arr}</ul></div>
			)
		}
		return result;
	}

	//显示啾啾，就是分页条的span
	showjiujiu(){
		var arr = [];
		var pageamount = Math.ceil(this.imageslist.length / 6);
		for(var i = 0 ; i < pageamount ; i++){
			arr.push(<li key={i} style={{'width': + 330 / pageamount - 10 + "px"}}></li>);
		}
		return <ul>{arr}</ul>
	}

	//上树之后
	componentDidMount(){
		var idx = 0;
		var self = this;
		//监听，点击啾啾，进行动画换页
		//事件委托绑定监听：因为元素是通过Ajax得来的，本函数运行的时候还没有
		$(this.refs.jiujiu).delegate("li","mouseenter",function(){
			self.nowpage = $(this).index();
			$(self.refs.unit).stop(true).animate({"left" : -330 * self.nowpage} , 300);
			//改cur
			$(this).addClass("cur").siblings().removeClass("cur");
		});

		//点击图片的事件
		$(this.refs.unit).delegate('li', 'click', function(event) {
			var idx = self.nowpage * 6 + $(this).index();
			self.props.dispatch({"type": "picshow/changejpicidx" , payload : {idx}});
		});
	}

 
	//验证视图是否需要更新：当数据完备了（有颜色、有相册的时候），就可以更新
	shouldComponentUpdate({picshow}){
		if(!picshow.data[picshow.nowcolor]) return false;
		//相当于将全局数据，过继到了本地的组件中（注意，并没有使用state，state会因为视图更新）
		this.imageslist = picshow.data[picshow.nowcolor][picshow.nowalbum];
		return true;
	}

	//组件更新之后（得到新的picshow全局数据之后）
	componentDidUpdate(){
		//全局数据的当前是第几张图
		const picidx = this.props.picshow.nowpicidx;
		//这个图片应该在第几页
		const page = parseInt(picidx / 6);
		//这个页数和当前页数一样吗？
		if(page != this.nowpage){
			//改变信号量
			this.nowpage = page;
			//动画移动到这个页面
			$(this.refs.unit).stop(true).animate({"left" : -330 * this.nowpage},300);
		}
		//改变图片明亮，要计算余数，比如15号图，就是下标为2的page里面的下标为3的li。
		var yushu = picidx % 6;

		$(this.refs.unit).find("li").removeClass("cur");
		$(this.refs.unit).find(".page").eq(page).find("li").eq(yushu).addClass("cur");

		//改变啾啾明亮
		$(this.refs.jiujiu).find("li").eq(page).addClass("cur").siblings().removeClass("cur");
	}

	render(){
		return (
			<div>
				<h3>缩略图</h3>
				<div className="unit" ref="unit">
					{this.showlist()}
				</div>
				<div className="cl"></div>
				<div className="jiujiu" ref="jiujiu">
					{this.showjiujiu()}
				</div>
			</div>
		);
	}
}

export default connect(({picshow})=>{
	return {
		picshow
	}
})(Smallpicnav);