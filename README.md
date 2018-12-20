# vue-cms

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

登录和权限的思路
登录:当用户填写完账号和密码后向服务器验证是否正确, 验证通过之后, 服务器会返回一个 "token", 拿到 token 之后(我会将这个 token 贮存 cookie 中,保证刷新页面后能记住用户登录状态), 前端会根据 "token" 再去拉取一个 user_info 的接口来获取用户的详细信息(如用户权限, 用户名等信息)

权限验证:通过 "token" 获取用户对应的 role, 的那个太根据用户的 role 算出其对应有权限的路由, 通过 router.addRouters 动态挂载这些路由

上述所有的数据和操作都是通过 vuex 全局管理控制的。(补充说明：刷新页面后 vuex 的内容也会丢失，所以需要重复上述的那些操作)接下来，我们一起手摸手一步一步实现这个系统。
