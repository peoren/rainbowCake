
window.onload = function() {
  /**
   * 使用ajax获取购物车数据
   * 在done中判断是否获取到购物车数据，
   * 已获取，则调用购物车渲染函数
   *
   */

  getShopList();
  getRecommend();
};
var u_id=sessionStorage.getItem('user_id');
/**
 *  渲染购物车页面
 *
 * @param {array} data 用户购物车数据
 */
function shoppingCart(data) {
  const cartContent = $("#cartContent");
  let html1 = "";
  let acountNum = 0;
  let priceTotal = 0;
  let priceDiscount = 0;
  let payPrice = 0;
  for (let index in data) {
    acountNum += data[index].shoppingcart_amount;
    priceTotal += data[index].goods_price * data[index].shoppingcart_amount;
    priceDiscount =  priceTotal*0.1;
    payPrice = priceTotal*0.9;
    html1 += `
          <tr>
          <td style='display:none'>${data[index].shoppingcart_id}</td>
          <td class = "cartbox_check" goodsId = ${data[index].goods_id} sizeId = ${data[index].size_id} shoppingcartId =${data[index].shoppingcart_id}>
            <input type="checkbox" checked class = 'checkBox' name = 'checkBox'>
            <div class='checkImg'><img src='./img/shoppingcart/check_box_focused_1.png'/></div>
          </td>
          <td class="order_img cartbox_goods_img">
                <img src="${data[index].goods_pic_main}" />
              </td>
              <td class="goods_name cartbox_goods_name">
                 ${data[index].goods_name}
              </td>
              <td class="order_num cartbox_goods_size">
              ${data[index].size_name}                
              </td>
              <td class="order_address cartbox_goods_price">
              ￥${data[index].goods_price}                               
              </td>
              <td class = "cartbox_goods_amount">
                  <span class="iconfont icon-fangdajingcopy"></span>                
                  <span style="padding:0 5px" class="cartbox_num ">${data[index].shoppingcart_amount}</span>
                  <span class="iconfont icon-fangdajingcopy1"></span>
              </td>
              <td class="cartbox_vip">
                vip优惠
              </td>
              <td class="cartbox_goods_total">
                ￥${data[index].goods_price * data[index].shoppingcart_amount}
              </td>
              <td class="cartbox_del">
                  <span class="iconfont icon-yuanquan-cha"></span>
              </td>
            </tr>
          `;
  }
  cartContent.empty();
  cartContent.append(html1);
  $('#acountNum').text(acountNum);
  $('#priceTotal').text('￥' + priceTotal);
  $('#priceDiscount').text('￥' + priceDiscount);
  $('#payPrice').text('￥' + payPrice);

  //优惠及应付总额

}

/**
 * 渲染推荐商品页面
 * 
 * @param {array} result 随机推荐的四个商品数据 
 */
function recommendBox(result) {
  const fourBox = $(".four-box");
  let html2 = "";
  for (let index in result) {
    html2 += `
          <div class="four-one" goodsId = ${result[index].goods_id} goodsName = ${result[index].goods_name} goodsPrice = ${result[index].goods_price}>
            <div class="four-img" onclick = "toGoodDetail(${result[index].goods_id})">
              <img src="${result[index].goods_pic_main}" alt="" />
            </div>
            <p class="cakename">${result[index].goods_name}</p>
            <div class="box-bottom">
              <div>￥${result[index].goods_price}/盒</div>
              <div>1.2磅</div>
            </div>
            <div class="addcart">加入购物车</div>
          </div>
        `;
  }
  fourBox.append(html2);
}
     

//点击减少
$(".container").on("click", ".icon-fangdajingcopy", function() {

  //数值减少
  var num = Number($(this).next().text() );
  if(num > 1){
    num = num -1;
  $(this)
    .next()
    .text(num);

  const id = $(this).parent().siblings().eq(0).text();
  updateNum(id,num);
  const checkState = $(this).parent().siblings().eq(1).children().is(':checked');
  
    if(checkState){
  //金额减少
  let goodsTotalEle = $(this).parent().siblings().eq(7);
  let goodsPrice = $(this).parent().siblings().eq(5).text().split('￥')[1];
  goodsTotalEle.text('￥' + num * goodsPrice);
  
  //总计数量减少
   const currentAcountNum = $('#acountNum').text();
   $('#acountNum').text(currentAcountNum -1);

   //总计金额减少
  const currentPriceTotal = $('#priceTotal').text().split('￥')[1];
  $('#priceTotal').text('￥' + (currentPriceTotal - goodsPrice));

   //优惠及应付总额
   $('#priceDiscount').text('￥' +(currentPriceTotal - goodsPrice)*0.1);
   $('#payPrice').text('￥' + (currentPriceTotal - goodsPrice)*0.9);
 

    }
  }
  
});

