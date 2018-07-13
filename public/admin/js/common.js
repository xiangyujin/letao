//二级菜单的显示与隐藏
//含有second类,就是拥有二级菜单,给二级菜单元素的上一个a,元素注册点击事件
$(".second").prev().on("click",function(){
 
    $(this).next().slideToggle();
})


//侧边栏的显示与隐藏

$(".icon_menu").on("click",function(){

     console.log( "aaa" );
    $("body").toggleClass("active");
    $(".lt_aside").toggleClass("active");
})


//退出
//1,点击退出图标按钮,退出框显示
$(".icon_logout").on("click",function(){
    console.log( "bbb" );
  
    $("#logoutModal").modal("show");

})

//2,点击退出框的按钮,退出,发送ajax请求,接口文档处理

$(".btn_logout").on("click",function(){

    $.ajax({
        type: 'get',
        url: '/employee/employeeLogout',
        success: function(info){
          if(info.success) {
            location.href = "login.html";
          }
        }
      });


})

//跳转页面进度条
//添加这个到有AJAX调用的地方！绑定到 jQuery ajaxStart 和 ajaxComplete 事件上。文档说的
//NProgress.start()
//NProgress.done()

$(document).ajaxStart(function () {
    //ajax请求之前
    NProgress.start();
  });


$(document).ajaxStop(function(){
   
    setTimeout(function () {
        //ajax请求之后
        NProgress.done();
      }, 1000);

})


