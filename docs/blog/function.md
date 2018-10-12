---
title: 一些高阶函数的使用
date: "2018-09-25"
tag: ["javascript"]
meta:
  - name: 一些高阶函数的使用
    content: 一些高阶函数的使用
---

## 一些高阶函数的使用

2018-09-25

## call apply bind 的使用

在 MDN 中定义了 apply 如下，apply 方法调用一个函数，其具有一个指定的 this 值，以及作为一个数组（或类似数组的对象）提供的参数
语法

```javascript
<script>fun.apply(thisArg,[argsArray])</script>
```

- thisArg：在 fun 函数运行时指定的 this 值。需要注意的是，指定的 this 值并不一定是该函数执行时真正的 this 值，如果这个函数处于非严格模式下，则指定为 null 或 undefined 时会自动指向全局对象（浏览器中就是 window 对象），同时值为原始值（数字，字符串，布尔值）的 this 会指向该原始值的自动包装对象。
- argsArray：一个数组或者类数组对象，其中的数组元素将作为单独的参数传给 fun 函数。如果该参数的值为 null 或 undefined，则表示不需要传入任何参数。从 ECMAScript 5 开始可以使用类数组对象。浏览器兼容性请参阅本文底部内容。

### apply 和 call 的区别

call 的语法为：

```javascript
<script>fun.call(thisArg[, arg1[, arg2[, ...]]])</script>
```

所以 apply 和 call 基本类似，他们的区别只是出传入的参数不同。所以 apply 和 call 的区别是 call 方法接受的是若干个参数列表，而 apply 接收的是一个包含多个参数的数组。

```javascript
     <script>
      var a ={
        name : "Cherry",
        fn : function (a,b) {
            console.log( a + b)
          }
      }
      var b = a.fn;
      b.apply(a,[1,2])     // 3
   </script>
```

### bind 和 apply,call 的区别

我们先来将刚刚的例子使用 bind 试一下

```javascript
   <script>
  var a={
      name:"dkl",
      fn:function (a,b){
          console.log(a+b)
      }
  }
  var b=a.fn;
  b.bind(a,1,2)
   </script>
```

我们会发现并没有输出，这是为什么呢，我们来看一下 MDN 上的文档说明：
bind()方法创建一个新的函数, 当被调用时，将其 this 关键字设置为提供的值，在调用新函数时，在任何提供之前提供一个给定的参数序列。
所以我们可以看出，bind 是创建一个新的函数，我们必须要手动去调用:

```javascript
var a = {
  name: "Cherry",
  fn: function(a, b) {
    console.log(a + b);
  }
};
var b = a.fn;
b.bind(a, 1, 2)();
```

### 高阶函数:利用 Filter,Map 和 reduce 来编写更易维护的代码

高阶函数可以帮助你增强你的 JavaScript，让你的代码更具有声明性。简单来说，就是简单，简练，可读。

知道什么时候和怎样使用高阶函数是至关重要的。它们可以让你的代码更容易理解和具有更好的可维护性。它们也可以让你很轻松的进行函数间的组合。我们叫它复合函数，不过我不会在这里进行详细的介绍。在本文中，我将介绍 JavaScript 中三个最常用的高阶函数：.filter()，.map()，.reduce。
Filter
想象一下你正在编写一段代码：有一个写满不同人信息的列表，不过你想要过滤出一个大于等于 18 岁人的列表。

我们的列表看起来就像下面这样：
Filter
对数组进行过滤的意思
想象一下你正在编写一段代码：有一个写满不同人信息的列表，不过你想要过滤出一个大于等于 18 岁人的列表。

我们的列表看起来就像下面这样：

```javascript
<script>
const people=[
  const people = [
 { name: ‘John Doe’, age: 16 },
 { name: ‘Thomas Calls’, age: 19 },
 { name: ‘Liam Smith’, age: 20 },
 { name: ‘Jessy Pinkman’, age: 18 },
];

</script>
```

我们先来看看第一个高阶函数是如何筛选出大于等于 18 岁人的栗子。为了简洁，我将使用 ES6 标准中的箭头函数。这是一种非常简洁的定义函数的方式，可以让我们不必再写 function 和 return，以及一些括号、大括号和分号。

```javascript
<script>
const peopleAbove18 = (collection) => {
  const results = [];

  for (let i = 0; i < collection.length; i++) {
    const person = collection[i];

    if (person.age >= 18) {
      results.push(person);
    }
  }
  return results;
};
</script>
```

那现在如果我们想要筛选出 18~20 岁之间的人呢？

```javascript
<script>
const peopleBetween18And20 = (collection) => {
  const results = [];

  for (let i = 0; i < collection.length; i++) {
    const person = collection[i];

    if (person.age >= 18 && person.age <= 20) {
      results.push(person);
    }
  }
  return results;
};
</script>
```

你可能已经意识到了这里有许多重复的代码。我们可以抽象出一个通用的解决方案。这两个函数有一些共同点。它们都在一个列表中进行迭代，并且在给定的条件下进行过滤。