/** 点击增加*/
$('.container').on('click','.icon-fangdajingcopy1',function(){

    //数值增加
    var num = Number($(this).prev().text());
    num = num + 1;
    $(this).prev().text(num);
    console.log(num);

    const id = $(this).parent().siblings().eq(0).text();
    updateNum(id,num);

   //金额增加
   let goodsTotalEle = $(this).parent().siblings().eq(7);
   let goodsPrice = Number($(this).parent().siblings().eq(5).text().split('￥')[1]);
      console.log(goodsPrice);
    goodsTotalEle.text('￥' + num * goodsPrice);

    const checkState = $(this).parent().siblings().eq(1).children().is(':checked');
  
    if(checkState){
   //总计数量增加
   const currentAcountNum = Number($('#acountNum').text());
   $('#acountNum').text(currentAcountNum + 1);

   //总计金额增加
  const currentPriceTotal = Number($('#priceTotal').text().split('￥')[1]);
  $('#priceTotal').text('￥' + (currentPriceTotal + goodsPrice));

   //优惠及应付总额
   $('#priceDiscount').text('￥' +(currentPriceTotal + goodsPrice)*0.1);
   $('#payPrice').text('￥' + (currentPriceTotal + goodsPrice)*0.9);

  }
})

console.log($('#priceTotal').text());
$('.pay-price').children().eq(1).text();


//点击选中或取消
$('.container').on('click','.checkBox',function(){
    const checkState = $(this).is(':checked');
    const currentAcountNum = Number($('#acountNum').text());
    const currentPriceTotal = Number($('#priceTotal').text().split('￥')[1]);
    const num = Number($(this).parent().siblings().eq(5).children(1).text());
    const goodsTotal = Number($(this).parent().siblings().eq(7).text().split('￥')[1]);
    if(checkState){
        $('#acountNum').text(currentAcountNum + num);
        $('#priceTotal').text('￥' +(currentPriceTotal + goodsTotal));

        //优惠及应付总额
        $('#priceDiscount').text('￥' +(currentPriceTotal + goodsTotal)*0.1);
        $('#payPrice').text('￥' + (currentPriceTotal + goodsTotal)*0.9);

    }else{
    
     $('#acountNum').text(currentAcountNum - num);
     $('#priceTotal').text('￥' +(currentPriceTotal - goodsTotal));

     //优惠及应付总额
     $('#priceDiscount').text('￥' +(currentPriceTotal - goodsTotal)*0.1);
     $('#payPrice').text('￥' + (currentPriceTotal - goodsTotal)*0.9);

    }
})

//选择点击css
 $('.container').on('click','.checkBox',function(){ 　　　
　　if(this.checked){
　　　　$(this).siblings(".checkImg").find("img").attr("src","./img/shoppingcart/check_box_focused_1.png");
　　}else{
　　　$(this).siblings(".checkImg").find("img").attr("src","./img/shoppingcart/check_box_unfocused.png");
　}
　})

//删除单个商品
$('.container').on('click','.icon-yuanquan-cha',function(){
    const id = $(this).parent().siblings().eq(0).text();
    modalTips('确定删除此商品？',true, function () {
    delGood(id);
    $('#myModal').modal('hide')
  });

})

//删除全部
$('#delAll').on('click',function(){
  console.log($('#cartContent').children())
  if($('#cartContent').children().length != 0){
    modalTips('确定清空您购物车内所有商品吗？',true, function () {
      delAll();
      $('#myModal').modal('hide')
    });
  }else{
    modalTips('购物车无商品', false);
  }
})

