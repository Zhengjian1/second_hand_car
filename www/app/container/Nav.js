import React from "react";
import {connect} from "dva";
import "./Nav.less";


class Nav extends React.Component{
    constructor(props){
        super(props);

    }
 componentDidMount(){
        $(this.refs.NavUl).delegate("li a","click",function(){
                $(".content").find("a").removeClass("cur");
                $(this).addClass("cur");
         });
 }
    render(){
        return (
            <div>
                    
                 
                    <nav className="nav">
                                <div className="header">
                                                    <div className="logo">
                                                                二手车平台
                                                    </div>
                                                    <div className="content">
                                                                <ul ref="NavUl">
                                                                    <li ><a href="/" className="cur">首页</a></li>
                                                                    <li><a href="/#/search">买车</a></li>
                                                                    <li><a href="#">卖车</a></li>
                                                                    <li><a href="#">宝典</a></li>
                                                                    <li><a href="#">服务保障</a></li>
                                                                    <li><a href="/login">登录</a></li>
                                                                    <li><a href="/regist">注册</a></li>
                                                                </ul>
                                                    </div>
                                   </div>                                                          
                    </nav>
            
            </div>
        );
    }
}

export default connect(({indexshow}) => {
            return{
                    indexshow
            }
})(Nav);