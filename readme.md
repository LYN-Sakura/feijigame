### canvas介绍
>canvas 是什么

Canvas是HTML5新增的组件，它就像一块幕布，可以用JavaScript在上面绘制各种图表、动画等。

>为什么用canvas

没有Canvas的年代，绘图只能借助Flash插件实现，页面不得不用JavaScript和Flash进行交互。有了Canvas，我们就再也不需要Flash了，直接使用JavaScript完成绘制

### canvas的使用
* 在绘制canvas前，要先定义一个矩形框，如果你的浏览器不支持canvas标签，则标签内的文字会被显示出来
```html
<canvas id="canvas">你的浏览器不支持Canvas</canvas>
```

* 画一条线
```js
	const canvas = document.querySelector('#canvas')
	//返回一个用于在画布上绘图的环境
	const context = canvas.getContext('2d')
	//画笔的起始位置
	context.moveTo(100, 100)   
	//画笔的结束位置   
	context.lineTo(500, 300)                       
	//线的宽度
	context.lineWidth = 5;      
	//线的颜色
	context.strokeStyle = '#005588' 
	//开始绘制
	context.stroke()                
```


* 画一个三角形
```js
	const canvas = document.querySelector('#canvas')
	//返回一个用于在画布上绘图的环境
	const context = canvas.getContext('2d')
	context.moveTo(100, 100)   
	context.lineTo(500, 300)   
	context.lineTo(0, 0)
	//设置填充颜色
	// context.fillStyle='rgb(2,100,30)'   
	//开始进行着色
	// context.fill()                      
	//线的宽度
	context.lineWidth = 5;      
	//线的颜色
	context.strokeStyle = '#005588' 
	//开始绘制
	context.stroke()                
```



* 画多个图形
```js
	const canvas = document.querySelector('#canvas')
	//返回一个用于在画布上绘图的环境
	const context = canvas.getContext('2d')
	//开始一个新的路径绘制 
	context.beginPath()
	//画笔的起始位置
	context.moveTo(0, 0)
	//画笔的结束位置   
	context.lineTo(100, 100)
	context.lineTo(100, 300)
	context.lineTo(0, 20)
	//结束一个路径的绘制
	context.closePath()
	//线的宽度			  
	context.lineWidth = 5;
	//线的颜色
	context.strokeStyle = '#e8b234'
	//开始绘制
	context.stroke()
	//开始一个新的路径绘制
	context.beginPath()
	//画笔的起始位置
	context.moveTo(200, 0)
	//画笔的结束位置   
	context.lineTo(200, 200)
	context.lineTo(150, 200)
	context.lineTo(200, 0)
	//结束一个路径的绘制
	context.closePath()
	//线的宽度
	context.lineWidth = 5;
	//线的颜色
	context.strokeStyle = '#e8b234'
	//开始绘制
	context.stroke()            
```

* 自带的图形api
	+ 矩形
```js
	// api
	context.fillRect(
		x,			//矩形左上角的 x 坐标
		y,			//矩形左上角的 y 坐标
		width,		//矩形的宽度，以像素计
		height,		//矩形的高度，以像素计
	);
	// 实例
	const canvas = document.querySelector('#canvas')
	//返回一个用于在画布上绘图的环境
	const context = canvas.getContext('2d')
	context.lineWidth = 5;
	context.fillStyle = '#005588';
	// fillRect() 绘制矩形（填充） strokeRect() 绘制矩形（无填充）
	context.fillRect(20, 20, 150, 100);
	context.stroke();
```
	
	+ 圆形
```js
// api
context.arc(
	centerx ,           //圆心的x轴坐标位置
	centery,            //圆心的y轴坐标位置
	radius,             //圆弧半径的值
	startingAngle,      //以哪个弧度制开始
	endingAngle,        //在哪个弧度制结束
	anticlockwise=false //顺时针方向绘制,为true则逆时针。默认为顺时针。
)
// 实例
const canvas = document.querySelector('#canvas')
const context = canvas.getContext('2d')
context.lineWidth = 5;
context.strokeStyle = '#005588';
// Math.PI = 3.14 = 180°
context.arc(300, 300, 200, 0, 1.5 * Math.PI);
context.stroke();
```


### 七巧板案例
```js
let tangram = [{
		p: [{
			x: 0,
			y: 0
		}, {
			x: 800,
			y: 0
		}, {
			x: 400,
			y: 400
		}],
		color: '#caff67'
	},
	{
		p: [{
			x: 0,
			y: 0
		}, {
			x: 400,
			y: 400
		}, {
			x: 0,
			y: 800
		}],
		color: '#67becf'
	},
	{
		p: [{
			x: 800,
			y: 0
		}, {
			x: 800,
			y: 400
		}, {
			x: 600,
			y: 600
		}, {
			x: 600,
			y: 200
		}],
		color: '#ef3d61'
	},
	{
		p: [{
			x: 600,
			y: 200
		}, {
			x: 600,
			y: 600
		}, {
			x: 400,
			y: 400
		}],
		color: '#f9f51a'
	},
	{
		p: [{
			x: 400,
			y: 400
		}, {
			x: 600,
			y: 600
		}, {
			x: 400,
			y: 800
		}, {
			x: 200,
			y: 600
		}],
		color: '#a594c0'
	},
	{
		p: [{
			x: 200,
			y: 600
		}, {
			x: 400,
			y: 800
		}, {
			x: 0,
			y: 800
		}],
		color: '#fa8ecc'
	},
	{
		p: [{
			x: 800,
			y: 400
		}, {
			x: 800,
			y: 800
		}, {
			x: 400,
			y: 800
		}],
		color: '#f6ca29'
	},
]
window.onload = function() {
	let canvas = document.getElementById('canvas'); //获取canvas

	canvas.width = 800; //设定canvas的宽度  
	canvas.height = 800; //设定canvas的高度

	if (canvas.getContext('2d')) {

		let context = canvas.getContext('2d'); //获取绘图的上下文环境

		for (let i = 0; i < tangram.length; i++) {
			draw(tangram[i], context)
		}


	} else {
		alert('您的浏览器不支持canvas,请更换浏览器尝试~')
	}
}

function draw(piece, context) {
	context.beginPath();
	context.moveTo(piece.p[0].x, piece.p[0].y);
	for (let i = 1; i < piece.p.length; i++) {
		context.lineTo(piece.p[i].x, piece.p[i].y)
	}
	context.closePath();

	context.fillStyle = piece.color;
	context.fill();

	context.strokeStyle = 'black';
	context.lineWidth = 3;
	context.stroke();

}
```



<!-- 火狐浏览器打开有声音bug 推荐用谷歌浏览器打开 --