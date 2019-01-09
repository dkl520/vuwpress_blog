---
title: js中的高级异步操作
date: "2018-09-28"
tag: ["js"]
meta:
  - name: js中的高级异步操作
    content: js中的高级异步操作
  - name: js中的高级异步操作
    content: js中的高级异步操作
---

### js 中的高级异步操作

#### Async/await

有一种特殊的语法可以以更舒适的方式处理 Promise,称为“async/await”.理解和使用起来非常方便。

##### 异步功能

```js
async function f() {
  return 1;
}
```

函数前面的“async”一词意味着一件简单的事情：函数总是返回一个 Promise。如果代码中包含代码``return <non-promise/>`，则 Javascript 会自动将其包含到具有该值的已解析的承诺中。

例如：上面的代码返回一个已解析的 promise,其结果是 1.

```js
async function f() {
  return 1;
}

f().then(alert);
```

....相同于一下代码

```js
async function f(){

    return Promise.resolve(1);

}

<!--所以说明async 函数本身就会返回Promise -->

f().then(alert)

```

因此，async 确保函数返回一个 promise,并在其中包含非 promise. 另外 await 只能包含在 async 函数内部运行，而且非常酷酷的

#### await

語法

```js
let value = await promise;
```

````js
<!-- 该关键字```await```使Javascript等待该承诺结算并返回其结果。

这是一个承诺在1秒内解决的示例： -->

async function f(){

   let  primse=new Promise((res,rej)=>{

          setTimeout(() => res("done!"), 1000)

   })

    let result =await promise;

    alert(result)

}

````

** 再次说明 await 函数必须用在 async 函数中 其他一律报错 **
如果我们尝试``await`在非异步函数中使用，那将是语法错误：

```js


function f(){

    let promise=Promsie.resolve(1);

    let result=await promise

}

<!--如果我们忘记async在功能之前放置，我们可以得到这样的错误。如上所述，await只能在里面工作async function。  -->

```

** await 不适用于顶层代码 **

刚刚开始使用`await`往往会忘记这一点，但我们不能在顶层代码中直接使用 `await`，这不起作用。

```js
let res=await fetch('/article/promise-chaining/user.json');

let user=await res.json()





<!-- 這樣做是不起作用的 -->

```

因此，我们需要为等待的代码提供包装异步功能。就像上面的例子一样。

#### `await`接受那些人

喜欢 promise.then，await 允许使用可用对象（具有可调用 then 方法的对象）。同样，这个想法是第三方对象可能不是承诺，但是承诺兼容：如果它支持`.then`,那就足以使用`await`。
例如,这里`await`接受`new Thenable(1)`

```js
class Thenable {
  construcror() {
    this.num = num;
  }
  then(resolve, reject) {
    alert(resolve);
    setTimeout(() => resolve(this.num * 2), 1000); // (*)
  }
}
async function f() {
  let result = await new Thenable(1);
  alert(result);
}
f();
```

如果`await()`得到一个非承诺对象`.then`,它调用这个方法提供原生的功能`resolve`,`reject`作为参数。然后`await`等待，知道其中一个被调用（在上面的例子中发生在行中）然后继续结果。

异步方法

类方法也是可以异步的，只需要放在 async 之前。
像这儿。

```js
class Waiter {
  async wait() {
    return await Promise.resolve(1);
  }
}
new Waiter().wait().then(alert);
```

<!-- 含义相同：它确保返回的值是promise 并启用await -->

#### 错误处理

如果 promise 正常解析，则`await promsie`返回结果。但是在拒绝的情况下嘛，它会抛出错误。就好`throw`在那条线上有声明。

这段代码：

```js
async function f() {
  await Promise.reject(new Error("Whoops!"));
}
```

```js
async function f() {
  throw new Error("Whoops!");
}
```

在实际情况中，承诺可能需要一些时间才能拒绝。所以 await 会等待，然后抛出一个错误。

我们可以使用`try..catch`与常规相同的方式捕获该错误`throw`：

```js
async function f() {
  try {
    let response = await fetch("http://no-such-url");
  } catch (err) {
    alert(err);
  }
}
```

如果出现错误，控件将跳转到 catch 块。我们还可以包装多行：

```js
async function f() {
  try {
    let response = await fetch("http://no-such-url");
    let user = await response.json();
  } catch (err) {
    alert(err);
  }
}
```

如果我们没有`try...catch`,则异步函数调用生成的`promise f()`将被拒绝。我们可以附加`.catch`
处理它：

```js
async function f() {
  let response = await fetch("http://no-such-url");
}

// f() becomes a rejected promise
f().catch(alert); // TypeError: failed to fetch // (*)
```

#### `async/await` 适用于`Promise.all`

当我们需要多个 promsie 时，我们可以将他们包装起来`` Promsie.all``然后`await`

```js
let results=await Promise.all([
    fetch(url1)
    fetch(url2)
    ...
])
```

