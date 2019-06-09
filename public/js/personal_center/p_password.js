$(function() {
    // 列表字体颜色
    $('.main_list a').css('color','#aaa');
    $('.list_password').css('color','#ff4001');
    // 获取用户信息
    var user_id = sessionStorage.getItem('user_id');
    var password;
    // 获取旧密码
    $.ajax({
        method:'get',
        url:'/p_getPassword',
        data: {
            user_id:user_id
        }
    })
    .done(function(res) {
        password = res[0].user_password;
    });
    // 保存密码
    $('.main_right').on('click','.top_button',function() {
        if(oldFlag && newFlag && sureFlag) {
            var newPass =  $('.pas_new').val();
            $.ajax({
                method:'put',
                url:'/p_setPassword',
                data: {
                    user_id:user_id,
                    newPass:newPass
                }
            })
            .done(function() {
                $('.pas_old').val('');
                $('.pas_new').val('');
                $('.pas_sure').val('');
                $('.modal-content').text('密码修改成功');
                $('.modal').modal();
            })
        }
    })
    // 正则验证
    var oldFlag = false,newFlag = false,sureFlag = false;
        // 旧密码
    $('.main_right').on('blur','.pas_old',function() {
        if($(this).val() == password) {
            oldFlag = true;
            $('.old_err').css('display','none');
        }else {
            oldFlag = false;
            $('.old_err').css('display','inline-block');
        }
    })
        // 新密码
    $('.main_right').on('blur','.pas_new',function() {
        if($(this).val().length >= 6 && $(this).val().length <= 20) {
            newFlag = true;
            $('.new_err').css('display','none');
        }else if($(this).val().length < 6 || $(this).val().length > 20){
            newFlag = false;
            $('.new_err').css('display','inline-block');
        }
        if($(this).val() == $('.pas_sure').val()) {
            sureFlag = true;
            $('.sure_err').css('display','none');
        }else {
            sureFlag = false;
            $('.sure_err').css('display','inline-block');
        }
    })
        // 确认密码
    $('.main_right').on('blur','.pas_sure',function() {
        if($(this).val() == $('.pas_new').val()) {
            sureFlag = true;
            $('.sure_err').css('display','none');
        }else {
            sureFlag = false;
            $('.sure_err').css('display','inline-block');
        }
    })

    $html = $(`
        <p class='data_head'>修改密码<p>
        <div class='data_div clear'>
            <lable class='data_hint inp_hint'>旧密码: </lable> 
            <input class='data_name pas_old' type='password' placeholder='请输入当前密码'>
            <lable class='old_err'>旧密码不正确！ </lable> 
        </div>
        <div class='data_div clear'>
            <lable class='data_hint inp_hint'>新密码: </lable> 
            <input class='data_name pas_new' type='password' placeholder='请输入6-20位新密码'>
            <lable class='new_err'>新密码必须在6-20位！</lable>
        </div>
        <div class='data_div clear'>
            <lable class='data_hint inp_hint'>确定新密码: </lable> 
            <input class='data_name pas_sure' type='password' placeholder='请确认新密码'>
            <lable class='sure_err'>两次密码不一致！ </lable>
        </div>
        <input type='button' class='top_button' value='确定修改'>
    `)

    $('.main_right').append($html);


})