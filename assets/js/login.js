$(function () {
    // 点击注册账号
    $('#link_reg').on('click', function () {
        $('.login-box').hide().siblings('.reg-box').show()
    })
    // 点击去登录
    $('#link_login').on('click', function () {
        $('.reg-box').hide().siblings('.login-box').show()
    })
    // 自定义验证规则
    var form = layui.form
    var layer = layui.layer
    form.verify({
        pwd: [
            /^[\S]{6,16}$/,
            '密码必须6到16位，且不能出现空格'
        ],
        repwd: function (value) {
            var pwd = $('.reg-box input[name=password]').val()
            if (value !== pwd) {
                return '两次输入的密码不一致！'
            }
        }
    })
    // 注册功能绑定事件
    $('#form_reg').on('submit', function (e) {
        // 阻止表单默认提交行为
        e.preventDefault()
        // 发送ajax
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: {
                username: $('.reg-box [name=username]').val(),
                password: $('.reg-box [name=password]').val()
            },
            success:function(res) {
                if(res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('注册成功，请登录！')
                // 手动切换到登录表单
                $('#link_login').click()
                // 清空注册列表
                $('#form_reg')[0].reset()
            }
        })
    })
    // 登录功能绑定事件
    $('#form_login').submit(function(e) {
        // 阻止表单默认提交行为
        e.preventDefault()
        // 发送ajax
        $.ajax({
            method:'POST',
            url:'/api/login',
            // 快速获取表单信息
            data:$(this).serialize(),
            success:function(res) {
                if(res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('恭喜您，登录成功！')
                var token = localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }
        })
    })
})