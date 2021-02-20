var flag = {
  email: false,
  username: false,
  zname: false,
  password: false,
  confirm: false,
  phone: false,
  id: false
};
var apihost = 'http://47.110.243.66:8082/ucenter/api/zrjh/';
$(function() {
  // email验证
  $("#user_mail").blur(function() {
    var email = $(this).val();

    var pattern = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    if (!pattern.test(email)) {
      // $("#email\\.info").html("Email格式不正确");
      flag.email = false;
      return;
    } else {
      // $("#email\\.info").html("");
      flag.email = true;
    }

    // 邮箱重复校验
  });

  //   $("#txtUserName").blur(function () {
  //     // 用户名校验
  //     var username = $(this).val();

  //     // 校验规则，可调整
  //     var pattern = /\b(^['A-Za-z0-9]{6,20}$)\b/;
  //     if (!pattern.test(username)) {
  //       flag.username = false;
  //       return;
  //     } else {
  //       flag.username = true;
  //     }
  //   });
  // 手机号码验证
  $("#phone").blur(function() {
    var phone_num = $(this).val();

    var pattern = /^1[34578]\d{9}$/;
    if (!pattern.test(phone_num)) {
      // $("#user_mobile\\.info").html("请输入正确的手机号码");
      flag.phone = false;
      return;
    } else {
      // $("#user_mobile\\.info").html("");
      flag.phone = true;
      return;
    }
  });
  $("#txtUserZName").blur(function() {
    // 用户名校验
    var userzname = $(this).val();

    if (userzname.length == 0) {
      // $("#user_zname\\.info").html("请输入真实姓名");
      flag.zname = false;
      return;
    } else {
      // $("#user_zname\\.info").html("");
      flag.zname = true;
    }
  });

  $("#txtNickName").blur(function() {
    // 昵称校验
    var nickname = $(this).val();

    // 校验规则，可调整
    var pattern = /\b(^['A-Za-z0-9]{4,20}$)\b/;
    if (!pattern.test(nickname)) {
      // $("#nickname\\.info").html("昵称不合法");
      flag.false = true;
      return;
    } else {
      // $("#nickname\\.info").html("");

      flag.nickname = true;
      return;
    }
  });

  // 密码校验
  $("#txtPassword").blur(function() {
    var password = $(this).val();

    var pattern = /\b(^['A-Za-z0-9]{6,20}$)\b/;
    if (!pattern.test(password)) {
      // $("#password\\.info").html("密码不可以小于6个字符，大于20个字符");
      flag.password = false;
      return;
    } else {
      // $("#password\\.info").html("");
      flag.password = true;
      return;
    }
  });

  // 密码重复校验
  $("#txtRepeatPass").blur(function() {
    var repeatPass = $(this).val();

    var pattern = /\b(^['A-Za-z0-9]{4,20}$)\b/;
    if (repeatPass != $("#txtPassword").val()) {
      // $("#repeatPass\\.info").html("两次密码输入不一致");
      flag.confirm = false;
      return;
    } else {
      // $("#repeatPass\\.info").html("");
      flag.confirm = true;
      return;
    }
  });

  // 身份证验证
  $("#txtcard").blur(function() {
    var password = $(this).val();

    var pattern = /\b(^['A-Za-z0-9]{18,18}$)\b/;
    if (!pattern.test(password)) {
      // $("#id_card\\.info").html("身份证格式不正确");
      flag.id = false;
      return;
    } else {
      // $("#id_card\\.info").html("");
      flag.id = true;
      return;
    }
  });
});

function myCheck(e) {
  //   if(!flag.username){
  //     alert('用户名不合法！');
  //     e.preventDefault();
  //     window.event.returnValue = false;
  //     return;
  //   }
  if (!flag.phone) {
    alert("请输入正确的手机号码作为用户账号！");
    e.preventDefault();
    window.event.returnValue = false;
    return;
  }
//   if (!flag.zname) {
//     alert("请输入真实姓名！");
//     e.preventDefault();
//     window.event.returnValue = false;
//     return;
//   }
//   if (!flag.id) {
//     alert("身份证格式不正确！");
//     e.preventDefault();
//     window.event.returnValue = false;
//     return;
//   }
  if (!flag.password) {
    alert("密码不可以小于6个字符，大于20个字符");
    e.preventDefault();
    window.event.returnValue = false;
    return;
  }

  if (!flag.confirm) {
    if ($("#txtRepeatPass").val() == "") {
      alert("确认密码不能为空！");
      e.preventDefault();
      window.event.returnValue = false;
      return;
    } else if ($("#txtRepeatPass").val() != $("#txtPassword").val()) {
      alert("两次密码不一致！");
      e.preventDefault();
      window.event.returnValue = false;
      return;
    }
  }

//   if (!flag.email) {
//     alert("请输入正确的邮箱！");
//     e.preventDefault();
//     window.event.returnValue = false;
//     return;
//   }
  if (!validate()) {
    return false;
  }
  //   var ok = flag.username && flag.password && flag.confirm && flag.id && flag.phone && flag.zname;
  var ok = flag.password && flag.confirm && flag.phone;
  if (ok == false) {
    alert("请正确填写用户信息！");
    e.preventDefault();
    window.event.returnValue = false;
    return;
  } else {
    // var username = $("#txtUserName").val();
    var phone_num = $("#phone").val();
    // var code = $("#user_code").val();
    var pwd = $("#txtPassword").val();
    $.ajax({
      url: apihost+'register',
      type: "get",
      dataType: "json",
      data: "phone_num=" + phone_num + "&password=" + pwd,
      //  data:  {"orderId":"55","commant":"99"},
      success: function(res) {
        if (res.status == 0) {
          alert("注册成功,请登录！");
          window.location.href = "./login.html";
        } else if (res.status == 10000) {
          alert("该用户已经注册！");
        } else {
          alert(res.msg);
        }
      }
    });
  }
}

var countdown = 60;
function sendemail() {
  var email = $("#user_mail").val();
  $.ajax({
    url: "/tt/index.php/Index/reg",
    type: "post",
    dataType: "html",
    data: "email=" + email,
    //  data:  {"orderId":"55","commant":"99"},
    success: function(res) {}
  });
  var obj = $("#btn_mail");
  settime(obj);
}
function settime(obj) {
  //发送验证码倒计时
  if (countdown == 0) {
    obj.attr("disabled", false);
    //obj.removeattr("disabled");
    obj.val("免费获取验证码");
    countdown = 60;
    return;
  } else {
    obj.attr("disabled", true);
    obj.val("重新发送验证码(" + countdown + ")");
    countdown--;
  }
  setTimeout(function() {
    settime(obj);
  }, 1000);
}

//设置一个全局的变量，便于保存验证码
var code;
function createCode() {
  //首先默认code为空字符串
  code = "";
  //设置长度，这里看需求，我这里设置了4
  var codeLength = 4;
  var codeV = document.getElementById("code_show");
  //设置随机字符
  var random = new Array(
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z"
  );
  //循环codeLength 我设置的4就是循环4次
  for (var i = 0; i < codeLength; i++) {
    //设置随机数范围,这设置为0 ~ 36
    var index = Math.floor(Math.random() * 36);
    //字符串拼接 将每次随机的字符 进行拼接
    code += random[index];
  }
  //将拼接好的字符串赋值给展示的Value
  codeV.value = code;
}

//下面就是判断是否== 的代码，无需解释
function validate() {
  var oValue = document.getElementById("user_code").value.toUpperCase();
  if (oValue == 0) {
    alert("请输入验证码");
    return false;
  } else if (oValue != code) {
    alert("验证码不正确，请重新输入");
    oValue = " ";
    createCode();
    return false;
  } else {
    return true;
  }
}

//设置此处的原因是每次进入界面展示一个随机的验证码，不设置则为空
window.onload = function() {
  createCode();
};
