var usemail = '398949820@qq.com';
var usqq = '398949820';
var usphone = '18612149479';
var usaddress = '北京市丰台区航丰路8号院1号楼6层627室';
var beian = '京ICP备189600615号-1';
var uscompany = '北京三五更文化传媒有限公司';
var isLogin = localStorage.getItem('isLogin') && localStorage.getItem('isLogin') == 1;
// Copyright © 2020-2021　北京三五更文化传媒有限公司 版权所有 京ICP备189600615号-1 地址：北京市丰台区航丰路8号院1号楼6层627室
$(function(){
    createFooter();
    if(isLogin){
        $('.noLogin').hide();
        $('.showLogin').show();
    }else{
        $('.noLogin').show();
        $('.showLogin').hide();
    }
});
var toast = function (s) {
    var t = $('<div class="toast"><p>' + (s || "") + "</p></div>");
    $(document.body).append(t), setTimeout(function () {
        t.addClass("show");
    }, 10);
    setTimeout(function () {
        t.removeClass("show").addClass("hide");
        setTimeout(function () {
            t.remove();
        }, 200);
    }, 2e3);
};
function createFooter(){
    if(!$('.footer .bottom').length){
        return false;
    }
    $('.footer .bottom').empty();
    var currentYear = new Date().getFullYear();
    var _foot = '<p>联系邮箱：'+ usemail +'&nbsp;&nbsp;联系QQ：'+ usqq +'&nbsp;&nbsp;联系电话：'+ usphone +'</p>'+
        '<p>联系地址：'+ usaddress +'&nbsp;&nbsp;©'+currentYear+'&nbsp;&nbsp;'+ uscompany +' 版权所有 </p>'+
        '<p><a href="https://beian.miit.gov.cn/" target="_blank">'+ beian +'</a></p>';
        // &nbsp;&nbsp;<a href="/static/images/papers/business_license.jpg" target="_blank">网络文化经营许可证 京网文（2021）0372-110号</a>
    $('.footer .bottom').append(_foot);
}

function quitLogin(){
    localStorage.removeItem('isLogin');
    localStorage.removeItem('username');
    window.location.href = "./index.html";
}

// $('body').bind('click', function (e) {
//     if (e.target.id == 'closeLogin') {
//         $('.isLogin').addClass('hidden');
//     }
// })
// 点击下载弹出二维码
// $('.float_li').on('click', 'a', function(){
//     document.getElementById('light').style.display='block';
//     document.getElementById('fade').style.display='block';
// });
// $('.download_all').on('click', 'a', function(){
//     document.getElementById('light').style.display='block';
//     document.getElementById('fade').style.display='block';
// });