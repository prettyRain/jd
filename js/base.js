
/**
 * Created by Administrator on 2018/3/6.
 */

function scrolltl (){
    if(window.pageYOffset){
        return{
            top:window.pageYOffset,
            left:window.pageXOffset
        }
    }else
    if(document.compatMode=="CSS1Compat"){
        return{
            top:document.documentElement.scrollTop,
            left:document.documentElement.scrollLeft
        }
    }else{
        return{
            top:document.body.scrollTop,
            left:document.body.scrollLeft
        }
    }

}
function offsetwh(){
    if(window.innerHeight){
        return{
            height:window.innerHeight,
            width:window.innerWidth
        }
    }else if(document.compatMode=="CSS1Compat"){
        return{
            height:document.documentElement.offsetHeight,
            width:document.documentElement.offsetWidth
        }
    }else {
        return{
            height:document.body.offsetHeight,
            width:document.body.offsetWidth
        }
    }
}
/*轮播*/
function animate(element,json){
    var timer = setInterval(function(){
        var flag = true;
        for(var aa in json){
            //获取当前的样式
            var current = parseInt(getStyle(element,aa));
            /*匀速运动*/
           /* var speed = json[aa]>current?5:-5;
            var end = current+speed;
            console.log(current-end);

            if(Math.abs(current-json[aa])<5){
                end = json[aa];
            }else{
              flag = false;
            }*/
           /*减速运动*/
           var speed = parseInt((json[aa]-current)/10>0?Math.ceil((json[aa]-current)/10):Math.floor((json[aa]-current)/10));
           var end = speed + current;
            element.style[aa]=end+"px";
            console.log(end+"--"+json[aa]);
            if(end!=json[aa]){
                flag=false;
            }
            if(flag){
                clearInterval(timer);
            }
        }
    },30)
}
//获取当前的css样式
function getStyle(element, attr){
    if(element.currentStyle){
        return element.currentStyle[attr];
    }else{
        return window.getComputedStyle(element,null)[attr];
    }
}