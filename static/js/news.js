var apihost = 'http://47.110.243.66:8082/ucenter/api/zrjh/';
var newsList = [
	{
		id:'zr12001',
		title: '大肥喵10年后再隆重回归《加菲猫》新添动画剧集',
		create_time: '2019-08-06',
		fee: 2
	},{
		id:'zr12002',
		title: '《Fate》HF线剧场版第三章首曝海报 超带感',
		create_time: '2019-08-03',
		fee: 1
	},{
		id:'zr12003',
		title: '《星期一的伤心》：妹子上班图求点赞 还等什么',
		create_time: '2019-08-02',
		fee: 1
	},{
		id:'zr12004',
		title: '“十二生肖的高达”原画发出 大河原邦男专为中国而来',
		create_time: '2019-07-31',
		fee: 1
	},{
		id:'zr12005',
		title: '《宅男腐女恋爱真难》定妆照 漫改电影又一杰作',
		create_time: '2019-07-30',
		fee: 1
	},{
		id:'zr12006',
		title: '《食戟之灵》又变狗血番？惊人的身世曝光',
		create_time: '2019-07-30',
		fee: 1
	},{
		id:'zr12007',
		title: '《抢个道爷当娘子》漫画今夏开更 古风国漫不容错过',
		create_time: '2019-07-26',
		fee: 1
	},{
		id:'zr12008',
		title: '真人电影《东京喰种2》新剧照 变态月山压迫力满点',
		create_time: '2019-07-24',
		fee: 1
	},{
		id:'zr12009',
		title: '《一拳超人》重制漫画暂停更新 村田雄介：要休息',
		create_time: '2019-07-15',
		fee: 1
	}
]

var isLogin = localStorage.getItem('isLogin') && localStorage.getItem('username');
var isPay = false;
var canDown = false;
var mainExpression = $('.only-expression');
$(function(){
    setNews();
    var moveHeight = 350,
        moveTime = 200,
        curMove = null;  
    $('.only-expression').on("click", ".down_btn_a", function() {
        if(isLogin){
            getPayStatus(this);
        }else{
			var amount = $(this).attr('data-fee');
			$('#currentFee').text(amount);
			$('.amountLayer').css({'display':'flex'});
            // alert('请先登录哦~');
			// window.location.href = 'login.html';
        }
    });    

});
function goLogin(){
	window.location.href = 'login.html';
}
function goRegister(){
	window.location.href = 'register.html';
}

function setNews(){
    if(!newsList.length){
        return false;
    }
    mainExpression.empty();
    $(newsList).each(function(index, item){
        
        var liShow = '<div class="news-item down_btn_a" data-id="'+item.id+'" data-fee="'+item.fee+'">'+
            '<a href="javascript:void(0)">'+
				'<p>'+item.title+'<span>付费阅读：'+ item.fee +'元/篇</span></p>'+
            	// '<p>'+item.title+'<span>'+ item.create_time +'</span></p>'+
				// '<p>'+item.title+'<i>[支付'+ item.fee +'元查看详情]</i><span>'+ item.create_time +'</span></p>'+
            '</a>'+
        '</div>';
        mainExpression.append(liShow);
    });
}


//点击时判断是否支付
function getPayStatus(e){
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