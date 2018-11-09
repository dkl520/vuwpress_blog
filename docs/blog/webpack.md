---
title: webpack配置入门
date: "2018-10-19"
tag: ["webpack"]
meta:
  - name: webpack基本配置
    content: webpack基本配置
---

前几天整理了阮一峰老师的 webpack 配置方式，感觉最近不用又忘了，又整理了一下。

### 概念

本质上，webpack 是一个现代的 Javascript 应用程序的静态模块打包器。当 webpack 处理应用程序时，它会递归建立一个依赖关系图，其中包含应用程序需要的每个模块，然后将这些模块打包成一个或者多个 bundle.

```js
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
        entry: __dirname + "/app/main.js", //已多次提及的唯一入口文件
        output: {
            path: __dirname + "/build",
            filename: "bundle-[hash].js"
        },
        devtool: 'none',
        devServer: {
            contentBase: "./public", //本地服务器所加载的页面所在的目录
            historyApiFallback: true, //不跳转
            inline: true,
            hot: true
        },
        module: {
            rules: [{
                    test: /(\.jsx|\.js)$/,
                    use: {
                        loader: "babel-loader"
                    },
                    exclude: /node_modules/
                }, {
                    test: /\.css$/,
                    use: ExtractTextPlugin.extract({
                        fallback: "style-loader",
                        use: [{
                            loader: "css-loader",
                            options: {
                                modules: true,
                                localIdentName: '[name]__[local]--[hash:base64:5]'
                            }
                        }, {
                            loader: "postcss-loader"
                        }],
                    })
                }
            }
        ]
    },
    plugins: [
        new webpack.BannerPlugin('版权所有，翻版必究'),
        new HtmlWebpackPlugin({
            template: __dirname + "/app/index.tmpl.html" //new 一个这个插件的实例，并传入相关的参数
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        new ExtractTextPlugin("style.css")
    ]
};
```

#### webpack 的应用

现今很多网页其实可以看做功能丰富的应用，，它们拥有着复杂的 JavaScript 代码和一大堆依赖包。为了简化开发的复杂度，前端社区涌现出了很多好的实践方法。

webpack 可以看做是模块打包机: 它做的事情是，分析你的项目结构，找到 Javascript 模块以及其他一些浏览器不能直接运行的拓展语言(scss Typescript),并将其转换何打包为合适的格式共浏览器使用。

Webpack 的工作方式是：把你的项目当做一个整体，通过一个给定的主文件（如：index.js），Webpack 将从这个文件开始找到你的项目的所有依赖文件，使用 loaders 处理它们，最后打包为一个（或多个）浏览器可识别的 JavaScript 文件。

