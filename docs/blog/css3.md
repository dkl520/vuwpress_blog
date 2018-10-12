---
title: css3新特性
date: "2018-08-04"
tag: ["css"]
meta:
  - name: css3的一些玩法
    content: css3的一些玩法
  - name: css3的一些玩法
    content: css3的一些玩法
---

有时候 觉得 css 很简单，但是深入进去，你会发现里面的水很深 当时学习的时候 其实都学的会，前端就是这样，东西又多又杂。一段时间不用了，就把这个给忘了。
css3 的属性

### css 新特性

#### css ::before

css 中，CSS 中，`::before` 创建一个伪元素，其将成为匹配选中的元素的第一个子元素。常通过 `content` 属性来为一个元素添加修饰性的内容。此元素默认为行内元素。
CSS3 引入 ::before 是为了将伪类和伪元素区别开来。浏览器也接受由 CSS 2 引入的 :before 写法

```css
/* Add a heart before links */
a::before {
  content: "♥";
}
```

注意: 由`::before` 和`::after` 生成的伪元素 包含在元素格式框内， 因此不能应用在替换元素上， 比如`<img>或<br>` 元素。

使用 `::before` 伪元素的一个简单示例就是用于加入引号。此处同时使用了 `::before` 和 `::after` 来插入引用性文本。

```html
<q>一些引用</q>, 他说, <q>比没有好。</q>.
```

```css
q::before {
  content: "«";
  color: blue;
}
q::after {
  content: "»";
  color: red;
}
```

在本例中，我们使用伪元素来创建一个简单的代办列表。这个方法也用于 UI 的小幅度更改和用户体验的提升。

```html
<ul>
  <li>Buy milk</li>
  <li>Take the dog for a walk</li>
  <li>Exercise</li>
  <li>Write code</li>
  <li>Play music</li>
  <li>Relax</li>
</ul>
```

```css
li {
  list-style-type: none;
  position: relative;
  margin: 2px;
  padding: 0 5em 0 5em 0 5em 2em;
  background: lightgrey;
  font-family: sans-serif;
}

li. done {
  background: #ccff99;
}

li. done::before {
  content: "";
  position: absolute;
  border-color: #009933;
  border-style: solid;
  border-width: 0 0 3em 0 25em 0;
  height: 1em;
  top: 1 3em;
  left: 0 6em;
  margin-top: -1em;
  transform: rotate(45deg);
  width: 0 5em;
}
```

```javascript
var list = document.querySelector("ul");
list.addEventListener(
  "click",
  function(ev) {
    if (ev.target.tagName === "LI") {
      ev.target.classList.toggle("done");
    }
  },
  false
);
```

### ::before 和:before 的区别

- #### 相同点
  1.  都可以用来表示伪类对象，用来设置对象前的内容
  2.  :before 和::before 写法是等效的。
- ### 不同点
  1.  :before 是 css2 的写法，::before 是 css3 的写法
  2.  :before 的兼容性要比::before 好 ，不过在 H5 开发中建议使用::before 比较好
- ### 加分项
  1.  伪类对象要配合 content 属性一起使用
  2.  伪类对象不会出现在 DOM 中，所以不能通过 js 来操作，仅仅是在 CSS 渲染层加入
  3.  伪类对象的特效通常要使用:hover 伪类样式来激活

#### transform 和 transition

transform 是改变元素在网页中的 形状，尺寸，位置和角度的一种方式 ，元素能够实现 2D 转换或 3D 转换

1.  2D:使元素在 x 轴 和 y 轴发生变化 2. 3D:2D 基础上，增加在 Z 轴的变化
    写法为

```css
img {
  transform: rotate(1, 1, 1, 45deg);

  transform: scale(0 5);
  transform: translate(120px, 50%); //偏移(x,y)
  transform: skew(30deg, 20deg); //倾斜(想，y)
  transform: matrix(1, 2, 3, 4, 5, 6);
}
```

过渡(transition),使 CSS 属性值，在一段时间内平滑过渡，能够观察到变化的过程和最后的结果。

