$(function(){
  
    
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.querySelector(".charts_left"));

      // 指定图表的配置项和数据
      var option = {
          title: {
              text: '2018年注册人数'
          },
          tooltip: {},
          legend: {
              data:['人数']
          },
          xAxis: {
              data: ["一月","二月","三月","四月","五月","六月"]
          },
          yAxis: {},
          series: [{
              name: '人数',
              type: 'bar',
              data: [5, 20, 36, 10, 10, 20]
          }]
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);

   

      var myChart2 = echarts.init(document.querySelector(".charts_right"));
var option2 = {
  title : {
      text: '热门品牌销售',
      subtext: '2018年7月',
    //   居中
      x:'center'
  },
  tooltip : {
      formatter: "{a} <br/>{b} : {c} ({d}%)"
  },
  legend: {
      orient: 'vertical',
      left: 'left',
      data: ['耐克','阿迪','新百伦','李宁','阿迪王']
  },
  series : [
      {
          name: '销售情况',
          type: 'pie',
          radius : '55%',
        //    1,左右,2上下
          center: ['50%', '60%'],
          data:[
              {value:335, name:'耐克'},
              {value:310, name:'阿迪'},
              {value:234, name:'新百伦'},
              {value:135, name:'李宁'},
              {value:1548, name:'阿迪王'}
          ],
          itemStyle: {
              emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
          }
      }
  ]
};
myChart2.setOption(option2);


})