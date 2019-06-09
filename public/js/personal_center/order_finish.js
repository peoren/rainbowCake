$(function() {
    // 列表字体颜色
    $('.main_list a').css('color','#aaa');
    $('.list_finish').css('color','#ff4001');
    // 渲染订单
    get_order('finish',function(res) {
        render(res);
    })
    // 分页
    var num = 0; //订单数量
    var now_page = 1; //当前页数 
    var sum = 0; //总页数
    pages=0; //从s数据库第0个开始加载，即第一个
    get_order_number('finish',function(res) {
        $('.page').remove();
        num = res[0].count;
        sum = Math.ceil(res[0].count/page); //总页数
        if(sum != 0) {
            var $page = $(`
            <div class='page clear'>
                <input class='prev' type='button' value='上一页'>
                <p>${now_page} / ${sum}</p>
                <input  class='next'  type='button' value='下一页'>
                <input class='topage' type='text' value=''>
                <input class='to' type='button' value='跳转'>
            </div>
            `)
            $('.main_right').append($page);
        }
    })

    function render(res) {
        $('.order').remove();
        // 表格头部
        var $order_top = `
        <div class='order'>
            <p class='order_head'>已完成订单 <span class='head_num'></span></p>
            <table>
                <tr>
                    <th class='order_img'>
                        商品图
                    </th>
                    <th class='goods_name'>
                        商品信息
                    </th>
                    <th class='order_num'>
                        数量/金额
                    </th>
                    <th class='order_person'>
                        收货人
                    </th>
                    <th class='order_time'>
                        下单时间
                    </th>
                    <th class='order_state'>
                        订单状态
                    </th>
                    <th class='order_more'>
                        操作
                    </th>
                <tr>
        `
        // 表格底部
        var $order_foot = `
            </table>
        </div>
        `
        // 需要数据库渲染的部分
        var $orderArr = res.map(function(e,i) {
            // 订单数量
            //订单状态
            var order_state;
            var order_text,order_text2,order_time;
            if(e.order_state == 0) {
                order_state = '未支付';
                order_text = '去支付';
                order_text2 = '我的订单';
                order_time = '--'
            }
            if(e.order_state == 1) {
                order_state = '配送中';
                order_text = '确认收货';
                order_text2 = '订单详情';
                order_time = timeFormatter(e.order_starttime);
            }
            if(e.order_state == 2) {
                order_state = '交易完成';
                order_text2 = '订单详情';
                order_time = timeFormatter(e.order_starttime);
            }
            // 是否已评论
            var hasCrit;
            if(e.order_state == 2 && e.order_e_state == 1) {
                hasCrit = 'hasCrit';
                order_text = '已评论';
            }
            if(e.order_state == 2 && e.order_e_state == 0) {
                hasCrit = '';
                order_text = '去评论';
            }
            return `
            <tr>
                <td class='order_img'>
                    <img src='../../${e.goods_pic_main}'>
                </td>
                <td class='goods_name'>
                    <span data-id='${e.goods_id}'>${e.goods_name}</span>
                </td>
                <td class='order_num'>
                    ${e.order_amount} / ${e.order_paytotal}
                </td>
                <td class='order_person'>
                    ${e.address_name}
                </td>
                <td class='order_time'>
                    ${order_time}
                </td>
                <td class='order_state'>
                    <p class='stateP'>${order_state}</p>
                    <span class='crit ${hasCrit}' data-flag='${e.order_e_state}' data-id='${e.order_id}' data-statu='${e.order_state}'>${order_text}</span>
                </td>
                <td class='order_more'>
                    <a href='' data-id='${e.order_id}' data-statu='${e.order_state}'>${order_text2}</a>
                </td>
            <tr>
            `
        })
        var $order = $($order_top + $orderArr.join('') + $order_foot);
        $('.main_right').append($order);
        $('.head_num').text(num);
    }
    $('.head_num').text(num);

    // 点击去评论跳转路由
    $('body').on('click','.crit',function() {
        if($(this).attr('data-statu') == 0) {
            location = '/order'
        }
        // 确认收货
        if($(this).attr('data-statu') == 1) {
            var order_id = $(this).attr('data-id');
            $.ajax({
                url:'/p_sureOrder',
                method:'post',
                data:{
                    order_id:order_id
                }
            })
            .done(function() {
                $('.modal-content').text('确认收货成功！')
                $('.modal').modal();
                get_order('finish',function(res) {
                    render(res);
                })
                get_order_number('finish',function(res) {
                    $('.page').remove();
                    sum = Math.ceil(res[0].count/page); //总页数
                    var $page = $(`
                    <div class='page clear'>
                        <input class='prev' type='button' value='上一页'>
                        <p>${now_page} / ${sum}</p>
                        <input class='next' type='button' value='下一页'>
                        <input class='topage' type='text' value=''>
                        <input class='to' type='button' value='跳转'>
                    </div>
                    `)
                    $('.main_right').append($page);
                })
            })
        }
        if($(this).attr('data-statu') == 2 && $(this).attr('data-flag') == 0) {
            sessionStorage.setItem('order_id',$(this).attr('data-id'));

            location = '/upcomment';
        }
    })
    // 点击订单详情
    $('body').on('click','.order_more a',function() {
        if($(this).attr('data-statu') == 0) {
            location = '/order'
        }
        else {
            sessionStorage.setItem('order_id',$(this).attr('data-id'));
            location = '/lineitem';
        }
        return false;
    })
    // 点击商品名字
    $('body').on('click','.goods_name span',function() {
        var id = $(this).attr('data-id');
        location = `/sendId?id=${id}`;
    })
    // 输入跳转
    $('body').on('input','.topage',function() {
        $('.to').css('background',"#ff4001");
    })
    // 下一页
    $('body').on('click','.next',function() {
        if(now_page == sum) {
            return;
        }
        now_page++;
        pages = pages + page;
        get_order('finish',function(res) {
            render(res);
        })
        get_order_number('finish',function(res) {
            $('.page').remove();
            sum = Math.ceil(res[0].count/page); //总页数
            var $page = $(`
            <div class='page clear'>
                <input class='prev' type='button' value='上一页'>
                <p>${now_page} / ${sum}</p>
                <input class='next' type='button' value='下一页'>
                <input class='topage' type='text' value=''>
                <input class='to' type='button' value='跳转'>
            </div>
            `)
            $('.main_right').append($page);
        })
    })
    // 上一页
    $('body').on('click','.prev',function() {
        if(now_page == 1) {
            return;
        }
        now_page--;
        pages = pages - page;
        get_order('finish',function(res) {
            render(res);
        })
        get_order_number('finish',function(res) {
            $('.page').remove();
            sum = Math.ceil(res[0].count/page); //总页数
            var $page = $(`
            <div class='page clear'>
                <input class='prev' type='button' value='上一页'>
                <p>${now_page} / ${sum}</p>
                <input class='next' type='button' value='下一页'>
                <input class='topage' type='text' value=''>
                <input class='to' type='button' value='跳转'>
            </div>
            `)
            $('.main_right').append($page);
        })
    })
    // 跳转
    $('body').on('click','.to',function() {
        if(isNaN($('.topage').val()) || $('.topage').val() > sum || $('.topage').val() < 1) {
            return;
        }
        else {
            now_page = $('.topage').val();
            pages = ($('.topage').val() - 1) * page;
            get_order('finish',function(res) {
                render(res);
            })
            get_order_number('finish',function(res) {
                $('.page').remove();
                sum = Math.ceil(res[0].count/page); //总页数
                var $page = $(`
                <div class='page clear'>
                    <input class='prev' type='button' value='上一页'>
                    <p>${now_page} / ${sum}</p>
                    <input class='next' type='button' value='下一页'>
                    <input class='topage' type='text' value=''>
                    <input class='to' type='button' value='跳转'>
                </div>
                `)
                $('.main_right').append($page);
            })
        }
        
    })
})