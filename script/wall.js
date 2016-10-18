
/**
 * 砖块构造函数
 */

//_x,_y标示砖块左上角位置
//stone_or_brick 游戏中暂时设置两种砖块，石头和普通砖块。石头砖块只有高级的子弹才能打穿
////默认普通砖块

function brick(_x,_y,stone_or_brick){//stone_or_brick
	var blood;
	if(stone_or_brick==1){
		blood=3;
	}else{
		blood=1;
	};

	




	/**
	 * 基本参数
	 * @type {Number}
	 * 
	 */	
	renderList.push(this);

	
	
	this.size=20;

 	var x=_x;
 	var y=_y;
 	var isDestroyed=false;

 	
 
 	

 	this.getX=function(){
 		return x;
 	}
 	this.getY=function(){
 		return y;
 	}
 	
 	
 	this.getIsDestroyed=function(){
 		if(blood<=0){
 			isDestroyed=true;
 		}
 		return isDestroyed;
 	}
 	this.setIsDestroyed=function(isOrNot){
 		isDestroyed=isOrNot;

 	}
 	this.getBlood=function(){
 		if(blood==2){
 			blood=3;
 		}
 		return blood;
 	}
 	this.setBlood=function(_blood){
 		blood=_blood;
 	}
 	
	
	/**
	 * 坦克图像文件
	 * @return {[type]} [description]
	 */
	
	this.img=function(){
		//石头砖块不会被普通子弹击毁，所以如果石头砖块被普通子弹打到后，血量掉到2，就将其调整到3
		if(blood==2){
			blood=3;
		}
		//
		var img=new Image();
		switch(blood){
			case 1:
				img.src='images/others/normalBrick.png';break;
			case 3:
				img.src='images/others/stoneBrick.png';break;
		}
		return img;

	};
	/**
	 * 坦克呈现在画布上//这段代码暂时不用，但是暂时也先不清除它
	 * @param  {[type]}  [description]
	 * @return {[type]}     [description]
	 */

	
	this.draw=function(ctx){
		
		var image=this.img();
		
		image.onload=function(){
			ctx.drawImage(image,x,y,20,20);
		};
		/*ctx.clearRect(0,0,800,700);*/
		/*ctx.drawImage(image,x,y);*/
		
		
	};
		
	
	/**
	 *
	 * 检测坦克是否碰到墙
	 * @return {Boolean} [description]
	 */
	


}


function drawWall(map){

	for(var i=0;i<map.length;i++){
		wallList.push(new brick(map[i].x,map[i].y,map[i].class));

	}
}