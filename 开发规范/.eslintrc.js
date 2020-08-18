module.exports = {
  settings: {
    react: {
      pragma: 'React',
      version: 'detect'
    }
  },
  // babel parser to support ES6/7 features
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 7,
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true
    },
    sourceType: 'module'
  },
  extends: [
    'prettier', 
    'prettier/react'
  ],
  plugins: [
    'promise', 
    'react', 
    'react-hooks'
  ],
  env: {
    browser: true,
    es6: true,
    node: true
  },
  rules: {
    'no-compare-neg-zero': 2, //禁止与 -0 进行比较
    'no-cond-assign': 2, //禁止条件表达式中出现赋值操作符
    'no-console': 1, //禁用 console
    'no-constant-condition': 1, //禁止在条件中使用常量表达式
    'no-control-regex': 1, //禁止在正则表达式中使用控制字符
    'no-debugger': 2, //禁用 debugger
    'no-dupe-args': 2, //禁止 function 定义中出现重名参数
    'no-dupe-keys': 2, //禁止对象字面量中出现重复的 key
    'no-duplicate-case': 2, //禁止出现重复的 case 标签
    'no-const-assign': 1, //禁止修改const声明的变量
    'no-empty': 1, //禁止出现空语句块
    'no-empty-character-class': 2, //禁止在正则表达式中使用空字符集
    'no-ex-assign': 2, //禁止对 catch 子句的异常参数重新赋值
    'no-extra-boolean-cast': 1, //禁止不必要的布尔转换
    'no-extra-semi': 1, //禁止不必要的分号
    'no-func-assign': 2, //禁止对 function 声明重新赋值
    'no-inner-declarations': 0, //禁止在嵌套的块中出现变量声明或 function 声明,ES6中无需禁止
    'no-invalid-regexp': 2, //禁止 RegExp 构造函数中存在无效的正则表达式字符串
    'no-irregular-whitespace': 1, //禁止在字符串和注释之外不规则的空白
    'no-obj-calls': 2, //禁止把全局对象作为函数调用，比如Math() JSON()
    'no-regex-spaces': 1, //禁止正则表达式字面量中出现多个空格
    'no-sparse-arrays': 1, //禁用稀疏数组
    'no-unexpected-multiline': 1, //禁止出现令人困惑的多行表达式
    'no-unreachable': 1, //禁止在return、throw、continue 和 break 语句之后出现不可达代码
    'no-unsafe-finally': 2, //禁止在 finally 语句块中出现控制流语句
    'no-unsafe-negation': 1, //禁止对关系运算符的左操作数使用否定操作符
    'use-isnan': 2, //要求使用 isNaN() 检查 NaN，如 isNaN(foo),而非foo == NaN
    'valid-typeof': 2, //强制 typeof 表达式与有效的字符串(如: 'undefined', 'object', 'boolean', 'number', 'string', 'function','symbol')进行比较
    'no-case-declarations': 1, //不允许在 case 子句中使用词法声明
    'no-empty-pattern': 2, //禁止使用空解构模式
    'no-fallthrough': 2, //禁止 case 语句落空
    'no-global-assign': 2, //禁止对原生对象或只读的全局对象进行赋值
    'no-octal': 1, //禁用八进制字面量
    'no-redeclare': 1, //禁止多次声明同一变量
    'no-self-assign': 1, //禁止自我赋值
    'no-unused-labels': 1, //禁用出现未使用过的标
    'no-useless-escape': 1, //禁用不必要的转义字符
    'no-delete-var': 2, //禁止删除变量
    'no-undef': 2, //禁用使用未声明的变量，除非它们在 /*global */ 注释中被提到
    'no-unused-vars': 1, //禁止出现未使用过的变量
    'constructor-super': 2, //要求在构造函数中有 super() 的调用
    'no-class-assign': 2, //禁止给类赋值
    'no-dupe-class-members': 2, //禁止类成员中出现重复的名称
    'no-new-symbol': 2, //禁止 Symbol 和 new 操作符一起使用
    'no-this-before-super': 2, //禁止在构造函数中，在调用 super() 之前使用 this 或 super
    'require-yield': 2, //要求 generator 函数内有 yield
    'no-mixed-spaces-and-tabs': 1, //要求不适用space，tab混用
    'react/forbid-prop-types': [1, { forbid: ['any'] }], //禁止某些propTypes
    'react/prop-types': 1, //没用对props类型进行校验
    'react/jsx-closing-bracket-location': 1, //在JSX中验证右括号位置
    'react/jsx-curly-spacing': [1, { when: 'never', children: true }], //在JSX属性和表达式中加强或禁止大括号内的空格。
    'react/jsx-key': 2, //在数组或迭代器中验证JSX具有key属性
    'react/jsx-max-props-per-line': [1, { maximum: 1 }], // 限制JSX中单行上的props的最大数量
    'react/jsx-no-duplicate-props': 2, //防止在JSX中重复的props
    'react/jsx-no-undef': 1, //在JSX中禁止未声明的变量
    'react/no-string-refs': 1, //Using string literals in ref attributes is deprecated
    'react/jsx-uses-react': 1, //防止反应被错误地标记为未使用
    'react/jsx-uses-vars': 1, //防止在JSX中使用的变量被错误地标记为未使用
    'react/no-danger': 1, //防止使用危险的JSX属性
    'react/no-did-update-set-state': 2, //防止在componentDidUpdate中使用setState
    'react/no-did-mount-set-state': 0, //防止在componentDidUpdate中使用setState
    'react/no-direct-mutation-state': 2, //防止this.state赋值
    'react/no-unknown-property': 2, //防止使用未知的DOM属性
    'react/prefer-es6-class': 1, //为React组件强制执行ES5或ES6类
    'react/react-in-jsx-scope': 0, //使用JSX时，必须要引入React
    'react/sort-comp': 0, //强制组件方法顺序
    'react/sort-prop-types': 0, //强制组件属性顺序
    'react/jsx-sort-props': 1,
    'react/no-deprecated': 1, //不使用弃用的方法
    'react/jsx-equals-spacing': 1, //在JSX属性中强制或禁止等号周围的空格
    'react/wrap-multilines': 0,
    'comma-dangle': 1, //对象字面量项尾不能有逗号
    'react/no-multi-comp': 0, //防止每个文件有多个组件定义
    'flowtype/generic-spacing': 0, //泛型对象的尖括号中类型前后的空格规范
    'flowtype/space-after-type-colon': 0, //类型注解分号后的空格规范
    // react-hooks
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn'
  }
};
