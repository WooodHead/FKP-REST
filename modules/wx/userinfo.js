//微信 web端根据web-access-token 获取用户信息
// oauth2 原理实现


var path = require('path')
var libs = require('../../libs/libs')
var api = require('../../apis/javaapi');
var config = require('../../config')
// var rct = require('../../modules/parseReact');

function *demoIndexData(oridata){
    libs.wlog('pages/weixin/userinfo')
    var mtd = this.method;
    var _this_sess = this.sess;


    var postdata = {}
    var _this = this;

    function *dealWith(){
        if(_this_sess.wwx){
            postdata={
                access_token: _this_sess.wwx.token,
                openid: _this_sess.wwx.openid,
                lang: 'zh_CN'
            }
            console.log(postdata);
            var web_userinfo = yield api.pullWxData.call(_this, 'userinfo_web', postdata)
            web_userinfo = web_userinfo[0].body
            libs.clog('从微信拉取用户信息')
            console.log(web_userinfo);
            return web_userinfo;
        }
        else{
            return {code: 1, message: '微信号没有绑定'}
        }
    }
    //
    var body = yield libs.$parse(this);
    if( body && body.code ){
        postdata = body;
        console.log('pages/wx/userinfo');
        console.log(postdata);
        var web_token = yield api.pullWxData.call(this, 'wx_web_token', postdata)
        console.log(web_token);
        return yield dealWith()
    }else{
        return yield dealWith();
    }


}

module.exports = {
    getData : demoIndexData
}