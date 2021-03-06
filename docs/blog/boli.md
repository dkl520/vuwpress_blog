---
title: 毛玻璃效果
date: '2018-08-04'
tag: ['css']
meta:
  -
    name: 前端常见跨域解决方案
    content: 前端常见跨域解决方案
  -
    name: 前端常见跨域解决方案
    content: 前端常见跨域解决方案
---
## 毛玻璃效果 - 《css揭秘》笔记

## Demo地址
[http://ccforward.github.io/css-secrets/frosted-glass/index.html](http://ccforward.github.io/css-secrets/frosted-glass/index.html)

## 方案
1. 大背景是 `background-attachment: fixed` 处理起来容易些，非固定背景的情况比较麻烦
2. 首先不能对元素本身做模糊处理，所以就对一个伪元素进行处理，将其定位到元素的下层，那他的背景就和 body 的背景无缝匹配了

主要代码：

``` css
main {
	position: relative
}
main::before {
	content: '';
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	z-index: -1; /* 伪元素置于最下面 */
	background: rgba(255, 0, 0, .5); /* 添加背景色做测试 */
}
```

效果：
![](http://pic.yupoo.com/ccking/FDKpXeeY/ELBjS.png)

然后就把红色背景替换掉 开始进行模糊处理  
添加代码：

```css
body, main::before {
background: url(//gw.alicdn.com/tps/i1/TB1Zc6qHpXXXXb3XFXXeowVVXXX-1200-800.jpg) 0 / cover fixed;
}
main {
	background: hsla(0, 0%, 100%, .2) border-box;
}
main::before {
	-webkit-filter: blur(15px);
	filter: blur(15px);
}
```

现在的效果其实已经很接近毛玻璃了，但是有个问题，就是边缘处的模糊效果会逐渐的削弱并突出出去（显得有点脏玻璃的感觉），换成红色背景来看就很明显：

![](http://pic.yupoo.com/ccking/FDKuapXp/EoEf5.png)

所以解决方案就是：

1. 让伪元素相对宿主元素向外扩大,即扩大模糊效果 30px	
```css
main::before {
	margin: -30px;
}
```

2. 裁掉扩大出来的边缘

```css
main {
	overflow: hidden;
}
```

最终效果就出来了

![](http://pic.yupoo.com/ccking/FDKx4SVc/NqXiK.png)

## 参考

* 《css揭秘》4-18：毛玻璃效果

