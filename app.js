
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 2000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('cookiesnoopysecret'));
  app.use(express.session());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

//app.get('/', routes.doctor);

var tags = require('./routes/tags');

var urlrouter = require('urlrouter');

var user = require('./routes/user');

var router = urlrouter(function (app) {

//整体URL流程处理
    app.get('/', user.index);

//医生数据处理部分 Restful 处理

    app.get('/user',user.list );//医生列表
    app.get('/user/:id',user.user);//医生id查询

    app.post('/user',user.add );//医生注册
    app.put('/user/:username',user.update); //医生更新
    app.delete('/user/:username',user.delete);//医生删除

    app.post('/user/login',user.login);//医生登录
    app.post('/user/isexist',user.usernameIsExist); //判断医生用户名是否已经注册

    app.get('/tags',tags.index);

});
app.use(router);




http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
