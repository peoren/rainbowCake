$(function () {
    var data = [],
        length = 4,
        start = 0,
        after = false,
        divlength = 12,
        cobject,
        classify,
        keytext,
        initState = 0,
        initValue,

        arrs = [],
        reset = false;
    // console.log(decodeURI(window.location.href));
    var url = decodeURI(window.location.href);
    initValue = parseURL(url);

        if (initState == 1) {
            classify = initValue;
            newfclassify();
            $('.classnav li').eq(classify).addClass('red')
        } else if (initState == -1) {
            cobject = initValue;
            newfcobject();
        }


    // 按分类 局部刷新渲染
    function DoajaxClassify() {
        console.log('doajax Class')
        $.ajax({
            method: 'GET',
            url: '/classobject',
            cache: false,
            data: {
                classify: classify
            },
            async: false
        })
            .done(function (res) {
                if (res.state == 0) {
                    initState = 1;
                    data = res.data;
                    reset = true;
                    arrs = [];
                    console.log(data)
                    console.log(data, start, reset)
                    render(data, start, reset);
                    cleandom();

                } else {
                    render([]);
                }
            })
            .fail(function (err) {
                console.log(err);
            })
    }
    // 按赠送对象 局部刷新渲染
    function Doajax() {

        $.ajax({
            method: 'GET',
            url: '/changeobject',
            cache: false,
            data: {
                cobject: cobject
            },
            async: false
        })
            .done(function (res) {
                if (res.state == 0) {
                    initState = -1;
                    data = res.data;
                    reset = true;
                    arrs = [];
                    render(data, start, reset);
                    cleandom();
                } else {
                    render([]);
                }
            })
            .fail(function (err) {
                console.log(err);
            })
    }
    // cobject 查找对应 赠送对象 名称
    function newfcobject() {
        switch (cobject) {
            case '0':
                keytext = '下午茶';
                break;
            case '1':
                keytext = '送亲子';
                break;
            case '2':
                keytext = '送长辈';
                break;
            case '3':
                keytext = '送闺蜜';
                break;
            case '4':
                keytext = '送恋人';
                break;

        }
        // 局部刷新渲染
        Doajax();
    }
    // classify 查找对应 产品分类 名称
    function newfclassify() {
        switch (classify) {
            case '1':
                keytext = '慕斯';
                break;
            case '2':
                keytext = '奶油';
                break;
            case '4':
                keytext = '水果';
                break;
            case '3':
                keytext = '巧克力';
                break;
            case '5':
                keytext = '咸奶油';
                break;
            case '6':
                keytext = '雪域';
                break;
            case '0':
                keytext = '全部分类';
                break;
        }
        // 局部刷新渲染
        DoajaxClassify();
    }
    // location 分解，返回值
    function parseURL(url) {
            var para = url.split("?")[1];
            var res = {};
            var arr = [];
            arr = para.split("=");
            res = arr[1];
            if (arr[0].indexOf('classify') != -1) {
                initState = 1;
            } else if (arr[0].indexOf('cobject') != -1) {
                initState = -1;
            }
            console.log(arr[1])
            return res;

    }
    // 搜索
    var searchtext = parseURL(url);
    if (initState == 0) {
        search();
    }

    function search() {
        var searchC = false;
        // var searchtext = $(this).prev().children().val();
        keytext = searchtext;
        console.log('searchtext :', searchtext);
        if (searchtext.indexOf('咸') != -1 || searchtext.indexOf('不甜') != -1) {
            if (searchtext.indexOf('咸') != -1) {
                keytext = '咸';
            } else {
                keytext = '不甜';
            }
            searchtext = 1;
        } else if (searchtext.indexOf('低甜') != -1) {
            keytext = '低甜';
            searchtext = 2;
        }
        switch (searchtext) {
            case '慕斯':
                keytext = '慕斯';
                searchtext = 1;
                searchC = true;
                break;
            case '奶油':
                keytext = '奶油';
                searchtext = 2;
                searchC = true;
                break;
            case '巧克力':
                keytext = '巧克力';
                searchtext = 3;
                searchC = true;
                break;
            case '水果':
                keytext = '水果';
                searchtext = 4;
                searchC = true;
                break;
            case '咸奶油':
                keytext = '咸奶油';
                searchtext = 5;
                searchC = true;
                break;
            case '雪域':
                keytext = '雪域';
                searchtext = 6;
                searchC = true;
                break;

        }
        $.ajax({
            method: 'GET',
            url: '/searchgoods',
            cache: false,
            data: {
                searchtext: searchtext,
                searchC: searchC
            },
            async: false
        })
            .done(function (res) {
                if (res.state == 0) {
                    data = res.data;
                    reset = true;
                    arrs = [];
                    console.log(data)
                    render(data, start, reset);
                } else {
                    render([]);
                }
                searchC = false;
            })
            .fail(function (err) {
                console.log(err);
            })
        return false
    }

    // 子页面局部刷新 切换 赠送对象
    $('.navbar-nav').on('click', 'li', function () {
        keytext = $(this).children().text();
        console.log('keytext', keytext)
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
        // 局部刷新渲染
        Doajax(cobject, keytext);
    })
    // 子页面局部刷新 切换 分类
    $('.classnav').on('click', 'li', function () {
        classify = $(this).attr('classi');
        console.log(classify);
        $('.classnav li').each(function () {
            $(this).removeClass('red');
        })
        $(this).addClass('red');
        newfclassify();
        // 局部刷新渲染
        DoajaxClassify(classify, keytext);
    })
    // 无限加载清除多余dom结构
    function cleandom() {
        console.log('arrs:', arrs)
        if ($('.objectmain').children().length > divlength) {
            if (after) {
                console.log('clear last')
                arrs = arrs.sort(function (a, b) {
                    return b - a;      //降序排列
                });
                s = arrs[0];
                arrs.shift();
                for (let i = length - 1; i >= 0; i--) {
                    var lastC = $('.objectmain').children().last().attr('renderC');
                    if (parseInt(lastC) == parseInt(s + i)) {
                        $('.objectmain').children().last().remove();
                    }
                }

                after = false;
            } else {
                console.log('clear first')
                var s = $('.objectmain').children().first().attr('renderC');
                s = arrs.indexOf(parseInt(s));
                if (s == -1) return;
                arrs.splice(s, 1);
                for (let i = 0; i < length; i++) {
                    $('.objectmain').children().first().remove();
                }
                after = true;
            }
        }
    }

    // 鼠标滚动事件
    var scrollFunc = function (e, cobject) {
        e = e || window.event;

        var pagesH = Math.max(document.body.scrollHeight, document.body.offsetHeight);
        var windowH = window.innerHeight ||
            document.documentElement.clientHeight ||
            document.body.clientHeight || 0;
        var srcollH = window.pageYOffset ||
            document.documentElement.scrollTop ||
            document.body.scrollTop || 0;

        if (e.wheelDelta) {  //第一步：先判断浏览器IE，谷歌滑轮事件               
            if (e.wheelDelta > 0) { //当滑轮向上滚动时  
                if (srcollH < 300) {
                    if (start == 0) {
                        console.log('do nonthing')
                    } else {
                        start = $('.objectmain').children().first().attr('renderC') - length;
                        after = true;
                        // console.log('data, start, reset,cobject, keytext', data, start, reset, cobject, keytext)
                        render(data, start);
                        // render(data, start, reset,cobject, keytext);
                        cleandom();
                    }
                }
            }
            if (e.wheelDelta < 0) { //当滑轮向下滚动时  
                if (pagesH - windowH - srcollH < 40) {
                    after = false;
                    start += length;
                    // console.log('data, start, reset,cobject, keytext xia ', data, start, reset, cobject, keytext)
                    render(data, start);
                    // render(data, start, reset,cobject, keytext);
                    cleandom();
                }
            }

        } else if (e.detail) {  //Firefox滑轮事件  
            if (e.detail > 0) { //当滑轮向上滚动时  
                if (srcollH < 300) {
                    if (start == 0) {
                        console.log('do nonthing')
                    } else {
                        start = $('.objectmain').children().first().attr('renderC') - length;
                        after = true;
                        // console.log('data, start, reset,cobject, keytext shang', data, start, reset, cobject, keytext)
                        render(data, start);
                        // render(data, start, reset,cobject, keytext);
                        cleandom();
                    }
                }
            }

            if (e.detail < 0) { //当滑轮向下滚动时  
                if (pagesH - windowH - srcollH < 40) {
                    after = false;
                    start += length;
                    render(data, start);
                    // render(data, start, reset,cobject, keytext);
                    cleandom();
                }
            }
        }
    }

    //给页面绑定滑轮滚动事件  
    if (document.addEventListener) {//firefox  
        document.addEventListener('DOMMouseScroll', scrollFunc, false);
    }
    //滚动滑轮触发scrollFunc方法  //ie 谷歌  
    window.onmousewheel = document.onmousewheel = scrollFunc;

    // 渲染页面
    function render(arr, s, reset) {
        console.log(arr, s, reset)
        if (s < 0) {
            start = 0;
            return
        } else if (s > arr.length) {
            start -= length;
            return
        }
        if (reset) {
            s = 0;
            arrs.push(0);
            arrs.push(4);
            $('.objectmain').html('');
            reset = false;
            length = 8;

        } else {
            length = 4;
            if (arrs.indexOf(s) == -1) {
                arrs.push(s);
            } else {
                return
            }
        }

        if (arr.length == 0) {
            $('.objectcount').html('暂无相关产品');
            $('.objectmain').html('');
            return;
        } else {
            $('.objectcount').html(`
            <span> “${keytext}” </span> 
            搜索到 ${arr.length} 款相关商品 
            `)
            if (initState == -1) {
                $('.classnav').addClass('hidden');
                $('.objectcount').removeClass('hidden');
                $('.objectcount').html(`
            <span> “${keytext}” </span> 
            搜索到 ${arr.length} 款相关商品 
            `)
            } else if (initState == 1) {
                $('.objectcount').addClass('hidden');
                $('.classnav').removeClass('hidden');
            }
            var domarr = arr.map(function (ele, i) {
                if (i < s + length && i >= s) {
                    let url = ele.goods_pic_main.replace(/\\/g, '/');
                    if (ele.sell_amount == undefined) ele.sell_amount = 50;
                    return `<div index = '${ele.goods_id}' renderC = '${i}' class = 'position${i % 3}'>
                            <a href='/sendId?id=${ele.goods_id}'>
                                <div class="previewimgbox" class="previewimgbox"
                                    style="background:url(${url}) no-repeat center; background-size: 100% auto;">
                                
                                    </div>    
                            </a>

                            <p>
                                ${ele.goods_name}
                            </p>
                            <p class="price">
                                <span>¥ ${ele.goods_price}</span>
                            </p>
                            <div class="sellmsg clear">
                                <div>
                                    <span>Sweetness:</span>
                                    <img src="./img/object/sw${ele.goods_sweetns}.png" alt="">
                                </div>
                                <div class='sellcount' title="累计销量">
                                    <img src='./img/object/xiaoliang.png' alt="">
                                    <span>${ele.sell_amount}</span>
                                </div>
                            </div>

                            <div class="chooseSize hidden">
                                <p>
                                    <span>￥</span>
                                    <span class="ch_price">${ele.goods_price}</span>
                                </p>
                                <span class="ch_size" index='1'>1.2磅</span>
                                <span class="ch_size" index='2'>2.2磅</span>
                                <span class="ch_size" index='3'>3.2磅</span>
                                <span class="ch_size" index='4'>7.2磅</span>
            
                            <div>
                                <input type="button" value="确认" id="confirm">
                                <input type="button" value="取消" id="cancel">
                            </div>
                        </div>
                            <div class="clear">
                                <p class='shop_now'> 立即购买 </p>
        
                                <div class='shop_car'>
                                    <img src='./img/home/jiarugouwuche.png'>
                                </div>
                            </div>
                            </div>`
                }

            })
        }


        if (after) {
            $('.objectmain').prepend(domarr);
        } else {
            $('.objectmain').append(domarr);
        }

    }

})
