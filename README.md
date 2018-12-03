# jeesjs

## 内容介绍
基于CreateJS封装的H5开发用小型框架，目测会提供一些配套的功能组件。

下面的组件介绍本来想配图的，懒。先用文字描述吧。另外结构在改版，我把改版好的部分先放上来做介绍。
## 应用层组件
* jees.APP 应用管理器
> 全局只有一个canvas和一个stage对象
> 没完成，待后续补完
* jees.MM 模块管理器
> 管理继承jees.Module对象，用来实现应用各模块之间切换。
> 模块切换采用先入后出的模式，提供模块中断和回复时的通知。
* jees.QM 资源队列管理器
> 目前没有对资源做分类管理，基本采用了key-val的形式来记录已加载的资源文件。
> 演示代码写的不好，加载好的内容没有画在canvas上，为了减少导入内容，直接显示在了canvas后面。
> 同一时间，只允许一个加载回调事件。
* jees.CM 绘制管理器
> 所有的UI组件或者其他绘制内容都通过该管理器绘制在默认canvas上
> 默认会提供几个层级的容器，显示层级顺序BACK最低，CONSOLE最高。
* jees.DB 数据管理器
> 未完成

# 版本更新
## Ver 1.1.0
* 代码结构和命名重新做了整理。
* 命名空间由jeesjs的改为jees，励志做个最短的男人。
* demo改为examples，并重新编写了示例代码。

## Ver 1.1.1 alpha
* 重新设计了UI控件结构
* 加入了配置解析方式的UI生成器（详见 https://github.com/aiyoyoyo/jeesjs/tree/master/src/extends/LayoutManager.js )
* 此版本临时版休整版，部分旧内容已经移除，重新整理控件属性
## UI
* jees.UI.Widget
> extend createjs.Container
* jees.UI.Panel
> extend jees.UI.Widget
* jees.UI.TextBox
> extend createjs.Text
* jees.UI.ImageBox
> extend createjs.Bitmap
* jees.UI.ImageSpt
> extend createjs.Sprite
* jees.UI.Button
> extend jees.UI.ImageSpt
> text used jees.UI.TextBox
* jees.UI.CheckBox
> extend jees.UI.Button
* jees.UI.InputBox
> extend jees.UI.ImageBox
> enableMask的含义变为是否允许遮罩。
## 其他说明
* 最近瞎忙，居然搁置了快一年才更新有价值的内容。

## 其他
CSDN地址： http://blog.csdn.net/aiyoyoyo/
讨论群：8802330,欢迎各位加入讨论。