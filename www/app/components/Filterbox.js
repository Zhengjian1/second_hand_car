import React from "react";
import {connect} from "dva";
import cs from "classnames";

class Filterbox extends React.Component{
	constructor(props){
		super(props);
	}

	//显示图集方块（外观、中控、细节）
	showAlbumLis(){
		var arr = [];
		
		if(!this.props.picshow.data[this.props.picshow.nowcolor]) return;

		const dangqiande = this.props.picshow.data[this.props.picshow.nowcolor];
		//依次判断外观、中控、细节是否存在
		if(this.props.picshow.data[this.props.picshow.nowcolor].hasOwnProperty("view")){
			arr.push(<li data-album="view" key={1}>外观（{dangqiande.view.length}）</li>)
		}
		if(this.props.picshow.data[this.props.picshow.nowcolor].hasOwnProperty("center")){
			arr.push(<li data-album="center" key={2}>中控（{dangqiande.center.length}）</li>)
		}
		if(this.props.picshow.data[this.props.picshow.nowcolor].hasOwnProperty("detail")){
			arr.push(<li data-album="detail" key={3}>细节（{dangqiande.detail.length}）</li>)
		}
		return arr;
	}

	//显示颜色小方块
	showColorLis(){
		var arr = [];
		if(!this.props.picshow.data) return;
		var count = 0;
		for(var k in this.props.picshow.data){
			arr.push(<li key={count++} data-color={k}></li>)
		}
		return arr;
	}

	//上树之后
	componentDidMount(){
		var self = this;
		
		
		$(this.refs.albumul).delegate("li","click",function(){
			const album = $(this).data("album");
			self.props.dispatch({"type" : "picshow/changealbum" , payload : {album}});
		});

		
		$(this.refs.colorul).delegate("li","click",function(){
			const color = $(this).data("color");
			self.props.dispatch({"type" : "picshow/changecolor" , payload : {color}});
		});


	}



	//当props发生任何更改之后
	componentDidUpdate(){
		
		var nowalbum = this.props.picshow.nowalbum;
		$(this.refs.albumul).find(`li[data-album=${nowalbum}]`).addClass("cur").siblings().removeClass("cur");
		
		
		var nowcolor = this.props.picshow.nowcolor;
		$(this.refs.colorul).find(`li[data-color=${nowcolor}]`).addClass("cur").siblings().removeClass("cur");

		
		$(this.refs.colorul).find("li").each(function(){
			$(this).css("background-color" , $(this).data("color"));
		});
	}

	render(){
		return (
			<div>
				<h3>选择图集</h3>
				<ul ref="albumul">
					{this.showAlbumLis()}
				</ul>
				<div className="cl"></div>
				
				<br/>

				<h3>选择颜色</h3>
				<ul className="colorul" ref="colorul">
					{this.showColorLis()}
				</ul>
			</div>
		);
	}
}

export default connect(({picshow})=>{
	return {
		picshow
	}
})(Filterbox);