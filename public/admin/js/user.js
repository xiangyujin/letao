
$(function(){
  
    //1,渲染页面
    //全局变量,当前页,和每页的显示的条数
    var page=1;
    var pageSize=5;

    render();
  
    //2,启用与禁用 (点击,事件委托, 显示模态框, 发送请求(接口),传参,,成功后,关闭模态框,重新渲染)
    //接口参数
    var id;
    var isDelete;
     $("tbody").on("click",".btn",function(){
        
        //显示模态框
        $("#userModal").modal("show");
        //  console.log( "hah" );
        id=$(this).parent().data("id");
        // console.log( id );
        //执行的操作和当前的状态相反,传的参数页相反1正常,0不正常
        isDelete=$(this).hasClass("btn-success")?1:0;
        // console.log( isDelete );

     });

     
     $(".btn_confirm").on("click", function () {
        //发送ajax请求
        $.ajax({
          type: "post",
          url: "/user/updateUser",
          data: {
            id: id,
            isDelete: isDelete
          },
          success: function(info){
            if(info.success) {
              //隐藏模块框
              $("#userModal").modal('hide');
              //重新渲染
              render();
            }
          }
        })
      });




    function render(){
     
        //发送ajax请求,渲染页面
        $.ajax({
          type:"get",
          url:"/user/queryUser",
            data:{
                page:page,
                pageSize:pageSize
            },
            success:function(info){
             console.log( info );
             $("tbody").html( template("tpl",info));
             //渲染完成,做分页
             //分页分为三步,1.引包,2,html结构一个ul即可,3,调用js方法
                //分页的功能
        $("#paginator").bootstrapPaginator({
            bootstrapMajorVersion: 3,//指定bootstrap的版本
                 size:'small',//设置分页控件的大小
                 currentPage:page,//设置当前页,重要
                 totalPages:Math.ceil(info.total/info.size),//设置总页数,需要计算  重要
                 onPageClicked:function(a,b,c,p){   //点击分页项的时候的函数
                    page=p;    //当前页=点击的那一页
                    //重新渲染
                    render();
                 }

          });


            }

        })

  

    }




})