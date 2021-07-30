var apihost = 'http://47.110.243.66:8082/ucenter/api/zrjh/';
var emoticon = [{
    imageurl1 : './static/images/emoticon/fox01.png',
    imageurl2 : './static/images/emoticon/fox01.png',
    author: '调皮狐',
    downurl : './static/images/fox2021.zip',
    imgId: 'f01',
    fee: 6.6
}];
var expression = [{
    imageurl : './static/images/fox/1.png',
    author: '调皮狐',
    fee: 1,
    imgId: 'f01',
    title: '我哭啦'
},{
  imageurl : './static/images/fox/2.png',
  author: '调皮狐',
  fee: 1,
  imgId: 'f02',
  title: '爱你哟'
},{
  imageurl : './static/images/fox/3.png',
  author: '调皮狐',
  fee: 1,
  imgId: 'f03',
  title: '你真棒'
},{
  imageurl : './static/images/fox/4.png',
  author: '调皮狐',
  fee: 1,
  imgId: 'f04',
  title: '好阔怕'
},{
  imageurl : './static/images/fox/5.png',
  author: '调皮狐',
  fee: 1,
  imgId: 'f05',
  title: '泥猴吖'
},{
  imageurl : './static/images/fox/6.png',
  author: '调皮狐',
  fee: 1,
  imgId: 'f06',
  title: '好享受'
},{
  imageurl : './static/images/fox/7.png',
  author: '调皮狐',
  fee: 1,
  imgId: 'f07',
  title: '给你个wink'
},{
  imageurl : './static/images/fox/8.png',
  author: '调皮狐',
  fee: 1,
  imgId: 'f08',
  title: '哇，爱心爱心'
}];
var isLogin = localStorage.getItem('isLogin') && localStorage.getItem('username');
var isPay = false;
var canDown = false;
var mainExpression = $('.only-expression');
var allExpression = $('.all-expression');
$(function(){
    setExpression();
    setEmoticon();
    var moveHeight = 350,
        moveTime = 200,
        curMove = null;
    $('.all-expression').on('mouseenter','.caselist',function(){ 
        var curLi = $(this);
        curMove = setTimeout(function () {
            curLi.children('img.tagImg1').animate({
                top: '-' + moveHeight + 'px'
            }, moveTime);
            curLi.children('div.tagDiv1').animate({
                top: '0px'
            }, moveTime);
        }, 200);
    });
    $('.all-expression').on('mouseleave','.caselist',function(){ 
        clearTimeout(curMove);
            $(this).children('img.tagImg1').animate({
                top: '0px'
            }, moveTime);
            $(this).children('div.tagDiv1').animate({
                top: moveHeight + 'px'
            }, moveTime);  
    });     
    $('.only-expression').on("click", ".float_li .down_btn_a", function() {
        if(isLogin){
            getPayStatus(this, createImg);
        }else{
            alert('请先登录哦~');
        }
    });    
    // if(isLogin){
    //     $('.only-expression').on("click", ".float_li .down_btn_a", function() {
    //         getPayStatus(this, createImg);
    //         // if(getPayStatus(this)){
    //         //     // var imgSrc = $(this).siblings("img").attr("src");
    //         //     var imgSrc = $(this).parents('.float_li').find("img").attr("src");
    //         //     //调用创建iframe的函数
    //         //     createIframe(imgSrc);
    //         // }else{
    //         //     console.log('尚未支付');
    //         //     // alert('请先完成支付');
    //         // }
    //     });
    //     // if(isPay){
    //     //     if (browserIsIe()) {
    //     //         console.log('ieeeee...');
    //     //         //是ie等,绑定事件
    //     //         $('.only-expression').on("click", ".float_li .down_btn_a", function() {
    //     //             if(getPayStatus(e)){
    //     //                 // var imgSrc = $(this).siblings("img").attr("src");
    //     //                 var imgSrc = $(this).parents('.float_li').find("img").attr("src");
    //     //                 //调用创建iframe的函数
    //     //                 createIframe(imgSrc);
    //     //             }else{
    //     //                 alert('请先完成支付');
    //     //             }
    //     //         });
    //     //     } else {
    //     //         console.log('miannnn...');
    //     //         console.log($('.only-expression .float_li .down_btn_a'));
    //     //         $('.only-expression .float_li .down_btn_a').each(function(i,v){
    //     //             //支持download,添加属性.
    //     //             console.log($(v));
    //     //             // var imgSrc = $(v).siblings("img").attr("src");
    //     //             var imgSrc = $(v).parents('.float_li').find("img").attr("src");
    //     //             // var imgSrc = $(v).parent().find("img").attr("src");
    //     //             $(v).attr("download",imgSrc);
    //     //             $(v).attr("href",imgSrc);
    //     //         });
    //     //     }
    //     // }else{
    //     //     $('.only-expression').on("click", ".float_li .down_btn_a", function() {
    //     //         alert('请先支付购买哦~');
    //     //     });
    //     // }
        
    // }else{
    //     // alert('请先登录哦~');
    // }

});
function createImg(e){
    var imgSrc = $(e).parents('.float_li').find("img").attr("src");
    //调用创建iframe的函数
    // createIframe(imgSrc);
    if (browserIsIe()) {
        console.log('ieeeee...');
        //是ie等,绑定事件
        //调用创建iframe的函数
        createIframe(imgSrc);
    } else {
        console.log('miannnn...');
        $(e).attr("download",imgSrc);
        $(e).attr("href",imgSrc);
        // $(e).click();
        // window.location.href = $(e).attr('href');
    }
}
function setExpression(){
    if(!expression.length){
        return false;
    }
    mainExpression.empty();
    $(expression).each(function(index, item){
        
        var mainClass = index % 4 == 3 ? 'float_li no_margin' : 'float_li';
        var liShow = '<div class="'+mainClass+'">'+
            '<a href="javascript:void(0)">'+
                '<img src="'+item.imageurl+'" />'+
            '</a>'+
            // '<div class="war">作者<br />:<br />'+item.author+'</div>'+
            '<span>'+
                '<font color="red" style="float:left; text-align:left">'+item.fee+'元/次</font>'+item.title+
                '<font style="float:right; text-align:right">'+
                    '<a href="javascript:void(0)" class="down_btn_a" data-fee="'+item.fee+'" data-id="'+item.imgId+'">单次下载</a>'+
                '</font>'+
            '</span>'+
        '</div>';
        mainExpression.append(liShow);
    });
}