```css
#parent {
  width: 400px;
  height: 400px;
  border: 1px solid #000;
  margin: 100px auto;

  /**/
  perspective: 1000px;
  -webkit-perspective: 1000px;
}
#son {
  width: 200px;
  height: 200px;
  background: red;
  margin: 100px auto;
  /*transform:rotatex(0deg);*/
  /* transform:rotatex(45deg) rotatey(45deg) rotatez(45deg); */
  transform: rotatex(45deg) rotatey(45deg) rotatez(45deg);
  transition: transform 5s linear;
  /* transform:rotate3d(1,1,1,45deg); */
}
#son:hover {
  transform: rotatex(4500deg) rotatey(4500deg) rotatez(4500deg);
}
```

配合 transform 转换 可以自动添加动画效果。
属性：过度效果 过度时间 渐变状态
其余为 transition-propertytransition-durationtransition-timing-functiontransition-delay
延迟的过度效果的动画有：

```css
#d1 {
  width: 200px;
  height: 200px;
  background: red;
  /*过渡*/
  /*1. 过渡属性*/
  transition-property: all;
  /*2. 过渡时长*/
  transition-duration: 3s;
  /*3. 速度时间曲线函数*/
  transition-timing-function: linear;
  /*4. 过渡延迟*/
  transition-delay: 5s;
}
#d1:hover {
  background: blue;
  border-radius: 50%;
  width: 400px;
  height: 400px;
}
```

#### animation

1. 什么是动画(animation)，使元素从一种样式逐渐变化为另外一种样式的过程 z
2. 完成动画所需要的步骤
3. 声明动画
   在特点的时间点上设置动画的样式
   时间点：是个模糊时间，而不是具体时间
   样式：元素的 样式
4. 为元素调用动画
   通过 animation 属性 调用动画
   并且指定动画的播放时长. 次数等
5. 声明动画
6. 作用
   通过 @keyframes 关键字 声明动画的"关键帧"
   关键帧：某个时间点上的特殊效果
7. 语法

```css
@keyframes animation_name {
  0%|from {
    /_动画开始时的样式效果_/width: 100px;
    height: 100px;
    background: red;
  }
  50% {
    background: green;
  }
  100%|to {
    /_动画结束时的样式效果_/width: 100px;
    height: 100px;
    border-radius: 50%;
    background: blue;
  }
}
```

兼容性：

```
@-webkit-keyframes animation_name{}
@-moz-keyframes animation_name{}
```

4. 调用动画(兼容性)

- `animation-name`指定调用动画的名称
- `animation-duration`完成一个动画周期的时间必须设置属性 s | ms 作单位
- `animation-timing-function`完成动画时的速度时间曲线函数
- `animation-delay` 动画播放之前的延迟
- `animation-iteration-count`动画播放次数取值：

1. 数值
2. infinite ：无限次播放
3. aniamtion-direction动画播放方向
    取值：
4. normal,默认值，正向播放(0%~100%)
5. reverse,逆向播放(100%~0%)
6. alternate,奇数播放次数是正向播放，偶数播放次数时，逆向播放
7. 简写方式 - animation
   animation:name duration timing-function delay interation-count direction;
8. animation-fill-mode
   规定动画在播放之前或之后，动画效果是否可见。
   取值：
9. none
   不改变默认行为
10. forwards ：动画播放完成后，保持在最后一个 帧 的状态上
11. backwards ：动画播放之前(延迟时间内)，保持在第一个 帧 的状态上
12. both：动画播放前后都采用填充模式
13. animation-play-state
    规定动画的播放状态(运行或暂停)
    取值：
14. paused : 暂停
15. running : 播放

### 示例

