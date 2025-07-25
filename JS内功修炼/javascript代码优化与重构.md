重构，或者代码优化，对于开发者而言，至关重要。对于想要进阶的开发者，更为关键。根据二八理论，20%的重构方法，能解决80%的坏代码。当一段代码里，出现以下四种情况时

* 有重复代码

* 有过长的函数

* 有过大的类

* 有过长的参数列表

我们就要注意了，这段代码大概率有重构和优化的空间。下面我们从以下五个方面，来优化我们的代码。

### 1. 命名

好的命名贯穿整个软件编码过程，好命名包括合理使用大小写定义、缩进等。目前前端工程提供很多lint或format工具，能很方便的帮助工程检测和自动化检测。不管是变量名、函数名或是类名，一个好的命名会加快自身开发效率以及阅读代码效率，毕竟程序读的次数会比写的次数多的多。

> // bad 
>
> var yyyymmdstr = moment().format('YYYY/MM/DD');
>
> // good
>
> var yearMonthDay = moment().format('YYYY/MM/DD');



> // bad
>
> function dateAdd(date,month) {
>
> ​	// do sth...
>
> }
>
> let date = new Date();
>
> dateAdd(date,1)  // 这样的写法比较难以理解
>
> // good
>
> function dateAddMonth(date,month) {
>
> ​	// do sth...
>
> }
>
> let date = new Date();
>
> dateAddMonth(date,1)

### **2.函数单一职责**

软件工程中最重要原则之一。刚毕业不久的开发人员容易出现这个问题，觉得业务逻辑很复杂，没办法再细分成单独函数，写出很长的业务函数。但大多数是临时变量过多，导致看不穿业务逻辑的本质；其实重构过程中一步步分解职责，拆分成细小函数并用恰当的名称命名函数名，能很快理解业务的本质，说不定还能发现潜藏的bug。

> // bad
>
> function handle(arr) {    
>
>  //数组去重     
>
> let _arr=[],_arrIds=[];    
>
> for(let i=0;i<arr.length;i++){         
>
> if(_arrIds.indexOf(arr[i].id)===-1){             
>
> _arrIds.push(arr[i].id);            
>
>  _arr.push(arr[i]);         
>
> }     
>
> }     
>
> //遍历替换    
>
>  _arr.map(item=>{        
>
>  for(let key in item){             
>
> if(item[key]===''){                
>
>  item[key]='--';
>
> ​             } 
>
> ​        } 
>
> ​    });
>
> ​     return _arr;
>
>  }
>
> 
>
> // good
>
> function handle(arr) {
>
> ​	let filterArr = filterRepeatById(arr)
>
> ​	return replaceEachItem(filterArr)
>
> }

### **3.引入解释性变量或函数**

通过引入解释性变量或函数，使表达更清晰

> // bad 
>
> if (platform.toUpperCase().indexOf('MAC') > -1 && browser.toUpperCase().indexOf('IE') > -1 && wasInitialized() && resize > 0) {  
>
> ​	 // do something
>
>  }
>
> // good
>
> let isMacOs = platform.toUpperCase().indexOf('MAC') > -1 
>
> let isIEBrowser = browser.toUpperCase().indexOf('IE') > -1 
>
> let isResize = resize > 0 
>
> if (isMacOs && isIEBrowser && wasInitialized() && isResize) {  
>
> ​	 // do something 
>
> }

> // bad 
>
> const cityStateRegex = /^(.+)[,\\s]+(.+?)\s*(\d{5})?$/; saveCityState(ADDRESS.match(cityStateRegex)[1], ADDRESS.match(cityStateRegex)[2]);  *
>
> *// good *
>
> *var cityStateRegex = /^(.+)[,\\s]+(.+?)\s*(\d{5})?$/; 
>
> var match = ADDRESS.match(cityStateRegex) 
>
> let [, city, state] = match 
>
> saveCityState(city, state);

> // bad 
>
> if (date.before(SUMMER_START) || date.after(SUMMER_END)) {   				charge = quantity * _winterRate + _winterServiceCharge 
>
> } else {  
>
>  	charge = quantity * _summerRate
>
>  } 
>
>  // good 
>
> if (notSummer(date)) {   
>
> ​	charge = winterCharge(quantity) 
>
> } else {   
>
> ​	charge = summerCharge(quantity) 
>
> }

### **4.更少的嵌套，尽早return**

> // bad 
>
> let getPayAmount = () => {   
>
> let result   
>
> if (_isDead) result = deadAmount()
>
> else {    
>
> ​	if (_isSeparated) result = separatedAmount()
>
> ​	else {      
>
>  		if (_isRetired) result = retiredAmount()
>
> ​		else result = normalPayAmount()
>
> ​	}   
>
> }    
>
> return result 
>
> }  
>
> // good 
>
> let payAmount = () => {   
>
> if (_isDead) return deadAmount() 
>
> _if (_isSeparated) return separatedAmount()   
>
> if (_isRetired) return retiredAmount()   
>
> return normalPayAmount() }

### **5.以HashMap取代条件表达式**

> // bad 
>
> let getSpeed = type => {   
>
> ​	switch (type) {     
>
> ​		case SPEED_TYPE.AIR:     return getAirSpeed()     
>
> ​		case SPEED_TYPE.WATER:     return getWaterSpeed()    
>
> ​		 ...   
>
> ​	}
>
>  }  
>
> // good 
>
> let speedMap = {   
>
> [SPEED_TYPE.AIR]: getAirSpeed,
> [SPEED_TYPE.WATER]: getWaterSpeed
>
> } 
>
> let getSpeed = type => speedMap[type] && speedMap[type]()

### **6.其他方法**

- 清晰的项目目录结构
- 常量用const定义并且大写
- 善于利用&&和||
- 避免大量全局方法和全局变量
- 采用函数式编程
- 移除重复和注释的代码
- ES6+语法糖
  - arrow function
  - rest
  - async/await
  - let/const 代替var
  - Array Methods
  - 函数默认参数

  