function setEmoticon(){
    if(!emoticon.length){
        return false;
    }
    allExpression.empty();
    $(emoticon).each(function(index, item){
        var divShow = '<div class="float_image caselist">'+
                '<img class="float_image tagImg1" src="'+item.imageurl1+'" />'+
                // '<div class="war">作者<br />:<br />'+item.author+'</div>'+
                '<div class="tagDiv1">'+
                    '<a href="#" class="tagImg2" target="_blank"><img width="364px" height="280px" src="'+item.imageurl2+'" alt="" /></a>'+
                    '<div class="download_all" style="margin: 8px auto">'+
                        '<a href="javascript:void(0)" style="color:#ffffff" downurl="'+item.downurl+'" data-fee="'+item.fee+'" data-id="'+item.imgId+'">'+item.fee+'元/下载</a>'+
                    '</div>'+
                '</div>'+
            '</div>';
        
        allExpression.append(divShow);
    });
}


//点击下载功能实现
//判断是否为Trident内核浏览器(IE等)函数
function browserIsIe() {
    if (!!window.ActiveXObject || "ActiveXObject" in window){
        return true;
    }
    else{
        return false;
    }
}
//创建iframe并赋值的函数,传入参数为图片的src属性值.
function createIframe(imgSrc) {
    //如果隐藏的iframe不存在则创建
    if ($("#IframeReportImg").length === 0){
        $('<iframe style="display:none;" id="IframeReportImg" name="IframeReportImg" onload="downloadImg();" width="0" height="0" src="about:blank"></iframe>').appendTo("body");
    }
    //iframe的src属性如不指向图片地址,则手动修改,加载图片
    if ($('#IframeReportImg').attr("src") != imgSrc) {
        $('#IframeReportImg').attr("src",imgSrc);
        downloadImg();
    } else {
        //如指向图片地址,直接调用下载方法
        downloadImg();
    }
}
//下载图片的函数
function downloadImg() {
    //iframe的src属性不为空,调用execCommand(),保存图片
    if ($('#IframeReportImg').src != "about:blank") {
        window.frames["IframeReportImg"].document.execCommand("SaveAs");
    }
}

//表情包下载事件
$('.all-expression').on('click', '.download_all a', function(){
    if(isLogin){
        // console.log(getPayStatus(this));
        getPayStatus(this, attrDown);
        // if(getPayStatus(this)){
        //     $(this).attr('href', $(this).attr('downurl'));
        // }else{
        //     console.log('尚未支付');
        //     // alert('请先支付购买');
        // }
    }else{
        alert('请先登录哦~');
		window.location.href = 'login.html';
    }
});
function attrDown(e){
    $(e).attr('href', $(e).attr('downurl'));
    window.location.href = $(e).attr('href');
}

//点击时判断是否支付
function getPayStatus(e, fn){
    var imgId = $(e).attr('data-id');
    var amount = $(e).attr('data-fee');
    var obj = {
        phone_num: localStorage.getItem('username'),
        pid: imgId,
        amount: amount
    };
    $.ajax({
        url: apihost+'buy',
        type: "GET",
        dataType: "json",
        data: obj,
        success: function(res) {
          if (res.status == 0) {
            isPay = res.res.isBuy;
            if(isPay){
                //已支付
                fn(e);
                return true;
            }else{
                //未支付，跳转支付
                alert('请在支付完成后，再次点击下载~');
                $("body").html(res.res.payForm);
                return false;
            }
          } else {
            alert(res.msg);
            return false;
          }
        }
      });
}