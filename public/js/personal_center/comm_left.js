// 假设id为1

var user_id = sessionStorage.getItem('user_id');

// 获取订单信息的ajax
// statu 未完成 或 已完成 或 全部订单
function get_order(order_statu,callback) {
    $.ajax({
        method:'get',
        url:'/p_get_order',
        async:false,
        data:{
            user_id:user_id,
            order_statu:order_statu,
            pages:pages,
            page:page
        }
    })
    .done(callback)
}
// 获取订单数量
var pages=0; //从s数据库第0个开始加载，即第一个
var page=5; //每次加载5个
function get_order_number(order_statu,callback) {
    $.ajax({
        method:'get',
        url:'/p_get_order_number',
        async:false,
        data:{
            user_id:user_id,
            order_statu:order_statu,
        }
    })
    .done(callback)
}

// 获取时间
function timeFormatter(value) {
    var da = new Date(value.replace("/Date(", "").replace(")/" , "").split( "+")[0]);
    return da.getFullYear() + "-" + ((da.getMonth() + 1) < 10 ? "0" + (da.getMonth() + 1):(da.getMonth() + 1))+ "-" + (da.getDate() < 10 ? "0" + da.getDate():da.getDate()) + " " + (da.getHours()<10?"0"+da.getHours():da.getHours()) + ":" + (da.getMinutes()<10?"0"+da.getMinutes():da.getMinutes()) + ":" + (da.getSeconds()<10?"0"+da.getSeconds():da.getSeconds());
}

$(function() {
    var $body = $(`

        <main class="container">
            <div class="main_left ">
                
            </div>

            <div class="main_right clear">
                
            </div>
        </main>
    `)
    $('body').append($body);
    var $main_left = $(`
        <div class="main_list">
            <ul>
                <li class="list_hint">我的交易</li>
                <li><a href="/order_finish" class='list_finish'>已完成订单</a></li>
                <li><a href="/order_unfinished" class='list_fail'>未完成订单</a></li>
                <li><a href="/order_all" class='list_all'>全部订单</a></li>
                <li class="list_hint">我的资料</li>
                <li><a href="/p_data" class='list_data'>个人资料</a></li>
                <li><a href="/p_address" class='list_address'>收货地址</a></li>
                <li><a href="/p_password" class='list_password'>修改密码</a></li>
            </ul>
        </div>
    `)
    
    $('.main_left').append($main_left);
    // $('body').on('click','')
    
    

    
})