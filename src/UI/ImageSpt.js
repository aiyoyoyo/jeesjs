/*
 * Author: Aiyoyoyo https://www.jeesupport.com/assets/jeesjs/src/UI/ImageSpt.js
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
	 * 支持基本的图片格式。
	 * @class ImageSpt
	 * @extends jeesjs.Widget
	 * @param {Boolean} _b 是否有预设动作 true 自己设定animations的值，false则需要指定begin和end属性
	 * @param {String} _r 参数 "resname"
	 * @param {Object} _o 属性定义
	 * @param {Widget}
	 *            _p
	 * @constructor
	 */
	function ImageSpt( _b, _r, _o, _p ) {
		this.Widget_constructor(_p);
// private properties:		
		/**
		 * 控件属性配置
		 * @property _options
		 * @type {Object}
		 * @protected
		 */
		this._options 	= {
			type : "normal",		// 播放类型
			begin : 0,			// 起始帧
			end	: 1,			// 结束帧
			row : 0,			// 拆分行
			col : 0,			// 拆分列
			count : 1,			// 帧数
			rate : 30,			// 帧间隔
			speed : 1,			// 速率倍数
			width : 0,			
			height : 0,
			regX : 0,			// 热点横坐标
			regY : 0,			// 人点纵坐标
			animations : []		// 预设动作
		};
		
		if (typeof _o === 'object') {
            for (var i in _o) {
                if (_o.hasOwnProperty(i)) {
                    this._options[i] = _o[i];
                }
            }
        }
        
        if( !_b )
	        this._options.animations = {
				normal: [ this._options.begin, this._options.end, this._options.type, this._options.speed ]
	        }
        
        var r = jeesjs.QM.getSource( _r ); 	//图片源
// public properties:
		/**
		 * 图片资源宽度
		 * @property sourceWidth
		 * @type {Number}
		 */
		this.sourceWidth = r.width;
		/**
		 * 图片资源高度
		 * @property sourceHeight
		 * @type {Number}
		 */
		this.sourceHeight = r.height;
		/**
		 * 宽度
		 * @property w
		 * @type {Number}
		 */
		this._width = this._options.width != 0 ? this._options.width :			//手动设置宽
			this._options.row != 0 ? this.sourceWidth / this._options.row : //拆分按钮的宽度=图片宽度/行
				b.width;													//图片源宽度
		/**
		 * 高度
		 * @property h
		 * @type {Number}
		 */
		this._height = this._options.height != 0 ? this._options.height :			//手动设置高
			this._options.row != 0 ? this.sourceWidth / this._options.row : //拆分按钮的高度=图片高度/列
				b.height;													//图片源高度
// private properties:
		/**
		 * 构建精灵的数据对象
		 * 数据定义参考createjs.SpriteSheet
		 * @property _btn_data
		 * @type {Object}
		 */
		this._spt_data = {
			framerate: this._options.rate,
			images : [ r ],
			frames : {
				width : this._width,
				height : this._height,
				count : this._options.count,
				regX: this._options.regX,
				regY: this._options.regY
			},
			animations : this._options.animations
		};
		/**
		 * 精灵数据定义表
		 * @property _btn_sheet
		 * @type {createjs.SpriteSheet}
		 */
		this._spt_sheet = new createjs.SpriteSheet( this._spt_data );
		/**
		 * 按钮绘制精灵
		 * @property _object
		 * @type {createjs.Sprite}
		 */
		this._object = new createjs.Sprite( this._spt_sheet, this._options.type );
// public properties:
		
		this.setPosition( 0, 0 );
		this._init_finish();
	};
// public static properties

	var p = createjs.extend(ImageSpt, jeesjs.Widget);
// public method
	/**
     * 设置坐标
     * @method setPosition
     * @extends
     * @param {Number} _x
     * @param {Number} _y
     */
	p.setPosition = function( _x, _y ){
		this.Widget_setPosition( this._parent ? this._parent._x + _x : _x, this._parent ? this._parent._y + _y : _y );
		this._object.x = this._x;
		this._object.y = this._y;
	};
    /**
     * 播放动画，如果是帧数，会重置播放的动作到默认动作[normal]下面。
     * @method play
     * @param {String|Number} _n 指定播放哪个动作或者那一帧
     */
    p.play = function( _n ){
    	if( _n ) this._object.gotoAndPlay( _n );
    	else this._object.play ();
    };
    /**
     * 停止播放
     * @method stop
     * @param {String|Number} _n 指定停止或者停止到那一帧
     */
    p.stop = function( _i ){
    	if( _i ) this._object.gotoAndStop( _i );
    	else this._object.stop ();
    };
// private method
	
	jeesjs.ImageSpt = createjs.promote(ImageSpt, "Widget");
})();