$(function(){
     //1,先渲染
    render();

  //2,点击搜索时,把文本框里的值存入数组,然后存入localStorage中,再渲染

   $(".search_btn").on("click",function(){
    
    //   console.log( "aaaa" );
      var val=$(".search_input").val();
    //   console.log( val );
    //为空提示
      if(val==""){
          
        // alert("空内容");
        //友好的提示
        mui.toast("请输入搜索的内容");
        return;

      } 

      var history=getHistory();
    //把val存到数组中
    //要求1： 最多能存10条，如果超过，把最早的删除
    //要求2：不能重复（先判断是否存在，如果存在，删除， 再增加）
    //先去重,在判断最多

      //找到 val 新添加的在数组里的下表,!=-1,就是存在,-1不存在
       
      var index=history.indexOf(val);
    //   console.log( index );
     
     if(index != -1){
         
        history.splice(index, 1);

        // console.log( history );
     }

    if( history.length>9 ){
     
         history.pop();
    }

      history.unshift(val);
      //存放到localStorage中

      localStorage.setItem("hcc_history",JSON.stringify(history));
    //   console.log( history );
      render();
    //   $(".search_input").val("");
      //跳转到列表页
       location.href="searchList.html?key="+val;

   })


   //3,点击清空,把localStorage里的hcc_histoyr 这个key删除即可
    
   $(".lt_histoyr").on("click",".btn_empty",function(){
    //    console.log( "aaa" );
     //引用组件,温馨提示    //参数:1提示信息,2标题,3数组, 
     mui.confirm("您确定要清除吗?","温馨提示",["否","是"],function(e){
             //数组第一个,index=0;第二个index=1;  
        //   console.log( e.index );
        if( e.index===1 ){
          localStorage.removeItem("hcc_history");
          render();
        }
 
     })

   })


   //4,点击叉,单独删除当前项,获取存的index ,在数组里去除,再存到localStorage
    
   $(".lt_histoyr").on("click",".btn_delete",function(){
    //    console.log( "aaa" );
     //引用组件,温馨提示    //参数:1提示信息,2标题,3数组, 

      var index=$(this).data("index");
    //   console.log( index );
     mui.confirm("您确定要删除吗?","温馨提示",["否","是"],function(e){
             //数组第一个,index=0;第二个index=1;  
        //   console.log( e.index );
        if( e.index===1 ){
           
            var history=getHistory();
            history.splice(index,1);
            localStorage.setItem("hcc_history",JSON.stringify(history));
            render();
        }
 
     })

   })











    function getHistory() {
        var result = localStorage.getItem("hcc_history");
     
        // console.log( result );
        //JSON.parse(str) 把字符串转换成数组,如果为空,就是一个空的数组
        return JSON.parse(result) || [];
      }
   
      //封装渲染

      function render(){
        //localStorage内容的数组
        var history=getHistory();
        // console.log(  {list:history} );
         // 渲染
         $(".lt_histoyr").html( template("tpl",{list:history}));

      }

    
    
})