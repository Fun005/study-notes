## scripts/dev.js解读第一版


> 写在前面的写后感

第一要先看清楚文件开头的注释，这里往往说明了全文代码的功能、用法、解释等等，对理解代码有很大的帮助。

有些代码最开始看半天都没明白，最后回头看注释的时候恍然大悟：原来是这么个意思。

第二不要畏难，不要觉得Vue这种闻名的框架都是阳春白雪，怎么能一下看明白。它们都是由基础的代码一部分一部分组成的。我们可以从一个小点出发，以点及面，慢慢深入，从而达到学习提升自己的目的。当一个文件、一个功能、一个模块被攻克后，你会发现其实没那么难，世上无难事，只要肯花心思，一切都是值得的。



### 一、源码

```javascript
/*
Run Rollup in watch mode for development.
// 在开发环境下，运行rollup的watch模式

To specific the package to watch, simply pass its name and the desired build
formats to watch (defaults to "global"):
//指定要watch的包，只需传递它的名称和所需的构建格式(默认为“global”)

# name supports fuzzy match. will watch all packages with name containing "dom"
nr dev dom
// name支持模糊匹配。运行npm run dev dom ，将会监视所有名称包含"dom"的package

# specify the format to output
nr dev core --formats cjs
// 指定要输出的格式
// npm run dev core --formats cjs

# Can also drop all __DEV__ blocks with:
__DEV__=false nr dev
// 可以删除所有__dev__块：
// 通过右边这个命令： __dev __ = false nr dev

*/

const execa = require('execa')
const { fuzzyMatchTarget } = require('./utils')
const args = require('minimist')(process.argv.slice(2))
// fuzzyMatchTarget(args._)[0]，这里为什么取第一项？
const target = args._.length ? fuzzyMatchTarget(args._)[0] : 'vue' 
const formats = args.formats || args.f
const sourceMap = args.sourcemap || args.s
const commit = execa.sync('git', ['rev-parse', 'HEAD']).stdout.slice(0, 7)

execa(
  'rollup', // 此处可以看作让node 执行 rollup.config.js文件
  [
    '-wc', // rollup的配置参数，监听源文件是否有改动，如果有改动，重新打包
    '--environment',
    [
      `COMMIT:${commit}`,
      `TARGET:${target}`,
      `FORMATS:${formats || 'global'}`,
      sourceMap ? `SOURCE_MAP:true` : ``
    ]
      .filter(Boolean)
      .join(',')
  ],
  {
    stdio: 'inherit'
  }
)
```



### 二、execa

- `execa`是可以调用shell和本地外部程序的javascript封装。会启动子进程执行。支持多操作系统，包括windows。如果父进程退出，则生成的全部子进程都被杀死。
- **execa(file, [arguments], [options])**  ： 执行一个文件，可以把它看作`child_process.execFile`和`child_process.spawn`的混合，返回一个`child_process` （子进程）实例，该实例也被增强为带有stdout和stderr属性的结果对象的Promise。
- http://abloz.com/tech/2018/08/21/nodejs-execa/
- 用法如下：

```javascript
execa = require("execa")
execa("echo",["hello world"]).then(result => {
    console.log(result.stdout);
    //=> 'hello world'
});
execa("grep",["hello","index.js"]).then(result => {
    console.log(result.stdout);
}).catch(err => console.log(err));

execa.shell("ls",["a","l"]).then(r=>console.log(r.stdout));

(async () => {
	const {stdout} = await execa('echo', ['你好！']);
	console.log(stdout);
	//=> 'unicorns'
})();
```

```javascript
const execa = require('execa');

(async () => {
	// Catching an error
	try {
		await execa('unknown', ['command']);
	} catch (error) {
		console.log(error);
		/*
		{
			message: 'Command failed with ENOENT: unknown command spawn unknown ENOENT',
			errno: -2,
			code: 'ENOENT',
			syscall: 'spawn unknown',
			path: 'unknown',
			spawnargs: ['command'],
			originalMessage: 'spawn unknown ENOENT',
			shortMessage: 'Command failed with ENOENT: unknown command spawn unknown ENOENT',
			command: 'unknown command',
			escapedCommand: 'unknown command',
			stdout: '',
			stderr: '',
			all: '',
			failed: true,
			timedOut: false,
			isCanceled: false,
			killed: false
		}
		*/
	}

})();
```

>**child_process.execFile(file[, args][, options][, callback])**、
>
>**child_process.spawn(command[, args][, options])**
>
>https://nodejs.org/api/child_process.html#child_processexecfilefile-args-options-callback

这里说下**child_process.execFile**

- **file**：要运行的可执行文件的名称或路径

- **args**：字符串参数列表
- **options**：配置项，有`cwd`、`env`、`encoding`、`timeout`、`shell`等等
- **callback**：进程终止时用输出调用，有`error`、`stdout`、`stderr`

