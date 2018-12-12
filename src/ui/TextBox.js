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
		/**
		 * @public
		 * @property warp
		 * @type {Boolean}
		 * @default true
		 */
		this.warp = true;
// private properties:
		/**
		 * @private
		 * @override
		 * @function _drawText
		 */
		this._drawText = this._reset_text;
		/**
		 * @private
		 * @property _lineCount
		 */
		this._lineCount = 1;
	};
// public static properties:
	var p = createjs.extend( TextBox, createjs.Text );
// public method: =============================================================
	/**
	 * @public
	 * @method initialize
	 */
	p.initialize = function(){
		if( this.property.state ) return;
		this.property.state = true;
		
		this.font = this._get_font();
		this._cache();
		
		this.property.setResourceSize( this.getSize().w, this.getSize().h );
		this.property.initialize( this );
		
		this._cache();
		this._reset_scale();
		this._reset_position();
	};
    /**
     * 获取文本绘制的宽高
	 * @public
     * @method getSize
     * @return { w, h }
     */
	p.getSize = function(){
	    return {w: this.lineWidth ? this.lineWidth : this.getMeasuredWidth() , h: ( this.lineHeight ? this.lineHeight : this.getMeasuredLineHeight() ) * this._lineCount }
	};
    /**
	 * @public
	 * @method getPosition
	 * @return {Integer,Integer} {x,y}
	 */
	p.getPosition = function () {
		return this.property.getPosition();
	};
	/**
     * @method setPosition
     * @extends
     * @param {Integer} _x
     * @param {Integer} _y
     */
	p.setPosition = function( _x, _y ){
		this.property.setPosition( _x, _y );
		this._reset_position();
	};
	/**
	 * 绝对位置
	 * @public 
	 * @method getAbsPosition
	 * @returns {Integer,Integer} {x,y}
	 */
	p.getAbsPosition = function(){
		var m = this.getConcatenatedMatrix();
		return { x: m.tx, y: m.ty };
	};
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
		this._cache();
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
		this._reset_size_position();
	};
	/**
	 * 当前字体样式
	 * @method getFontStyle
	 * @return {String}
	 */
	p.getFontStyle = function () {
		return this.fontStyle;
	};
	/**
	 * 设置字体大小
	 * 
	 * @method setFontStyle
	 * @param {String} _s
	 */
	p.setFontStyle = function (_s) {
		this.fontStyle = _s;
		this.font = this._get_font();
		
		this._reset_size();
		this._reset_position();
	};
	/**
	 * 当前字体大小
	 * @method getFontSize
	 * @return {Integer}
	 */
	p.getFontSize = function () {
		return this.fontSize;
	};
	/**
	 * 设置字体大小
	 * 
	 * @method setFontSize
	 * @param {Integer}  _s
	 */
	p.setFontSize = function (_s) {
		this.fontSize = _s;
		this.lineHeight = this.fontSize;
		this.font = this._get_font();
		
		this._reset_size();
		this._reset_position();
	};
	/**
	 * 当前字体基于坐标的水平对齐方式
	 * @method getAlign
	 * @return {Integer,Integer,} {x,y}
	 */
	p.getAlign = function () {
		return { x: this.property.alignX, y: this.property.alignY };
	};
	/**
	 * 设置文字基于坐标的水平对齐方式
	 * @method setAlign
	 * @param {Integer} _x
	 * @param {Integer} _y
	 */
	p.setAlign = function ( _x, _y ) {
		this.property.setAlign( _x, _y );
		
		this._reset_position();
	};
	/**
	 * 当前显示内容的固定宽度
	 * @method getAlign
	 * @return {String}
	 */
	p.getMaxWidth = function () {
		return this.maxWidth;
	};
	/**
	 * 设置显示内容的固定宽度，内容超出后，会压缩文字宽度至该范围内。
	 * @method setMaxWidth
	 * @param {Integer} _w
	 */
	p.setMaxWidth = function (_w) {
		this.maxWidth = _w;
		
		this._reset_size();
		this._reset_position();
	};
	/**
	 * 当前显示范围的固定宽度
	 * @method getLineWidth
	 * @return {String}
	 */
	p.getLineWidth = function () {
		return this.lineWidth;
	};
	/**
	 * 设置显示范围的固定宽度，超出后自动换行。可以通过字体大小计算出换行位置。
	 * @method setLineWidth
	 * @param {Integer} _w
	 */
	p.setLineWidth = function (_w) {
		this.lineWidth = _w;
		
		this._reset_size();
		this._reset_position();
	};
	/**
	 * 当前显示的内容
	 * @method getText
	 * @return {String}
	 */
	p.getText = function () {
		return this.text;
	};
	/**
	 * 设置显示的内容
	 * @method setText
	 * @param {String} _t
	 */
	p.setText = function (_t) {
		this.text = _t;
		
		this._reset_size();
		this._reset_position();
	};
	/**
	 * 是否使用粗体
	 * @method isBold
	 * @return {Boolean}
	 */
	p.isBold = function () {
		return this.bold;
	};
	/**
	 * 使用粗体
	 * @method setBold
	 * @param {Boolean}
	 */
	p.setBold = function (_v) {
		this.bold = _v;
		this.font = this._get_font();
		this._reset_size();
		this._reset_position();
	};
	/**
	 * 是否使用斜体
	 * @method isItalic
	 * @return {Boolean}
	 */
	p.isItalic = function () {
		return this.italic;
	};
	/**
	 * 使用斜体
	 * @method setItalic
	 * @param {Boolean}
	 */
	p.setItalic = function (_v) {
		this.italic = _v;
		this.font = this._get_font();
		this._reset_size();
		this._reset_position();
	};
	/**
	 * 设置是否可见
	 * @public
	 * @method setVisible
	 * @param {Boolean} _v
	 */
	p.setVisible = function(_v){
		this.visible = _v;
	};
	/**
	 * 是否可见
	 * @public
	 * @method isVisible
	 * @return {Boolean}
	 */
	p.isVisible = function(){
		return this.visible;
	};
	/**
	 * @public
	 * @method setScale
	 * @param {Float} _x
	 * @param {Float} _y
	 */
	p.setScale = function( _x, _y ){
		this.property.setScale( _x, _y );
		this._reset_scale();
	};
	/**
	 * @public
	 * @method getScale
	 * @returns {Float,Float} {x,y}
	 */
	p.getScale = function(){
		return this.property.getScale();
	};
	/**
	 * @public
	 * @method isWarp
	 * @returns {Boolean}
	 */
	p.isWarp = function(){
		return this.warp;
	}
	/**
	 * @public
	 * @method setWarp
	 * @param {Boolean} _v
	 */
	p.setWarp = function( _v ){
		this.warp = _v;
		this.setText( this.text );
	}
