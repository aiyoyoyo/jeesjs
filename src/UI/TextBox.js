/*
 * Author: Aiyoyoyo
 * https://github.com/aiyoyoyo/jeesjs/tree/master/src/TextBox.js
 * License: MIT license
 */

/**
 * @module JeesJS
 */
// namespace:
this.jeesjs = this.jeesjs || {};

(function () {
	"use strict";
	// constructor:
	/**
	 * TODO: 点击事件必须点击绘制的部分，考虑通过增加底板来实现点击事件。
	 * @class TextBox
	 * @extends jeesjs.Widget
	 * @constructor
	 */
	function TextBox() {
		this.Widget_constructor();
		// private properties:
		// 拆分的字体样式-粗体
		this._font_bold = "";
		// 拆分的字体样式-斜体体
		this._font_italic = "";
		// 拆分的字体样式-字体大小
		this._font_size = 12;
		// 拆分的字体样式-字体样式
		this._font_style = " Arial";
		/**
		 * 控件默认文本
		 * 
		 * @property _text
		 * @type {String}
		 * @default ""
		 */
		this._text = "";
		/**
		 * 控件默认背景颜色
		 * 
		 * @property _color
		 * @type {String}
		 * @default #000000
		 */
		this._color = "#ffffff";
		/**
		 * 控件默认字体大小、样式等
		 * 
		 * @property _font
		 * @type {String}
		 * @default #000000
		 */
		this._font = this._get_font();
		/**
		 * 控件文本是否自动换行，TODO：未实现
		 * @property _warp
		 * @type {Boolean}
		 * @default false
		 */
		this._warp = false;
		/**
		 * CreateJS图形控件
		 * 
		 * @property _text
		 * @type {createjs.Text}
		 */
		this._object = new createjs.Text(this._text, this._font, this._color);
		this._object._drawText = this._reset_text;
		this._object.lineHeight = this._font_size;
		
		// public properties:
		this.init();
	};
	// public static properties
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

	var p = createjs.extend(TextBox, jeesjs.Widget);
	// public method
    /**
     * 设置坐标
     * @method setPosition
     * @extends
     * @param {Number} _x
     * @param {Number} _y
     */
	p.setPosition = function (_x, _y) {
		this.Widget_setPosition(_x, _y);
		var pos = this.getAbsPosition();
		this._object.x = pos.x;
		this._object.y = pos.y;
		this._object.x = this._x;
		this._object.y = this._y;
	};
	/**
	 * 当前颜色
	 * @method getColor
	 * @return {String}
	 */
	p.getColor = function () {
		return this._color;
	};
	/**
	 * 设置颜色
	 * 
	 * @method setColor
	 * @param {String}
	 *            _c
	 */
	p.setColor = function (_c) {
		this._color = _c;
		this._object.color = _c;
	};
	/**
	 * 设置完整的字体样式
	 * 参考html5字体样式
	 * @method setFont
	 * @param {String} _f ex."12px Arial"
	 */
	p.setFont = function (_f) {
		this._font = _f;
		this._object.font = _f;
	};
	/**
	 * 当前字体样式
	 * @method getFontStyle
	 * @return {String}
	 */
	p.getFontStyle = function () {
		return this._font_style;
	}
	/**
	 * 设置字体大小
	 * 
	 * @method setFontStyle
	 * @param {String}
	 *            _s
	 */
	p.setFontStyle = function (_s) {
		this._font_style = _s;
		this._object.font = this._get_font();
	};
	/**
	 * 当前字体大小
	 * @method getFontSize
	 * @return {Number}
	 */
	p.getFontSize = function () {
		return this._font_size;
	}
	/**
	 * 设置字体大小
	 * 
	 * @method setFontSize
	 * @param {Number}
	 *            _s
	 */
	p.setFontSize = function (_s) {
		this._font_size = _s;
		this._object.lineHeight = this._font_size;
		this._object.font = this._get_font();
	};
	/**
	 * 当前字体基于坐标的水平对齐方式
	 * @method getAlign
	 * @return {String}
	 */
	p.getAlign = function () {
		return this._object.textAlign;
	}
	/**
	 * 设置文字基于坐标的水平对齐方式
	 * "start", "end", "left", "right", and "center"
	 * @method setAlign
	 * @param {String}
	 *            _a
	 */
	p.setAlign = function (_a) {
		this._object.textAlign = _a;
	};
	/**
	 * 当前字体基于坐标的垂直对齐方式
	 * @method getAlign
	 * @return {String}
	 */
	p.getBaseline = function () {
		return this._object.textBaseline;
	}
	/**
	 * 设置文字基于坐标的垂直对齐方式
	 * "top", "hanging", "middle", "alphabetic", "ideographic", or "bottom".
	 * @method setAlign
	 * @param {String}
	 *            _a
	 */
	p.setBaseline = function (_b) {
		this._object.textBaseline = _b;
	};
	/**
	 * 当前显示内容的固定宽度
	 * @method getAlign
	 * @return {String}
	 */
	p.getMaxWidth = function () {
		return this._object.maxWidth;
	}
	/**
	 * 设置显示内容的固定宽度，内容超出后，会压缩文字宽度至该范围内。
	 * @method setMaxWidth
	 * @param {Number} _w
	 */
	p.setMaxWidth = function (_w) {
		this._object.maxWidth = _w;
	}
	/**
	 * 当前显示范围的固定宽度
	 * @method getAlign
	 * @return {String}
	 */
	p.getLineWidth = function () {
		return this._object.lineWidth;
	}
	/**
	 * 设置显示范围的固定宽度，超出后自动换行。可以通过字体大小计算出换行位置。
	 * @method setLineWidth
	 * @param {Number} _w
	 */
	p.setLineWidth = function (_w) {
		this._object.lineWidth = _w;
	}
	/**
	 * 当前显示的内容
	 * @method getAlign
	 * @return {String}
	 */
	p.getText = function () {
		return this._text;
	}
	/**
	 * 设置显示的内容
	 * @method setText
	 * @param {String} _t
	 */
	p.setText = function (_t) {
		this._text = _t;
		this._object.text = _t;
	}
	/**
	 * 是否使用粗体
	 * @method isBold
	 * @return {Boolean}
	 */
	p.isBold = function () {
		return this._font_bold != "";
	}
	/**
	 * 使用粗体
	 * @method setBold
	 * @param {Boolean}
	 */
	p.setBold = function (_v) {
		this._font_bold = _v ? " bold" : "";
		this._text.font = this._get_font();
	}
	/**
	 * 是否使用斜体
	 * @method isItalic
	 * @return {Boolean}
	 */
	p.isItalic = function () {
		return this._font_bold != "";
	}
	/**
	 * 使用斜体
	 * @method setBold
	 * @param {Boolean}
	 */
	p.setItalic = function (_v) {
		this._font_italic = _v ? " italic" : "";
		this._text.font = this._get_font();
	}
	// private method
	/**
	 * 根据字体属性生成控件字体的属性字符串
	 * @method _get_font
	 * @private
	 * @return {String}
	 */
	p._get_font = function () {
		this._font = this._font_italic + this._font_bold + " " + this._font_size + "px " + this._font_style;
		return this._font;
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

	jeesjs.TextBox = createjs.promote(TextBox, "Widget");
})();