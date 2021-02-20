
	$(function(){	
			$(".game").hover(function(){
				$('.sub-nav li').show()
			},function(){
				$('.sub-nav li').hide()
			});
		var user = localStorage.getItem("userlogin")
		 if (user != null && user != "" ){
//		 	alert(555)
           var str ='	&nbsp <a  href ="#" style = "color:blue" onclick="logout()">退出</a>';
            $(".login").html(user + str )
		 }
		
		});
function logout(){
    	localStorage.removeItem("userlogin")
	window.location.reload()
}

function show2()
{
    var fcStr = '<div class="bgGrey alert" style="display: block;">';
    fcStr += '<div class="content" style="margin-top: 173.5px;">';
    fcStr += '<ul>';
    fcStr += '<li class="title">此功能需要下载客户端后<br>才能使用哦！</li>';
    fcStr += '<li class="pic">';
    fcStr += '<img src="images/book_img_qrcode.png" alt="">';
    fcStr += '</li>';
    fcStr += '<li>手机扫一扫下载</li>';
    fcStr += '</ul>';
    fcStr += '<span class="close" onclick="closeAlert()"></span>';
    fcStr += '</div></div>';

    $('body').prepend(fcStr);
}

function closeAlert()
{
    $(".alert").css('display', 'none');
}

// pc 移动端适配
function browserRedirect(url) {

    var sUserAgent = navigator.userAgent.toLowerCase();
    var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    var bIsMidp = sUserAgent.match(/midp/i) == "midp";
    var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
    var bIsAndroid = sUserAgent.match(/android/i) == "android";
    var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
    var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";

    if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {

        window.location.href = url;
    }
}

function isIOS(){

    if(navigator.userAgent.indexOf("Window")>0){

        return false;

    }else {

        return true;
    }
}

/**
 * [isMobile 判断平台]
 * @param test: 0:iPhone    1:Android
 */
function ismobile(test){
    var u = navigator.userAgent, app = navigator.appVersion;
    if(/AppleWebKit.*Mobile/i.test(navigator.userAgent) || (/Mac OS|MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(navigator.userAgent))){
        if(window.location.href.indexOf("?mobile")<0){
            try{
                if(/iPhone|mac|iPod|iPad/i.test(navigator.userAgent)){
                    return '0';
                }else{
                    return '1';
                }
            }catch(e){}
        }
    }else if( u.indexOf('iPad') > -1){
        return '0';
    }else{
        return '1';
    }
}

function converJpg(url)
{
    if(/webp-/i.test(url)) {
        return url.substring(0, url.indexOf('webp-')+5) + 'conj';
    }
    if(/webp/i.test(url)) {
        return url + '-conj';
    }
    return url;
}

