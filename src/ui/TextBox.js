/*
 * Author: Aiyoyoyo
 * https://github.com/aiyoyoyo/jeesjs/tree/master/src/ui/TextBox.js
 * License: MIT license
 */

/**
 * @module JeesJS
 */
// namespace:
this.jees = this.jees || {};
this.jees.UI = this.jees.UI || {};

(function () {
	"use strict";
// constructor: ===============================================================
	/**
	 * @class TextBox
	 * @extends createjs.Text
	 * @constructor
	 */
	function TextBox() {
		this.Text_constructor( "", "", "" );
// public properties:
		/**
		 * 控件的配置属性，用于初始化和部分属性的重置用
		 * @public
		 * @property property
		 */
		this.property = new jees.UI.Property();
		/**
		 * @public
		 * @property italic
		 * @type {Boolean}
		 * @default false
		 */
		this.italic = false;
		/**
		 * @public
		 * @property bold
		 * @type {Boolean}
		 * @default false
		 */
		this.bold = false;
		/**
		 * 拆分的字体样式-字体样式
		 * @public
		 * @property fontStyle
		 * @type {String}
		 * @default "Arial"
		 */
		this.fontStyle = "Arial";
		/**
		 * 拆分的字体样式-字体大小
		 * @public
		 * @property fontSize
		 * @type {Integer}
		 * @default 12
		 */
		this.fontSize = 12;
// private properties:
		/**
		 * @private
		 * @override
		 * @function _drawText
		 */
		this._drawText = this._reset_text;
	};
// public static properties:
	TextBox.ALIGN_START = "start";
	TextBox.ALIGN_END = "end";
	TextBox.ALIGN_LEFT = "left";
	TextBox.ALIGN_RIGHT = "right";
	TextBox.ALIGN_CENTER = "center";

	TextBox.BASELINE_TOP = "top";
	TextBox.BASELINE_HANGING = "hanging";
	TextBox.BASELINE_MIDDLE = "middle";
	TextBox.BASELINE_ALPHABETIC = "alphabetic";
	TextBox.BASELINE_IDEOGRAPHIC = "ideographic";
	TextBox.BASELINE_BOTTOM = "bottom";
	
	var p = createjs.extend( TextBox, createjs.Text );
// public method: =============================================================
	/**
	 * @public
	 * @method initialize
	 */
	p.initialize = function(){
		this.font = this._get_font();
		this.lineHeight = this.getFontSize();
		this.setColor( this.color );
		this._reset_position();
		this._cache();
	}
    /**
     * 获取文本绘制的宽高
	 * @public
     * @method getSize
     * @return { w, h }
     */
	p.getSize = function(){
	    return {w: this.getMeasuredWidth() , h: this.getMeasuredLineHeight() }
	};
    /**
     * 设置坐标
	 * @public
     * @method setPosition
     * @param {Number} _x
     * @param {Number} _y
     */
	p.setPosition = function (_x, _y) {
		this.property.setPosition( _x, _y );
		this._reset_position();
	};
	/**
	 * @public
	 * @method getPosition
	 * @returns {Integer,Integer} {x,y}
	 */
	p.getPosition = function(){
		return { x: this.x , y: this.y };
	}
	/**
	 * 当前颜色
	 * @public
	 * @method getColor
	 * @return {String}
	 */
	p.getColor = function () {
		return this.color;
	};
	/**
	 * 设置颜色
	 * @public
	 * @method setColor
	 * @param {String} _c
	 */
	p.setColor = function (_c) {
		this.color = _c;
	};
	/**
	 * 设置完整的字体样式
	 * 参考html5字体样式
	 * @public
	 * @method setFont
	 * @param {Integer} _s // 字号 px
	 * @param {String} _f // 字体
	 * @param {Boolean} _i // 斜体
	 * @param {Boolean} _b // 粗体
	 */
	p.setFont = function ( _s, _f, _i, _b ) {
		this._set_font( _s, _f, _i, _b );
		this.font = this._get_font();
	};
	/**
	 * 当前字体样式
	 * @method getFontStyle
	 * @return {String}
	 */
	p.getFontStyle = function () {
		return this.fontStyle;
	}
	/**
	 * 设置字体大小
	 * 
	 * @method setFontStyle
	 * @param {String} _s
	 */
	p.setFontStyle = function (_s) {
		this.fontStyle = _s;
		this.font = this._get_font();
	};
	/**
	 * 当前字体大小
	 * @method getFontSize
	 * @return {Integer}
	 */
	p.getFontSize = function () {
		return this.fontSize;
	}
	/**
	 * 设置字体大小
	 * 
	 * @method setFontSize
	 * @param {Integer}  _s
	 */
	p.setFontSize = function (_s) {
		this.fontSize = _s;
		this.lineHeight = this.fontSize + "px";
		this.font = this._get_font();
	};
	/**
	 * 当前字体基于坐标的水平对齐方式
	 * @method getAlign
	 * @return {String}
	 */
	p.getAlign = function () {
		return this.textAlign;
	}
	/**
	 * 设置文字基于坐标的水平对齐方式
	 * "start", "end", "left", "right", and "center"
	 * @method setAlign
	 * @param {String} _a
	 */
	p.setAlign = function (_a) {
		this.textAlign = _a;
	};
	/**
	 * 当前字体基于坐标的垂直对齐方式
	 * @method getAlign
	 * @return {String}
	 */
	p.getBaseline = function () {
		return this.textBaseline;
	}
	/**
	 * 设置文字基于坐标的垂直对齐方式
	 * "top", "hanging", "middle", "alphabetic", "ideographic", or "bottom".
	 * @method setAlign
	 * @param {String} _a
	 */
	p.setBaseline = function (_b) {
		this.textBaseline = _b;
	};
	/**
	 * 当前显示内容的固定宽度
	 * @method getAlign
	 * @return {String}
	 */
	p.getMaxWidth = function () {
		return this.maxWidth;
	}
	/**
	 * 设置显示内容的固定宽度，内容超出后，会压缩文字宽度至该范围内。
	 * @method setMaxWidth
	 * @param {Integer} _w
	 */
	p.setMaxWidth = function (_w) {
		this.maxWidth = _w;
	}
	/**
	 * 当前显示范围的固定宽度
	 * @method getLineWidth
	 * @return {String}
	 */
	p.getLineWidth = function () {
		return this.lineWidth;
	}
	/**
	 * 设置显示范围的固定宽度，超出后自动换行。可以通过字体大小计算出换行位置。
	 * @method setLineWidth
	 * @param {Integer} _w
	 */
	p.setLineWidth = function (_w) {
		this.lineWidth = _w;
	}
	/**
	 * 当前显示的内容
	 * @method getText
	 * @return {String}
	 */
	p.getText = function () {
		return this.text;
	}
	/**
	 * 设置显示的内容
	 * @method setText
	 * @param {String} _t
	 */
	p.setText = function (_t) {
		this.text = _t;
	}
	/**
	 * 是否使用粗体
	 * @method isBold
	 * @return {Boolean}
	 */
	p.isBold = function () {
		return this.bold;
	}
	/**
	 * 使用粗体
	 * @method setBold
	 * @param {Boolean}
	 */
	p.setBold = function (_v) {
		this.bold = _v;
		this.font = this._get_font();
	}
	/**
	 * 是否使用斜体
	 * @method isItalic
	 * @return {Boolean}
	 */
	p.isItalic = function () {
		return this.italic;
	}
	/**
	 * 使用斜体
	 * @method setItalic
	 * @param {Boolean}
	 */
	p.setItalic = function (_v) {
		this.italic = _v;
		this.font = this._get_font();
	}
// private method: ============================================================
	/**
	 * @private
	 * @method _cache
	 */
	p._cache = function(){
		var size = this.getSize();
		this.cache( 0, 0, size.w, size.h );
	}
	/**
	 * 根据字体属性生成控件字体的属性字符串
	 * @private
	 * @method _get_font
	 * @return {String}
	 */
	p._get_font = function () {
		return ( this.italic ? "italic" : "" ) + ( this.bold ? " bold" : "" ) + " " + this.fontSize + "px " + this.fontStyle;
	}
	/**
	 * @private
	 * @method _set_font
	 * @param {Integer} _s
	 * @param {String} _f
	 * @param {Boolean} _i
	 * @param {Boolean} _b
	 */
	p._set_font = function( _s, _f, _i, _b ){
		this.fontSize = _s;
		this.fontStyle = _f ? _f : "Arial";
		this.italic = _i || this.italic;
		this.bold = _b || this.bold;
	}
	/**
	 * 重置坐标
	 * @private
	 * @method _reset_position
	 */
	p._reset_position = function(){
		var pos = this.property.getPosition();
		var relative_pos = this.parent != null ? this.parent.getSize() : jees.APP.getScreenSize();
		var x = pos.x;
		var y = pos.y;

		if( this.property.alignX == 2 ){
			x = relative_pos.w - this.getSize().w - x;
		}else if( this.property.alignX == 1 ){
			x = ( relative_pos.w - this.getSize().w ) / 2 + x;
		}
		
		if( this.property.alignY == 2 ){
			y = relative_pos.h - this.getSize().h - y;
		}else if( this.property.alignY == 1 ){
			y = ( relative_pos.h - this.getSize().h ) / 2 + y;
		}
		
		this.x = x;
		this.y = y;
	}
	/** 
     * Draws multiline text. 修复createjs的text为中文时，自动换行的问题。
     * TIP: 实测下来，存在BUG，尚未分析具体原因。
     * @method _drawText 
     * @param {CanvasRenderingContext2D} ctx 
     * @param {Object} o 
     * @param {Array} lines 
     * @return {Object} 
     * @extends
     * @protected 
     * 转载：http://blog.csdn.net/yyf1990cs/article/details/51000447
     **/
	p._reset_text = function (ctx, o, lines) {
		var paint = !!ctx;
		if (!paint) {
			ctx = createjs.Text._workingContext;
			ctx.save();
			this._prepContext(ctx);
		}
		var lineHeight = this.lineHeight || this.getMeasuredLineHeight();

		var maxW = 0, count = 0;
		var hardLines = String(this.text).split(/(?:\r\n|\r|\n)/);
		for (var i = 0, l = hardLines.length; i < l; i++) {
			var str = hardLines[i];
			var w = null;

			if (this.lineWidth != null && (w = ctx.measureText(str).width) > this.lineWidth) {
				// text wrapping:  
				var words = str.split(/(\s|[\u4e00-\u9fa5]+)/);//按照中文和空格来分割  
				var splitChineseWords = [];
				for (var wordIndex = 0; wordIndex < words.length; wordIndex++) {
					var chineseWordStr = words[wordIndex];
					if (chineseWordStr == "")
						continue;
					if ((/([\u4e00-\u9fa5]+)/).test(chineseWordStr)) {
						splitChineseWords = splitChineseWords.concat(chineseWordStr.split(""));//再把中文拆分成一个一个的  
					}
					else {
						splitChineseWords.push(chineseWordStr);
					}
				}
				words = splitChineseWords;//重新组成数组  
				str = words[0];
				w = ctx.measureText(str).width;

				for (var j = 1, jl = words.length; j < jl; j += 2) {
					// Line needs to wrap:  
					var nextStr = j + 1 < jl ? words[j + 1] : "";
					var wordW = ctx.measureText(words[j] + nextStr).width;
					if (w + wordW > this.lineWidth) {
						if (words[j] != "\s") //原版没有这个IF，  
							str += words[j]; //英文时为空格，不需要加，中文时为汉字，所以不能漏了  
						if (paint) { this._drawTextLine(ctx, str, count * lineHeight); }
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

			if (paint) { this._drawTextLine(ctx, str, count * lineHeight); }
			if (lines) { lines.push(str); }
			if (o && w == null) { w = ctx.measureText(str).width; }
			if (w > maxW) { maxW = w; }
			count++;
		}

		if (o) {
			o.width = maxW;
			o.height = count * lineHeight;
		}
		if (!paint) { ctx.restore(); }
		return o;
	};

	jees.UI.TextBox = createjs.promote( TextBox, "Text" );
})();