```css
	/*声明动画*/
@keyframes scroll {
  0% {
    /*宽度，高度，背景颜色*/
    width: 100px;
    height: 100px;
    background: red;
  }
  25% {
    /*倒角，左外边距，背景颜色*/
    border-radius: 50%;
    margin-left: 200px;
    margin-top: 0px;
    background: yellow;
  }
  50% {
    /*倒角，左外边距，上外边距，背景颜色*/
    border-radius: 50%;
    margin-left: 200px;
    margin-top: 200px;
    background: blue;
  }
  75% {
    border-radius: 50%;
    margin-left: 0px;
    margin-top: 200px;
    background: green;
  }
  100% {
    border-radius: 0px;
    margin-top: 0px;
    background: red;
  }
}
#d1 {
  width: 100px;
  height: 100px;
  /*页面加载时，就实现动画效果*/
  /*名称，时长，速度时间曲线函数，延迟*/
  animation-name: scroll;
  animation-duration: 5s;
  animation-timing-function: linear;
  animation-delay: 5s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  animation-fill-mode: both;
}
#d1:hover {
  animation-play-state: paused;
}
```
```html
<!doctype html>
<html>

<head>
	<title></title>
	<meta charset="utf-8">
	<style>

		#parent {
			position: absolute;
			left: 0;
			top: 0;
			right: 0;
			bottom: 0;
			margin-left:400px;
			margin-top:200px; 
			width: 800px;
			height: 400px;
			border: 1px solid #000;
			padding: 10px;
			/*假定 人眼 到投射平面的距离*/
			-webkit-perspective: 1000px;
            -webkit-perspective-origin: 50% -100%;
		}

		#container {
			width: 800px;
			height: 400px;
			border: 1px solid #999;
			position: relative;
			/*旋转*/
			transform: rotatex(-30deg) rotatey(0deg);
			/*将当前元素变为3d元素*/
			/* position: relative; */
			transform-style: preserve-3d;
			animation-name: rotation;
			animation-duration: 6s;
			animation-timing-function: linear;
			animation-delay: 3s;
			animation-iteration-count: infinite;
			-webkit-transform-origin: center;
			animation-direction: normal;
			animation-fill-mode: both;
		}

		#container div {
			width: 100px;
			height: 100px;
			background: #E4393C;
			position: absolute;
			left: 350px;
			top: 150px;
			
		}

		#container div:nth-child(1) {
			transform: rotatey(0deg) translatez(200px);
		}

		#container div:nth-child(2) {
			transform: rotatey(60deg) translatez(200px);
		}

		#container div:nth-child(3) {
			transform: rotatey(120deg) translatez(200px);
		}

		#container div:nth-child(4) {
			transform: rotatey(180deg) translatez(200px);
		}

		#container div:nth-child(5) {
			transform: rotatey(240deg) translatez(200px);
		}

		#container div:nth-child(6) {
			transform: rotatey(300deg) translatez(200px);
		}

		@-webkit-keyframes rotation {
			0% {
				-webkit-transform: rotateY(0deg);
			}

			100% {
				-webkit-transform: rotateY(360deg);
			}
		}
	</style>
</head>

<body>
	<div id="parent">
		<div id="container">
			<div>1</div>
			<div>2</div>
			<div>3</div>
			<div>4</div>
			<div>5</div>
			<div>6</div>
		</div>
	</div>
</body>

</html>
```
### css 自定义属性

这说明现在 CSS 自定义属性已经能用在实际项目中了，相信不久以后开发者们将大大依赖这个特性。

```css
. foo {
  color: red;
  --theme-color: gray;
}
```

自定义元素的定义由 -- 开头，这样浏览器能够区分自定义属性和原生属性，从而将它俩分开处理。假如只是定义了一个自定义元素和它的属性值，浏览器是不会做出反应的。如上面的代码， . foo 的字体颜色由 color 决定，但 --theme-color 对 . foo 没有作用。

#### 使用 var()获取属性值

```css
. button {
  background-color: var(--theme-color);
}
<!-- 在 css中是有作用域一说的  比如如果两个选择器元素没有任何关系 直接引用它的css变量是没有效果的,但是可以在后代或者子代的选择器中使用。 -->
```

### @apply

语法:

```css
:root {
  --custom-property-name: {
    prop-name: value;
    /*. . . */
  }
}

@apply --custom-property-name;
```

用途：

```css
:root {
  --clearfix: {
    display: table;
    clear: both;
    content: "";
  }
}

div:after {
  @apply --clearfix;
}
```

### Js 获取变量

在 JS 中可以通过 `getPropertyValue()` 和 `setProperty()` 来获取和修改 CSS 变量值。

```javascript
const styles = getComputedStyle(document.querySelector(". foo"));

// Read value.  Be sure to trim to remove whitespace.
const oldColor = styles.getPropertyValue("--color").trim();

// Write value.
foo.style.setProperty("--color", "green");
```
