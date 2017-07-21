import React from "react";
import {connect} from "dva";
import  brand_img from "../api/brand_img.js";
import "./Indexshow.less";


class Indexshow extends React.Component{
    constructor(props){
        super(props);

        this.state = {

             "brand" :  Object.keys(brand_img),
             "price" :[[2,5],[5,10],[10,15],[15,20],[20,30],[30,50],[50,400]],
             "modal" : ["轿车","小型SUV","中型SUV","大型SUV"]
        }
    }
 
    brandlist(){
            return  this.state.brand.map((item,index) => {
                    return <a  key= {index} href={`#/search/${item}`}><img src={`images/car_biao/${brand_img[item]}`} />{item}</a>
            });
    }


    pricelist(){
            return this.state.price.map((item,index) => {
                    return <a key={index}  href={`#/search/${item}`}>{item[0]} - {item[1]}万</a>
            })
    }


    modallist(){
             return this.state.modal.map((item,index) => {
                    return <a key={index}  href={`#/search/m${item}`}>{item}</a>
            })
    }


    render(){
        return (
            <div >
                      <div className="category-wrap">
                                <div className="brand-wrap">
                                        <span className="brand_title">品牌</span>
                                        <div className="band_content">
                                                 {this.brandlist()}
                                        </div>
                                </div>
                                <div className="price_wrap">
                                        <span className="price_title">价格</span>
                                        <div className="price_content">
                                                 {this.pricelist()}
                                        </div>
                                </div>
                                <div className="modal_wrap">
                                        <span className="modal_title">车型</span>
                                        <div className="modal_content">
                                                 {this.modallist()}
                                        </div>
                                </div>
                      </div>

            </div>
        );
    }
}

export default connect(({indexshow})=>{
    return {
        indexshow
    }
})(Indexshow);