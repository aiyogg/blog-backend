FEDT-Blog 后端项目
===

项目结构
---
```
|-app  					//后台代码
|----config  			//数据库配置文件
|----controllers  		//api路由请求处理文件
|----routers  			//页面及API访问路由文件
|----utils  			//通用工具类文件
|----views  			//页面模板文件（当前只有错误页面的，首页会转向public/web/index.html下）
|-bin  					//nodejs启动文件
|-public  				//静态资源文件  
|----uploads  			//上传文件夹
|-app.js  
|-package.json  
```


项目如何启动
---


#### 环境配置

1. CentOS x64操作系统；
2. Nodejs(6.0.0+)/npm/Mongodb安装(自行google)；
3. pm2（项目启动管理）、n（Nodejs版本管理）安装；
4. 进入项目根根目录执行`npm install` ,安装各种npm的module；
5. 进入app/config/config.js修改数据库配置信息
6. 进入public/web/config.js修改web的配置信息，详情如下：
	- url: API访问根目录（http://blog.chenteng.me）
	- MY_INFO_ID: 我的个人资料的_id
	- MY: 我的信息，主要使用在评论回复上显示
	- EMAIL: 我的邮箱，主要使用在评论回复上显示
7. 注册个人信息  
	因为博客针对个人，所以这个注册的页面是没有制作的，但是接口是存在的，这个可以参考API文档，我在实现API接口及测试都是使用Postman进行的。
	
	> 注册成功后会返回注册用户的_id, 此 _id就是上面说到的MY_INFO_ID，请保管好。
	
	**发送的请求参数如下：**
	
	```http
	url:/api/register
	header:Content-Type   application/json; charset=utf-8
	{
    "username": "登录用户名",
    "password": "密码",
    "is_admin":true,	//是否是admin用户
    "full_name":"昵称",
    "position":"你的职位",
    "address":"你的地址",
    "motto":"你的心情",
    "personal_state":"你的自我介绍",
    "img_url":"http://你的头像地址"
	}
	```
	
	**成功的返回结果如下：** 
	
	```json
	{
  	"code": "1",
  	"msg": "user added and login success!",
  	"token": "a2FhY2hhMTIyfDEyM3wxNDY4MjA3MzE3MzAx",
  	"data": {
    	"username": "登录用户名",
    	"password": "密码",
    	"is_admin":true,
    	"full_name": "昵称",
    	"position": "你的职位",
    	"address": "你的地址",
    	"motto": "你的心情",
    	"personal_state": "你的自我介绍",
    	"img_url": "http://你的头像地址",
    	"_id": "用户_id",
    	"login_info": [
    		{
      		"login_time": "登录时间",
      		"login_ip":"登录ip",
      		"_id": "_id"
    		}//该账号登录记录
    	]
  	}
	}
	```






参考文档
===

- [MongooseAPI参考手册](http://www.nodeclass.com/api/mongoose.html)
- [Mongoose的Population连表操作](http://www.tuicool.com/articles/73UBRb6)
- [Vue.js2文档](https://cn.vuejs.org/)
- [Express 4.x API手册](http://www.expressjs.com.cn/4x/api.html)
- [Markdown转码工具](https://www.npmjs.com/package/marked)
- [代码高亮工具](https://highlightjs.org)