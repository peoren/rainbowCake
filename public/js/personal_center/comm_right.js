

$(function() {
    var showFlag; //默认收缩
    $('.main_right').html($(`
    <div class='myVip clear'>
    </div>
    `))
    // 获取用户
    var user_id = sessionStorage.getItem('user_id');
    // 充值vip
    // 判断vip是否到期
    $.ajax({
        method:'get',
        url:'/p_vip_isTimeout',
        async:false,
        data:{
            user_id:user_id
        }
    })
    .done(function(res) {
        if(res[0]['user_vip_out-NOW()'] > 0) {
            return;
        } else {
            $.ajax({
                method:'put',
                url:'/p_vip_timeout',
                async:false,
                data:{
                    user_id:user_id
                }
            })
            .done(function() {

            })
        }
    })
    // 默认数值
    var vip_time = 30;
    var isVip = false;
    ajax();
    function ajax() {
        $.ajax({
            method:'get',
            url:'/p_getData',
            async:false,
            data:{
                user_id:user_id
            }
        })
        .done(function(res) {
            if(res[0].user_vip == 1) {
                isVip = true;
            }
            else {
                isVip = false;
            }
            render(res[0]);
        })
    }

    // 点击
    $('body').on('click','.vx',function() {
        $(this).addClass('method');
        $('.zfb').removeClass('method');
        $('.pay_qr').css({
            background:"url('../../img/personal_center/vx_qr.jpg') no-repeat center",
            backgroundSize:'cover'
        })
    })
    $('body').on('click','.zfb',function() {
        $(this).addClass('method');
        $('.vx').removeClass('method');
        $('.pay_qr').css({
            background:"url('../../img/personal_center/zfb_qr.jpg') no-repeat center",
            backgroundSize:'cover'
        })
    })
    $('body').on('click','.pay_30',function() {
        $(this).addClass('pay_sure');
        $('.pay_90').removeClass('pay_sure');
        vip_time = 30;
    })
    $('body').on('click','.pay_90',function() {
        $(this).addClass('pay_sure');
        $('.pay_30').removeClass('pay_sure');
        vip_time = 90;
    })
    // 充值完成
    $('body').on('click','.pay_finish',function() {
            $.ajax({
                url:'p_addVip',
                method:'post',
                data:{
                    user_id:user_id,
                    vip_time:vip_time,
                    isVip:isVip
                }
            })
            .done(function() {
                ajax();
                vip_time = 30;
                $('body').removeClass('modu');
                $('.module').css({
                    opacity:'0'
                });
                $('.pay_div').css({
                    transform:'translateY(-50px)'
                });
                if(isVip) {
                    $('.modal-content').text('续费成功！')
                }else {
                    $('.modal-content').text('充值成功！')
                }
                $('.modal').modal();
                setTimeout(() => {
                    $('.module').remove();
                }, 500);
            })
        
    })


    // 生成充值页面模态框
    $('.main_right').on('click','.vip_img',function() {
        $('body').addClass('modu');
        var $vip = $(`
            <div class='module'>
                <div class='pay_div clear'>
                    <p class='pay_p clear'>
                        <span class='vx method'>微信支付</span>
                        <span class='zfb'>支付宝支付</span>
                    </p>
                    <p class='pay_30 clear pay_sure'><span>￥50</span><span>30天</span></p>
                    <p class='pay_90 clear'><span>￥130</span><span>90天</span></p>
                    <div class='pay_qr'>

                    </div>
                    <p class='pay_finish'>支付完成</p>
                </div>
            </div>
        `);
        $('body').append($vip);
        setTimeout(() => {
            $('.module').css({
                opacity:'1'
            })
            $('.pay_div').css({
                transform:'translateY(0)'
            })
        }, 10);
        return false;
    })
    // 点击充值区域不移除模态框
    $('body').on('click','.pay_div',function() {
        return false;
    })
    // 点击模态框移除
    $('body').on('click','.module',function() {
        $('body').removeClass('modu');
        $('.module').css({
            opacity:'0'
        });
        $('.pay_div').css({
            transform:'translateY(-50px)'
        });
        setTimeout(() => {
            $('.module').remove();
        }, 500);
    })

    // 渲染标签

    function render(res) {
        var $main_right = $(`
                <p class='show clear'>
                    <img src="" alt="" class='arr'>
                    <span class='showP'></span>
                </p>
                <div class='top'>
                    <div class='head'>
                        <div class="head_img">
                            <img src="../../img/personal_center/a.jpg" alt="">
                        </div>
                        <p class='head_hint'>陈大哥</p>
                        <div class='vip_img' title='充钱！'>
                            <a href=''><img src="../../img/personal_center/VIP.png" alt="" class='isvip_img'></a>
                        </div>
                        <p class='vip_hint'>您的vip到期时间为:</p>
                        <p class='vip_time'>--</p>
                        <p class='time'>vip用户全场9折优惠！</p>
                        
                    </div>
                    <div class='schedule'>
                        <div id='schedule-box' class="boxshaw">
                        
                        </div>
                        <div>
                            <h3 id='h3Ele'></h3>
                        </div>
                    </div>
                </div>
        `)
        $('.myVip').html($main_right);
        if(res.user_name == null) {
            $('.head_hint').text('未设置用户名')
        }
        if(res.user_name != null) {
            $('.head_hint').text(res.user_name)
        }
        // 日历是否收缩
        if(showFlag) {
            $('.arr').attr('src','../../img/personal_center/arr.png');
            $('.top').css({
                height:'319px',
                transform:'scaleY(1)'
            });
            $('.showP').text('点击收起');
        }else {
            $('.arr').attr('src','../../img/personal_center/arr1.png');
            $('.top').css({
                height:'0',
                transform:'scaleY(0.3)'
            });
            $('.showP').text('查看我的VIP');
        }
        // 是否vip
        if(res.user_vip == 1) {
            function timeFormatter(value) {
                var da = new Date(value.replace("/Date(", "").replace(")/" , "").split( "+")[0]);
                return da.getFullYear() + "-" + ((da.getMonth() + 1) < 10 ? "0" + (da.getMonth() + 1):(da.getMonth() + 1))+ "-" + (da.getDate() < 10 ? "0" + da.getDate():da.getDate()) + " " + (da.getHours()<10?"0"+da.getHours():da.getHours()) + ":" + (da.getMinutes()<10?"0"+da.getMinutes():da.getMinutes()) + ":" + (da.getSeconds()<10?"0"+da.getSeconds():da.getSeconds());
            }
            $('.isvip_img').attr('src','../../img/personal_center/VIP1.png');
            $('.vip_time').text(timeFormatter(res.user_vip_out));
            $('.vip_hint').css('color','#ff4001')
            $('.vip_time').css('color','#ff4001')
            $('.vip_img').css('border','3px solid #ff4001');
            isVip = true;
        }
        // 日历
        new Schedule({
            el: '#schedule-box',
            //date: '2018-9-20',
            clickCb: function (y,m,d) {
                document.querySelector('#h3Ele').innerHTML = '日期：'+y+'-'+m+'-'+d	
            },
            nextMonthCb: function (y,m,d) {
                document.querySelector('#h3Ele').innerHTML = '日期：'+y+'-'+m+'-'+d	
            },
            nextYeayCb: function (y,m,d) {
                document.querySelector('#h3Ele').innerHTML = '日期：'+y+'-'+m+'-'+d	
            },
            prevMonthCb: function (y,m,d) {
                document.querySelector('#h3Ele').innerHTML = '日期：'+y+'-'+m+'-'+d	
            },
            prevYearCb: function (y,m,d) {
                document.querySelector('#h3Ele').innerHTML = '日期：'+y+'-'+m+'-'+d	
            }
        });
    }


    // 展开日历
    var showFlag; //判断展开还是收缩
    $('body').on('click','.show',function() {
        showFlag = !showFlag;
        if(showFlag) {
            $('.arr').attr('src','../../img/personal_center/arr.png');
            $('.top').css({
                height:'319px',
                transform:'scaleY(1)'
            });
            $('.showP').text('点击收起');
        }else {
            $('.arr').attr('src','../../img/personal_center/arr1.png');
            $('.top').css({
                height:'0',
                transform:'scaleY(0.3)'
            });
            $('.showP').text('查看我的VIP');
        }
        
    })
    

    

})