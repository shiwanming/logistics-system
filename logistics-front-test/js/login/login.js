layui.use(['layer', 'form', 'jquery'], function() {
    let $ = layui.jquery,
        layer = layui.layer,
        form = layui.form;
    
    form.on('submit(login)', function () {
        let index = layer.load();
        $.ajax({
            type: 'get',
            url: nginx_url + '/login',
            data: {
                'loginId': $('#loginId').val(),
                'password': $('#password').val()
            },
            dataType: 'json',
            async: false,
            success: function (result) {
                console.log(result);
                if (result.STATUS === 'SUCCESS') {
                    $.cookie("loginId", result.USER.loginId);
                    setTimeout(function() {
                        layer.close(index);
                        layer.msg('登录成功', {
                            time: 1000,
                            icon: 1
                        }, function () {
                            window.location.href = 'index.html';
                        });
                    }, 800);
                }
                if(result.STATUS === 'ERROR'){
                    setTimeout(function() {
                        layer.close(index);
                        layer.msg('帐号或者密码错误', {
                            time: 1500
                        });
                    }, 800);
                }
            },
            error:function () {
                setTimeout(function() {
                    layer.close(index);
                    layer.msg('帐号或者密码错误', {
                        time: 1500
                    });
                }, 800);
            }
        });
        return false;
    });
});
