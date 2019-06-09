$(function() {
    // 列表字体颜色
    $('.main_list a').css('color','#aaa');
    $('.list_address').css('color','#ff4001');
    // 获取用户id
    var user_id = sessionStorage.getItem('user_id');
    var nameFlag,phoneFlag,moreFlag;
    // 获取收货地址
    ajax();
    function ajax() {
        $.ajax({
            method:'get',
            async:false,
            url:'/p_getAddress',
            data:{
                user_id:user_id
            }
        })
        .done(function(res) {
            console.log(res)
            if(editFlag) {
                render1(res.state,res.data);
                render2(editText,res.data);
            } else {
                render1(res.state,res.data);
                render2(editText,'');
            }
        })
    };
    // 判断是添加还是修改

    var editFlag;  //true 是修改 false是添加
    var editText; // 标题文字
    var editId; //被修改的id
    // 切换默认
    $('.main_right').on('click','.add_isDefa',function() {
        var defaId = $(this).attr('data-id');
        $.ajax({
            url:'/p_setDefa',
            method:'put',
            data:{
                defaId:defaId
            }
        })
        .done(function() {
            ajax();
            
            $('.modal-content').text('修改默认地址成功')
            $('.modal').modal();
        })
    });
    // 添加地址
    $('.main_right').on('click','.add_addP',function() {
        editFlag = false;
        nameFlag = false;
        phoneFlag = false;
        moreFlag = false;
        defa = 0;
        editText = '添加收货地址';
        
        ajax();
        $('.box').css('display','block');
       
    });
    // 删除地址
    $('.main_right').on('click','.delete',function() {
        var deleteId = $(this).attr('data-id');
        $.ajax({
            url:'/p_delete',
            method:'delete',
            data:{
                deleteId:deleteId
            }
        })
        .done(function() {
            ajax();
            $('.modal-content').text('删除成功')
            $('.modal').modal();
        })
    });
    // 修改地址
    $('.main_right').on('click','.edit_a',function() {
        editFlag = true;
        nameFlag = true;
        phoneFlag = true;
        moreFlag = true;
        if(Number($(this).attr('data-id')) == defauId) {
            defa = 1;
        }else {
            defa = 0;
        }
        editId = $(this).attr('data-id');
        $(this).css('text-decoration','underline');
        editText = '修改收货地址';
        ajax();
        $('.box').css('display','block');
        return false;
    });
    // 保存地址信息
    $('.main_right').on('click','.bot_button',function() {
        if(nameFlag && phoneFlag && moreFlag) {
            var name = $('.data_name').val();
            var phone = $('.data_phone').val();
            var cmbProvince = $('#cmbProvince').val();
            var cmbCity = $('#cmbCity').val();
            var cmbArea = $('#cmbArea').val();
            var data_more = $('.data_more').val();
            $.ajax({
                method:'put',
                url:'/p_addAddress',
                data: {
                    editId:editId,
                    user_id:user_id,
                    editFlag:editFlag,
                    defa:defa,
                    name:name,
                    phone:phone,
                    cmbProvince:cmbProvince,
                    cmbCity:cmbCity,
                    cmbArea:cmbArea,
                    data_more:data_more
                }
            })
            .done(function(res) {
                ajax()
                $('.modal-content').text('保存成功')
                $('.modal').modal();
            })
        }else {
            if(nameFlag == false) {
                $('.name_err').css('display','inline-block');
            }
            if(phoneFlag == false) {
                $('.phone_err').css('display','inline-block');
            }
            if(moreFlag == false) {
                $('.more_err').css('display','inline-block');
            }
        }
    })

    // 渲染地址
    var defauId; //默认地址id
    function render1(state,res) {
        var $html_top = `
            <p class='data_head'>收货地址</p>
        `
        //如果不为空
        if(state == 1) {
            var hasDefa = false;
            var $arrHtml = res.map(function(e,i) {
            if(e.address_default == 1) {
                defauId = e.address_id;
                hasDefa = true;
            }
            var $html_address = `
            <div class='add_div id${e.address_id}'>
                <p class='name_p clear'>
                    <span class='add_name'>${e.address_name}</span>
                    <span class='add_phone'>${e.address_phone}</span>
                </p>
                <p class='add_p'>
                    收货地址 :
                    <span class='add_span'>
                        ${e.address_previnces + e.address_city + e.address_regin + e.address_detail}
                    </span>
                </p>
                <p class='add_edit'>
                    <a href='' class='edit_a' data-id='${e.address_id}'>修改</a>
                    <span class='add_isDefa' data-id='${e.address_id}'>默认地址</span>
                    <img src='../../img/personal_center/delete.png' class='delete' data-id='${e.address_id}'>
                </p>
            </div>
            `
            return $html_address;
            })
        }
        var $html_bott = `
            <div class='add_div add_add'>
                <p class='add_addP'>添加新地址</p>
            </div>
        `
        if(state == 1) {
            var $address = $($html_top + $arrHtml.join('') + $html_bott);
        }
        if(state == 0) {
            var $address = $($html_top + $html_bott);
        }
        $('.main_right').html($address);
        if(state == 1) {
            if(hasDefa) {
                $(`.id${defauId}`).css({opacity:'1',border:'2px solid #ff4001'}).find('.add_isDefa').addClass('add_defa');
                $(`.id${defauId}`).find('.name_p').css('border-bottom','2px solid #ff4001');
            }
        }
        
    }

    // 渲染添加和修改地址
    // render2('新增收货人地址');
    function render2(text,res) {
        // 图片地址
        var src1,src2;
        if(res.length > 0) {
            res.forEach(function(e,i) {
                if(e.address_id == editId) {
                    if(e.address_default == 0) {
                        src1 = '../../img/personal_center/audio.png';
                        src2 = '../../img/personal_center/audio1.png';
                    } else {
                        src1 = '../../img/personal_center/audio1.png';
                        src2 = '../../img/personal_center/audio.png';
                    }
                }
            })
        }else {
            src1 = '../../img/personal_center/audio.png';
            src2 = '../../img/personal_center/audio1.png';
        }
        var $html = $(`
        <div class='box'>
            <div class='add_botDiv'>
                <p class='data_head add_top'>${text}</p>
                <div class='data_div clear' style='width:100%;'>
                    <lable class='data_hint'>联系姓名</lable> 
                    <input type='text' placeholder='请输入收货人姓名' class='data_name'>
                    <lable class='name_err'>联系人不能为空！</lable> 
                </div>
                <div class='data_div clear'>
                    <lable class='data_hint'>联系号码</lable> 
                    <input type='text' placeholder='请输入收货人手机号码' class='data_phone'>
                    <lable class='phone_err'>联系号码格式不正确！</lable> 
                </div>
                <div class='data_div clear'>
                    <lable class='data_hint'>收货地址</lable> 
                    <select class="form-controls" id="cmbProvince" name="cmbProvince" ></select>
                    <select class="form-controls" id="cmbCity" name="cmbCity" ></select>
                    <select class="form-controls" id="cmbArea" name="cmbArea" ></select>
                </div>
                <div class='data_div clear'>
                    <lable class='data_hint'>详细地址</lable> 
                    <input type='text' placeholder='例:双吉社区48号院7栋7楼7号' class='data_more'>
                    <lable class='more_err'>请输入详细地址！</lable> 
                </div>
                <div class='data_div clear' style='width:100%;'>
                    <lable class='data_hint'>设为默认地址</lable> 
                    <p class='p_yes clear'>
                        <img class='img_yes' src='${src1}'><lable class='lab_yes'>是</lable> 
                    </p>
                    <p class='p_no clear'>
                        <img class='img_no' src='${src2}'><lable class='lab_no'>否</lable> 
                    </p>
                </div>
            </div>
            <input type='button' class='bot_button' value='保存地址信息'>
        </div>
        `)
        $('.main_right').append($html);
        // 地址
        addressInit('cmbProvince', 'cmbCity', 'cmbArea');  
        // 确认是修改
        if(res.length > 0) {
            res.forEach(function(e,i) {
                if(e.address_id == editId) {
                    $('.data_name').val(e.address_name);
                    $('.data_phone').val(e.address_phone);
                    // 地址
                    addressInit('cmbProvince', 'cmbCity', 'cmbArea',e.address_previnces,e.address_city,e.address_regin);  
                    $('.data_more').val(e.address_detail);
                }
            })
        }
    }
// 点击切换是否默认
    // 默认为否
    var defa = 0; // 设置默认0代表否
    $('.main_right').on('click','.p_no',function() { //点击否
        $('.img_no').attr('src','../../img/personal_center/audio1.png');
        $('.img_yes').attr('src','../../img/personal_center/audio.png');
        defa = 0; //0代表否
    });
    $('.main_right').on('click','.p_yes',function() { //点击是
        $('.img_yes').attr('src','../../img/personal_center/audio1.png');
        $('.img_no').attr('src','../../img/personal_center/audio.png');
        defa = 1; //1代表是
    })
// 正则判断
    $('.main_right').on('blur','.data_name',function() {
        if($.trim($(this).val()) == '') {
            $('.name_err').css('display','inline-block');
            nameFlag = false;
        }else {
            $('.name_err').css('display','none');
            nameFlag = true;
        }
    })
    var phoneReg = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
    $('.main_right').on('blur','.data_phone',function() {
        if(phoneReg.test($(this).val())) {
            $('.phone_err').css('display','none');
            phoneFlag = true;
        }else {
            $('.phone_err').css('display','inline-block');
            phoneFlag = false;
        }
    })
    $('.main_right').on('blur','.data_more',function() {
        if($.trim($(this).val()) == '') {
            $('.more_err').css('display','inline-block');
            moreFlag = false;
        }else {
            $('.more_err').css('display','none');
            moreFlag = true;
        }
    })
    
})

