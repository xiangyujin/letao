$(function(){
   
    var page=1;
    var pageSize=5;
    render();

   //添加分类 显示模态框,输入内容, 校验,图标, ,发送请求categoryName接口参数,
     
   $(".btn_add").on("click",function(){
    $("#addModal").modal('show');
   })
   
     //2. 表单校验的功能
  $("form").bootstrapValidator({
      //字段
    fields: {
        //要校验的name属性
      categoryName: {
        validators: {
          notEmpty: {
            message: '一级分类的名称不能为空'
          }
        }
      }
    },
    //配置小图标的规则
    feedbackIcons: {
      valid: 'glyphicon glyphicon-thumbs-up',
      invalid: 'glyphicon glyphicon-thumbs-down',
      validating: 'glyphicon glyphicon-refresh'
    }
  });
   
  //3. 给表单注册校验成功事件，阻止表单的默认提交，改用ajax提交

   $("form").on("success.form.bv",function(e){
           console.log( "啊啊啊啊" );
     e.preventDefault();//阻止表单默认提交
      $.ajax({
        type: 'post',
        url: '/category/addTopCategory',
        data: $("form").serialize(),
        success: function (info) {
          //console.log(info);
          if (info.success) {
            //成功的时候，
            //1. 隐藏模块框
            $("#addModal").modal("hide");
            //2. 渲染页面,重新渲染第一页
            page = 1;
            render();
  
            //3. 重置表单
            // $("form").data("bootstrapValidator").resetForm(true);
            $("form").data("bootstrapValidator").resetForm(true);
          }
        }
      })
   })



    
    function render() {
        //发送ajax请求
        $.ajax({
          type: 'get',
          url: '/category/queryTopCategoryPaging',
          data: {
            page: page,
            pageSize: pageSize
          },
          success: function (info) {
            console.log(info);
            $("tbody").html(template("tpl", info));
    
            //分页
            $("#paginator").bootstrapPaginator({
              bootstrapMajorVersion: 3,
              currentPage: page,
              totalPages: Math.ceil(info.total / info.size),
              onPageClicked: function (a, b, c, p) {
                //渲染p对应的页面即可
                page = p;
                render();
              }
            });
    
          }
        });
      }


})