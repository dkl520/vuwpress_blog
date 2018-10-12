---
title: vue的mvvm原理
date: "2018-09-28"
tag: ["vue"]
meta:
  - name: vue的mvvm原理
    content: vue的mvvm原理
  - name: vue的mvvm原理
    content: vue的mvvm原理
---

### Vue 的 mvvm 原理

话不多说，直接上代码思路，
整理一下，要实现 Mvvm 的双向绑定，就必须实现以下几点：

1. 实现一个数据监听器 Observer,能够对数据对象的所有属性进行监听，如有变动可拿到最新值并通知订阅者。
2. 实现一个指令解析器 Complie,对每个元素节点的指令进行扫描和解析，根据指令模板替换数据，以及绑定相应的更新函数
3. 实现一个 Watcher，作为连接 Observer 和 Compile 的桥梁，能够订阅并收到每个属性变动的通知，执行指令绑定的相应回调函数，从而更新视图
4. mvvm 入口函数，整合以上三者
   ![avatar](./mvvm.png)

#### Observer

我们知道可以利用```Obeject.defineProperty()```来监听属性变动
那么将需要 ```observe``` 的数据对象进行递归遍历，包括子属性对象的属性，都加上 ```setter``` 和 ```getter```
这样的话，给这个对象的某个值赋值，就会触发 ```setter```，那么就能监听到了数据变化。。相关代码可以是这样：
