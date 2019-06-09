 
$(function(){
//图形验证码渲染
    var show_num = [];
    draw(show_num);
//看不清图形验证码时点击切换
    $(".rest-canvas").on('click',function(){
        draw(show_num);
        return false
    })
//输入密码时可见与不可见的切换
    $('#f_img').on('click',function(){
        if(!$('.user-pass').attr('type')){
            $('.user-pass').attr('type','password')
        }else{
            $('.user-pass').attr('type','')
        }
    })
//点击登录按钮时
    $("#btn").on('click',function(){
        var val = $("#captcha").val().toLowerCase();
        var num = show_num.join("");
        var name = $('.user-name').val().replace(/(^\s*)|(\s*$)/g, "");//去除首尾空格
        var pass = $('.user-pass').val().replace(/\s+/g, "");//去除所有空格
        if(name){
            if(pass){
                if(val){
                    if(val==num){
                        encrytion(pass,name)
                        $('.loginForm')[0].reset()
                    }else{
                        draw(show_num);
                        $('.modal-content').text('请输入输入正确的验证码')
                        $('.modal').modal();
                    }
                }else{
                    $('.modal-content').text('验证码不能为空')
                    $('.modal').modal();

                }
            }else{
                $('.modal-content').text('密码不能为空')
                $('.modal').modal();

            }
        }else{
            $('.modal-content').text('账号不能为空')
            $('.modal').modal();

        }
       
      
    })
// 点击立即注册按钮
    $('#entry').on('click',function(){
        $('.regest-box').show();
       $('#login-box').hide();
    })
//点击返回登录按钮
    $('#entry2').on('click',function(){
        $('.regest-box').hide();
    $('#login-box').show();
    })
//点击注册按钮
    $('#btn2').on('click',function(){
        var name = $('.user-name2').val().replace(/(^\s*)|(\s*$)/g, "");//去除首尾空格
        var pass = $('.user-pass2').val().replace(/\s+/g, "");//去除所有空格
        var verifypass = $('.verify').val().replace(/\s+/g, "");//再次确认密码去除所有空格
        var telephone = $('.telephone').val()
        var reg = /^1[34578]\d{9}$/;//匹配电话号码的正则表达式
       
        if(name){
            if(pass){
                if(verifypass){
                    if(verifypass==pass){
                       if( reg.test(telephone)){
                           if($('#protocal2').prop('checked')){
                            regest(name,pass,telephone)
                            $('.regestForm')[0].reset()
                           }else{
                            $('.modal-content').text('请您关注会员协议，隐私保护政策')
                            $('.modal').modal();
                           }
                       }else{
                        $('.modal-content').text('请输入正确的电话号码，在您忘记密码时我们会向你预留的手机号发送短信帮助你找回密码')
                        $('.modal').modal();
                        $('.telephone').val('') 
                       }
                    }else{
                        draw(show_num);
                        $('.user-pass2').val('')
                        $('.verify').val('')
                        $('.modal-content').text('确认密码错误重新输入')
                        $('.modal').modal();
                    }
                }else{
                    $('.modal-content').text('请再次确认密码')
                    $('.modal').modal();
                }
            }else{
                $('.modal-content').text('密码不能为空')
                $('.modal').modal();
            }
        }else{
            $('.modal-content').text('账号不能为空')
            $('.modal').modal();

        }
       
    })
// 注册账号ajax 请求
    function regest(a,b,c){
        var b = md5(md5(md5(b)))
        $.ajax({
            method:'post',
            url:'/regest',
            data:{
                username:a,
                password:b,
                telephone:c
            }
        })
        .done(function(data){
            if(data=='注册成功'){
                $('.modal-content').text(data+'即将回到登录页面。。。。')
                $('.modal').modal();
                setTimeout(function(){
                    $('.modal').modal('hide');
                    $('.regest-box').hide();
                    $('#login-box').show();
                },2000)
            }
        })
        .fail(function(err){
            $('.modal-content').text('服务器走丢了请稍后再试。。。')
            $('.modal').modal();
        })
    }
// 登录时ajax 请求
    function encrytion(p,n){
        var user_pass =  md5(md5(md5(p)))
        $.ajax({
            method:'post',
            url:'login',
            data:{
                username:n,
                password:user_pass
            }
        })
        .done(function(res){
        if(res.state){ 
            sessionStorage.setItem('user_id',res.data.user_id);
            location ='/';
        }else{
            $('.modal-content').text(res.msg)
            $('.modal').modal();
        }
        })
        .fail(function(){
            $('.modal-content').text('连接服务器失败')
            $('.modal').modal();
        })

    }
//生成并渲染出验证码图形
    function draw(show_num) {
        var canvas_width=$('#canvas').width();
        var canvas_height=$('#canvas').height();
        var canvas = document.getElementById("canvas");//获取到canvas的对象，演员
        var context = canvas.getContext("2d");//获取到canvas画图的环境，演员表演的舞台
        canvas.width = canvas_width;
        canvas.height = canvas_height;
        var sCode = "a,b,c,d,e,f,g,h,i,j,k,m,n,p,q,r,s,t,u,v,w,x,y,z,A,B,C,E,F,G,H,J,K,L,M,N,P,Q,R,S,T,W,X,Y,Z,1,2,3,4,5,6,7,8,9,0";
        var aCode = sCode.split(",");
        var aLength = aCode.length;//获取到数组的长度
        
        for (var i = 0; i < 4; i++) {  //这里的for循环可以控制验证码位数（如果想显示6位数，4改成6即可）
            var j = Math.floor(Math.random() * aLength);//获取到随机的索引值
            // var deg = Math.random() * 30 * Math.PI / 180;//产生0~30之间的随机弧度
            var deg = Math.random() - 0.5; //产生一个随机弧度
            var txt = aCode[j];//得到随机的一个内容
            show_num[i] = txt.toLowerCase();
            var x = 10 + i * 30;//文字在canvas上的x坐标
            var y = 20 + Math.random() * 8;//文字在canvas上的y坐标
            context.font = "bold 23px 宋体";

            context.translate(x, y);
            context.rotate(deg);//控制文字旋转

            context.fillStyle = randomColor();//文字随机颜色
            context.fillText(txt, 0, 0);

            context.rotate(-deg);//控制文字旋转
            context.translate(-x, -y);
        }
        for (var i = 0; i <= 6; i++) { //验证码上显示线条
            context.strokeStyle = randomColor();
            context.beginPath();
            context.moveTo(Math.random() * canvas_width, Math.random() * canvas_height);
            context.lineTo(Math.random() * canvas_width, Math.random() * canvas_height);
            context.stroke();
        }
        for (var i = 0; i <= 50; i++) { //验证码上显示小点
            context.strokeStyle = randomColor();
            context.beginPath();
            var x = Math.random() * canvas_width;
            var y = Math.random() * canvas_height;
            context.moveTo(x, y);
            context.lineTo(x + 1, y + 1);
            context.stroke();
        }
    }
//得到随机的颜色值
    function randomColor() {
        var r = Math.floor(Math.random() * 256);
        var g = Math.floor(Math.random() * 256);
        var b = Math.floor(Math.random() * 256);
        return "rgb(" + r + "," + g + "," + b + ")";
    }
})

