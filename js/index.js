/**
 * Created by Administrator on 2018/3/6.
 */

window.onload = function(){
    document.querySelector(".slider").children[0].style.height=document.querySelector(".slider").children[0].children[0].children[0].offsetHeight+'px';


    /*下拉透明变不透明*/
    var headerbox = document.querySelector(".qd_header_box");
    var qd_banner = document.querySelector(".qd_banner");
    window.onscroll = function(){
        var i = scrolltl().top/qd_banner.offsetHeight;
        if(i<1&&i>0){
            headerbox.style.opacity=i;
        }else if(i>1 || i==0){
            headerbox.style.opacity=1;
        }
        document.querySelector(".slider").children[0].style.height=document.querySelector(".slider").children[0].children[0].children[0].offsetHeight+'px';
    }
    window.onresize = function(){
        document.querySelector(".slider").children[0].style.height=document.querySelector(".slider").children[0].children[0].children[0].offsetHeight+'px';
    }
    /*倒计时*/
    window.setInterval(miaosha,1000);
    function miaosha(){
        var data = new Date("2019/3/6 18:55:20");
        var nowdata = new Date();
        var cha = data.getTime()-nowdata.getTime();
        var t = parseInt(cha/1000/60/60/24);
        var h = parseInt(cha/1000/60/60%24);
        var m = parseInt(cha/1000/60%60);
        var s = parseInt(cha/1000%60);
        if(h<10){
            document.querySelectorAll('.rushKill_header_djs_num')[0].innerHTML='0';
            document.querySelectorAll('.rushKill_header_djs_num')[1].innerHTML=h;
        }else {
            document.querySelectorAll('.rushKill_header_djs_num')[0].innerHTML=h.toString().substr(0,1);
            document.querySelectorAll('.rushKill_header_djs_num')[1].innerHTML=h.toString().substr(1,1);
        }
        if(m<10){
            document.querySelectorAll('.rushKill_header_djs_num')[2].innerHTML='0';
            document.querySelectorAll('.rushKill_header_djs_num')[3].innerHTML=m;
        }else {
            document.querySelectorAll('.rushKill_header_djs_num')[2].innerHTML=m.toString().substr(0,1);
            document.querySelectorAll('.rushKill_header_djs_num')[3].innerHTML=m.toString().substr(1,1);
        }
        if(s<10){
            document.querySelectorAll('.rushKill_header_djs_num')[4].innerHTML='0';
            document.querySelectorAll('.rushKill_header_djs_num')[5].innerHTML=s;
        }else{
            document.querySelectorAll('.rushKill_header_djs_num')[4].innerHTML=s.toString().substr(0,1);
            document.querySelectorAll('.rushKill_header_djs_num')[5].innerHTML=s.toString().substr(1,1);
        }
    }

    /*轮播*/
    //宽度
    var timerout = null;
    var timer = null;
    var index = 0;
    var sliderwidth = offsetwh().width;
    var banner = document.querySelector(".qd_banner");
    var sliderdiv = document.querySelector(".slider");
    var lis = document.querySelector(".slider").children[0].children;
    var icons = document.querySelector(".banner_icons").children[0].children;
    for(var i=0;i<lis.length;i++){
        if(i>0){
            lis[i].style.left=-sliderwidth+'px';
        }
    }
     timer = setInterval(function(){
         if(index==lis.length-1){
             slider(index,0);
             index = -1;
         }else {
             slider(index,index+1);
         }
         index++;
    },2000);
    //向左运动
    function slider(a,b){
        $(lis[a]).animate({left:-sliderwidth+"px"},500);
        $(lis[b]).animate({left:sliderwidth+"px"},0);
        $(lis[b]).animate({left:0},500);
        for(var i=0;i<icons.length;i++){
                /*icons[aa].style.opacity='0.3';*/
            if(i==b){
                icons[i].style.opacity='0.3';
            }else {
                icons[i].style.opacity='1';
            }
        }
    }
    //向右运动
    function slidertorg(a,b){
        $(lis[a]).animate({left:sliderwidth+"px"},500);
        $(lis[b]).animate({left:-sliderwidth+"px"},0);
        $(lis[b]).animate({left:0},500);
        for(var i=0;i<icons.length;i++){
            /*icons[aa].style.opacity='0.3';*/
            if(i==b){
                icons[i].style.opacity='0.3';
            }else {
                icons[i].style.opacity='1';
            }
        }
    }
    for(var i=0;i<icons.length;i++){
        console.log(i);
        icons[i].index = i;
        icons[i].onclick = function(){
            clearInterval(timer);
            clearTimeout(timerout);
            if(this.index>index){
                $(lis[index]).animate({left:-sliderwidth+"px"},500);
                $(lis[this.index]).animate({left:sliderwidth+"px"},0);
                $(lis[this.index]).animate({left:0},500);
                $(this).css("opacity","0.3").siblings().css("opacity","1");
                index = this.index;
            }else if(this.index<index){
                $(lis[index]).animate({left:sliderwidth+"px"},500);
                $(lis[this.index]).animate({left:-sliderwidth+"px"},0);
                $(lis[this.index]).animate({left:0},500);
                $(this).css("opacity","0.3").siblings().css("opacity","1");
                index = this.index;
            }


            timerout = setTimeout(function(){
                timer = setInterval(function(){
                    if(index==lis.length-1){
                        slider(index,0);
                        index=-1;
                    }else {
                        slider(index,index+1);
                    }
                    index++;
                },2000);
            },5000)
        }
    }

    var startmove ;
    var endmove;
    sliderdiv.ontouchstart = function(event){
        clearInterval(timer);
        clearTimeout(timerout);
        event.defaultPrevented;
        var event = event||window.event;
       startmove = event.touches[0].clientX;
       console.log("start"+startmove);
    }
    sliderdiv.ontouchmove = function(event){
         event.defaultPrevented;
         var event = event || window.event;
         console.log("move"+event.touches[0].clientX);
         endmove = event.touches[0].clientX;
    }
    sliderdiv.ontouchend = function(event){
        event.defaultPrevented;
        var event = event||window.event;
        console.log("end"+event.changedTouches[0].clientX);
        if(endmove>startmove&&Math.abs(endmove-startmove)>=sliderdiv.offsetWidth/3){
            //向右滑
              if(index==0){
                  slidertorg(index,lis.length-1);
                  index = lis.length;
              }else {
                  slidertorg(index,index-1);
              }
              index--;

        }else if(Math.abs(endmove-startmove)>=sliderdiv.offsetWidth/3) {
            //向左
            if(index==lis.length-1){
                slider(index,0);
                index = -1;
            }else {
                slider(index,index+1);
            }
            index++;
        }
    }
}
