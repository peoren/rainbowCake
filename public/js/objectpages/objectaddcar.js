$(function () {
    var user_id = 1;
    var sizeindex = 1;
    var addcar;
    // 选择购买规格
    $('.objectmain').on('click', '.shop_now', function () {
        addcar = false;
        getSize(this);
    });
    $('.objectmain').on('click', '.shop_car', function () {
        addcar = true;
        getSize(this);
    });
    function getSize(dom) {
        sizeindex = 1;
        $(dom).parent().parent().find('.chooseSize').removeClass('hidden');
        $(dom).parent().parent().find('.price').addClass('hidden')
        // $(this).parent().parent().find('.chooseSize').removeClass('hidden');
        $(dom).parent().addClass('hidden')
        // 选择规格
        $('.objectmain').on('click', '.ch_size', function () {
            $('.objectmain .ch_size').each(function () {
                $(this).removeClass('redbox');
            })
            var newsizeindex = $(this).attr('index');
            var price = parseInt($(this).parent().find('.ch_price').text());
            price = price * newsizeindex / sizeindex;
            $(this).parent().find('.ch_price').text(price)
            $(this).addClass('redbox');
            sizeindex = parseInt($(this).attr('index'));
        }
        )
    }
    // 点击确定
    $('.objectmain').on('click', '#confirm', function () {
        // var goods_id = this.parentNode.parentNode.getAttribute('index');
        var pprice = $(this).parent().parent().find('.ch_price').text();
        var goods_id = $(this).parent().parent().parent().attr('index');
        size_id = sizeindex;
        order_amount = 1;

        var user_id = sessionStorage.getItem('user_id');
        console.log(user_id)
        if (user_id == null || user_id == undefined) {
            location.href = '/userlogin';
        }else{
  //加入购物车
  if (addcar) {
            
    console.log(goods_id)
    var size_id = sizeindex;
    $.ajax({
        method: 'POST',
        url: '/addcarOnobject',
        cache: false,
        data: {
            user_id: user_id,
            size_id: size_id,
            goods_id: goods_id,
            goods_price:pprice
        },
        async: false
    })
        .done(function (res) {
            if (res.state == 0) {
                //弹出模态框
                console.log('弹出模态框')
                $('.modal-content').text('已成功加入购物车')
                $('.modal').modal();
            } else {
                console.log('数据写入不成功')
            }
        })
        .fail(function (err) {
            console.log(err);
        })

} else {
    //立即购买
    console.log('buy now',user_id,goods_id,size_id,pprice,order_amount)
    $.ajax({
        method: 'POST',
        url: '/addBillData',
        cache: false,
        data: {
            user_id: user_id,
            goods_id: goods_id,
            size_id: size_id,
            order_paytotal: pprice,
            order_amount: order_amount
        },
        async: false
    })
        .done(function (res) {
            location.href = '/order';
           
        })
        .fail(function (err) {
            console.log(err);
        })

}
        }
      
    })

    // 取消购买选择
    $('.objectmain').on('click', '#cancel', function () {
        console.log('sizeindex11', sizeindex)
        $('.objectmain .ch_size').each(function () {
            $(this).removeClass('red');
        })
        var price = parseInt($(this).parent().parent().find('.ch_price').text());
        price = price / sizeindex;
        sizeindex = 1;
        $(this).parent().parent().find('.ch_price').text(price);
        $(this).parent().parent().addClass('hidden')
        $(this).parent().parent().next().removeClass('hidden');
        $(this).parent().parent().parent().find('.price').removeClass('hidden')
    })
})