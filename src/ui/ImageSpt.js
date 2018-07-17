/*
 * Author: Aiyoyoyo https://www.jeesupport.com/assets/jeesjs/src/ui/ImageSpt.js
 * License: MIT license
 */

/**
 * @module JeesJS
 */
// namespace:
this.jees = this.jees || {};

(function () {
	"use strict";
	// constructor: ===========================================================
	/**
	 * 支持基本的图片格式。
	 * @class ImageSpt
	 * @extends jeesjs.Widget
	 * @param {String} _r 参数 "resname"
	 * @param {Object} _o 属性定义
	 * @constructor
	 */
	function ImageSpt(_r, _o) {
		this.ImageBox_constructor(_r);
	// private properties: ====================================================
		/**
		 * 控件属性配置
		 * @property _options
		 * @type {Object}
		 * @protected
		 */
		this._options = {
			type: "default",	// 播放类型
			begin: 0,			// 起始帧
			end: 1,				// 结束帧
			row: 0,				// 拆分行
			col: 0,				// 拆分列
			count: 1,			// 帧数
			rate: 30,			// 帧间隔
			speed: 1,			// 速率倍数
			width: 0,
			height: 0,
			regX: 0,			// 热点横坐标
			regY: 0,			// 热点纵坐标
			animations: {		// 预设动作
				default: [0, 1, "default", 1]
			}
		};

		if (typeof _o === 'object') {
			for (var i in _o) {
				if (_o.hasOwnProperty(i)) {
					this._options[i] = _o[i];
				}
			}
		}
		// private properties:
		/**
		 * 构建精灵的数据对象
		 * 数据定义参考createjs.SpriteSheet
		 * @property _btn_data
		 * @type {Object}
		 */
		this._spt_data = null;
		/**
		 * 精灵数据定义表
		 * @property _btn_sheet
		 * @type {createjs.SpriteSheet}
		 */
		this._spt_sheet = new createjs.SpriteSheet(this._spt_data);
		/**
		 * 绘制精灵
		 * @property _object
		 * @type {createjs.Sprite}
		 */
		this._object = null;
		/**
		 * 是否播放
		 */
		this._play = 0;
		// public properties:
		this._onload( _r );

		// /**
		//  * 图片资源宽度
		//  * @property sourceWidth
		//  * @type {Number}
		//  */
		// this.sourceWidth = r.width;
		// /**
		//  * 图片资源高度
		//  * @property sourceHeight
		//  * @type {Number}
		//  */
		// this.sourceHeight = r.height;
		// /**
		//  * 宽度
		//  * @property w
		//  * @type {Number}
		//  */
		// this._width = this._options.width != 0 ? this._options.width :			//手动设置宽
		// 	this._options.row != 0 ? this.sourceWidth / this._options.row : //拆分按钮的宽度=图片宽度/行
		// 		b.width;													//图片源宽度
		// /**
		//  * 高度
		//  * @property h
		//  * @type {Number}
		//  */
		// this._height = this._options.height != 0 ? this._options.height :			//手动设置高
		// 	this._options.row != 0 ? this.sourceWidth / this._options.row : //拆分按钮的高度=图片高度/列
		// 		b.height;
		
		console.log( "--", this._options );
	};

	var p = createjs.extend(ImageSpt, jeesjs.ImageBox);
	// public method: =========================================================
	/**
	 * 切割行列
	 * @param {Number} _r 
	 * @param {Number} _c 
	 */
	p.setSplit = function (_r, _c) {
		if (_r) this._options.row = _r;
		if (_c) this._options.col = _c;
		this._reset_anima();
	}
    /**
     * 播放动画，如果是帧数，会重置播放的动作到默认动作[normal]下面。
     * @method play
     * @param {String|Number} _n 指定播放哪个动作或者那一帧
     */
	p.play = function (_n) {
		if (_n) this._object.gotoAndPlay(_n);
		else this._object.play();
	};
    /**
     * 停止播放
     * @method stop
     * @param {String|Number} _n 指定停止或者停止到那一帧
     */
	p.stop = function (_i) {
		if (_i) this._object.gotoAndStop(_i);
		else this._object.stop();
	};
	// private method: ========================================================
	/**
	 * @method _onload_finish
	 * @param {Event} _e
	 * @private
	 */
	p._onload_finish = function( _o ){
		_o._source = typeof _o._sourcePath === "object" ? _o._sourcePath : jeesjs.QM.getSource( _o._sourcePath );
		// _o._object = new createjs.Bitmap( _o._source );
		_o._object = new createjs.Sprite(this._spt_sheet);
		_o._reset();
	}
	/** 
	 * @method _reset_anima
	 * @private
	 */
	p._reset_anima = function () {
		console.log( this._options );
		this._spt_data = {
			framerate: this._options.rate,
			images: [this._source],
			frames: {
				width: this._width,
				height: this._height,
				count: this._options.count,
				regX: this._options.regX,
				regY: this._options.regY
			},
			animations: this._options.animations
		};
	}
	p._reset_coord = function () {
		var pos = this.getAbsPosition();
		this._object.x = pos.x;
		this._object.y = pos.y;

		this._object.sourceRect = this._rect;
		if (this._width != this._sourceWidth || this._height != this._sourceHeight)
			this.setScale(this._width / this._sourceWidth, this._height / this._sourceHeight);
	}
	/**
	 * 重建坐标和大小
	 * @method _reset
	 * @private
	 */
    p._reset = function(){
		if( this._state ) return;
		this.init();
		this._state = true;
		console.log( "--" , this._object.getBounds() );
		var b = this._object.getBounds();
		this._reset_source_size( b.width, b.height );
		this._reset_rect();
		this._reset_size();
		this._reset_position();
		this._reset_anima();
    };
	// p._reset = function () {
	// 	if (this._spt_data == null) {
	// 		// 资源第一次加载，需要重置this._object对象和this._spt_sheet对象的属性


	// 	}




	// 	if (this._sourceWidth == 0 || this._sourceHeight == 0) {
	// 		var b = this._object.getBounds();
	// 		this._sourceWidth = b.width;
	// 		this._sourceHeight = b.height;
	// 	}
	// 	console.log("1---", this._width);
	// 	if (this._width == 0 || this._height == 0) {
	// 		this.setSize(this._sourceWidth, this._sourceHeight);
	// 	}
	// 	console.log("2---", this._width);
	// 	this._reset_data();
	// 	this._reset_coord();
	// };


	jeesjs.ImageSpt = createjs.promote(ImageSpt, "ImageBox");
})();