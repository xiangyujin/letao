$(function(){

  var page=1;
  var pageSize=5;
 render();

   //2. 点击添加分类按钮
   $(".btn_add").on("click", function () {
    //2.1 显示模态框
    $("#addModal").modal('show');


    //2.2 发送ajax请求，获取到一级分类的数据
    $.ajax({
      type: 'get',
      url: '/category/queryTopCategoryPaging',
      data: {
        page: 1,
        pageSize: 100
      },
      success: function (info) {
        console.log(info);
        $(".dropdown-menu").html(template("tpl2", info));
      }
    })
  });
   
  //(总共添加时需要四个参数 品牌名称 brandName,所属分类id,categoryId,
  //一级分类下拉选项,品牌logo图片地址,brandLogo,火热的品牌,hot自定义)
  //3.dropdown-menu 事件委托,获取a id,把id值赋值给隐藏域的标签
   $(".dropdown-menu").on("click","a",function(){
    
    //  console.log( "aaa" );
    // 获取a的内容给span
    $(".dropdown-text").text($(this).text());
    //获取id
    var id = $(this).data("id");
    // console.log( id );
    //把id赋值给隐藏域
    $("[name='categoryId']").val(id);
   
    //选择中,通过后,手动该样式,通过
    $("form").data("bootstrapValidator").updateStatus("categoryId", "VALID")
 

   })
   

   //图片上传功能,插件
   //引包,input:file 指定name属性,和上传地址data-url
   //调用fileupload方法

   $("#fileupload").fileupload({
   
    done:function(e,data){
      //图片路径  
     console.log( data.result.picAddr );
       //显示图片
     $(".img_box img").attr("src", data.result.picAddr);
     
       // 把图片地址设置给隐藏的表单，才能发送到后台 ,路径参数
      $("[name='brandLogo']").val( data.result.picAddr);

       // 让brandLogo校验通过
       $("form").data("bootstrapValidator").updateStatus("brandLogo", "VALID");
    }



   })


  //5. 表单校验
  $("form").bootstrapValidator({
    fields: {
      categoryId: {
        validators: {
          notEmpty: {
            message: '请选择一级分类'
          }
        }
      },
      brandName: {
        validators: {
          notEmpty: {
            message: '二级分类的名字不能为空'
          }
        }
      },
      brandLogo: {
        validators: {
          notEmpty: {
            message: '请上传一张品牌的图片'
          }
        }
      }

    },
    //配置不做校验的类型
    excluded:[],
    //配置小图标的规则
    feedbackIcons: {
      valid: 'glyphicon glyphicon-thumbs-up',
      invalid: 'glyphicon glyphicon-thumbs-down',
      validating: 'glyphicon glyphicon-refresh'
    }
  });

 //给表单注册校验成功事件
  
 $("form").on("success.form.bv",function(e){

   //阻止默认表单提交
    e.preventDefault();
    $.ajax({
     type:"post",
     url:"/category/addSecondCategory",
     data:$("form").serialize(),
     success:function(info){
           console.log( info );
           if(info.success){
               $("#addModal").modal("hide");
               page=1;
               render();
               $("form").data("bootstrapValidator").resetForm(true);
               $(".dropdown-text").text("请选择一级分类");
               $(".img_box img").attr("src", "images/none.png");
           }

     }


    })


 })





    function render() {
        //发送ajax请求
        $.ajax({
          type: 'get',
          url: '/category/querySecondCategoryPaging',
          data: {
            page: page,
            pageSize: pageSize
          },
          success: function (info) {
            // console.log(info);
            $("tbody").html(template("tpl", info));
    
            $("#paginator").bootstrapPaginator({
              bootstrapMajorVersion: 3,
              currentPage: page,
              totalPages: Math.ceil(info.total / info.size),
              onPageClicked: function (a, b, c, p) {
                page = p;
                render();
              }
            });
    
          }
        });
      }


})