其中 webpack 包括以下几个方面
[webpack](https://github.com/dkl520/webpack)

- entry:入口，webpack 执行构建的第一步从 Entry 开始，可抽象成输入。
- module:模块，从 webpack 里一切皆模块，一个模块对应着一个文件。webpack 会从配置的 entry 哪里开始递归查找出所有依赖的模块。
- Chunk:代码块，一个 Chunk 由多个模块组合而成，用于代码合并和分割。
- Loader: 模块转换器,用于把模块原内容按照需求转换成新的需求。
- Plugin: 扩展插件，在 Webpack 构建流程中的特定时机会广播出对应的事件，插件可以监听这些事件的发生，在特定时机做对应的事情。

#### demo01

```js
// webpack
module.exports = {
  entry: "./main.js",
  // 输入文件
  output: {
    filename: "bundle.js"
  }
  // 输出文件
};
document.write("hello world");
```

```html
<html>

<body>
  <script type="text/javascript" src="bundle.js"></script>
  <div class="hello">
    <span> hello worledd</span>
  </div>
</body>

</html>
<style>
  @import "index.css"
</style>
```

#### demo02

```html
<html>
  <body>
    <script src="bundle1.js"></script>
    <script src="bundle2.js"></script>
    <script src="bundle3.js"></script>
  </body>
</html>
```

```js
<!-- webpack.config.js -->
module.exports = {
  entry: {
    bundle1: './main1.js',
    bundle2: './main2.js',
    bundle3: "./main3.js"
  },
  // demo1是字符串 这里是一个输出对象..
  output: {
    filename: '[name].js'
  }
};
<!-- main1,2,3 -->
document.write('<h1>Hello World</h1>');
document.write('<h2>Hello Webpack</h2>');
document.write('<h2>Hello ssddsass</h2>');
```

#### demo03

```js
// vue-jsx
<!-- webpack.config.js -->
<!--vue.jsx的用法 -->
module.exports={
      entry:"./main.js",
      output:{
          filename:'bundle.js'
      },
      module:{
          rules:[
              test:/\.js$/,
              exculde:/node_modules/,
              use:{
                  loader:'babel-loader',
                  options:{
                        presets: ['es2015', 'env'],
                        plugins:['transform-vue-jsx']
                  }
              }
          ]
      }

}
    //   vue.js
import Vue from "Vue";
import "./app.css"
new Vue({
    el: '#wrapper',
    data: {
      msg: 'Click to see the message.'
    },
    methods: {
      hello () {
        alert('This is the message.')
      }
    },
    render: function render(h) {
      return (
        <span
          class={{ 'my-class-3': true }}
          style={{ cursor: 'pointer' }}
          on-click={ this.hello }
        >
          { this.msg }
        </span>
      )
    }
  });
```

#### demo03

css 添加

```js
<!-- main.js -->
// require('./app.css');
import("./app.css")

<!-- webpack.config.js -->
    module.exports={
        entry:"main.js",
        output:{
            filename:"bundle.js"
        },
        module:{
            rules:[{
                test:/\.css$/,
                use:['style.loader',"css-loader"]
            }]

        }

    }
```

#### 添加 url 图片链接

```js
import src1 from "./small.png";
import src2 from "./big.png";

// import导入图片的方法  不能直接赋值  需要接收后再赋值
// <!-- import 会把导入的图片转换成base64 -->
// 上文中先用src1接收后再赋值给img1.src1
// import和require不同的是 require不会声明提前  import会声明提前 同 var
let img1 = document.createElement("img");
img1.src = src1;
document.body.appendChild(img1);
var img2 = document.createElement("img");
img2.src = src2;
document.body.appendChild(img2);

module.expots = {
  entry: "./main.js",
  output: {
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg)$/,
        loader: "url-loader",
        options: {
          limit: 5555
        }
      }
    ]
  }
};
```

#### 添加 scss

```js
 <!-- mian.js    -->
import Vue from "Vue";
import $style from "./app.scss"
// 直接以  导出 css modules的 形式  给$style
//   真的是高手操作
new Vue({
    el: '#wrapper',
    data: {
       h1s:"hello world",
       h2s:"Hello Webpack"
    },
    methods: {
      hello () {
        alert('This is the message.')
      }
    },
    created(){
        console.log($style);
    },
    render: function render(h) {
      return (
        <div>
          <h2 class={$style.h2}>hdxsdsds3wllo</h2>
        <div id={$style.demo}>
        <h1 class={$style.h1}>{this.h1s}</h1>
        {/* 再jsx中变量以单括号表达 */}
        <h2 class="h2">{this.h2s}</h2>
        <h2 class={$style.h2}>sdadss</h2>
      </div>
        </div>
      )
    }
  });
//
module.exports={
    entry:'./main.js',
    output:{
        filename:"bundle.js"
    },
    module:{
         rules:[
             {
      test: /\.js$/,
      // 匹配的文件
      exclude: /node_modules/,
      // 去除node_modules  在配置的时候
      use: {
        loader: 'babel-loader',
        // 运用的是babel进行回退
        options: {
          presets: ['es2015', 'env'],
          plugins: ["transform-vue-jsx"]
        }
      }
    },
    {
        test:/\.scss$/,
        use:[
            {
                loader:'style-loader'
            },
            {
                loader:"css-loader",
                options:{
                    modules:true
                }
            },
            {
                loader:"sass-loader"
            }]
    }]
    }
}
```

```css
.h1 {
  color: rgb(0, 255, 0);
}
:global(.h2) {
  color: blue;
}
.h2 {
  color: blue;
}
#demo {
  background: aquamarine;
  .h2 {
    color: red;
  }
}
/* 再webpack配置后后以css modules的读取该css文件 */
```

#### 插件引入

```js
var webpack = require("webpack");
var UglifyJsPlugin = require("uglifyjs-webpack-plugin");
module.export = {
  entry: "./main.js",
  output: {
    filename: "bundle.js"
  },
  plugins: [new UglifyJsPlugin()]
};
```

```js
// import HtmlwebpackPlugin from "html-webpack-plugin";
// import openBrowserWebpackPlugin from 'open-browser-webpack-plugin';
// 请求webpack.config.js文件中只能用require 不支持 import
var HtmlwebpackPlugin = require("html-webpack-plugin");
var OpenBrowserPlugin = require("open-browser-webpack-plugin");
module.exports = {
  entry: "./main",
  output: {
    filename: "bundle.js"
  },

  plugins: [
    new HtmlwebpackPlugin({
      title: "webpack poluginsssss",
      filename: "index.html"
    }),
    new OpenBrowserPlugin({
      url: "http://localhost:8090"
    })
    //  'http://localhost:8090'改路径必须与原生路径相同 否则无效
  ]
};
```

```js
<!-- 自定义插件 -->

var webpack=require("webpack")
var devFlagPlugin=new webpack.Defineplugin({
    _DEV_:JSON.stringify(JSON.parse(process.env.DEBUG||'false'))
})
module.export={
    entry:"./main.js",
    output:{
        filename:"bundle.js"
    },
    plugins:[devFlagPlugin]
}
```

#### 按需加载

```js
<!-- a.js -->
module.exports="hello worlssssssdss"
<!-- main.js -->
require.ensure(['./a'],(require)=>{
    var content=require("./a)";
     document.open();
     document.write(`<h1>${content}</h1>`)
     console.log(content)
     document.close();
})
<!-- import 版本 -->
import("./a").then((res)=>{
      document.open();
    document.write('<h1>' + res + '</h1>');
    document.close();
})
```

#### 懒加载

```js
import load from "bundle-loader?lazy!./a";
// lazy  表示懒加载
load(file => {
  document.open();
  document.write("<h1>" + file + "</h1>");
  document.close();
});
```

#### 引入 js 组件

```js
<!-- main.js -->
var $ =require("jquery")
$("h1").text("hello world")

var webpack = require("webpack")
module.exports = {
  entry: {
    app: "./main.js",
    vender: "[jquery]",
  },
  output: {
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: "vender",
      filename: "vender.js"
    })
  ]
}
```

### 引入全局对象
```js
module.exports = {
  entry: "./mian.js",
  output: {
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["es2015"]
          }
        }
      }
    ]
  },
  externals: {
    // 引入全局对象
    data: "data"
  }
};
```