如果出现错误，它会像往常一样传播：从失败的承诺到 Promise.all，然后成为我们可以 try..catch 在调用周围捕获的异常

#### 摘要

`async`函数前的关键字有两个效果:

1. 使它始终返回一个承诺。
2. 允许在其中使用 await。
   `await`在 promise 之前的关键字使
   如果是错误，则会生成异常，就像 throw error 在该位置调用一样。
   否则，它返回结果，因此我们可以将其赋值给一个值。
   它们共同提供了一个很好的框架来编写易于读写的异步代码。

随着`async/await`我们很少需要写`promise.then/catch`但我们仍然不应该忘记，他们是根据承诺，因为有时（例如，在最外面的范围内），我们必须使用这些方法。同时`Promise.all`等待许多任务也是一件好事。

```js
class HttpError extends Error {
  constructor(response) {
    super(`${response.status} for ${response.url}`);
    this.name = "HttpError";
    this.response = response;
  }
}

function loadJson(url) {
  return fetch(url).then(response => {
    if (response.status == 200) {
      return response.json();
    } else {
      throw new HttpError(response);
    }
  });
}

// Ask for a user name until github returns a valid user
function demoGithubUser() {
  let name = prompt("Enter a name?", "iliakan");

  return loadJson(`https://api.github.com/users/${name}`)
    .then(user => {
      alert(`Full name: ${user.name}.`);
      return user;
    })
    .catch(err => {
      if (err instanceof HttpError && err.response.status == 404) {
        alert("No such user, please reenter.");
        return demoGithubUser();
      } else {
        throw err;
      }
    });
}

demoGithubUser();
```

使用 async/await 重写

```js
function loadJson(url) {
  return fetch(url).then(response => {
    if (response.status == 200) {
      return response.json();
    } else {
      throw new Error(response.status);
    }
  });
}

loadJson("no-such-user.json") // (3)
  .catch(alert); // Error: 404
```

#### Promise

想象一下，你是一名顶级歌手，粉丝们日夜都会问你即将到来的单曲。
为了得到一些缓解，你保证在发布时将它发送给他们。您可以为粉丝提供他们可以订阅更新的列表。他们可以填写他们的电子邮件地址，以便在歌曲可用时，所有订阅的各方立即收到它。即使出现问题，例如，如果发布歌曲的计划被取消，他们仍会收到通知。
每个人都很开心，因为人们不再拥挤你和粉丝，因为他们不会错过单身。
对于我们在编程中经常遇到的事情，这是一个真实的类比：
一个“生成代码”，可以做某事并需要时间。例如，代码加载远程脚本。那是一个“歌手”。
一个“消耗代码”，一旦准备好就需要“生成代码”的结果。许多功能可能需要这样的结果。这些是“粉丝”。
一个承诺，是一个特殊的 JavaScript 对象链接的“生产代码”和“消费代码”在一起。就我们的比喻而言：这就是“订阅列表”。“生成代码”需要花费任何时间来产生承诺的结果，并且“promise”使得所有订阅代码在准备就绪时可用。
这种类比并不十分准确，因为 JavaScript 承诺比简单的订阅列表更复杂：它们具有额外的功能和限制。但是一开始就没关系。

promise 对象的构造函数语法是:

```js
let promise = new Promise((resolve, reject) => {});
```

传递给的函数`new Promise`称为执行程序。创建 promsie 时，此执行程序函数会自动执行。它包含生成的代码，最终应该生成结果。就上述类比而言:遗嘱执行人是“singer”
生成的`promise`对象具有内部属性：

- `state`-最初“待定”，然后更改为“已履行”或“已拒绝”，
- `result`- 最初选择的任意值`undefined`

当执行程序完成作业时，它应该调用它作为参数获取的函数之一：

- `resolve(value)`-最初“待定”，然后更改为“已履行”或“已拒绝”，
    - 设置`state为` “fulfilled” `
    - 设置`result`为`value`
- `reject(error)`- 表示发生错误：`
- 设置`state`为`"rejectd"  `,
- 设置`result`为`error`.
![](../img/promise-resolve-reject.png)

稍后我们将看到“粉丝”如何知道这些变化。

这是一个Promsie构造函数和一个简单的执行函数及其"生成代码"（`settimeout`）的示例

```js
let promise = new Promise(function(resolve, reject) {
  // the function is executed automatically when the promise is constructed

  // after 1 second signal that the job is done with the result "done!"
  setTimeout(() => resolve("done!"), 1000);
});

```
我们可以通过运行上面的代码看到两件事：

执行程序会立即自动调用（由`new Promise`）。
执行程序接收两个参数：`resolve`和`reject`-这些函数是预定义的由JavaScript引擎。所以我们不需要创建它们。相反，我们应该编写执行程序以在准备好时调用它们。
在“处理”一秒钟后，执行程序调用`resolve("done")`以产生结果：

![](../img/promise-resolve-1.png)

这是一个成功完成工作的例子，一个“履行承诺”。

现在，执行者拒绝承诺的一个例子是错误：






























