$(function() {
  var flag = false; //弹出框的判断值，true打开，false关闭
  let allArr = []; //全部商品数据

  // sessionStorage.setItem('user_id','1');
  var user_id = sessionStorage.getItem('user_id');
  var vipState = sessionStorage.setItem('use_vip','0');
  // console.log(user_id);
  
  showAllData();
// if(user_id==undefined || user_id==null ||user_id==''){
//   location='/login';
//   return false
// }
  //导航鼠标移入移出事件
  $(".banner").on("mouseenter ", ".banner-type", function() {
    let index = $(this).attr("index");
    renderBanner(index, allArr);
    $(".banner-inner").css("display", "block");
  });

  $(".banner").on("mouseenter ", ".banner-inner", function() {
    $(".banner-inner").css("display", "block");
  });

  // mouseleave
  $(".banner").on("mouseleave ", ".banner-type", function() {
    $(".banner-inner").css("display", "none");
  });
  $(".banner").on("mouseleave ", ".banner-inner", function() {
    $(".banner-inner").css("display", "none");
  });
  //个人中心弹出框,用计时器让用户做判断
  if(user_id==undefined||user_id==null||user_id==''){
    $("[data-toggle='popover']").popover({
      content:`
      <div class="myself">
          <ul>
              <li><span class="iconfont icon-you"></span> <a href="/userlogin">登录/注册</a> <span class="iconfont icon-zuo"></span></li>
          </ul>
      </div> 
      `
    });
  }else{
    $("[data-toggle='popover']").popover({
      content:`
      <div class="myself">
          <ul>
              <li><span class="iconfont icon-you"></span> <a href="/order_finish">个人中心</a> <span class="iconfont icon-zuo"></span></li>
              <li><span class="iconfont icon-you"></span><a href="#" class="addVip">充值vip</a><span class="iconfont icon-zuo"></span></li>
              <li><span class="iconfont icon-you"></span><a href="/exit" id='exit'>注销</a><span class="iconfont icon-zuo"></span></li>
          </ul>
      </div> 
      `
    });
  }
  
  $(".navbar-collapse").on("mouseenter", "[data-toggle='popover']", function() {
    flag = true;
    $(this).popover("show");
  });
  //当鼠标移出头像时关闭弹出框，但是给用户200ms做出选中操作如果选中就取消关闭
  $(".navbar-collapse").on("mouseleave", "[data-toggle='popover']", function() {
    flag = false;
    setTimeout(function() {
      if (!flag) {
        $(".navbar-collapse")
          .children("[data-toggle='popover']")
          .popover("hide");
        flag = false;
        return 0;
      } else {
        return 0;
      }
    }, 500);
  });
  $(".navbar-collapse").on("mouseenter", ".popover", function() {
    flag = true;
  });
  $(".navbar-collapse").on("mouseleave", ".popover", function() {
    $(this).popover("hide");
    flag = false; //关闭重置
  });
 
  //当窗口尺寸改变关闭所有弹出框
  $(window).resize(function() {
    $("[data-toggle='popover']").popover("hide");
  });

  //点击导航购物车
  $('body').on('click','.icon-gouwuche',function(){
            //加入购物车
            $.ajax({
              method:'POST',
              url:'intoShoppingCart',
              async:false,
              dataType:'json',
            })
            .done(function(res){
              if(res.state===-1){
                location='/userlogin';
                return false
              }
                location='/shoppingCart'
              
            })
            .fail(function(err){
              console.log(err);
              
            })  
  })
  //点击注销
  $("body").on('click','#exit',function(){
    //清除storage
    sessionStorage.removeItem('user_id');
    sessionStorage.removeItem('vipState');
  })
  //查询所有数据
  function showAllData() {
    $.ajax({
      method: "GET",
      url: "/getAllGoodsData",
      dataType: "JSON"
    })
      .done(function(res) {
        allArr = res.data;
        renderSection(allArr);
      })
      .fail(function(err) {
        console.log(err);
      });
  }
  //加载banner
  function renderBanner(index, arr) {
    var domArr = arr.map(function(ele, i) {
      //对字符进行处理让其长度大于4的后面都替换成‘...’
      if (ele.classify_id == index) {
        let newName = ele.goods_name;
        let len = ele.goods_name.length;
        if (len > 4) {
          newName = ele.goods_name.split("");
          len = len - 4;
          newName.splice(4, len, "...");
          newName = newName.toString();
          const reg = new RegExp(",", "g"); //正则去掉‘，’
          newName = newName.replace(reg, "");
        }
        return `
                <div class="">
                    <a href="${'/sendId?id='+ele.goods_id}">
                        <img  alt="" src="${ele.goods_pic_main}">
                        <span>${newName}</span>
                    </a>
                </div>
                `;
      }
    });
    $(".banner-inner").html(domArr.join(""));
  }
  //加载section
  function renderSection(arr){
      $('section').each(function(i,ele){
          let index=$(ele).attr('index');
          let flag=0;
          arr.map(function(e,i){
                if(e.c_object==index&&flag<4){
                    // $(ele).children('div').children().children().children().children().attr('src',e.goods_pic_main)
                    $(ele).find('a img').eq(flag).attr('src',e.goods_pic_main);
                    $(ele).find('a img').parent().eq(flag).attr('href','/sendId?id='+e.goods_id);
                    $(ele).find('a img').parent().eq(flag).next().attr('href','/sendId?id='+e.goods_id);
                    $(ele).find('a p').eq(flag).text(e.goods_name);
                    $(ele).find('.price').eq(flag).parent().attr('goods_id',e.goods_id)//渲染goods_id
                    $(ele).find('.price').eq(flag).parent().attr('size_id','1')//渲染size_id,默认为1
                    $(ele).find('.price').eq(flag).parent().append(`
                    <div class="chooseSize">
                      <p >
                        <span>￥</span><span class="ch_price">${e.goods_price}</span><span>/</span><span class="ch_size">1.2磅</span>
                      </p>
                      <span class="ch_size" index='1'>1.2磅</span>
                      <span class="ch_size" index='2'>2.2磅</span>
                      <span class="ch_size" index='3'>3.2磅</span>
                      <span class="ch_size" index='4'>7.2磅</span>
        
                      <input type="button" value="确认购买" id="confirm">
                      <input type="button" value="取消" id="cancel">
                    </div>
                    `)
                    let price='￥'+e.goods_price+'.00/1.2磅'
                    $(ele).find('.price').eq(flag).text(price);
                    flag++;
                }
                
              })
            
          })
      }
    //   $('section').children().child('img').attr()

   //弹出的价格选中表
   $('body').on('click','.ch_size',function(){
    let size_id=$(this).attr('index');//对应的size_id
    let allPrice=0;//总值
    let temp=0;//磅数
    $(this).css('border','1px solid #ff4001').siblings('span').css('border','1px solid #666');
    allPrice=$(this).parent().parent().children('.price').text();//获取单价
    //渲染总价和数据
    let ch=/^￥/;
    allPrice=allPrice.replace(ch,'');//正则去掉￥
    allPrice=parseFloat(allPrice)*size_id;//去除掉'/1.2磅'，并计算总值
    temp=$(this).text();//磅数
    $(this).parent().children('p').children('.ch_price').text(allPrice);
    $(this).parent().children('p').children('.ch_size').text(temp);
    //给父级div存size_id
    $(this).parent().parent().attr('size_id',size_id);
  })  
  //section立即购买点击事件
  $('body').on('click','.shop_now',function(){
     //渲染按钮
     $(this).parent().children('.chooseSize').children('#confirm').attr('value','确认购买')
    $(this).parent().children('.chooseSize').css('display','block');
  })
  //section点击购物车事件
  $('body').on('click','.shop_car',function(){
    //渲染按钮
    $(this).parent().children('.chooseSize').children('#confirm').attr('value','确认加入')
    $(this).parent().children('.chooseSize').css('display','block');
  })
  //chooseSize点击取消
  $('body').on('click','#cancel',function(){
    $(this).parent().css('display','none');
  })
  //chooseSize点击确认
  $('body').on('click','#confirm',function(){
    let flag=false;
    let val=$(this).attr('value');
    let goods_id=$(this).parent().parent().attr('goods_id');//商品id
    let goods_price=$(this).parent().parent().children('.price').text()//商品价格
    let shoppingcart_amount=1;//商品数量
    let size_id=$(this).parent().parent().attr('size_id');//商品规格
    let ch=/^￥/;
    goods_price=goods_price.replace(ch,'');//正则去掉￥
    goods_price=parseFloat(goods_price);//去除掉'/1.2磅'

      if(val=='确认加入'){
        //加入购物车
        $.ajax({
          method:'POST',
          url:'jionShoppingCart',
          async:false,
          data:{
            userId:user_id,
            size:size_id,
            goodsId:goods_id,
            price:goods_price,
            count:1,
          },
          dataType:'json',
        })
        .done(function(res){
          if(res.state===-1){
            location='/userlogin';
            return false
          }
          flag=true;
          
        })
        .fail(function(err){
          console.log(err);
          
        })  
      }else{
        //立即购买
        $.ajax({
          method:'POST',
          url:'addBillData',
          async:false,
          data:{
            user_id:user_id,
            size_id:size_id,
            goods_id:goods_id,
            order_paytotal:goods_price,
            order_amount:1
          },
          dataType:'json',
        })
        .done(function(res){
          if(res.state===-1){
            location='/userlogin';
            return false
          }
          flag=true;
          window.location='/order';
        })
        .fail(function(err){
          console.log(err);
          
        })
      }
      if(flag){
        $(this).parent().css('display','none');
      }else{
        return false;
      }
  })
  //导航点击事件
  $('.navbar-nav').on('click', 'li', function () {
    let cobject;
    let keytext;
    keytext = $(this).children().text();

    switch (keytext) {
        case '下午茶':
            cobject = 0;
            break;
        case '送亲子':
            cobject = 1;
            break;
        case '送长辈':
            cobject = 2;
            break;
        case '送闺蜜':
            cobject = 3;
            break;
        case '送恋人':
            cobject = 4;
            break;

    }
    location.href='/object?cobject='+cobject+'';
  })

  // 充值vip
  // 判断vip是否到期
  // $.ajax({
  //     method:'get',
  //     url:'/p_vip_isTimeout',
  //     async:false,
  //     data:{
  //         user_id:user_id
  //     }
  // })
  // .done(function(res) {
    
      // if(res[0]['user_vip_out-NOW()'] > 0) {
      //     return;
      // } else {
      //     $.ajax({
      //         method:'put',
      //         url:'/p_vip_timeout',
      //         async:false,
      //         data:{
      //             user_id:user_id
      //         }
      //     })
      //     .done(function() {

      //     })
      // }
  // })
  // 默认数值
  var vip_time = 30;
  var isVip = false;
  // ajax();
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
          // render(res[0]);
      })
  }

  // 点击
  $('body').on('click','.vx',function() {
      $(this).addClass('method');
      $('.zfb').removeClass('method');
      $('.pay_qr').css({
          background:"url('../../img/personal_center/胜利x_qr.jpg') no-repeat center",
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
              // ajax();
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
  $('body').on('click','.addVip',function() {
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
  //点击搜索
  // $('nav').on('click','#search',function(){

  //   let searchData=$('#searchContent').val();
    
  //   $.ajax({
  //     method:'get',
  //     url:'/sendSearch',
  //     data:{
  //       searchData:searchData,
  //     },
  //     success:function(res){
  //       console.log('11111',res);
  //       if(res.state == 1) {
  //         location = '/abc'
  //       }
  //     }
  //   })


  // })
  
  
});
