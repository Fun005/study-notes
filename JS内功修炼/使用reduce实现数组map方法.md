## part 1

### map的概念

> 遍历数组的每一项，并执行回调函数的操作，返回一个对每一项进行操作后的新数组。

```js
arr1.map(function(item,idx,arr){
    item //数组的每一项
    idx // 当前项的索引
    arr // 当前遍历的数组
    this // 函数体内的 this 为 callbackThis参数，
         // 如果不指定或者指定为 null和 undefined，则 this指向全局对象
},callbackThis)
```



### reduce的概念

> 对数组**累积执行回调函数**，返回最终计算结果

```js
array.reduce(function(total, currentValue, currentIndex, arr){
    total // 上一次循环体内返回的值
          // 如果指定 initialValue，则第一次循环的total为initialValue，    
          // 否则为array的第一个元素
    currentValue // 当前的元素
          // 如果指定 initialValue，则第一次循环的 currentValue 为 array的第一个元素，    
          // 否则为array的第二个元素
    currentIndex   //currentValue 的索引
    arr   // 当前遍历的数组
    
}, initialValue)
```



### 用reduce模拟map

```js
Array.prototype._map = function(fn, callbackThis) {
    // 最终返回的新数组
    let res = [];
    // 定义回调函数的执行环境
    // call第一个参数传入null，则 this指向全局对象，同 map的规则
    let CBThis = callbackThis || null;
    this.reduce((brfore, after, idx, arr) => {
        // 传入map回调函数拥有的参数
        // 把每一项的执行结果push进res中
        res.push(fn.call(CBThis, after, idx, arr));
    }, null);
    return res;
};
```

=========================================




## part2

```js
　　//使用 reduce 实现数组 map 方法
    const selfMap2 = function (fn, context){
        let arr = Array.prototype.slice.call(this)
        // 这种实现方法和循环的实现方法有异曲同工之妙，利用reduce contact起数组中每一项
        // 不过这种有个弊端，会跳过稀疏数组中为空的项
        return arr.reduce((pre, cur, index) => {
            return [...pre, fn.call(context, cur, index, this)]
        }, [])
    }

    Array.prototype.selfMap = selfMap2
    var arr1 = [1, 2, 3]
    arr1.length = 5

    let arrMap = arr1.selfMap(function (x) {
        return x * 2
    })
    // [2, 4, 6]

```

