$(function() {
    var footer = `
    <div class="footer">
    <div class="footer-main container">
      <div
        class="footer-logo clear col-md-4 col-sm-4 col-xs-4 col-md-offset-4 col-sm-offset-4 col-xs-offset-4"
      >
        <div>
          <img src="./img/home/logo.png" alt="" />
          <span>RainDowCake</span>
        </div>
        <div>
          <span
            class="iconfont icon-weixin"
            data-toggle="popover"
            tabindex="0"
            data-trigger="hover"
            data-placement="top"
            data-html="true"
            data-content='
                          <div class="ma">
                              <img src="./img/home/ma.png" alt="">
                          </div> 
                          '
          >
          </span>
        </div>
      </div>

      <p
        class="msg col-md-6 col-sm-6 col-xs-6 col-md-offset-3 col-sm-offset-3 col-xs-offset-3"
      >
        21点钱下单支持明天开始配送，21点后下单支持后台开始配送
      </p>
      <div
        class="tel col-md-6 col-sm-6 col-xs-6 col-md-offset-3 col-sm-offset-3 col-xs-offset-3"
      >
        <span>客服电话:400-888-8888 028-88888888</span>
        <span>工作时间(9:00-21:00)</span>
      </div>
      <div
        class="list col-md-6 col-sm-6 col-xs-6 col-md-offset-3 col-sm-offset-3 col-xs-offset-3"
      >
        <ul class="clear">
          <li><a href="#">购物指南</a></li>
          <li><a href="#">服务条款</a></li>
          <li><a href="#">配送方式</a></li>
          <li><a href="#">联系我们</a></li>
          <li><a href="#">品牌故事</a></li>
          <li><a href="#">网站地图</a></li>
        </ul>
      </div>
      <hr />
      <p
        class="company col-md-6 col-sm-6 col-xs-6 col-md-offset-3 col-sm-offset-3 col-xs-offset-3"
      >
        成都GT国际有限公司
      </p>
      <div
        class="list card col-md-6 col-sm-6 col-xs-6 col-md-offset-3 col-sm-offset-3 col-xs-offset-3"
      >
        <ul class="clear">
          <li><a href="#">营业执照</a></li>
          <li><a href="#">食品经营许可证</a></li>
          <li><a href="#">生产许可证</a></li>
        </ul>
      </div>
      <p
        class="copyright col-md-6 col-sm-6 col-xs-6 col-md-offset-3 col-sm-offset-3 col-xs-offset-3"
      >
        <span
          >Copyright © 2010-2019 RainDowCake.com
          版权所有　沪ICP备88888888</span
        >
      </p>
    </div>
  </div>
    `
    $('body').append(footer);
})