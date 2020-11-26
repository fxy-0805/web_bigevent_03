// 1. 开发环境服务地址
var baseURL = 'http://ajax.frontend.itheima.net'
// 1. 测试环境服务地址
// var baseURL = 'http://ajax.frontend.itheima.net'
// 1. 生产环境服务地址
// var baseURL = 'http://ajax.frontend.itheima.net'
$.ajaxPrefilter(function (params) {
    params.url = baseURL + params.url
    // alert(params.url)
    // 对需要权限的接口配置头信息
    // 必须以my开头
    if (params.url.indexOf('/my/') !== -1) {
        params.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    // 全局统一挂载complete回调函数
    params.complete = function (res) {
        // 不论成功还是失败，最终都会调用complete回调函数
        // 在complete回调函数中，可以使用res.responseJSON拿到服务器响应回来的数据
        var obj = res.responseJSON
        if (obj.status === 1 && obj.message === '身份认证失败！') {
            // 强制清空token
            localStorage.removeItem('token')
            // 强制跳转到登录页面
            location.href = '/login.html'

        }
    }
})