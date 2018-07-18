$(function(){

 //一,下拉刷新  ,列表渲染
 mui.init({
    pullRefresh : {
      container:".mui-scroll-wrapper",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
      down : {
        style:'circle',//必选，下拉刷新样式，目前支持原生5+ ‘circle’ 样式
        color:'#2BD009', //可选，默认“#2BD009” 下拉刷新控件颜色
        height:'50px',//可选,默认50px.下拉刷新控件的高度,
        range:'100px', //可选 默认100px,控件可下拉拖拽的范围
        offset:'0px', //可选 默认0px,下拉刷新控件的起始位置
        auto: true,//可选,默认false.首次加载自动上拉刷新一次
         //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
        callback :function(){
          
            //发送aja
            $.ajax({
            type:"get",
            url:"/cart/queryCart",
            success:function(info){
           
                 console.log( info );
               setTimeout(function(){
                console.log( info );
                //没有登录去登录
                if(info.error){
                    //去登录,retUrl=,登录成功跳转回来
                    location.href="login.html?retUrl="+location.href;

                }
               //渲染

               $("#OA_task_2").html(template("tpl",{list:info}));
                
               //关闭下来刷新
               mui(".mui-scroll-wrapper").pullRefresh().endPulldownToRefresh();

               },1000)
            }


            })

        }
       
      }
    }
  });

   
  //二,删除,点击,事件委托(tap),获取id,发送请求,渲染(下拉)

  $("#OA_task_2").on("tap",".btn_delete",function(){
     
    // console.log( "aaa" );
    var id=$(this).data("id");
    // console.log( id );
    //提示框
    mui.confirm("你是否要删除这件商品", "温馨提示", ["否", "是"], function(e){
         
        if(e.index===1){
        
            $.ajax({
       
                type:"get",
                url:"/cart/deleteCart",
                data:{
                    id:id
                },
               success:function(info){
             
                  console.log( info );
                  //下拉刷新
                  if(info.success) {
                    //下拉一次
                    mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();
                  }
        
               }
            })

        }

   })

  })

  //三,计算总金额,拿单价*数量,值赋值给总金额的内容,拿到所有的被选中单选框,得到一个数组,遍历,给单选框注册change事件,点击有延迟不行


  $("#OA_task_2").on("change", ".ck", function(){
    // console.log( "bb" );
    // console.log( $(".ck:checked"));
      var total=0;
    $(".ck:checked").each(function(){

        var price=$(this).data("price");
        var num=$(this).data("num");
        console.log( price,num );
        total+=price*num;
    })
    console.log( total );
   //保险起见,总金额,保留两位小数  toFixed(2);
   $(".lt_order span").text(total.toFixed(2));
  })


   //四,修改,点击,显示提示框,提示框中显示当前的商品信息,有模板,需要的参数在自定义中属性中
   //修改,获得数据,发送请求,下拉刷新,
    
   $("#OA_task_2").on("tap",".btn_edit",function(){

    //  console.log( "aaa" );
    //dataset 原生,会把所有data自定义属性,放到一个对象中,
     var data=this.dataset;
     console.log( data );
      var html=template("tpl2",data);
      console.log( html );
      //去掉模板里面所有的换行  /\n/g  g,全局,/\n/正则
      html=html.replace(/\n/g,"");
      console.log( html );
      mui.confirm(html,"温馨提示", ["确定", "取消"],function(e){
       if(e.index===0){
          //点击确定发送请求
          var id=data.id;
          var size=$(".proSize span.active").text();
          var num=$(".mui-numbox-input").val();
        //   console.log( id,size,num );
        $.ajax({

          type:"post",
          url:"/cart/updateCart",
          data:{
              id:id,
              size:size,
              num:num
          },

          success:function(info){
            console.log( info );
            //info.success,为true,
            if(info.success){
                mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();
            }
          }

        })

 
       }

      })
    
      //在,回显数据后,已经渲染了,能够点击选择尺码.和数量
      //选择尺码
      $(".proSize span").on("click",function(){

        $(this).addClass("active").siblings().removeClass("active");

      })

      //选择数量,mui 组件方法
      mui(".mui-numbox").numbox();



   })



})