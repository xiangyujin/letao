$(function () {

    //功能一： 获取数据，渲染页面
    //1. 获取到页面传递过来的id值
    //2. 发送ajax请求，获取到商品的详细数据
    //3. 结合模版引擎动态渲染
    
    var id = getSearch().id;   //搜索列表中的,立即购买中,a标签中地址栏中拼接的id
    $.ajax({
      type: 'get',
      url: '/product/queryProductDetail',
      data: {
        id: id
      },
      success: function (info) {
        console.log(info);
        $(".mui-scroll").html(template("tpl", info));
  
        //重新初始化页面中轮播图
        mui(".mui-slider").slider({
          interval: 2000
        });
  
        //重新初始化数字输入框
        mui(".mui-numbox").numbox();
  
  
        //商品尺码的选择功能
        $(".lt_size span").on("click", function () {
          $(this).addClass("active").siblings().removeClass("active");
        });
  
  
      }
    });
  
  
    //功能二：加入购物车的功能
    //1. 给加入购物车的按钮注册点击事件
    //2. 发送ajax请求， productId   num  size
    $(".btn_add_cart").on("click", function(){
      var num = $(".mui-numbox-input").val();
      var size = $(".lt_size span.active").text();

      console.log( num, size );
  
      //校验
      if(!size) {
        mui.toast("请选择尺码");
        return;
      }
  
      //发送ajax请求
      $.ajax({
        type: 'post',
        url: '/cart/addCart',
        data: {
          productId: id,
          num: num,
          size: size
        },
        success: function(info) {
            console.log( info );
          //成功的时候，有两种情况
          //1. 如果没有登录，添加购物车会失败
          //2. 如果登录了，添加购物车就成功了
          if(info.error) {
            mui.confirm("亲，你还没有登录哦,是否要进行登录呀?", "温馨提示", ["否", "是"], function(e){
              if(e.index === 1){
                  //去.登录,登录的时候能够回来  location.href当前的地址 
                //希望登录成功了，还能够跳回来  retUrl=当前的地址  ,列表详情页
                location.href = "login.html?retUrl="+location.href;
              }
            });
          }
  
          if(info.success) {
            mui.confirm("亲，恭喜你加入购物车成功!!", "温馨提示", ["继续浏览", "去购物车"], function(e){
              if(e.index === 1){
                location.href = "cart.html";
              }
            });
          }
        }
      })
    });
  
   

    function getSearch() {
        var obj = {};
        //1. 获取到地址栏中的参数部分
        var search = location.search;
        //2. 需要对地址栏的参数进行解码
        search = decodeURI(search);
        //3. 把?截取掉
        search = search.slice(1);
        var arr = search.split("&");
        arr.forEach(function (item) {
          var k = item.split("=")[0];
          var v = item.split("=")[1];
          obj[k] = v;
        });
        return obj;
      }


  });