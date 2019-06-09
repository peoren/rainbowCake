$(function(){
    var order_id = sessionStorage.getItem('order_id');
    var user_id = sessionStorage.getItem('user_id');
    console.log(order_id)
    
    setLineitem();//加载订单
    function setLineitem(){
        $.ajax({
            type: "GET",
            url: "/l_getLineitem",
            data:{
                order_id:order_id
            },
            dataType:'json'
        })
        .done (function(res){
            
            if(res.state == 0){
               setOrder(res.data)
            }
           
        })
        .fail(function(err){
            console.log(err)
        })
    }
    function setOrder(arr){
        var dom =   arr.map(function(ele ,i){
           
          return `
          <div >
            <h4>商品信息</h4>
            <div class="order">
                    <table>
                        <thead>
                                <tr>
                                        <th>
                                            商品图
                                        </th>
                                        <th>
                                            商品信息
                                        </th>
                                        <th>
                                           规格
                                        </th>
                                        <th>
                                            单价
                                        </th>
                                        <th>
                                           数量
                                        </th>
                                        <th>
                                           优惠方式
                                        </th>
                                        <th>
                                           总金额(元)
                                        </th>
                                       
                                    </tr>
                        </thead>
                    <tbody>
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
                   
                        
                    </tbody>
                        
           
            </table>
        </div>
                
        <div class="container left clear" id="buyer">
            <h4 id="h-buyer">买家信息</h4>
            <hr>
            <div class="clear">
                <div class="left b-left" ><span>收货人：</span></div>
                <div class="left b-right" ><span>${ele.address_name}</span></div>
            </div>
            <div class="clear">
                    <div class="left b-left" ><span>收货地址：</span></div>
                    <div class="left b-right" ><span>${ele.address_previnces+ele.address_city+ ele.address_regin +ele.address_detail}</span></div>
            </div>
            <div class="clear">
                    <div class="left b-left" ><span>买家留言：</span></div>
                    <div class="left b-right" ><span>${ele.order_detail_message}</span></div>
            </div>

            <div class="clear">
                    <div class="left b-left" ><span>订单编号：</span></div>
                    <div class="left b-right" ><span>${ele.order_id}</span></div>
            </div>
            <div class="clear">
                    <div class="left b-left" ><span>联系电话：</span></div>
                    <div class="left b-right" ><span>${ele.address_phone}</span></div>
            </div>
            <div class="clear">
                <div class="left b-left" ><span>期望时间：</span></div>
                <div class="left b-right" ><span class = 'time'>${timeFormatter(ele.order_detail_consigneetime)}</span></div>
            </div>
           
        
        </div>
        <div class="clear  left"  id="o-state">
            <h3>订单状态</h3>
            <div class="left" id="o-img">
                <img src="./img/order/order.png" alt="">
            </div>
            <div class="right" id="info">
                <div class="clear o-box"  >
                    <div class="left o-left"><span>订单状态：</span></div>
                    <div  class="left o-right  stateD" index='${ele.order_state}'></div>
                </div>
                <div class="clear o-box" >
                    <div class="left o-left"><span>配送人员：</span></div>
                    <div  class="left o-right"><span>陈某</span></div>
                </div>
                <div class="clear o-box" >
                    <div class="left o-left"><span>联系电话：</span></div>
                    <div  class="left o-right"><span>15454678742</span></div>
                </div>

            </div>
           
            
        </div>
          `
         
        })
        $('.line_order').append(dom);
        special();
        if($('.stateD').attr('index')==1){
            var stated = `
            <span>已付款</span>
            `
            $('.stateD').append(stated)
        }else if($('.stateD').attr('index')==2){
            var stated = `
            <span>已收货</span>
            `
            $('.stateD').append(stated)
        }else if($('.stateD').attr('index')==0){
            var stated = `
            <span>未付款</span>
            `
            $('.stateD').append(stated)
        }
        var sum =0 ;
         arr.map(function(ele, i){
          
          sum = sum + parseInt(ele.order_amount ) * parseInt( ele.goods_price) ;
        })
          total = sum;
          // console.log(total);
          $('#order_price').text(sum);
          function timeFormatter(value) {
            var da = new Date(value.replace("/Date(", "").replace(")/" , "").split( "+")[0]);
            return da.getFullYear() + "-" + ((da.getMonth() + 1) < 10 ? "0" + (da.getMonth() + 1):(da.getMonth() + 1))+ "-" + (da.getDate() < 10 ? "0" + da.getDate():da.getDate()) + " " + (da.getHours()<10?"0"+da.getHours():da.getHours()) + ":" + (da.getMinutes()<10?"0"+da.getMinutes():da.getMinutes()) + ":" + (da.getSeconds()<10?"0"+da.getSeconds():da.getSeconds());
        }
       
    
      }
      
    function special(){
        //判断是否是VIP
     $.ajax({
        type: "GET",
        url: "/l_getVIP",
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
})