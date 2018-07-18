$(function(){

    var page=1;
    var pageSize=5;
   render();
   //空数组用来存放图片
   var imgs=[]; 
     //2. 点击添加分类按钮
     $(".btn_add").on("click", function () {
      //2.1 显示模态框
      $("#addModal").modal('show');
  
  
      //2.2 发送ajax请求，获取到一级分类的数据
      $.ajax({
        type: 'get',
        url: '/category/querySecondCategoryPaging',
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
      console.log( id );
      //把id赋值给隐藏域
      $("[name='brandId']").val(id);
     
      //选择中,通过后,手动该样式,通过
      $("form").data("bootstrapValidator").updateStatus("brandId", "VALID")
   
  
     })
     
  
     //图片上传功能,插件
     //引包,input:file 指定name属性,和上传地址data-url
     //调用fileupload方法
  
     $("#fileupload").fileupload({
     
      done:function(e,data){
         //为了不让多传
         if(imgs.length===3){
            return;
         }

        //图片路径  
       console.log( data.result);

       //存入数组
        imgs.push(data.result);

        console.log( imgs );
         //显示图片
          //动态创建img,添加到img_box中
          $(".img_box").append('<img src="'+data.result.picAddr+'" width="100" height="100" alt="">');
         

         //  如果传入三张  让brandLogo校验通过,否则不通过
         if(imgs.length===3){
          $("form").data("bootstrapValidator").updateStatus("brandLogo", "VALID");
         }else{
          $("form").data("bootstrapValidator").updateStatus("brandLogo", "INVALID");
         }
        //  $("form").data("bootstrapValidator").updateStatus("brandLogo", "VALID");
      }
  
  
  
     })
  
  
    //5. 表单校验
    $("form").bootstrapValidator({
      fields: {

        brandId: {
          validators: {
            notEmpty: {
              message: '请选择二级分类'
            }
          }
        },
        proName: {
          validators: {
            notEmpty: {
              message: '商品名称不能为空'
            }
          }
        },
        proDesc: {
          validators: {
            notEmpty: {
              message: '商品描述不能为空'
            }
          }
        },
        num: {
          validators: {
            notEmpty: {
              message: '请输入商品的库存'
            },
            //正则
            regexp:{
              regexp:/^[1-9]\d{0,4}$/,
              message:"请输入正确的库存(1-9999)"

            }
          }

        },
        size: {
          validators: {
            // 数量 大于0，  99999  1-5  [1-9]4位  1  111
            notEmpty: {
              message: '请输入商品的尺码'
            },
            //正则校验  xx-xx
            regexp: {
              regexp: /^\d{2}-\d{2}$/,
              message: '请输入正确的尺码(xx-xx)'
            }
          }
        },
        oldPrice: {
          validators: {
            notEmpty: {
              message: '请输入商品的原价'
            }
          }
        },
        price: {
          validators: {
            notEmpty: {
              message: '请输入商品的价格'
            }
          }
        },
        brandLogo: {
          validators: {
            notEmpty: {
              message: '请上传三张品牌的图片'
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
      //接口要求要,在参数的后面,数组里面的名称和地址的参数
       var param=$("form").serialize();

       param+="&picName1="+imgs[0].picName+"$picAddr1="+imgs[0].picAddr;
       param+="&picName2="+imgs[1].picName+"$picAddr2="+imgs[1].picAddr;
       param+="&picName3="+imgs[2].picName+"$picAddr3="+imgs[2].picAddr;


      $.ajax({
       type:"post",
       url:"/product/addProduct",
       data:param,
       success:function(info){
             console.log( info );
             if(info.success){
                 $("#addModal").modal("hide");
                 page=1;
                 render();
                 $("form").data("bootstrapValidator").resetForm(true);
                 $(".dropdown-text").text("请选择一级分类");
                //  清空图片
                 $(".img_box img").remove();
                 //清空数组
                 imgs=[];
             }
  
       }
  
  
      })
  
  
   })
  
  
  
  
  
      function render() {
          //发送ajax请求
          $.ajax({
            type: 'get',
            url: '/product/queryProductDetailList',
            data: {
              page: page,
              pageSize: pageSize
            },
            success: function (info) {
              console.log(info);
              $("tbody").html(template("tpl", info));
      
              $("#paginator").bootstrapPaginator({
                bootstrapMajorVersion: 3,
                currentPage: page,
                totalPages: Math.ceil(info.total / info.size),

             //type 代表每个按钮 ,page,按钮指向那一页,current当前页
                  //控制每个按钮显示的文字,通过返回值来控制
          //每个按钮都会执行一次itemText函数，返回值就是这个按钮的内容
          //按钮显示的文字itemTexts
          itemTexts: function (type, page, current) {
            //console.log(type, page, current);
            switch (type) {
              case "first":
                return "第一页";
              case "prev":
                return "上一页";
              case "next":
                return "下一页";
              case "last":
                return "最后一页";
              case "page":
                return page+"页";
            }
          },
          //按钮提示信息tooltipTitles
          tooltipTitles: function(type, page, current) {
            switch (type) {
              case "first":
                return "第一页";
              case "prev":
                return "上一页";
              case "next":
                return "下一页";
              case "last":
                return "最后一页";
              case "page":
                return page+"页";
            }
          },
          //内置的提示信息BootstrapTooltip,默认false
          useBootstrapTooltip:true,
           //配置参数
          // bootstrapTooltipOptions: {
          //   placement:"bottom"  //提示向下,默认向上
          // },
                onPageClicked: function (a, b, c, p) {
                  page = p;
                  render();
                }
              });
      
            }
          });
        }
  
  
  })