var countdown = 60;
$(function(){
    $('#showCount').hide();
});

$('.header').on('click', '#login', function(){
    console.log('show login');
    $('.isLogin').removeClass('hidden');
});

$('body').on('click', '#closeLogin', function(){
    $('.isLogin').addClass('hidden');
    // countdown = 60;
});

//发送验证码
$('body').on('click', '#toCaptcha', function(){
    var obj1 = this;
    var telephone = $('#telephone').val();
    if (!telephone) {
        toast('请输入手机号码！');
        return false;
    }
    if (!/^1[3456789]\d{9}$/.test(telephone)) {
        toast('请输入正确手机号码!');
        return false;
    }
    //请求获取验证码方法
    // getSMSCode();
    countdown = 60;
    function codeTimeout(obj){
        if(countdown == 0){
            $('#showCount').hide();
            $('#toCaptcha').show();
            $(obj).attr('disabled', false);
            $(obj).text('短信验证码');
            countdown = 60;
        }else{
            $(obj).attr('disabled', true);
            // $(obj).text('('+countdown+'s)后重新获取');
            $('#showCount').show();
            $('#showCount').attr('disabled', true);
            $('#toCaptcha').hide();
            $('#showCount').text(countdown+'s后重发');
            countdown--;
            setTimeout(function(){
                codeTimeout(obj1); 
            }, 1000);
        }
    }
    codeTimeout(obj1);
    
});

//登录
$('body').on('click', '#loginRequest', function(){
    var telephone = $('#telephone').val();
    var smsCode = $('#smsCode').val();
    if (!telephone) {
        toast('请输入手机号码！');
        return false;
    }
    if (!/^1[3456789]\d{9}$/.test(telephone)) {
        toast('请输入正确手机号码!');
        return false;
    }
    // if (!smsId) {
    //     alert('请点击获取验证码！');
    //     return false;
    // }
    if (!smsCode) {
        toast('请输入验证码！');
        return false;
    }
    //调用登录接口
    // loginRequest(smsCode, smsId);
    toast('登录成功');
    $('.isLogin').addClass('hidden');
});