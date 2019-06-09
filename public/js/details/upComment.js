

$(function () {
    // 加载时获取
    var userID = Number(sessionStorage.getItem('user_id'));
    console.log(userID+'这是用户id')
    var goodsID ='' ;//goods_id
    var orderID = sessionStorage.getItem('order_id');//order_id
    getOrder();
    //选择评价星星时的表现
    //获取焦点
    $('.grade-star').on('mouseover','.iconfont', function () {
        $('.iconfont').removeClass('red')
        var starList = $('.grade-star .iconfont');
        var current = Number($(this).attr('data-index'));
        for (var i = 0; i < current; i++) {
            starList[i].classList.add('red')
        }
        $('.star-num').text(current);
        //失去焦点
        $('.iconfont').on('mouseout', function () {
            $('.iconfont').removeClass('red')
            var currentNum =($('.set').length) ? $('.set').length : 0
            $('.star-num').text(currentNum);
         
        })

        //点击选择时
        $('.grade-star').on('click','.iconfont', function () {
            $('.grade-star .iconfont').removeClass('set')
            var starList = $('.grade-star .iconfont');
            var current = Number($(this).attr('data-index'));
            for (var i = 0; i < current; i++) {
                starList[i].classList.add('set')
            }
            $('.star-num').text(current);
        })
    })
    // 选择图片时在线预览
    //触发input的点击事件
   $('.input-box').on('click',function(){
       $('.up-pic')[0].click();
   })
   //预览
   var fileArr=[]//存放 所上传的对象
   $('.up-pic').on('change',function(){ 
      fileArr=[]
      var fileList =  this.files
      for(var j=0;j<fileList.length;j++){
        fileArr.push(fileList[j])
      }
      renderImg(fileArr)
    
   })
   //处理图片地址兼容方法
   function getObjectURL(file) {
    var url = null;
    if (window.createObjectURL != undefined) {//basic
        url = window.createObjectURL(file);
    } else if (window.URL != undefined) {//mozilla(firefox)兼容火狐
        url = window.URL.createObjectURL(file);
    } else if (window.webkitURL != undefined) {//webkit or chrome
        url = window.webkitURL.createObjectURL(file);
    }
    return url;
}
    //删除图片的点击事件
    $('.views-wrap').on('click','a',function(){
        var index = $(this).attr('data-index')
        fileArr.splice(index,1)
        renderImg(fileArr)
        console.log(fileArr)
        return false
    })

    // 渲染预览的图片
    function renderImg(a){
        $('.views-wrap').html('')
        for(var i=0; i < a.length;i++){
            var doc = `<div class="views-item">
                        <img src="${getObjectURL(a[i])}" alt="">
                        <a href="#" data-index='${i}'>删除</a>
                    </div>`
            $('.views-wrap').append(doc)
         }
    }

    //提交按钮点击时
    $("#btn").on("click",function(){
            var formData = new FormData();
            var text=$('#comment-text')[0].value;
            var starNum = $('.star-num').text();
                formData.append('text',text);
                formData.append('star',starNum);
                formData.append('userID',userID);
                formData.append('goodsID',goodsID);
                formData.append('orderID',orderID);
           if(fileArr.length>0){
            for(var i= 0;i <fileArr.length ;i++){
                formData.append('file',fileArr[i])
            }
           }
           $.ajax({
               method:'post',
               url:'/upmsg',
               data:formData,
               contentType: false, // 不去设置 contentType 请求头
               processData: false // 不去处理发送的数据
           })
           .done(function(data){
            $('.views-wrap').html('')
            $('.form')[0].reset()
           history.back();
           })
           .fail(function(){
               console.log('失败')
           })
            
    })
    //页面渲染函数
    function getOrder(){
        $.ajax({
            method:'get',
            url:'/getOrder',
            data:{
                userID:userID,
                order_id:orderID
            }
        })
        .done(function(data){
            console.log(data)
           if(data.length > 0){
            goodsID = data[0].goods_id
            $('.order-num').text(orderID);
            $('.order-time').text(timeFormatter(data[0].order_starttime));
            $('#goods_img').attr('src','./'+data[0].goods_pic_main)
           }else{
               alert('服务器走丢了')
           } 
        })
        .fail(function(err){
            console.log(err)
        })
    }
     // 修改 mysql 时间格式
     function timeFormatter(value) {
        var da = new Date(value.replace("/Date(", "").replace(")/", "").split("+")[0]);
        return da.getFullYear() + "-" + (da.getMonth() + 1) + "-" + da.getDate() + " " + da.getHours() + ":" + da.getMinutes() + ":" + da.getSeconds();
    }

})