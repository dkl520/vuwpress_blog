---
title: 跨域
date: '2018-08-04'
tag: ['web']
meta:
  -
    name: 前端常见跨域解决方案
    content: 前端常见跨域解决方案
  -
    name: 前端常见跨域解决方案
    content: 前端常见跨域解决方案
---
## 前端常见跨域解决方案
<!-- more -->

   2018-09-01
## 什么是跨域
  跨域是指一个域下的文档或者脚本试图去请求另一个域下的资源，这里跨域是广义的。
### 广义的跨域 
   * 资源跳转：A链接，重定向，表单提交
   * 资源嵌入：等DOM标签，样式还有中等文件外链```<link>、<script>、<img>、<frame>background:url()```
   * 脚本请求：js发起ajax请求，dom和js对象的跨域操作等
  其实我们通常说的跨域是狭义的，是由浏览器同源策略限制的一类请求场景。
### 同源策略
  同源策略/SOP是一种约定，由Netscape公司1995年引入浏览器，它是浏览器最核心的也是最基本的安全功能，如果缺少了同源策略，浏览器很容易受到XSS,CSRF等攻击。所谓同源是指“协议+域名+端口”三者相同，即便两个不同的域名指向同一个IP地址，也非同源。
    同源策略限制一下几种行为：

  1. COOKie,localstorage和indexDB无法读取  

  2.  DOM和js对象无法获得  

  3.  Ajax请求不能发送  

### 跨域解决方案

  * 通过JSONP跨域  

  * document.domain + iframe跨域  

  * location.hash + iframe  

  * window.name + iframe跨域  

  * postmessage的跨域  

  * CORS(跨域资源共享)  

  * nginx的代理跨域  

  * node.js中间代理跨域  

  * webSocket协议跨域  

  ####  实现方式
##  通过jsonp跨域
    
 通常为了减轻web服务器的负载，我们把js、css，img等静态资源分离到另一台独立域名的服务器上，在html页面中再通过相应的标签从不同域名下加载静态资源，而被浏览器允许，基于此原理，我们可以通过动态创建script，再请求一个带参网址实现跨域通信.  

   原生实现  
   ```javascript
    <script>  
    var script = document.createElement('script');
    script.type = 'text/javascript';
    // 传参并指定回调执行函数为onBack
    script.src = 'http://www.domain2.com:8080/login?user=admin&callback=onBack';
    document.head.appendChild(script);

    // 回调执行函数
    function onBack(res) {
        alert(JSON.stringify(res));
    }
</script>
```
  jsonp缺点：只能实现get一种请求。  

