/**
 * Created by Administrator on 2018/3/6.
 */
window.onload = function(){
    var detele = document.getElementsByClassName("delete_up");
    var quxiao = document.querySelector(".quxiao");
    var queren = document.querySelector(".queren");
    var tip = document.querySelector(".tip");
    /*弹出  动画*/
    for(var aa in detele){
        detele[aa].onclick = function (){
            this.setAttribute("class","delete_up current");
            tip.style.display="block";
        }
    }
    /*取消动画*/
    quxiao.onclick = function(){
        var newdetele = document.getElementsByClassName("delete_up");
        tip.style.display="none";
        for(var i=0 ;i<newdetele.length;i++){
                if(newdetele[i].classList.contains("current")){
                    newdetele[i].setAttribute("class","delete_up");
                }

            }
        }
    //确认动画
    queren.onclick = function(){
        var newdetele = document.getElementsByClassName("delete_up");
        tip.style.display="none";
        for(var i=0 ;i<newdetele.length;i++){
            if(newdetele[i].classList.contains('current')){
                newdetele[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(newdetele[i].parentNode.parentNode.parentNode.parentNode.parentNode);
            }
        }
    }
    }


