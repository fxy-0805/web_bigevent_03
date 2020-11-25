// 1. 开发环境服务地址
var baseURL = 'http://ajax.frontend.itheima.net'
// 1. 测试环境服务地址
// var baseURL = 'http://ajax.frontend.itheima.net'
// 1. 生产环境服务地址
// var baseURL = 'http://ajax.frontend.itheima.net'
$.ajaxPrefilter(function(params) {
    params.url = baseURL + params.url
    alert(params.url)
})