##### "高阶函数是一个将一个或多个函数作为参数的函数"——ClojureBridge

我们可以通过使用更具声明性的 filter()方法来改进我们之前的函数。

### Filter

```javascript
<script>
const peopleAbove18 = (collection) => {
    return collection
    .filter((person) => person.age >= 18);
}
</script>
```

### Map

map 是映射的意思，会同时对数组中的每个值进行同时操作。统一操作。
让我们拿着刚刚的人员名单和一个其中喜欢喝咖啡的人员名单。

```javascript
<script>
  const coffeeLovers = [‘John Doe’, ‘Liam Smith’, ‘Jessy Pinkman’];
</script>
```

用命令式的实现方式就像下面这样：

```javascript
<script>
const addCoffeeLoverValue = (collection) => {
  const results = [];

  for (let i = 0; i < collection.length; i++) {
    const person = collection[i];
    if (coffeeLovers.includes(person.name)) {
      person.coffeeLover = true;
    } else {
      person.coffeeLover = false;
    }

    results.push(person);
  }

  return results;
};
</script>
```

我们可以利用.map()来让代码更具有声明性：

```javascript
<script>
const incrementAge = (collection) => {
  return collection.map((person) => {
    person.coffeeLover = coffeeLovers.includes(person.name);

    return person;
  });
};
</script>
```

### Reduce

我发现我对 Reduce 的理解不是很透彻，这是个比较复杂的函数。我敢打赌，当你知道什么时候和怎样使用它的时候，你会喜欢上这个函数。.reduce()很酷，上面提到的的大部分函数都可以通过它来实现。

reduce 的基本用法：

```javascript
<script>
[0, 1, 2, 3, 4].reduce( (accumulator, currentValue, currentIndex, array) =>
    return  accumulator + currentValue ,initialValue);

</script>
```
  * accumulator  累加器累加回调的返回值; 它是先前在回调调用中返回的累计值，或者initialValue，如果提供的话（见下      文）
  *  currentValue :当前在数组中的索引值。
  *  currentIndex：当前在数组中的索引.
  *  array 这个数组本身


让我们先举一个简单的栗子。我们想计算所有人年龄的和。当然了，我们还是会首先看看如何用命令式的方式实现。它基本上就是通过循环来增加总年龄变量。

```javascript
<script>
const sumAge = (collection) => {
  let num = 0;

  collection.forEach((person) => {
    num += person.age;
  });

  return num;
}
</script>
```

接下来是使用.reduce()的声明式方法：

```javascript
<script>
const sumAge = (collection) => collection.reduce((sum, person) => {
 return sum + person.age;
}, 0);
</script>
```

我们甚至可以使用.reduce()创走 filter 和 map

```javascript
<script>
const map = (collection, fn) => {
  return collection.reduce((acc, item) => {
    return acc.concat(fn(item));
  }, []);
}
const filter = (collection, fn) => {
  return collection.reduce((acc, item) => {
    if (fn(item)) {
      return acc.concat(item);
    }
    return acc;
  }, []);
}
<!-- 仔细看看这段代码 发现非常有内涵 -->
</script>
```

### 组合 map,filter 和 reduce

太好了，这些函数我们都有了。而且很重要的一点是，他们都存在于 JavaScript 的数组原型上。这意味着我们可以同时使用它们。这可以让我们轻松创建各种可复用的函数，减少编写某些功能所需要的代码量。

我们已经讨论过了如何利用.filter()来过滤出大于等于 18 岁的人；利用.map()来添加 coffeeLover 属性；通过.reduce()来计算所有人年龄的和。现在，我们写一点代码将这三个步骤合并起来。

```javascript
<script>
const people = [
 { name: ‘John Doe’, age: 16 },
 { name: ‘Thomas Calls’, age: 19 },
 { name: ‘Liam Smith’, age: 20 },
 { name: ‘Jessy Pinkman’, age: 18 },
];
const coffeeLovers = [‘John Doe’, ‘Liam Smith’, ‘Jessy Pinkman’];
const ageAbove18 = (person) => person.age >= 18;
const addCoffeeLoverProperty = (person) => {
 person.coffeeLover = coffeeLovers.includes(person.name);

 return person;
}
const ageReducer = (sum, person) => {
 return sum + person.age;
}, 0);
const coffeeLoversAbove18 = people
 .filter(ageAbove18)
 .map(addCoffeeLoverProperty);
const totalAgeOfCoffeeLoversAbove18 = coffeeLoversAbove18
 .reduce(ageReducer);
const totalAge = people
 .reduce(ageReducer);
</script>
```
如果你用命令式方法的话，你最后会写一堆重复代码。

通过.map()，.reduce()和.filter()来创建函数的思维将会极大的提高你的代码质量。而且可以增加可读性。你根本不必在意函数内到底发生了什么，它非常容易理解。