//结算下单
$('.container').on('click','.payfor',function(){
  const checkedArr =  $("[name='checkBox']:checked");
  console.log(checkedArr);
  if($('#cartContent').children().length != 0){
  if(checkedArr.length == 0){
    modalTips('请至少选择一项', false);
  }else{
    checkedArr.each(function(){
   if(this.checked){
     let goodsId = $(this).parent().attr('goodsId');
     let sizeId = $(this).parent().attr('sizeId');
     let goodsNum = $(this).parent().siblings(5).children().eq(2).text();
     let shoppingcartId = $(this).parent().attr('shoppingcartId');
    //  console.log(goodsNum);
     payFor(goodsId,sizeId,goodsNum,shoppingcartId);
      }
    })
  }
 }else{
  modalTips('您未购买任何商品哦', false);
 }
})

//加入购物车
$('.container').on('click','.addcart',function(){
  let goods_id = $(this).parent().attr('goodsId');
  const user_id = u_id;
  const goodsPrice = $(this).parent().attr('goodsPrice');
  const goodsName = $(this).parent().attr('goodsName');
    $.ajax({
        method:'post',
        url:'/addToCart',
        data:{
            user_id:user_id,
            goods_id:goods_id,
            goods_price:goodsPrice
        }
    })
    .done(function(){
    modalTips(goodsName + '已经加入购物车', false);       
        getShopList();
    })

})

//点击商品图片详情
function toGoodDetail(goodsId){
  location.href ='sendId?id=' + goodsId;
}


//获取购物车数据
function getShopList() {
    const user_id = u_id;
    $.ajax({
      method: "get",
      url: "/getShopList",
      data: {
        user_id: user_id
      }
    })
      .done(function(data) {
        console.log(data);
        if (data) {
          shoppingCart(data);
        }
      })
      .fail(function() {
        console.log(err);
      });
  } 

  //获取推荐商品数据
  function getRecommend() {
    console.log("start");
    $.ajax({
      method: "get",
      url: "/getRecommend"
    })
      .done(function(result) {
        recommendBox(result);
      })
      .fail(function() {
        console.log(err);
      });
  }

/**
 * 改变商品数量
 * @param {string} id  购物车商品id
 * @param {string} num 购物车商品数量
 */
 function updateNum(id,num){
    $.ajax({
        method: 'post',
        url: '/numberChange',
        data: {
            shoppingcart_id:id,
            shoppingcart_amount:num
        }
    })
    .done(function(result){
        console.log(result);
    })
 }

 /**
  * 删除单个商品
  * @param {string} id  购物车商品id 
  */
 function delGood(id){
     $.ajax({
         method: 'delete',
         url: '/delGood',
         data:{
             shoppingcart_id:id
         }
     })
     .done(function(res){
         getShopList();
     })
 }
/**
 * 删除全部商品
 */
 function delAll(){
    $.ajax({
        method: 'delete',
        url: '/delAll',
    })
    .done(function(res){
        getShopList();
    })
 }

 /**
  * 结算下单
  */
 function payFor(goodsId,sizeId,goodsNum,shoppingcartId){
     const user_id = u_id;
     $.ajax({
         method:'post',
         url: '/payOrder',
         data: {
               user_id:user_id,
               goods_id:goodsId,
               size_id:sizeId,
               order_amount:goodsNum,
               shoppingcart_id:shoppingcartId
            }
     })
    .done(function(res){
      //跳转结算下单界面
       location.href='/order';     
    })
 }


 /**
  * 模态框
  * @param {string} message  提示内容
  * @param {boolean} sureBtn   是否展示按钮
  * @param {function} callback  回调函数
  */
 function modalTips(message,sureBtn,callback){
    $('#modalContent').empty();
    $('#sureBtn').unbind();
    $('#showBtn').hide();
    $('#modalContent').text(message);
    if(sureBtn) {
      $('#showBtn').show();
    }else{
      setTimeout(function(){
        $('#myModal').modal('hide')
      },1000)
    }
    $('#sureBtn').on('click',callback)
    $('#myModal').modal('show')
 }

 //继续购物跳转页面
 function toObjectList(){
  location.href='/object?classify=0';  
 }

 

//添加小数点后两位
function returnFloat(xsd) {
  var xsd = xsd.toString().split(".");
  if (xsd.length == 1) {
    xsd = xsd.toString() + ".00";
    return xsd;
  }
  if (xsd.length > 1) {
    if (xsd[1].length < 2) {
      xsd = xsd.toString() + "0";
    }
    return xsd;
  }
}