##  document.domain + iframe跨域  
    此方案仅限主域相同，子域不同的跨域应用场景。
    实现原理：两个页面都通过js强制设置document.domain为基础主域，就实现了同域。   
    
   1 父窗口：(http://www.domain.com/a.html)
      
  ```html
  <iframe id="iframe" src="http://child.domain.com/b.html"></iframe>
```
  ```javascript  
  <script>  
    document.domain = 'domain.com';
    var user = 'admin';
  </script>  
```
 2 子窗口：(http://child.domain.com/b.html)
 ```javascript
   <script>  
    document.domain = 'domain.com';
    // 获取父窗口中变量
    alert('get js data from parent ---> ' + window.parent.user);
</script>  
```
##  location.hash + iframe跨域  
  实现原理： a欲与b域名相互通信，通过中间页面c来实现。三个页面，不同域之间利用iframe的location.hash传值，相同域之间直接js访问来通信.  

  具体实现: A域：a.html->B域：b.html->A域： c.html,a与b不同域只能通过hash值单向通信，b与c不同域也只能单向通信，但c与a同域，所以c可通过parent.parent访问a页面所有对象. 
  1. a.html：(http://www.domain1.com/a.html)  
   ```html
 <iframe id="iframe" src="http://www.domain2.com/b.html" style="display:none;"></iframe>
```
  ```javascript  
  <script>  
     var iframe = document.getElementById('iframe');

    // 向b.html传hash值
    setTimeout(function() {
        iframe.src = iframe.src + '#user=admin';
    }, 1000);

    // 开放给同域c.html的回调方法
    function onCallback(res) {
        alert('data from c.html ---> ' + res);
    }
  </script>  
```
 2. b.html：(http://www.domain2.com/b.html)
  ```html
 <iframe id="iframe" src="http://www.domain1.com/c.html" style="display:none;"></iframe>  
```
  ```javascript  
  <script>  
    var iframe = document.getElementById('iframe');

    // 监听a.html传来的hash值，再传给c.html
    window.onhashchange = function () {
        iframe.src = iframe.src + location.hash;
    };
</script> 
```
  3. c.html：(http://www.domain1.com/c.html)
```javascript  
  <script>  
     // 监听b.html传来的hash值
    window.onhashchange = function () {
        // 再通过操作同域a.html的js回调，将结果传回
        window.parent.parent.onCallback('hello: ' + location.hash.replace('#user=', ''));
    };
</script> 
```
##  window.name +iframe跨域  

  window.name属性的独特之处：name值在不同的页面（甚至不同域名）加载后依旧存在， 并且可以支持非常长的name值（2MB。  

  1. a.html：(http://www.domain1.com/a.html)
 
  ```javascript
  var proxy = function(url, callback) {  
    var state = 0;
    var iframe = document.createElement('iframe');

    // 加载跨域页面
    iframe.src = url;

    // onload事件会触发2次，第1次加载跨域页，并留存数据于window.name
    iframe.onload = function() {
        if (state === 1) {
            // 第2次onload(同域proxy页)成功后，读取同域window.name中数据
            callback(iframe.contentWindow.name);
            destoryFrame();

        } else if (state === 0) {
            // 第1次onload(跨域页)成功后，切换到同域代理页面
            iframe.contentWindow.location = 'http://www.domain1.com/proxy.html';
            state = 1;
        }
    };

    document.body.appendChild(iframe);

    // 获取数据以后销毁这个iframe，释放内存；这也保证了安全（不被其他域frame js访问）
    function destoryFrame() {
        iframe.contentWindow.document.write('');
        iframe.contentWindow.close();
        document.body.removeChild(iframe);
    }
};

// 请求跨域b页面数据
proxy('http://www.domain2.com/b.html', function(data){  
    alert(data);
}); 
```
 2. proxy.html：(http://www.domain1.com/proxy….  

    中间代理页，与a.html同域，内容为空即可。

3. b.html：(http://www.domain2.com/b.html)  
  ```javascript
  <script>
    window.name = 'This is domain2 data!';
</script>
```


总结：通过iframe的src属性由外域转向本地域，跨域数据即由iframe的window.name从外域传递到本地域。这个就巧妙的绕过了浏览器的跨域访问限制，但同时它又是安全操作。  
##  postMessage跨域  

  postMessage是HTML5 XMLHttpRequest Level 2中的API，且是为数不多可以跨域操作的window属性之一，它可用于解决以下方面的问题;  

  a. 页面和其打开的新窗口的数据传递。  

  b. 多窗口之间的消息传递. 

  c. 页面与嵌套的iframe消息传递

  d. 上面三个场景的跨域数据传递  

  用法: postMessage(data,origin)方法接受两个参数  

  data:html5 规范支持基本类型或可复制的对象，但部分浏览器只支持字符串，所以传参时最好用JSON.stringify()序列化。

  origin： 协议+主机+端口号，也可以设置为”*”，表示可以传递给任意窗口，如果要指定和当前窗口同源的话设置为”/”。  

  1. a.html：(http://www.domain1.com/a.html)
  ```html
  <iframe id="iframe" src="http://www.domain2.com/b.html" style="display:none;"></iframe>
```
```javascript
<script>      
    var iframe = document.getElementById('iframe');
    iframe.onload = function() {
        var data = {
            name: 'aym'
        };
        // 向domain2传送跨域数据
        iframe.contentWindow.postMessage(JSON.stringify(data), 'http://www.domain2.com');
    };
 
    // 接受domain2返回数据
    window.addEventListener('message', function(e) {
        alert('data from domain2 ---> ' + e.data);
    }, false);
</script>
```
2. b.html：(http://www.domain2.com/b.html)
```javascript
<script>
    // 接收domain1的数据
    window.addEventListener('message', function(e) {
        alert('data from domain1 ---> ' + e.data);
 
        var data = JSON.parse(e.data);
        if (data) {
            data.number = 16;
 
            // 处理后再发回domain1
            window.parent.postMessage(JSON.stringify(data), 'http://www.domain1.com');
        }
    }, false);
</script>
```
 ## CORS跨域资源共享  

  XMLHttpRequest会遵守同源策略(same-origin policy). 也即脚本只能访问相同协议/相同主机名/相同端口的资源, 如果要突破这个限制, 那就是所谓的跨域, 此时需要遵守CORS(Cross-Origin Resource Sharing)机制。

  那么, 允许跨域, 不就是服务端设置Access-Control-Allow-Origin: *就可以了吗? 普通的请求才是这样子的, 除此之外, 还一种叫请求叫preflighted request。

  preflighted request在发送真正的请求前, 会先发送一个方法为OPTIONS的预请求(preflight request), 用于试探服务端是否能接受真正的请求，如果options获得的回应是拒绝性质的，比如404\403\500等http状态，就会停止post、put等请求的发出。  
  CORS请求分两种类型。  

  * 简单的请求
  * 不是那么简单的请求
   #### 简单的请求满足如下标准  

  ### HTTP请求是下面其中之一(大小写的敏感) :
   * HEAD   
   * GET
   * POST
   ### HTPP头部与下面匹配（大小写敏感）
   * Accept
   * Accept-Language
   * Content-Language
   * Last-Event-ID
   * Content-Type,但只能是下面几个值:  
        * application/x-www-form-urlencoded
        * multipart/form-data
        * text/plain
     为什么会简单的请求会有这些特征呢？其实这些请求本身就可以不用脚本直接由浏览器搞定。比如 JSONP 可以直接搞定跨域请求。HTML表单可以弄出 POST 请求。  

       不满足以上标准的就叫『不是那么简单的请求』。这就需要浏览器和服务器多做点交流。这个多余的交流过程就叫 preflight。之后会详细说明。
   ### 处理简单的CORS请求
     
   假设发起请求的页面是 http://api.bob.com, 用 JavaScript 发出一个跨域请求:  
  ```javascript
    var url = 'http://api.alice.com/cors';
    var xhr = createCORSRequest('GET', url);
    xhr.send();
  ```
   请求头部
  ```javascript
   GET /cors HTTP/1.1
   Origin: http://api.bob.com
   Host: api.alice.com
   Accept-Language: en-US
   Connection: keep-alive
   User-Agent: Mozilla/5.0...
  ```
  需要注意的是CORS请求一定会有Origin的header. 这个Header是由浏览器加上的，不能被用户控制。格式是协议 + 域名 + 端口（不是默认端口的话）
  比如：http://api.alice.com  

  加上这个 Origin Header 也不一定说明这玩意是跨域请求。因为一些同域名的请求也可能有 Origin Header。具体因浏览器而异。但当在同域请求时，浏览器会忽视 CORS 的 response header。  

  下面是一个有效的 CORS response：  

  ```javascript
  Access-Control-Allow-Origin: http://api.bob.com
  Access-Control-Allow-Credentials: true
  Access-Control-Expose-Headers: FooBar
  Content-Type: text/html; charset=utf-8
```
  所有与 CORS 相关的 Headers 都会有 Access-Control- 的前缀  
  
  其中:
   ### Access-Control-Allow-Origin （必须）
     
   这个 Header 必须包含在 CORS 请求的 response 中。如果没有，CORS 请求就会失败。这个 Header 的值可以和 请求的域名一样，也可以为*，如果是后者，所有网站发出的跨域请求都会被满足。 
     Access-Control-Allow-Origin: *  表示允许所有域名的脚本访问该资源，而Access-Control-Allow-Origin: http://api.bob.com  表示只允许http://api.bob.com访问该资源

   ### Access-Control-Allow-Credentials （可选） 

   默认情况下，cookie 是不会包含在 CORS 请求中的，但是设置了这个值后，浏览器发出请求会带上所有目标域名的 cookie，并在得到 response 后设置该域名的 cookie 。这个 Header 唯一的值只能是true，如果不需要 cookie，就不能包含这个 Header，而不是设置值为fasle.  

   这个 Header 需要 XMLHttpRequest 2 对象的 withCredentials 属性设置为 true.两者缺一不可。

   ### Access-Control-Expose-Headers （可选）

   如果设置这个属性，那么通过getResponseHeader() 方法可以获得结果简单的 Headers。
  
   允许的值为: 
   * Cache-Control
   * Content-Language 
   * Content-Type
   * Expires
   * Last-Modified
   * Pragma

   Access-Control-Expose-Headers的值用逗号分隔。

   ## 处理不是那么简单的请求
  比如请求的方法是 PUT 和 DELETE，或者设置如 Content-Type: application/json, 那么这就是一个『不是那么简单的请求』。

  这个过程包含了一个 preflight 的过程。在这个过程中，浏览器和服务器协商，看看服务器是否支持接下来的跨域请求。这个 preflight，就是 OPTIONS 请求。如果协商成功，那么浏览器会真正发出目标请求。preflight 可以被缓存。

  发送一个 CORS 请求：

```javascript
var url = 'http://api.alice.com/cors';
var xhr = createCORSRequest('PUT', url);
xhr.setRequestHeader(
    'X-Custom-Header', 'value');
xhr.send();
```
   Preflight 请求:

```javascript
OPTIONS /cors HTTP/1.1
Origin: http://api.bob.com
Access-Control-Request-Method: PUT
Access-Control-Request-Headers: X-Custom-Header
Host: api.alice.com
Accept-Language: en-US
Connection: keep-alive
User-Agent: Mozilla/5.0...
```
   CORS 请求的 Header 可以包括下面两个额外的值：
   
## Access-Control-Request-Method
这个 Header 一定会存在，表示实际的请求，即使是简单的请求（GET，POST，HEAD）
## Access-Control-Request-Headers
包含在 CORS 请求的 header

上面的那一个 Preflight 请求   
```javascript
OPTIONS /cors HTTP/1.1
Origin: http://api.bob.com
Access-Control-Request-Method: PUT
Access-Control-Request-Headers: X-Custom-Header
Host: api.alice.com
Accept-Language: en-US
Connection: keep-alive
User-Agent: Mozilla/5.0...

```
Respnse:

```javascript
Access-Control-Allow-Origin: http://api.bob.com
Access-Control-Allow-Methods: GET, POST, PUT
Access-Control-Allow-Headers: X-Custom-Header
Content-Type: text/html; charset=utf-8
```
## Access-Control-Allow-Origin （必须）
同上

## Access-Control-Allow-Methods （必须）

表示服务器支持的请求方法，逗号分隔。

即使只请求某个特定的方法，然而服务器会返回所有的支持的方法，这个可以方便缓存后不需要额外的 OPTIONS 请求。

## Access-Control-Allow-Credentials （可选）
表示进入Cors时候是否进行数据传递
  
 同简单的请求。
## Access-Control-Allow-Headers
  如果在 OPTIONS 请求中包含了Access-Control-Request-Headers ，那么这个是必须的。这回返回所有服务器支持的 Header，哪怕并没在 preflight 中列出。
## Access-Control-Max-Age （可选） 
   允许 preflight 缓存，之后就可以不需要进行 OPTIONS 请求咯。

   当这些条件满足之后，浏览器会发出真正的请求。

   比如：
  ```javascript
    PUT /cors HTTP/1.1
    Origin: http://api.bob.com
    Host: api.alice.com
    X-Custom-Header: value
    Accept-Language: en-US
    Connection: keep-alive
    User-Agent: Mozilla/5.0...
  ```
  真的response

  ```javascript
   Access-Control-Allow-Origin: http://api.bob.com
   Content-Type: text/html; charset=utf-8
  ```
   如果服务器想拒绝请求，那么只要在 preflight 中不设置 CORS 的 Header 就行了，并返回一个普通的响应码，比如 200。这样浏览器在没有接收到特定的 CORS Header 后，会认为请求无效，不会发出真正的请求。例如：preflight 请求
```javascript
OPTIONS /cors HTTP/1.1
Origin: http://api.bob.com
Access-Control-Request-Method: PUT
Access-Control-Request-Headers: X-Custom-Header
Host: api.alice.com
Accept-Language: en-US
Connection: keep-alive
User-Agent: Mozilla/5.0...
```
Preflight Response:
```javascript
// ERROR - No CORS headers, this is an invalid request!
Content-Type: text/html; charset=utf-8
```





    
 





    

      
     
