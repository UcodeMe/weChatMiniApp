module.exports = {
  //获取系统当前时间
  _getDate:function(){
    var now = new Date();
    var nowTime = now.getTime();
    var thisDate = new Date(nowTime).getDate();
    var oneDayTime = 24 * 60 * 60 * 1000;
    var dataInfo = {
      "year":[],
      "month":[],
      "week":[],
      "date":[],
      "fullDate":[],
      "fullDate2":[]
    };
    for (var i = 0; i < 7; i++) {
      //显示周一
      var ShowTime = nowTime + i * oneDayTime;
      //初始化日期时间
      var myDate = new Date(ShowTime);
      var year = myDate.getFullYear();
      var month = myDate.getMonth() + 1;
      var date = myDate.getDate();
      var fullDate = year + "-" + month + "-" + date;
      var fullDate2 = year + "/" + month + "/" + date;
      // console.log(fullDate)
      var week = "日一二三四五六".charAt(myDate.getDay());
      dataInfo.year.push(year)
      dataInfo.month.push(month)
      dataInfo.week.push(week)
      if (date == thisDate){
        dataInfo.date.push("今")
      }else{
        dataInfo.date.push(date)
      }
      
      dataInfo.fullDate.push(fullDate)
      dataInfo.fullDate2.push(fullDate2)
    }
    return dataInfo
  }
  

}