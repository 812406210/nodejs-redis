/**
 * Created with JetBrains WebStorm.
 * User: guola
 * Date: 12-9-28
 * Time: 上午10:38
 * To change this template use File | Settings | File Templates.
 */

var db = require('../db');
var user = db.get('user');
user.property('id', {identifier: true});
user.property('username', {unique: true});
user.property('email', {index: true, email: true});
user.property('password', {});




exports.index = function (req, res, next) {
    res.render('user', { title: '医生注册' });
};


exports.list = function (req, res, next) {
    user.list(
        {direction: 'desc'},
        function(err, users) {
        console.log(users);
        if (!err) {
            return res.send(users);
        } else {
            return console.log(err);
        }
    });

};

exports.add=function (req, res,next){
    console.log("POST: ");
    console.log(req.body);
    user.create(
        {username: req.body.username, email: req.body.email,password:req.body.password},
        function(err, user){
            if(user)
            {
                console.log({ret:true,msg:'恭喜您成功注册',data:user});
                return res.send({ret:true,msg:'恭喜您成功注册',data:user});
            }
            else
            {
                console.log({ret:false,msg:'请修改用户昵称',data:err});
                return res.send({ret:false,msg:'请修改用户昵称',data:err});
            }
        });
};

exports.doctor=function (req,res,next)
{
    user.get(
        {id:req.params.id} //数据
    , function(err, user) {//回调函数
            if(!err)
            {
                console.log(user);
                return res.send(user);
            }
        else
            {
            return console.log(err);
            }

        });

    return;
};

exports.update=function (req, res,next){
    user.update({
        id:req.params.id,
        username: req.params.username,
        email: req.params.email,
        password:req.params.password
    }, function(err, user) {
        return console.log(user);
        if (!err) {
            console.log("updated");
        } else {
            console.log(err);
        }
        return res.send(user);

    });
};

exports.delete=function (req,res,next){
    user.remove(
        {
            id: req.params.id
        }
    , function(err, user) {
        if (!err) {
            console.log("removed");
            return res.send('');
        } else {
            console.log(err);
        }
        return console.log(user);
    });

};

exports.login=function (req,res,next)
{
    user.get({username:req.body.username, password:req.body.password}
        , function(err, user) {
            if(!err)
            {
                console.log(user);
                if(user)
                {
                  console.log({ret:true,msg:'成功登陆',data:user});
                  return res.send({ret:true,msg:'成功登陆',data:user});

                }
                else
                {
                    console.log({ret:false,msg:'请检查用户名和密码'});
                    return res.send({ret:false,msg:'请检查用户名和密码'});
                }
            }
        });
};

exports.usernameIsExist=function (req,res,next)
{
    user.get({username:req.body.username}
        , function(err, user) {
            if(!err)
            {
                console.log(user);
                if(user)
                {
                    console.log({ret:true,msg:'用户名已经存在，请修改用户名！',data:user});
                    return res.send({ret:true,msg:'用户名已经存在，请修改用户名！',data:user});

                }
                else
                {
                    console.log({ret:false,msg:'可以使用此用户名称'});
                    return res.send({ret:false,msg:'可以使用此用户名称'});
                }
            }
        });


}
