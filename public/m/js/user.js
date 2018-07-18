$(function(){

    //1. 动态渲染用户信息
    $.ajax({
      type: 'get',
      url: '/user/queryUserMessage',
      success: function(info){
        console.log(info);
        //1. 如果用户没有登录，跳转到登录页
        if(info.error) {
          location.href = "login.html";
        }
  
        //动态渲染内容,注意：不要判断  if(info.success)
        $(".userinfo").html( template("tpl", info) );
      }
    })
  
    //2. 退出登录的功能
    $(".btn_logout").on("click", function(){
      //发送ajax
      $.ajax({
        type: 'get',
        url: '/user/logout',
        success: function(info){
          if(info.success) {
            location.href = "login.html";
          }
        }
      });
    });
  
  
  });