返回一个[child_process](https://nodejs.org/api/child_process.html#class-childprocess)

`child_process.execFile()`函数与[child_process.exec()](https://nodejs.org/api/child_process.html#child_processexeccommand-options-callback))类似，只是默认情况下它不生成shell。相反，指定的可执行文件将直接作为一个新进程生成，这使得它比[child_process.exec()](https://nodejs.org/api/child_process.html#child_processexeccommand-options-callback)稍微高效一些。两个方法options配置项相同。由于不会产生shell，因此不支持诸如I / O重定向和文件的行为。

**最终含义：**

实际就是在命令行执行：

```javascript
rollup -wc --environment "COMMIT:xxxx,TARGET:true,FORMATS:global"
```

让rollup监听文件改动，并且把“”中的内容设置到运行环境供rollup调用。



### 三、minimist

一个node包，解析参数选项，示例：

```javascript
var argv = require('minimist')(process.argv.slice(2));
console.log(argv);
```

```javascript
$ node example.js -a beep -b boop
{ _: [], a: 'beep', b: 'boop' }
```

```javascript
$ node example.js -x 3 -y 4 -n5 -abc --beep=boop foo bar baz
{ 
  _: [ 'foo', 'bar', 'baz' ],
  x: 3,
  y: 4,
  n: 5,
  a: true,
  b: true,
  c: true,
  beep: 'boop' 
}
```

`process.argv`的前两项为本地路径，类似

>  '/Users/tangci/.nvm/versions/node/v14.18.1/bin/node',
>  '/Users/tangci/workspace/personal/vue-projects/vue-source-code/vue-next/scripts/dev.js',

所以需要去掉，得到解析后的命令行输入的用户指令。自此，我们拿到了`args`参数。

### 四、fuzzyMatchTarget

先上代码：

```javascript
exports.fuzzyMatchTarget = (partialTargets, includeAllMatching) => {
  const matched = []
  partialTargets.forEach(partialTarget => {
    for (const target of targets) {
      if (target.match(partialTarget)) {
        matched.push(target)
        if (!includeAllMatching) {
          break
        }
      }
    }
  })
  if (matched.length) {
    return matched
  } else {
    console.log()
    console.error(
      `  ${chalk.bgRed.white(' ERROR ')} ${chalk.red(
        `Target ${chalk.underline(partialTargets)} not found!`
      )}`
    )
    console.log()
    process.exit(1)
  }
}
```

一个工具方法，模糊匹配，第一个参数是匹配字符串，其实就是命令行参数，例如npm run dev -a animal -b boo，那么partialTargets=["animal","boo"]，第二个是是否全部匹配，或者说返回全部匹配内容，为false的话只要匹配到结果就返回结果就结束匹配。

**targets**是一个数组，数组包含了符合条件的文件夹名。符合条件：packages目录下的文件夹，且文件夹内package.json的private为falsy，且有buildOptions，返回结果：

```javascript
targets = [
  'compiler-core',
  'compiler-dom',
  'compiler-sfc',
  'compiler-ssr',
  'reactivity',
  'ref-transform',
  'runtime-core',
  'runtime-dom',
  'server-renderer',
  'shared',
  'template-explorer',
  'vue',
  'vue-compat'
]
```

所以我们可以看一个测试命令：

```javascript
node scripts/dev.js vue runtime-dom -f global -p
```

得到输出结果：

```javascript
partialTargets = [ 'vue', 'runtime-dom' ]
includeAllMatching = undefined
process.argv = [
  '/Users/tangci/.nvm/versions/node/v14.18.1/bin/node',
  '/Users/tangci/workspace/personal/vue-projects/vue-source-code/vue-next/scripts/dev.js',
  'vue',
  'runtime-dom',
  '-f',
  'global',
  '-p'
]
process.argv.slice(2) = [ 'vue', 'runtime-dom', '-f', 'global', '-p' ]
args = { _: [ 'vue', 'runtime-dom' ], f: 'global', p: true }
target = vue
```

到这里已经很明显了，如果存在`args._`，也就是命令行有用户输入的命令，则对用户命令进行一个模糊匹配，取返回结果的第一项，否则就默认target是package下的vue文件夹。

这时就可以解答上面的问题，为什么只取fuzzyMatchTarget(args._)的第一项？

因为在开发环境下，yarn dev 或者nr dev，rollup需要 watch 一个pkg，所以直接执行一次execa方法即可，如果需要watch多个pkg可以多开terminal。而build阶段，buildjs中需要多个pkg，所以execa执行方法直接写在build方法中，进行全量编译。

```javascript
nr dev vue // watch vue
nr dev runtime-dom // watch runtime-dom
...
```

至于`formats`、`commit`、`sourceMap`都是用户输入的命令，用于rollup的dev watch。

### 五、调用execa

最后讲回`execa`，在文件最后，执行了这个方法。

```javascript
execa(
  'rollup',
  [
    '-wc',
    '--environment',
    [
      `COMMIT:${commit}`,
      `TARGET:${target}`,
      `FORMATS:${formats || 'global'}`,
      sourceMap ? `SOURCE_MAP:true` : ``
    ]
      .filter(Boolean)
      .join(',')
  ],
  {
    stdio: 'inherit'
  }
)
```

第一个参数`rollup`，表示执行`rollup.config.js`文件

第二个参数是rollup的参数数组

​	  `-wc` 是`--watch`,`--config`，表示监听配置文件改动

​      `--environment`是传给配置文件的设置，将随后的配置项传入rollup配置中

​      第三个要传入rollup的配置项

说下第二个参数的第三项，这里通过或表达式、三元运算、以及`filter.(Boolean)`，过滤出真值配置，然后传入rollup配置文件，让rollup执行

```javascript
// 实际执行如下
rollup -wc --environment "COMMIT:xxxx,TARGET:vue,FORMATS:global"
```

第三个参数是`execa`的回调，执行完成后输出调用信息。

### 六、总结

至此我们就已经解读完成了整个dev.js文件，一句话总结整个dev.js文件的作用：

**获取用户/命令行输入指令，解析指令，将解析后的参数传递给rollup，通过rollup来监听本地文件改动，在发生改变时重新打包编译。**

其实dev.js代码并不多，功能也不复杂，学习难度也不高，值得成为一个切入点。

