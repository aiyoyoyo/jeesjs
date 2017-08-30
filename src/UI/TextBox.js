/*
 * Author: Aiyoyoyo https://www.jeesupport.com/assets/jeesjs/src/UI/TextBox.js
 * License: MIT license
 */

/**
 * @module JeesJS
 */
// namespace:
this.jeesjs = this.jeesjs || {};

(function() {
	"use strict";
	// constructor:
	/**
	 * TODO: 点击事件必须点击绘制的部分，考虑通过增加底板来实现点击事件。问题：透明底板的点击事件会被忽略。
	 * @class TextBox
	 * @extends jeesjs.Widget
	 * @param (String} _t
	 * @param {Widget}
	 *            _p
	 * @constructor
	 */
	function TextBox(_t,_p) {
		this.Widget_constructor(_p);

// public properties:
		/**
		 * 控件默认文本
		 * 
		 * @property t
		 * @type {String}
		 * @default 示例文本
		 */
		this.t = _t ? _t : "";
		/**
		 * 控件默认字体
		 * 
		 * @property c
		 * @type {String}
		 * @default #000000
		 */
		this.f = "12px Arial";
		/**
		 * 控件默认背景颜色
		 * 
		 * @property c
		 * @type {String}
		 * @default #000000
		 */
		this.c = "#000000";
		/**
		 * CreateJS图形控件
		 * 
		 * @property _text
		 * @type {createjs.Text}
		 */
		this._text = new createjs.Text( this.t, this.f, this.c );
		this._text._drawText = this._draw_text;
		
// private properties:
		this._font_bold = "";
		this._font_italic = "";
		this._font_style = "";
		this._font_size = 12;
		this._font = " Arial";
		
		this._init_finish();
	};
// public static properties
	TextBox.ALIGN_START 	= "start";
	TextBox.ALIGN_END 		= "end";
	TextBox.ALIGN_LEFT 		= "left";
	TextBox.ALIGN_RIGHT 	= "right";
	TextBox.ALIGN_CENTER 	= "center";
	
	TextBox.BASELINE_TOP 			= "top";
	TextBox.BASELINE_HANGING		= "hanging";
	TextBox.BASELINE_MIDDLE 		= "middle";
	TextBox.BASELINE_ALPHABETIC 	= "alphabetic";
	TextBox.BASELINE_IDEOGRAPHIC 	= "ideographic";
	TextBox.BASELINE_BOTTOM 		= "bottom";
	
	var p = createjs.extend(TextBox, jeesjs.Widget);
// public method
	 /**
     * 返回根容器
     * @method getRoot
     * @extends
     * @type {createjs.DisplayObject}
     * @return 
     */
    p.getWidget = function(){
    	return this._text;
    };
	/**
	 * 当前颜色
	 * @method getColor
	 * @return {String}
	 */
	p.getColor = function(){
		return this.c;
	};
	/**
	 * 设置颜色
	 * 
	 * @method setColor
	 * @param {String}
	 *            _c
	 */
	p.setColor = function(_c) {
		this.c = _c;
		this._text.color = this.c;
	};
	/**
	 * 当前字体大小
	 * @method getFont
	 * @return {String}
	 */
	p.getFontSize = function(){
		return this.f;
	}
	/**
	 * 设置字体样式
	 * 参考html5字体样式
	 * @method setFont
	 * @param {String}
	 *            _f
	 */
	p.setFont = function( _f ){
		this.f = _f;
		this._text.font = this._get_font();
		this._set_size();
	};
	/**
	 * 当前字体大小
	 * @method getFontSize
	 * @return {Number}
	 */
	p.getFontSize = function(){
		return this._font_size;
	}
	/**
	 * 设置字体大小
	 * 
	 * @method setFontSize
	 * @param {Number}
	 *            _s
	 */
	p.setFontSize = function( _s ){
		this._font_size = _s;
		this._set_font();
		this._text.font = this._get_font();
		this._set_size();
	};
	/**
	 * 当前字体基于坐标的水平对齐方式
	 * @method getAlign
	 * @return {String}
	 */
	p.getAlign = function(){
		return this._text.textAlign;
	}
	/**
	 * 设置文字基于坐标的水平对齐方式
	 * "start", "end", "left", "right", and "center"
	 * @method setAlign
	 * @param {String}
	 *            _a
	 */
	p.setAlign = function( _a ){
		this._text.textAlign = _a;
		this._set_size();
	};
	/**
	 * 当前字体基于坐标的垂直对齐方式
	 * @method getAlign
	 * @return {String}
	 */
	p.getBaseline = function(){
		return this._text.textBaseline;
	}
	/**
	 * 设置文字基于坐标的垂直对齐方式
	 * "top", "hanging", "middle", "alphabetic", "ideographic", or "bottom".
	 * @method setAlign
	 * @param {String}
	 *            _a
	 */
	p.setBaseline = function( _b ){
		this._text.textBaseline = _b;
		this._set_size();
	};
	/**
	 * 当前显示内容的固定宽度
	 * @method getAlign
	 * @return {String}
	 */
	p.getMaxWidth = function(){
		return this._text.maxWidth;
	}
	/**
	 * 设置显示内容的固定宽度，内容超出后，会压缩文字宽度至该范围内。
	 * @method setMaxWidth
	 * @param {Number} _w
	 */
	p.setMaxWidth = function( _w ){
		this._text.maxWidth = _w;
		this._set_size();
	}
	/**
	 * 当前显示范围的固定宽度
	 * @method getAlign
	 * @return {String}
	 */
	p.getLineWidth = function(){
		return this._text.lineWidth;
	}
	/**
	 * 设置显示范围的固定宽度，超出后自动换行。可以通过字体大小计算出换行位置。
	 * @method setLineWidth
	 * @param {Number} _w
	 */
	p.setLineWidth = function( _w ){
		this._text.lineWidth = _w;
		this._set_size();
	}
	/**
	 * 当前显示的内容
	 * @method getAlign
	 * @return {String}
	 */
	p.getText = function(){
		return this.t;
	}
	/**
	 * 设置显示的内容
	 * @method setText
	 * @param {String} _t
	 */
	p.setText = function( _t ){
		this.t = _t;
		this._text.text = this.t;
		this._set_size();
	}
	/**
	 * 是否使用粗体
	 * @method isBold
	 * @return {Boolean}
	 */
	p.isBold = function(){
		return this._font_bold != "";
	}
	/**
	 * 使用粗体
	 * @method setBold
	 * @param {Boolean}
	 */
	p.setBold = function( _v ){
		this._font_bold = _v ? " bold" : "";
		this._set_font();
		this._text.font = this._get_font();
		this._set_size();
	}
	/**
	 * 是否使用斜体
	 * @method isItalic
	 * @return {Boolean}
	 */
	p.isItalic = function(){
		return this._font_bold != "";
	}
	/**
	 * 使用斜体
	 * @method setBold
	 * @param {Boolean}
	 */
	p.setItalic = function( _v ){
		this._font_italic = _v ? " italic" : "";
		this._set_font();
		this._text.font = this._get_font();
		this._set_size();
	}
// private method
	/**
	 * 根据字体属性生成控件字体的属性字符串
	 * @method _get_font
	 * @private
	 * @return {String}
	 */
	p._get_font = function(){
		return this.f; 
	};
	/**
	 * 根据字体属性生成控件的宽高
	 * @method _set_size
	 * @private
	 */
	p._set_size = function(){
		var b = this._text.getBounds();
		this.w = b.width;
		this.h = b.height;
	};
	/**
	 * 设置字体信息
	 * @method _set_font
	 * @private
	 */
	p._set_font = function(){
		this.f = this._font_italic + this._font_bold + " " + this._font_size + "px " + this._font;
	}
	/** 
     * Draws multiline text. 修复createjs的text为中文时，自动换行的问题。
     * @method _drawText 
     * @param {CanvasRenderingContext2D} ctx 
     * @param {Object} o 
     * @param {Array} lines 
     * @return {Object} 
     * @extends
     * @protected 
     * 转载：http://blog.csdn.net/yyf1990cs/article/details/51000447
     **/  
    p._draw_text = function(ctx, o, lines) {  
        var paint = !!ctx;  
        if (!paint) {  
            ctx = createjs.Text._workingContext;  
            ctx.save();  
            this._prepContext(ctx);  
        }  
        var lineHeight = this.lineHeight||this.getMeasuredLineHeight();  
  
        var maxW = 0, count = 0;  
        var hardLines = String(this.text).split(/(?:\r\n|\r|\n)/);  
        for (var i=0, l=hardLines.length; i<l; i++) {  
            var str = hardLines[i];  
            var w = null;  
  
            if (this.lineWidth != null && (w = ctx.measureText(str).width) > this.lineWidth) {  
                // text wrapping:  
                var words = str.split(/(\s|[\u4e00-\u9fa5]+)/);//按照中文和空格来分割  
                var splitChineseWords = [];  
                for(var wordIndex = 0; wordIndex < words.length; wordIndex++)  
                {  
                    var chineseWordStr = words[wordIndex];  
                                        if(chineseWordStr == "")  
                                             continue;  
                    if((/([\u4e00-\u9fa5]+)/).test(chineseWordStr))  
                    {  
                        splitChineseWords = splitChineseWords.concat(chineseWordStr.split(""));//再把中文拆分成一个一个的  
                    }  
                    else  
                    {  
                        splitChineseWords.push(chineseWordStr);  
                    }  
                }  
                words = splitChineseWords;//重新组成数组  
                str = words[0];  
                w = ctx.measureText(str).width;  
  
                for (var j=1, jl=words.length; j<jl; j+=2) {  
                    // Line needs to wrap:  
                    var nextStr = j+1 < jl ? words[j+1] : "";  
                    var wordW = ctx.measureText(words[j] + nextStr).width;  
                    if (w + wordW > this.lineWidth) {  
                        if(words[j] != "\s") //原版没有这个IF，  
                            str += words[j]; //英文时为空格，不需要加，中文时为汉字，所以不能漏了  
                        if (paint) { this._drawTextLine(ctx, str, count*lineHeight); }  
                        if (lines) { lines.push(str); }  
                        if (w > maxW) { maxW = w; }  
                        str = nextStr;  
                        w = ctx.measureText(str).width;  
                        count++;  
                    } else {  
                        str += words[j] + nextStr;  
                        w += wordW;  
                    }  
                }
            }  
  
            if (paint) { this._drawTextLine(ctx, str, count*lineHeight); }  
            if (lines) { lines.push(str); }  
            if (o && w == null) { w = ctx.measureText(str).width; }  
            if (w > maxW) { maxW = w; }  
            count++;  
        }  
  
        if (o) {  
            o.width = maxW;  
            o.height = count*lineHeight;  
        }  
        if (!paint) { ctx.restore(); }  
        return o;  
    }; 
    
	jeesjs.TextBox = createjs.promote(TextBox, "Widget");
})();