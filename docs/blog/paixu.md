---
title: js中的排序算法
date: "2018-09-28"
tag: ["js"]
meta:
  - name: js中的排序算法
    content: js中的排序算法
  - name: js中的排序算法
    content: js中的排序算法
---


### js中的排序算法

#### 冒泡排序


```js
// 冒泡排序的本质是 相邻比较 小的往前 大的往后。

function bubbleSort(arr) {
            for (let i = 0; i < arr.length; i++) {
                for (let j = 0; j < arr.length-1-i; j++) {
                    // 这里减1的意思是为了防止数组过界，-i是已经有i个数字排好序 了 不需要再排。
                    if (arr[j+1]<arr[j]) {
                    [arr[j],arr[j+1]] = [arr[j+1],arr[j]];
                    }
                }
            }
            return arr
        }

```

#### 选择排序
<!--  -->

```js
// 选择排序的本质是每循环一次 找到该循环中数字最小值
// 并且把数字最小的放到最前面.然后继续下次循环
   function selectionSort(arr) {
          var minIndex
           for (let i = 0; i < arr.length-1; i++) {
                        minIndex=i;
                for (let j = i+1; j < arr.length; j++) {
                        if (arr[minIndex]>arr[j]) {
                            minIndex=j
                        }
                }
                [arr[minIndex],arr[i]]=[arr[i],arr[minIndex]]

           }
           return arr
      }
     let a= selectionSort([1,4,4,5,67,78,8,2,2,4,6,7])
       console.log(a);

```

####  插入排序  

```js






```






