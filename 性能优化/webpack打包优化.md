
## 一、 分析问题

优化前必须知道问题在哪，用webpack-bundle-analyzer对打包产物进行分析

## 二、 TreeShaking

这个功能就像给代码树「梳头发」，把没用的叶子（未引用代码）全摇下来。

  1. 确保使用 ES6 模块（import/export），CommonJS（require）不支持
  2. Webpack 配置 mode: 'production'（默认开启 Tree Shaking）

`

    // utils.js
    export const formatMoney = () => { /*... */ }
    export const formatDate = () => { /* ... */ }
    export const validatePhone = () => { /* ...*/ }
    // ...还有7个函数
    // 业务代码
    import { formatMoney } from './utils' // 只用到1个

`

未优化时，webpack 会把整个 utils.js 打包进去。开启 Tree Shaking 后，多余的 9 个函数被自动剔除，减少文件体积。

`避免使用import * as utils这种全量引入，会让 Tree Shaking 失效。`

## 三、代码分割

把大文件拆成小文件，就像把行李箱里的衣服分袋包装，需要时再取。 用 Webpack 的 splitChunks 把第三方库和业务代码分开：

`

    // webpack.config.js
    module.exports = {
    optimization: {
        splitChunks: {
        chunks: 'all',
        cacheGroups: {
            vendor: {
            test: /[\/]node_modules[\/]/,
            name: 'vendors',
            chunks: 'all'
            }
        }
        }
    }
    };

`
配置后，node_modules 里的 React、Vue 等库会被打包成单独的vendors.js，业务代码单独打包。原本臃肿的主文件，拆分后主文件大大瘦身，虽然vendors.js 可能很大 —— 总容量没变，但首屏只需加载体积变少的业务代码，体验提升明显。

## 四、 Terser 压缩

Terser 就像代码界的真空包装机，能把冗余代码压到极致。在 Webpack 中配置：

`

    // webpack.config.js
    const TerserPlugin = require('terser-webpack-plugin');
    module.exports = {
    optimization: {
        minimizer: [
        new TerserPlugin({
            parallel: true, // 多进程压缩
            terserOptions: {
            compress: {
                drop_console: true, // 移除console
                drop_debugger: true // 移除debugger
            }
            }
        })
        ]
    }
    };

`
变量名被简化，注释和日志被删除，大大减少打包产物体积。

## 五、第三方重库用CDN

把 React、Vue、vue-router等等 这些大库交给 CDN 托管，这样主 bundle 可以减少几十上百的公共依赖库打包体积

## 六、懒加载

对于非首屏组件，像弹窗、详情页，用懒加载让它们在需要时才加载。

react:

`

    // 之前：直接引入
    import ProductDetail from './ProductDetail';

    // 之后：懒加载
    const ProductDetail = React.lazy(() => import('./ProductDetail'));

`

vue:
`
const ProductDetail = () => import('./ProductDetail.vue');
`

假如ProductDetail大小是 200kb,优化后，ProductDetail 组件的200k代码会被拆成单独的 chunk，只有用户进入详情页时才加载，主文件减少 200KB。

## 七、用更轻量的第三方库

比如用lodash-es替代lodash、用 dayjs 或者 date-fns 代替 moment.js

## 八、 HTTP 压缩

在服务器开启 Gzip 或 Brotli 压缩，让文件在传输时变小。

Nginx 配置 Gzip：

`

    gzip on;
    gzip_types application/javascript;
    gzip_comp_level 6; # 压缩级别1-9，6是平衡点

`
浏览器接收后会自动解压。如果用 Brotli 压缩，还能再小 15%-20%。

## 九、持续优化小技巧

  1. 把 bundle 体积加入 CI/CD 流程，超过阈值就报警
  2. 定期用npm ls检查冗余依赖
  3. 用source-map-explorer深入分析代码构成： npx source-map-explorer dist/*.js
