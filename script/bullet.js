/**
 * 子弹类
 */

function bullet(_x,_y,_dir,ismine,damage){
	renderList.push(this);
	var self=this;
	
	this.size=8;

	if(damage){
		this.damage=damage;
	}else{
		this.damage=1;
	}
	

	var blood=1;


	
	/**
	 * 基本参数
	 * @type {Number}
	 */
 	this.owner=null;
 	var x=_x+16;
 	var y=_y+16;
 	var speed=10;
 	var dir=_dir;
 	var hit=false;
 	
 	var isDestroyed=false;
 	var tempX=x;
 	var tempY=y;

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
 		return blood;
 	}
 	this.setBlood=function(_blood){
 		blood=_blood;
 	}


	
	/**
	 * 子弹的移动
	 */
	var move=function(dir){

		switch(dir){
			case 0://向上移动
				dir=0;
				tempY-=speed;
				/*console.log(tempX);console.log(tempY);*/
				break;
			case 1://向右移动
				dir=1;
				tempX+=speed;
				/*console.log(tempX);console.log(tempY);*/
				break;
			case 2://向下移动
				dir=2;
				tempY+=speed;
				/*console.log(tempX);console.log(tempY);*/
				break;
			case 3://向左移动
				dir=3;
				tempX-=speed;
				/*console.log(tempX);console.log(tempY);*/
				break;
		};
		/*console.log("bullet move is coding");*/
		isHit();//移动后进行碰撞检测
		if(!hit){
			x=tempX;
			y=tempY;
		};
		/*console.log(x);
		console.log(y);
*/
	};
	/**
	 * 子弹图像文件
	 * @return {[type]} [description]
	 */
	this.img=function(){
		var img=new Image();
		if(ismine){
			img.src='images/tank/myBullet.png';
			return img;
		}


		
		img.src='images/tank/enBullet.png';

		/*if(tank instanceof myTank){
			img.src='images/tank/myBullet.png';
		}else{
			img.src='images/tank/enBullet.png'
		}*/
		return img;

	}




/*
 * 子弹呈现在画布上//这段代码暂时不用，但是暂时也先不清除它
 * @param  {[type]}  [description]
 * @return {[type]}     [description]
 */

	
	this.draw=function(ctx){
		var image=this.img();
		if(!isDestroyed){
				image.onload=function(){
				ctx.drawImage(image,x,y,8,8);
			};
		}
		
		
		
	
		
		/*ctx.clearRect(0,0,800,700);*/
		/*ctx.drawImage(image,x,y);*/
		
		

		
		
	};
		
	
/**
 *
 * 检测子弹是否碰到墙
 * @return {Boolean} [description]
 */
	var isHit=function(){

		if(tempX<0||tempX>800||tempY<0||tempY>700){
			tempX=0;
			tempY=800;
			isDestroyed=true;
		};

	

	};
	this.manipulate=function(){
		move(dir);
		
	};


};
