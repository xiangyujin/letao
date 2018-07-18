$(function(){
    var search = location.search;
    console.log(search);
    console.log( search.indexOf("retUrl") );
   
    //1. 给登录按钮注册点击事件
    //2. 获取到用户名和密码  用户名和密码表单校验
    //3. 发送ajax请求，如果登录失败了，显示错误信息，成功了，跳转到？？？？？
    $(".btn_login").on("click", function(){
      var username = $("[name='username']").val();
      var password = $("[name='password']").val();
  
      if(!username) {
        mui.toast("请输入用户名");
        return;
      }
  
      if(!password) {
        mui.toast("请输入密码");
        return;
      }
  
      //发送ajax请求，进行登录
      $.ajax({
        type: 'post',
        url: '/user/login',
        data: {
          username: username,
          password: password
        },
        success: function(info) {
          //console.log(info);
          if(info.error) {
            mui.toast(info.message);
          }
  
          if(info.success) {
            //怎么办？页面跳转到哪儿？？？？
            //1. 如果是用户直接访问的登录页，登录成功应该去用户中心
            //2. 如果用户访问的商品详情页，登录成功应该返回商品详情页  ,retUrl
            //3. 如果用户访问了购物车页面，登录成功了应该返回购物车 ,retUrl
            //登录成功的时候，判断地址栏，是否有参数   retUrl
              //如果有这个参数，页面需要调回去，跳到retUrl对应的地址
              //如果没有这个参数，默认跳到用户中心 user.html
            //  获取地址栏中的参数部分  location.search
            var search = location.search;
            console.log(search  );
            if(search.indexOf("retUrl") != -1) {
              //跳回去
              location.href = search.replace("?retUrl=", "");
            }else {
              //没有，默认去用户中心
              location.href = "user.html";
            }
  
          }
        }
      })
  
    });
  });