$(function(){

 //先发送请求,渲染一级分类

 $.ajax({
   
    type:"get",
    url:"/category/queryTopCategory",
    success:function(info){
    
        console.log( info );
        $(".category_left ul").html( template( "tpl1",info ) );

        //右边上来默认渲染第一个
        renderSeond(info.rows[0].id);
    }

 })

 

 //渲染右边的二级分类,需要id ,刚进来就要渲染,默认的一级分类的第一个,所以封装一个函数
  

  function renderSeond(id){
    
     $.ajax({
      type:"get",
      url:"/category/querySecondCategory",
      data:{
          id:id
      },
      success:function(info){
      
          console.log( info );
          //渲染右边的

          $(".category_right ul").html( template( "tpl2",info ) );

      }


     })


  }

//    //试试
//    renderSeond(2); //可以的


//  左边一级分类的点击事件(委托),点击时,高亮,用id,渲染对应的右边
  
$(".category_left ul").on("click","li",function(){
     
    // 排他
    $(this).addClass("now").siblings().removeClass("now");
    console.log( "点击了" );

    var id=$(this).data("id");
    console.log( id );
    renderSeond(id);


})


})