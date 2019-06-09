$(function() {
    // 列表字体颜色
    $('.main_list a').css('color','#aaa');
    $('.list_data').css('color','#ff4001');
    // 获取用户id
    var user_id = sessionStorage.getItem('user_id');
    // 图片名字
    var imgName;
    // 点击保存基本信息
    var phoneFlag = true;
    $('body').on('click','.top_button',function() {
        var data_phone = $('.data_phone').val();
        if(nameFlag && phoneFlag) {
            var name = $('.data_name').val();
            $.ajax({
                method:'put',
                url:'/p_setData',
                data:{
                    user_id:user_id,
                    name:name,
                    sex:sex,
                    imgName:imgName,
                    data_phone:data_phone
                }
            })
            .done(function(res) {
                ajax();
                $('.modal-content').text('保存基本信息成功')
                $('.modal').modal();
            });
        }
        if(nameFlag == false) {
            $('.name_err').css('display','inline-block');
            nameFlag = false;
        }
        if(phoneFlag == false) {
            $('.phone_p').text('手机号码格式不正确！').css('color','red');
            phoneFlag = false;
        }
    })
    // 点击验证码确定
    var cav_num;
    $('body').on('click','.cvs_btn',function() {
        if(cav_num == $('.data_canvas').val()) {
            $('.modal-content').text('验证成功！');
            $('.modal').modal();
            $('.data_phone').prop('disabled',false).css('border','1px solid #aaa');
            $('.data_canvas').val('');
        } else if($('.data_canvas').val().length == 4) {
            $('.modal-content').text('验证码不正确');
            $('.modal').modal();
            $('.data_canvas').val('');
        }
    })
    $('body').on('input','.data_canvas',function() {
        if($(this).val().length == 4) {
            $('.cvs_btn').css('background-color','#ff4001')
        } else {
            $('.cvs_btn').css('background-color','#aaa')
        }
    })
    // 点击保存更多信息
    $('body').on('click','.bot_button',function() {
        // 工作行业
        var job = $('.data_job').val();
        // 工作 省
        var prov = $('#cmbProvince').val();
        // 工作 市
        var city = $('#cmbCity').val();
        // 工作 区
        var area = $('#cmbArea').val();
        // 工作单位
        var unit = $('.data_unit').val();
        // 生日 年
        var year = $('#date-sel-year').val();
        // 生日 月
        var month = $('#date-sel-month').val();
        // 生日 日
        var day = $('#date-sel-day').val();
        // 收入
        var income = $('.income').val();
        $.ajax({
            method:'put',
            url:'/p_setMoreData',
            data:{
                user_id:user_id,
                marry:marry,
                job:job,
                prov:prov,
                city:city,
                area:area,
                unit:unit,
                year:year,
                month:month,
                day:day,
                income:income
            }
        })
        .done(function(res) {
            ajax();
            $('.modal-content').text('保存更多信息成功')
            $('.modal').modal();
        });
    })

    // ajax渲染基本信息页面
    ajax();
    function ajax() {
        $.ajax({
            method:'get',
            url:'/p_getData',
            data:{
                user_id:user_id
            }
        })
        .done(function(res) {
            render(res[0]);
            const canvas = document.getElementById('canvas');
            let reg = new RegCode(); // 使用默认值
            reg.draw(canvas, (txt) => {
                cav_num = txt.toLowerCase();
            });
        })
    }
// 生成个人资料界面
    function render(res) {
// 基本信息
        // 判断性别
        var src1,src2;
        if(res.user_sex == 0 || res.user_sex == null) {
            src1 = '../../img/personal_center/audio1.png';
            src2 = '../../img/personal_center/audio.png';
        }
        if(res.user_sex == 1) {
            src1 = '../../img/personal_center/audio.png';
            src2 = '../../img/personal_center/audio1.png';
        }
        var $html_top = `
            <p class='data_head'>基本信息<p>
            <div class='data_div clear'>
                <lable class='data_hint head_hint'>头像: </lable> 
                <div class='data_img'>
                    <div class='head_module'>
                        点击上传头像
                        <form id="uoloadForm" action="" method="POST" enctype="multipart/form-data">
                            <input type='file' class='file' title='' name="avator" id="avator" accept="image/*">
                        </form>
                    </div>
                </div>
            </div>
            <div class='data_div clear'>
                <lable class='data_hint inp_hint'>用户名: </lable> 
                <input class='data_name' type='text' placeholder='请输入用户名'>
                <lable class='name_err'>用户名不能为空！</lable> 
            </div>
            <div class='data_div clear'>
                <lable class='data_hint inp_hint'>性别: </lable> 
                <p class='p_man'>
                    <img class='img_man' src='${src1}'><lable class='sex_man'>男</lable> 
                </p>
                <p class='p_woman'>
                    <img class='img_woman' src='${src2}'><lable class='sex_woman'>女</lable> 
                </p>
            </div>
            <div class='data_div clear'>
                <lable class='data_hint inp_hint'>手机号码: </lable> 
                <input type='text' value='${res.user_phone}' class='data_phone' disabled>
                <p class='phone_p'>当前绑定手机号码,输入验证码进行更改</p>
            </div>
            <div class='data_div clear'>
                <lable class='data_hint inp_hint yzm'>验证码: </lable> 
                <input type='text' placeholder='请输入小写字母' class='data_canvas'>
                <input type='button' class='cvs_btn' value='确定'>
                <br>
                <canvas id="canvas" width="100" height="30"></canvas>
            </div>
            <input type='button' class='top_button' value='保存基本信息'>
        `
// 更多信息
        // 判断婚恋状况
        var src11,src22,src33;
        if(res.user_marry == 0 || res.user_marry == null) {
            src11 = '../../img/personal_center/audio1.png';
            src22 = '../../img/personal_center/audio.png';
            src33 = '../../img/personal_center/audio.png';
        }
        if(res.user_marry == 1) {
            src11 = '../../img/personal_center/audio.png';
            src22 = '../../img/personal_center/audio1.png';
            src33 = '../../img/personal_center/audio.png';
        }
        if(res.user_marry == 2) {
            src11 = '../../img/personal_center/audio.png';
            src22 = '../../img/personal_center/audio.png';
            src33 = '../../img/personal_center/audio1.png';
        }
        // 时间
        function timeFormatter(value) {
            var da = new Date(value.replace("/Date(", "").replace(")/" , "").split( "+")[0]);
            return da.getFullYear() + "-" + ((da.getMonth() + 1) < 10 ? "0" + (da.getMonth() + 1):(da.getMonth() + 1))+ "-" + (da.getDate() < 10 ? "0" + da.getDate():da.getDate()) + " " + (da.getHours()<10?"0"+da.getHours():da.getHours()) + ":" + (da.getMinutes()<10?"0"+da.getMinutes():da.getMinutes()) + ":" + (da.getSeconds()<10?"0"+da.getSeconds():da.getSeconds());
        }
        var $time;
        if(res.user_regis == null) {
            $time = '数据库居然没写注册时间？？？';
        }
        if(res.user_regis != null) {
            $time = timeFormatter(res.user_regis)
        }
        $html_bott = `
            <p class='data_head data_more'>更多信息<p>
            <div class='data_div clear'>
                <lable class='data_hint inp_hint'>婚恋状况: </lable> 
                <p class='p_single'>
                    <img class='img_single' src='${src11}'><lable class='sex_man'>单身</lable> 
                </p>
                <p class='p_inLove'>
                    <img class='img_inLove' src='${src22}'><lable class='sex_woman'>恋爱</lable> 
                </p>
                <p class='p_married'>
                    <img class='img_married' src='${src33}'><lable class='sex_woman'>已婚</lable> 
                </p>
            </div>
            <div class='data_div clear'>
                <lable class='data_hint inp_hint'>工作行业: </lable> 
                <select name="" id="" class='data_job'>
                    <option value="学生" selected>学生</option>
                    <option value="医疗卫生">医疗卫生</option>
                    <option value="电脑硬件/软件">电脑硬件/软件</option>
                    <option value="建筑/设计">建筑/设计</option>
                    <option value="电子商务">电子商务</option>
                    <option value="法律/法务">法律/法务</option>
                    <option value="政府机关">政府机关</option>
                    <option value="商品/零售">商品/零售</option>
                    <option value="其他">其他</option>
                </select>
            </div>
            <div class='data_div clear'>
                <lable class='data_hint inp_hint'>单位地址: </lable> 
                <select class="form-controls" id="cmbProvince" name="cmbProvince"></select>
                <select class="form-controls" id="cmbCity" name="cmbCity"></select>
                <select class="form-controls" id="cmbArea" name="cmbArea"></select>
            </div>
            <div class='data_div clear'>
                <lable class='data_hint inp_hint'>单位名称: </lable> 
                <input class='data_unit' type='text' placeholder='请输入单位名称'>
            </div>
            <div class='data_div clear'>
                <lable class='data_hint inp_hint inp_birth'>生日: </lable> 
                <select class="form-controls" id="date-sel-year" rel="${res.user_birth_year}"></select><span class='data_hin'>年</span>
                <select class="form-controls" id="date-sel-month" rel="${res.user_birth_month}"></select><span class='data_hin'>月</span>
                <select class="form-controls" id="date-sel-day" rel="${res.user_birth_day}"></select><span class='data_hin'>日</span>
                <p class='birth_hint'>注意：生日设置并保存后将无法被更改，请慎重选择！</p> 
            </div>
            <div class='data_div clear'>
                <lable class='data_hint inp_hint'>收入: </lable> 
                <select name="" id="" class='data_job income'>
                    <option value="1">1k - 3k</option>
                    <option value="3">3k - 6k</option>
                    <option value="6">6k - 9k</option>
                    <option value="9">9k - 12k</option>
                    <option value="12">12k以上</option>
                </select>
            </div>
            <div class='data_div clear'>
                <lable class='data_hint inp_hint'>注册日期: </lable> 
                <input type='text' placeholder='${$time}' class='data_regis' disabled>
            </div>
            <input type='button' class='bot_button' value='保存更多信息'>
        `

        // 基本信息 + 更多信息
        $html = $($html_top + $html_bott)
        $('.main_right').html($html);
        // 头像
        if(res.user_img == '' || res.user_img == null) {
            $('.data_img').css({
                background: `url('../../img/personal_center/uploads/p_default.jpg') no-repeat center`,
                backgroundSize:'cover'
            })
        }
        if(res.user_img != '' && res.user_img != null) {
            $('.data_img').css({
                background: `url('../../img/personal_center/uploads/${res.user_img}') no-repeat center`,
                backgroundSize:'cover'
            })
        }
        imgName = res.user_img;
        // 地址下拉框
        addressInit('cmbProvince', 'cmbCity', 'cmbArea',res.user_job_prov,res.user_job_city,res.user_job_dis);  
        // 生日下拉框
        $.date_picker({
            YearSelector:  "#date-sel-year",
            MonthSelector: "#date-sel-month",
            DaySelector:   "#date-sel-day"
        });
        if(res.user_birth_year != null && res.user_birth_month != null && res.user_birth_day != null) {
            $('.birth_hint').css('display','none');
            $('.inp_birth').removeClass('inp_birth');
        }
        if(res.user_birth_year != null) {
            $('#date-sel-year').prop('disabled',true)
            $('#date-sel-year').css('border','1px solid #ccc')
        }
        if(res.user_birth_month != null) {
            $('#date-sel-month').prop('disabled',true)
            $('#date-sel-month').css('border','1px solid #ccc')
        }
        if(res.user_birth_day != null) {
            $('#date-sel-day').prop('disabled',true)
            $('#date-sel-day').css('border','1px solid #ccc')
        }
        // 用户名
        $('.data_name').val(res.user_name);
        // 正则判断
        reg();
        // 工作行业
        $('.data_job').val(res.user_job);
        // 工作单位
        $('.data_unit').val(res.user_job_name);
        // 生日 年
        $('#date-sel-year').val(res.user_birth_year);
        // 生日 月
        $('#date-sel-month').val(res.user_birth_month);
        // 生日 日
        $('#date-sel-day').val(res.user_birth_day);
        // 收入
        $('.income').val(res.user_income);
    }
// 点击切换性别
    // 默认性别为男
    var sex = 0; // 设置默认0代表男
    $('.main_right').on('click','.p_man',function() { //点击男
        $('.img_man').attr('src','../../img/personal_center/audio1.png');
        $('.img_woman').attr('src','../../img/personal_center/audio.png');
        sex = 0; //0代表男
    });
    $('.main_right').on('click','.p_woman',function() { //点击女
        $('.img_woman').attr('src','../../img/personal_center/audio1.png');
        $('.img_man').attr('src','../../img/personal_center/audio.png');
        sex = 1; //1代表女
    })

// 点击切换婚恋状况
    var marry = 0; // 设置默认0代表单身
    $('.main_right').on('click','.p_single',function() { //点击单身
        $('.img_single').attr('src','../../img/personal_center/audio1.png');
        $('.img_inLove').attr('src','../../img/personal_center/audio.png');
        $('.img_married').attr('src','../../img/personal_center/audio.png');
        marry = 0; //0代表单身
    });
    $('.main_right').on('click','.p_inLove',function() { //点击恋爱
        $('.img_single').attr('src','../../img/personal_center/audio.png');
        $('.img_inLove').attr('src','../../img/personal_center/audio1.png');
        $('.img_married').attr('src','../../img/personal_center/audio.png');
        marry = 1; //1代表恋爱
    })
    $('.main_right').on('click','.p_married',function() { //点击已婚
        $('.img_single').attr('src','../../img/personal_center/audio.png');
        $('.img_inLove').attr('src','../../img/personal_center/audio.png');
        $('.img_married').attr('src','../../img/personal_center/audio1.png');
        marry = 2; //2代表已婚
    })

// 正则判断
    var nameFlag;
    function reg() {
        // 名字判断
        if($.trim($('.data_name').val()) == '') {
            nameFlag = false;
        }
        if($.trim($('.data_name').val()) != '') {
            nameFlag = true; 
        }
    }
    
    // 名字判断
    $('.main_right').on('blur','.data_name',function() {
        if($.trim($('.data_name').val()) == '') {
            $('.name_err').css('display','inline-block');
            nameFlag = false;
        }else {
            $('.name_err').css('display','none');
            nameFlag = true;
        }
    })
    // 手机号码判断
    $('.main_right').on('blur','.data_phone',function() {
        var phoneReg = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
        if(phoneReg.test($('.data_phone').val())) {
            $('.phone_p').text('当前绑定手机号码,输入验证码进行更改').css('color','#aaa');
            phoneFlag = true;
        }
        if(phoneReg.test($('.data_phone').val()) == false) {
            $('.phone_p').text('手机号码格式不正确！').css('color','red');
            phoneFlag = false;
        }
    })

    // 上传头像
    function uploadAvator() {
        var $this = $('#avator');
        imgName = $this[0].files[0].name;
        // 获取图片
        var form = $('#uoloadForm').get(0);
        var formData = new FormData(form);
        $.ajax({
          method: 'post',
          url: '/p_upload',
          data: formData,
          contentType: false, // 不去设置 contentType 请求头
          processData: false // 不去处理发送的数据
        })
        .done(function(data) {
            $this.parent().parent().parent().css({
                background:`url('../../img/personal_center/uploads/${imgName}') no-repeat center`,
                backgroundSize:'cover'
            });
       
        })
        .fail(function(err) {
            console.log('err');
        }); 
    }
    $('.main_right').on('change','#avator',function() {
        if($(this)[0].files[0] != undefined) {
            if($(this)[0].files[0].size > 2 * 1024 * 1024) {
                $('.modal-content').text('请保持图片大小在2m以内。')
                $('.modal').modal();
            }else {
                uploadAvator();
            }
        }
         else {
            return;
        }
    });

    // canvas验证码 
    function RegCode(options = {}) {
        // 默认参数
        let params = Object.assign({
          lineWidth: 2,  // 线条宽度
            lineNum: 3,  // 线条数量
            dotNum: 15, // 点的数量
            dotR: 1, // 点的半径
            foregroundColor: [10, 80], // 前景色区间
            backgroundColor: [150, 250], // 背景色区间
            fontSize: 20, // 字体大小
            fontFamily: 'Georgia', // 字体类型
            fontStyle: 'fill', // 字体绘制方法，fill/stroke
            content: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ012345789', // 验证码因子
            len: 4 // 验证码长度
        }, options);
        
        // 将所有属性组合后添加到this上
        Object.keys(params).forEach(k => {
          this[k] = params[k];
        });
  
        this.canvas = null; // canvas dom
        this.paint = null; // canvas 2d
  
        // 绘画
        this.draw = function(dom, callback) {
          // 获取canvas dom
          if (!this.paint) { // 如果没有2d对象，再进行赋值操作
            this.canvas = dom; 
            if (!this.canvas) return;
            this.paint = this.canvas.getContext('2d');
            if (!this.paint) return;
            
            this.callback = callback;
  
            // 监听点击事件
            this.canvas.onclick = () => {
              this.drawAgain();
            }
          }
  
          // 随机画布颜色，使用背景色
          let colors = this.getColor(this.backgroundColor);
          this.paint.fillStyle = `rgba(${colors[0]}, ${colors[1]}, ${colors[2]}, 0.8)`;
          // 绘制画布
          this.paint.fillRect(0, 0, this.canvas.width, this.canvas.height);
          // 绘图
          this.arc();
          this.line();
          this.font();
        };
        
        // 获取随机颜色
        this.getColor = function(arr) { 
          let colors = new Array(3).fill(''); // 创建一个长度为3的数组，值都填充为 ''
          colors = colors.map(v => this.getRand(...arr)); // 每个成员随机获取一个强度值重组为新数组
          return colors;
        };
      
        // 获取某个区间的随机数,默认前景色区间 [10, 80]，背景色区间 [150, 250]。
        this.getRand = function(...arr) { 
          arr.sort((a, b) => a - b); // 将传入的参数从小到大排序
          return Math.floor(Math.random() * (arr[1] - arr[0]) + arr[0]);
        };
  
        // 绘制线条
        this.line = function() { 
          for (let i = 0; i < this.lineNum; i++) {
            // 随机获取线条的起止坐标
            let x = this.getRand(0, this.canvas.width), 
              y = this.getRand(0, this.canvas.height),
              endx = this.getRand(0, this.canvas.width), 
              endy = this.getRand(0, this.canvas.width);
            this.paint.beginPath(); // 开始绘制
            this.paint.lineWidth = this.lineWidth;
            // 随机获取路径颜色
            let colors = this.getColor(this.foregroundColor); // 使用前景色
            this.paint.strokeStyle = `rgba(${colors[0]}, ${colors[1]}, ${colors[2]}, 0.8)`;
            // 指定绘制路径
            this.paint.moveTo(x, y);
            this.paint.lineTo(endx, endy);
            this.paint.closePath();
            this.paint.stroke(); // 进行绘制
          }
        };
  
        // 绘制圆点
        this.arc = function() { 
          // dotNum 是允许传入的需要绘制圆点的个数，默认为10
          for (let i = 0; i < this.dotNum; i++) {
            // 随机获取圆心
            let x = this.getRand(0, this.canvas.width), 
              y = this.getRand(0, this.canvas.height);
            
              this.paint.beginPath();
    
            // 指定圆周路径
            // dotR 是半径，默认为 1
            this.paint.arc(x, y, this.dotR, 0, Math.PI * 2, false);
            this.paint.closePath();
    
            // 随机获取路径颜色
            let colors = this.getColor(this.foregroundColor);
            this.paint.fillStyle = `rgba(${colors[0]}, ${colors[1]}, ${colors[2]}, 0.8)`;
    
            // 绘制
            this.paint.fill();
          }
       };
      
        // 随机获取验证码
        this.getText = function() { 
          let len = this.content.length, str = '';
          for (let i = 0; i < this.len; i++) { // 随机获取每个因子，组成验证码
              str += this.content[this.getRand(0, len)];
          }
          return str;
        };
        
        // 绘制文字
        this.font = function() { 
          let str = this.getText(); // 获取验证码
          this.callback(str); // 利用回调函数输出文字，用于与用户输入验证码进行比对
          // 指定文字风格
          this.paint.font = `${this.fontSize}px ${this.fontFamily}`;
          this.paint.textBaseline = 'middle'; // 设置文本基线，middle是整个文字所占方框的高度的正中。
          // 指定文字绘制风格
          let fontStyle = `${this.fontStyle}Text`;
          let colorStyle = `${this.fontStyle}Style`;
          for (let i = 0; i < this.len; i++) { // 循环绘制每个字
            let fw = this.paint.measureText(str[i]).width; // 获取文字绘制的实际宽度
            // 获取每个字的允许范围，用来确定绘制单个文字的横坐标
            let x = this.getRand(this.canvas.width / this.len * i, (this.canvas.width / this.len) * i + fw/2);
            // 随机获取字体的旋转角度
            let deg = this.getRand(-6, 6);
            // 随机获取文字颜色
            let colors = this.getColor(this.foregroundColor);
            this.paint[colorStyle] = `rgba(${colors[0]}, ${colors[1]}, ${colors[2]}, 0.8)`;
            // 开始绘制
            this.paint.save();
            this.paint.rotate(deg * Math.PI / 180);
            this.paint[fontStyle](str[i], x, this.canvas.height / 2);
            this.paint.restore();
          }
        };
        
        // 清空画布
        this.clear = function() { 
          this.paint.clearRect(0, 0, this.canvas.width, this.canvas.height);
        };
  
        // 更新画布
        this.drawAgain = function() {
          this.clear();
          this.draw(this.callback);
        };
      }
})