浏览器的缓存机制提供了可以将用户数据存储在客户端上的方式，可以利用cookie，session等跟服务端进行交互。



一、cookie和session

区别：

1. 保持状态： cookie保存在浏览器端，session保存在服务端

2. 使用方式：

   (1) cookie机制： 如果不在浏览器设置过期时间，cookie被保存在内存中，生命周期随浏览器的关闭而结束，这种cookie简称会话cookie。如果在浏览器中设置了cookie的过期时间，cookie被保存在硬盘中，关闭浏览器后，cookie数据仍然存在，直到过期时间结束才消失。

   Cookie是服务器发给客户端的特殊消息，cookie是以文本的方式保存在客户端，每次请求时都上它。



   (2) session机制：当服务器收到请求需要创建session对象时，首先会检查客户端请求中是否包含sessionid。如果有sessionid，服务器将根据该id返回对应session对象。如果客户端请求中没有sessionid，服务器会创建新的session对象，并把sessionid在本次响应中返回给客户端。通常使用cookie方式存储sessionid到客户端，在交互中浏览器按照规则将sessionid发送给服务器。如果用户禁用cookie，则要使用URL重写，可以通过response.encodeURL(url)进行实现；当浏览器支持cookie时，url不做任何处理；当浏览器不支持cookie时，将会重写URL将sessionID拼接到访问地址后。

3. 存储内容：cookie只能保存字符串类型，以文本的方式；session通过类似于Hashtable的数据结构来保存，能支持任何类型的对象（session中可能含有多个对象）。

4. 存储的大小： 单个cookie保存的数据不能超过4KB，session没有大小限制。

5. 安全性：cookie：针对cookie所存在的攻击：cookie欺骗，cookie截获；session的安全性大于cookie。

   原因如下：

   （1）sessionID存储在cookie中，若要攻破session首先要攻破cookie；

   （2）sessionID是要有人登录，或者启动session_start才会有，所以攻破cookie也不一定能得到sessionID；

   （3）第二次启动session_start后，前一次的sessionID就是失效了，session过期后，sessionID也随之失效；

   （4）sessionID是加密的；

6. 应用场景：

   cookie：（1）判断用户是否登陆过网站，以便下次登录时能够实现自动登录（或者记住密码）。如果删除cookie，则每次登录必须重新填写登录信息；

   ​              （2）保存上次登录信息；

   ​              （3）保存上次查看的页面；

   ​              （4）浏览计数；

   ![1544063221651](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1544063221651.png)



   session： session用于保存每个用户的专用信息，变量的值保存在服务端，通过SessionID来区分不同的客户。

   ​               （1）网上商城中的购物车；

   ​               （2）保存用户的登录信息；

   ​               （3）将某些数据放入session中，供同一用户的不同页面使用；

   ​               （4）防止用户非法登录；

7. 缺点：

   cookie： （1）大小受限；

   ​               （2）用户可以操作（禁用）cookie，使功能受限；

   ​               （3）安全性较低；

   ​               （4）有些状态不可能保存在客户端；

   ​               （5）每次访问都要传送cookie给服务器，浪费带宽。

   ​               （6）cookie数据有路径概念（path）的概念，可以限制cookie只属于某个路径下。



   session：（1）session保存的东西越多，越占用服务器内存，对于用户在线人数较多的网站，服务器的内存压力会比较大。

   ​               （2）依赖于cookie（sessionID保存在cookie），如果禁用cookie，则要使用URL重写，不安全 。


二、WebStorage



WebStorage的目的是克服由cookie所带来的一些限制，当数据需要被严格控制在客户端时，不需要持续的将数据发回服务器。

WebStorage的两个主要目标：（1）提供一种在cookie之外存储会话数据的路径。（2）提供一种存储大量可以跨会话存在的数据的机制。

HTML5的WebStorage提供了两种API：localStorage（本地存储）和sessionStorage（会话存储）。

1. 生命周期：

   localstorage： 生命周期永久，关闭页面或浏览器后localstorage的数据也不会消失，除非主动删除数据，否则永不消失。

   sessionstorage： 仅在当前会话下有效。sessionstorage引入了一个“浏览器窗口”的概念，sessionstorage是在同源的窗口中始终存在的数据。只要这个浏览器窗口没有关闭，即使刷新页面或者进入同源另一个页面，数据依然存在。但是sessionstorage在关闭了浏览器窗口后就会被销毁。同时独立的打开一个窗口同一个页面，sessionstorage也是不一样的

   。

2. 存储大小：一般都是5MB。

3. 存储位置：都保存在客户端，不与服务器进行交互通信。

4. 存储内容类型：都只能存储字符串类型，对于复杂的对象可以使用ECMAScript提供的JSON对象的stringify和parse来处理。

5. 获取方式： window.localStorage, window.sessionStorage;

6. 应用场景：

   localStorage：常用于长期登录（+判断用户是否已经登录），适合长期保存在本地的数据。

   sessionStorage：敏感账号一次性登录。

7. WebStorage的优点：

   （1）存储空间更大 ：cookie为4KB，而WebStorage是5MB；

   （2）节省网络流量：WebStorage不会传送到服务器，存储在本地的数据可以直接获取，也不会像cookie一样每次请求都会传送到服务器，减少了客户端和服务器的交互;

   （3）对于那种只需要在用户浏览一组界面期间保存而关闭浏览器后就可以丢弃的数据，sessionStorage会非常方便；

   （4）快速显示：有的数据存储在WebStorage上，再加上浏览器本身的缓存，获取数据时可以从本地获取，比从服务器获取快的多；

   （5）安全性：WebStorage不会随着HTTP header发送到服务器端，所以安全性相对于cookie来说会高一些，但仍然存在伪造问题；

   （6）WebStorage提供了一些方法，数据操作比cookie更方便：

   ​          setItem (key, value) ——  保存数据，以键值对的方式储存信息。

   ​          getItem (key) ——  获取数据，将键值传入，即可获取到对应的value值。

   ​          removeItem (key) ——  删除单个数据，根据键值移除对应的信息。

   ​          clear () ——  删除所有的数据。

   ​          key (index) —— 获取某个索引的key。