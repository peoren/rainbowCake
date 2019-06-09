$(function() {
    
   
    var user_id = sessionStorage.getItem('user_id');
    console.log(user_id);
    $( "#datepicker" ).datepicker({ 
        
        minDate: 1, 
        maxDate: "+15D" ,
        dateFormat:'yy-mm-dd',
        dayNamesMin: ['日','一','二','三','四','五','六'],
        monthNames: ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月']
    });
    load();
    var total =0;
    $('#btnInAll').attr('data-target','#warbox')
    $('#datepicker').on('change',function(){
        var $day = $('#datepicker').val();
        $('#war').text('');
        $('#btnInAll').attr('data-target','#myModal')
       birthday();
       function birthday(){
        $.ajax({
            type: "GET",
            url: "/o_getbirthday",
            data:{
                user_id:user_id
            },
            dataType:'json'
        })
        .done (function(res){
            
            if(res.state == 0){
               happy(res.data); 
              
            }
           
        })
        .fail(function(res){
            console.log('err')
        })
        function happy(arr){
            var conp = $day.split('-');
            console.log(conp);
            arr.map(function(ele,i){
                if(conp[1] == ele.user_birth_month && conp[2] == ele.user_birth_day){
                    
                    $('#wish').text('生日快乐!');
                    $('.fav').text('生日特惠-20');
                    total = total - 20;
                    console.log(total);
                    $('#total').text(total);
                }else {
                    $('#wish').text('');
                    $('.fav').text('无');
                    $('#total').text(total);
                }
            })
        }  
    }
    });
    $('#gTime').on('change',function(){
       
       
    });
    $('body').on('click','#btnInAll',function(){

        // if($('#datepicker').val()==''){
        //     $('#war').text('请输入配送日期')
        //     $('.fade').modal();

        // }else{

            var expect =$('#datepicker').val()+' '+$('#gTime').val();//期望时间
            var message  =$('#remarks').val();//留言
           
            var address_name;
            var address_id=$('.add_span').attr('index'); 
            address_name = $('.add_name').text();
            //上传订单数据
            $.ajax({
                method:'POST',
                url:'/o_postOrder',
                // cache: false,
                traditional:true,
                data:{ 
                //    order_paytotal:[0,1],        
                   address_name:address_name,
                   address_id:address_id,
                   order_detail_consigneetime: expect,
                   order_detail_message:message,
                   order_id:form
                  
                },
                dataType:'JSON',
                // async:false
            })
            .done(function(res){
                
            })
            .fail( function(err){
                console.log(err);
            })
        // }
        
       
        
      
    })
    order_ddd();
    function order_ddd(){
        //渲染界面订单
        $.ajax({
            type: "GET",
            url: "/o_getOrder",
            data:{
                user_id:user_id
            },
            dataType:'json'
        })
        .done (function(res){
           
            if(res.state == 0){
                
                setOrder(res.data);
               
            }
           
        })
        .fail(function(err){
            console.log(err)
        })
    }

    function special(){
            //判断是否是VIP
         $.ajax({
            type: "GET",
            url: "/o_getVIP",
            data:{
                user_id:user_id,
            },
            dataType:'json'
        })
        .done (function(res){
            
            if(res.state == 0){
               VIP(res.data);
                
            }
           
        })
        .fail(function(err){
            console.log(err);
            
        })
    }
    function VIP(arr){
        
        arr.map(function(ele,i){
            if(ele.user_vip == 1){
                
                $('.order_time').text('VIP会员');
                $('.member').text('会员优惠10%');
            total = total*0.9;
            // console.log(total);
            $('#total').text(total);
        }
        })
    }
    function load(){
        //获取默认地址
        $.ajax({
            type: "GET",
            url: "/o_getDefultAdd",
            data:{
                user_id:user_id
            },
            dataType:'json'
        })
        .done (function(res){
            // console.log(res.data);
            if(res.state == 0){
                
                address(res.data);
            }
           
        })
        .fail(function(res){
            console.log(err)
        })  
    }
   
    // var add_name=[];
    function address(arr){

        var dom = arr.map(function(ele,i)
        {
        //    add_name.push(ele.address_name);
           
        return `
        <div class='add_div add_btn'   data-toggle="modal" data-target=".bs-example-modal-lg">
                <p class='name_p clear'  >
                    <span class='add_name' id='address_name'>${ele.address_name}</span>
                    <span class='add_phone'>${ele.address_phone}</span>
                </p>
                <p class='add_p'>
                    收货地址 :
                    <span class='add_span' index='${ele.address_id}'>
                        ${ele.address_previnces+ele.address_city+ ele.address_regin +ele.address_detail}
                    </span>
                </p>
                <p class='add_edit' index='${ele.address_default}'>
                        
                   
                                                
                </p>
                    
            </div>

        `
       
        })
        $(".address").append(dom); 
        if($('.add_edit').attr('index')==1){
            var add_defult = `
            <span class='add_defa add_isDefa'>默认地址</span>
            `
            $('.add_edit').append(add_defult)
        }
       
    }
    $('.address').on('click','.add_div',function(){
        //获取全部地址
        $.ajax({
            type: "GET",
            url: "/o_getOrderAddress",
            data:{
                user_id:user_id
            },
            dataType:'JSON'
        })
        .done (function(res){
    
            // console.log(res.data);
            setAddress(res.data);
        })
        .fail(function(err){
            console.log(err);
        })
    })
    $('.paybody').on('click','#Balance',function(){
        //交易完成
        $.ajax({
            method:'POST',
            url:'/o_postBalance',
            // cache: false,
            traditional:true,
            data:{ 
            //    order_paytotal:[0,1],        
               order_id:form,
              
            },
            dataType:'JSON',
            // async:false
        })
        .done(function(res){
            if(res.state == 0){
                //弹出模态框
                console.log('弹出模态框')
               
            }else{
                console.log('数据写入不成功')
            }
        })
        .fail( function(err){
            console.log('err');
        })
        //删除购物车信息
        $.ajax({
            method:'POST',
            url:'/o_postShopping',
            // cache: false,
            traditional:true,
            data:{ 
            //    order_paytotal:[0,1],        
               shoppingcart_id:shopcart,
              
            },
            dataType:'JSON',
            // async:false
        })
        .done(function(res){
            if(res.state == 0){
                //弹出模态框
                console.log('弹出模态框')
               
            }else{
                console.log('数据写入不成功')
            }
        })
        .fail( function(err){
            console.log('err');
        })
        location='/paysuc'
        // console.log(form)
    })
    var addp=[];
    function setAddress(arr) {
        $("#m_address").empty();
        var dom = arr.map(function(ele,i){
            addp.push(ele.address_id);
            // console.log(ele.address_id)
            return `
            <div class='add_div2 add_btn' id='${'box'+ele.address_id}'  index='${ele.address_id}'>
                    <p class='name_p2 clear'>
                        <span class='add_name1'>${ele.address_name}</span>
                        <span class='add_phone'>${ele.address_phone}</span>
                    </p>
                    <p class='add_p'>
                        收货地址 :
                        <span class='add_span'>
                            ${ele.address_previnces+ele.address_city+ ele.address_regin +ele.address_detail}
                        </span>
                    </p>
                   
                    
                </div>
            `
        })
        var apend = ' <img id="add_tu" src="./img/order/add.png" alt="">'
        $("#m_address").append(dom);
        $('#m_address').append(apend);
    }
    // console.log(addp);
    var form = [];
    var shopcart =[];
    console.log(shopcart);
    function setOrder(arr){
      var dom =   arr.map(function(ele ,i){
          form.push(ele.order_id);
          
          shopcart.push(ele.shoppingcart_id);
        return `
        <tr>
            <td class='order_img'>
                <img src="${ele.goods_pic_main}">
            </td>
            <td index=${ele.shoppingcart_id} class='goods_name'>
                ${ele.goods_name}
            </td>
            <td class='order_num' index ='${ele.order_id}'>
               ${ele.size_name}
            </td>
            <td class='order_address'>
               ${ele.goods_price}
            </td>
            <td class='order_person'>
               ${ele.order_amount }
            </td>
            <td class='order_time'>
                暂无活动
            </td>
            <td class='order_state' id='paym'>
              ${Number(ele.order_amount) * Number(ele.goods_price)}
            </td>
            
        </tr>
   
        
        `
       
      })
      $('tbody').append(dom);
      special();
      var sum =0 ;
       arr.map(function(ele, i){
        
        sum = sum + parseInt(ele.order_amount ) * parseInt( ele.goods_price) ;
      })
        total = sum;
        // console.log(total);
        $('#order_price').text(sum);
        $('#total').text(total);
    }
    // console.log(shopcart);
    $('#m_address').on('click','#add_tu',function(){
        location='/p_address';
        
    })
   $('#m_address').on('click','.add_div2', function(){
      var didi =  $(this).attr('id');
     $('#'+didi).addClass('add_div3').siblings().removeClass('add_div3');
     
   })
   $('#sure').on('click',function(){
    var add_btn_id= $('.add_div3').attr('index')
    $.ajax({
        type: "GET",
        url: "/o_getSpaceAdd",
        data:{
           address_id:add_btn_id

        },
        dataType:'json'
    })
    .done (function(res){
        // console.log(res.data);
        if(res.state == 0){  
            $(".address").empty();  
            address(res.data);
        }
       
    })
    .fail(function(res){
        console.log('err')
    })  
   });
   //clear data
   $('ul').on('click','li',function(){
    $.ajax({
        url:'/o_return',
        method:'delete'
    })
   })
   $('#btnBack').click(function() {
       $.ajax({
           url:'/o_return',
           method:'delete'
       })
       .done(function() {
           location = '/shoppingcart'
       })
   })
    
});