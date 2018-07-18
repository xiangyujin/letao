$(function(){
   
  var page = 1;
  var pageSize = 10;
    //1,把传过来的参数key的值,赋值给搜索框,
     
    var key=getSearch().key;
    $(".search_input").val(key);
     render();
    //2,渲染,渲染要封装

    

    //3,点击搜索,获取搜索框的值,跳转页面,地址栏拼接参数和值
      
     $(".search_btn").on("click",function(){
    
        var val=$(".search_input").val();
       window.location.href="searchList.html?key="+val;

     })
   
      
     //4-1,点击排序,先完成样式层面,点击价格,库存是高亮,排他,箭头和点击前相反,其他的箭头向下

      $(".lt_sort li[data-type]").on("click",function(){

            //  console.log( "aaa" );
            if( $(this).hasClass("now") ){

              //有这个类  箭头相反
              $(this).find(".fa").toggleClass("fa-angle-down").toggleClass("fa-angle-up");


            }else{

                //排他

                $(this).addClass("now").siblings().removeClass("now");
                //箭头向下
                $(".lt_sort .fa").removeClass("fa-angle-up").addClass("fa-angle-down");
            }

            render();

      })
   
        
       function render(){

        //把参数放到对象里

        var obj={
          
          page:page,
          pageSize:pageSize,
          proName:key
        }
         //被选中的li 
        var $checked=$(".lt_sort li.now");

        if($checked.length===1){
            
          var type=$checked.data("type");
          //找到箭头 down 向下就是降序,传2
          var value=$checked.find(".fa").hasClass("fa-angle-down")?2:1;
          console.log( type,value );
          //参数对象中传入第四个参数
          obj[type]=value;
        
           console.log( obj+"啊啊" );
          
        }

        //发送ajax
        $.ajax({
            
          type:"get",
          url:"/product/queryProduct",
          data:obj,

          success:function(info){
     
           console.log( info );

            $(".lt_product").html(template("tpl", info));

          }



        })




       }

       
 
      //注意,这个先放着,自己还要自己封装
      //要求：可以获取到地址栏的参数，并且封装成一个函数
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


})