// private method: ============================================================
	/**
	 * @private
	 * @method _cache
	 */
	p._cache = function(){
		var size = this.getSize();
		this.cache( 0, 0, size.w, size.h );
	};
	/**
	 * @private
	 * @method _reset_scale
	 */
	p._reset_scale = function(){
		var scale = this.getScale();
		
		this.scaleX = scale.x;
		this.scaleY = scale.y;
	};
	/**
	 * 根据字体属性生成控件字体的属性字符串
	 * @private
	 * @method _get_font
	 * @return {String}
	 */
	p._get_font = function () {
		return ( this.italic ? "italic" : "" ) + ( this.bold ? " bold" : "" ) + " " + this.fontSize + "px " + this.fontStyle;
	};
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
	};
	/**
	 * @private
	 * @method _reset_size
	 */
	p._reset_size = function(){
		this._cache();

		this.property.setResourceSize( this.getSize().w, this.getSize().h );
		this.property.setSize();
		this.property.setAlign();
		
		this._cache();
	}
	/**
	 * 重置坐标
	 * @private
	 * @method _reset_position
	 */
	p._reset_position = function(){
		var pos = this.getPosition();
		this.x = pos.x;
		this.y = pos.y;
	};
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
	p._reset_text = function ( _ctx, _o, _lines ) {
		var paint = !!_ctx;
		if ( !paint ) {
			_ctx = createjs.Text._workingContext;
			_ctx.save();
			this._prepContext( _ctx );
		}
		
		var lineHeight = this.lineHeight || this.getMeasuredLineHeight();
		var maxW = 0, count = 0;
		if( !this.warp ){
			if ( paint ) { this._drawTextLine( _ctx, this.text, count * lineHeight ); }
			if ( _lines ) { _lines.push( this.text ); }
			return;
		}
		var hardLines = String( this.text ).split(/(?:\r\n|\r|\n)/);
		
		for ( var i = 0, l = hardLines.length; i < l; i++ ) {
			var str = hardLines[i];
			var w = null;
			if ( this.lineWidth != null && ( w = _ctx.measureText( str ).width ) > this.lineWidth ) {
				// text wrapping:  
				var words = str.split(/(\s|[\u4e00-\u9fa5]+)/);//按照中文和空格来分割  
				var splitChineseWords = [];
				for (var wordIndex = 0; wordIndex < words.length; wordIndex++) {
					var chineseWordStr = words[wordIndex];
					if ( chineseWordStr == "" )
						continue;
					if ( (/([\u4e00-\u9fa5]+)/).test(chineseWordStr) ) {
						splitChineseWords = splitChineseWords.concat( chineseWordStr.split("") );//再把中文拆分成一个一个的  
					}
					else {
						splitChineseWords.push(chineseWordStr);
					}
				}
				words = splitChineseWords;//重新组成数组  
				var word = "";
				// 这里因为原来存在BUG，重新写过。逻辑可能不是最优。
				
				for( var j = 0; j < words.length; j ++ ){
					var w = _ctx.measureText( word + words[j] ).width;
					console.log( "---", w, this.lineWidth )
					if( w >= this.lineWidth ){
						if( w == this.lineWidth ){
							if ( words[j] != "\s") word += words[j];
						}
						if ( paint ) { this._drawTextLine( _ctx, word, count * lineHeight ); }
						if ( _lines ) { _lines.push( word ); }
						word = "";
						count++;
					}else{
						if ( words[j] != "\s") word += words[j];
					}
				}
				if( word != "" ){
					if ( paint ) { this._drawTextLine( _ctx, word, count * lineHeight ); }
					if ( _lines ) { _lines.push( word ); }
					count++;
				}
			}else{
				if ( paint ) { this._drawTextLine( _ctx, str, count * lineHeight); }
				if ( _lines ) { lines.push( str ); }
				if ( _o && w == null) { w = _ctx.measureText( str ).width; }
				if ( w > maxW ) { maxW = w; }
				count++;
			}
		}
		
		this._lineCount = count;
		if ( _o ) {
			_o.width = maxW;
			_o.height = count * lineHeight;
		}
		if ( !paint ) { _ctx.restore(); }
		return _o;
	};

	jees.UI.TextBox = createjs.promote( TextBox, "Text" );
})();