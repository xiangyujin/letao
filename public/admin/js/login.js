$(function(){

    //登录页面的js处理
    //1,表单校验 bootstrapValidator 引入这个插件
    //使用表单校验插件
    $("form").bootstrapValidator({
        //配置校验的规则，根据表单中的name属性
        //字段
        fields:{
          //username的校验的规则
          username: {
            //username所有的校验
            validators: {
              notEmpty: {
                message: "用户名不能为空"
              },
              stringLength: {
                min:3,
                max:6,
                message: "用户名长度必须是3-6位"
              },
              callback: {
                message: "用户名不存在"
              }
            }
          },
          //password的校验规则
          password: {
            validators: {
              notEmpty: {
                message:"密码不能为空"
              },
              stringLength: {
                min: 6,
                max:12,
                message: "用户密码长度必须是6-12"
              },
              //callback校验没有规则
              callback: {
                message: "密码错误"
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

      //2,给表单注册一个校验成功的事件,在成功了后,发送ajax 请求,参考请求接口文档
       //当表单校验成功时，会触发success.form.bv事件，此时会提交表单，这时候，通常我们需要禁止表单的自动提交，使用ajax进行表单的提交。
      $("form").on('success.form.bv', function (e) {
          //阻止浏览器的默认跳转行为
        e.preventDefault();
        //使用ajax提交逻辑
         $.ajax({
          type:"post",
          url:"/employee/employeeLogin",
          data:$("form").serialize(),//表单序列化,提交数据
          success:function(info){
             console.log( info );

             if(info.error===1000){
                     //参数1：修改哪个字段
                //参数2：修改状态  NOT-VALIDATED VALIDATING INVALID(校验失败) VALID
                $("form").data("bootstrapValidator").updateStatus("username", "INVALID", "callback");

             }
            
             if(info.error===1001){
                //参数1：修改哪个字段
           //参数2：修改状态  NOT-VALIDATED VALIDATING INVALID(校验失败) VALID
           $("form").data("bootstrapValidator").updateStatus("password", "INVALID", "callback");

           }

           if(info.success){
            //登录成功
            location.href = "index.html";
          }

          }

          

         })
    });

       //3,点击重置按钮把所有的内容和样式全部清空,需要调用bootstrapValidator提供的方法
       $("[type='reset']").on("click",function(){

        $("form").data("bootstrapValidator").resetForm(true);//传入true 都会清除,不传内容不会清除

       })

})