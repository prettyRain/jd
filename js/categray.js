/**
 * Created by Administrator on 2018/3/8.
 */
window.onload= function(){
    //左侧分类
    var cateleft = document.querySelector(".catecontent_left");
    var catelist = document.querySelector(".catelist");
    movetransition(cateleft,catelist,100,100,88,0);
    //右侧分类
    var cateright = document.querySelector(".catecontent-right");
    var caterightlist = document.querySelector(".catecontent-right_con");
    movetransition(cateright,caterightlist,100,100,0,0);
    //上下滑动效果
    function movetransition(objparent,obj,topparem,bottomparem,parem,juli){
        var startmove ;
        var endmove;
        var flag = true;
        obj.ontouchstart = function(event){
            console.log(2)
            flag = false;
            event.defaultPrevented;
            var event = event||window.event;
            startmove = event.touches[0].clientY;
            $(obj).css("transition","all 0s ");
        }
        obj.ontouchmove = function(event){
            if(flag){
                return;
            }
            console.log(3)
            flag = false;
            event.defaultPrevented;
            var event = event || window.event;
            endmove = event.touches[0].clientY;
            if((endmove-startmove+juli)>0){
                if((endmove-startmove+juli)<topparem){
                    $(obj).css("transform","translate(0,"+(endmove-startmove+juli)+"px)");
                }else{
                    $(obj).css("transform","translate(0,100px)");
                }
            }
            else if((endmove-startmove+juli)<0 && (endmove-startmove+juli)< -(obj.offsetHeight-objparent.clientHeight+parem)){
                if((endmove-startmove+juli) > -(obj.offsetHeight-objparent.clientHeight+parem+bottomparem)){
                    $(obj).css("transform","translate(0,"+(endmove-startmove+juli)+"px)");
                }else{
                    $(obj).css("transform","translate(0,"+-(obj.offsetHeight-objparent.clientHeight+parem+bottomparem)+"px)");
                }
            }else {
                $(obj).css("transform","translate(0,"+(endmove-startmove+juli)+"px)");
            }

        }
        obj.ontouchend = function(event){
           console.log(4)
            if((endmove-startmove+juli)>0){
                $(obj).css("transform","translate(0,"+(0)+"px)");
                $(obj).css("transition","all .05s ease");
                juli = 0;
            }else if((endmove-startmove+juli)<0 && (endmove-startmove+juli)< -(obj.offsetHeight-objparent.clientHeight+parem)){
                $(obj).css("transform","translate(0,"+-(obj.offsetHeight-objparent.clientHeight+parem)+"px)");
                $(obj).css('transition','all 0.5 ease');
                juli = -(obj.offsetHeight-objparent.clientHeight+parem);
            }else {
                juli = endmove-startmove+juli;
            }

        }
    }
    //点击左侧分类的效果
    var lis = catelist.children[0].children;
    $(lis).on("click",function(){
        console.log(1);
        for(var i = 0;i < lis.length;i++){
            lis[i].className = "";
        }
        this.className = "now";
        if($(this).index()*this.offsetHeight<(catelist.offsetHeight-cateleft.offsetHeight+88)){
            catelist.style.transform="translate(0,-"+$(this).index()*this.offsetHeight+"px)";
            catelist.style.transition="all 0.3s ease";
            movetransition(cateleft,catelist,100,100,88,-$(this).index()*this.offsetHeight);
        }else {
            catelist.style.transform="translate(0,-"+(catelist.offsetHeight-cateleft.offsetHeight+88)+"px)";
            catelist.style.transition="all 0.3s ease";
            movetransition(cateleft,catelist,100,100,88,-(catelist.offsetHeight-cateleft.offsetHeight+88));
        }

    })

}

