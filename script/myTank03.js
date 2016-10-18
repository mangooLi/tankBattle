


var myTank=function(){


	var self=this;
	
	/**
	 * 基本参数
	 * @type {Number}
	 * 
	 */	
	renderList.push(this);

	myTankList.push(this);
	
	this.size=40;
	this.damage=1;

 	var x=400;
 	var y=600;
 	var speed=10;
 	var dir=0;
 	var hit=false;
 	var bullet=[];
 	var isDestroyed=false;
 	var tempX=400;
 	var tempY=600;
 	var bulletList=[];

 	this.getBulletList=function(){
 		return bulletList;
 	}

 	this.getX=function(){
 		return x;
 	}
 	this.getY=function(){
 		return y;
 	}
 	this.getDir=function(){
 		return dir;
 	}
 	this.getIsDestroyed=function(){
 		return isDestroyed;
 	}
 	this.setIsDestroyed=function(isOrNot){
 		isDestroyed=isOrNot;


 	}
 	/**
 	 * 发生子弹
 	 */
 	 var createBullet=function(){
		/*new bullet(x,y,dir);*/
		var bullet01=new bullet(x,y,dir);
		bulletList.push(bullet01);
	}
	
	/**
	 * 坦克的移动
	 */
	
	var move=function(_dir){
		switch(_dir){
			case 0://向上移动
				if(dir!=0){
					dir=0;
				}else if(hindered(self,0)){
					return;
				}else{
					tempY-=speed;
				};
				
				
				/*console.log(tempX);console.log(tempY);*/
				break;
			case 1://向右移动
				if(dir!=1){
					dir=1;
				}else if(hindered(self,1)){
					return;
				}else{
					tempX+=speed;
				};
				
				break;
			case 2://向下移动
				if(dir!=2){
					dir=2;
				}else if(hindered(self,2)){
					return;
				}else{
					tempY+=speed;
				};
				
				
				/*console.log(tempX);console.log(tempY);*/
				break;
			case 3://向左移动
				if(dir!=3){
					dir=3;
				}else if(hindered(self,3)){
					return;
				}else{
					tempX-=speed;
				};
				
				
				/*console.log(tempX);console.log(tempY);*/
				break;
		};
		/*console.log("move is coding");*/
		isHit();//移动后进行碰撞检测
		if(!hit){
			x=tempX;
			y=tempY;
		};

	};
	/**
	 * 坦克图像文件
	 * @return {[type]} [description]
	 */
	this.img=function(){
		var img=new Image();//坦克的图片
		switch(dir){
			case 0:
				img.src="images/tank/tank0.png";
				break;
			case 1:
				img.src="images/tank/tank1.png";
				break;
			case 2:
				img.src="images/tank/tank2.png";
				break;
			case 3:
				img.src="images/tank/tank3.png";
				break;
			default:
				img.src="images/tank/tank0.png";

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
			ctx.drawImage(image,x,y,40,40);
		};
		/*ctx.clearRect(0,0,800,700);*/
		/*ctx.drawImage(image,x,y);*/
		
		
	};
		
	
	/**
	 *
	 * 检测坦克是否碰到墙
	 * @return {Boolean} [description]
	 */
	var isHit=function(){
		switch(dir){
			case 0:
				if(tempY<0){tempY=0};
				break;
			case 1:
				if(tempX>750){tempX=750};
				break;
			case 2:
				if(tempY>650){tempY=650};
			case 3:
				if(tempX<0){tempX=0;}

		};
		

	};
	this.manipulate=(function(){
		console.log('hehe');
		document.addEventListener('keydown',function(event){
			/*console.log(event.keyCode);*/
			switch(event.keyCode){
				case 87:move(0);/*console.log(myTank.tempX);console.log(myTank.tempY);*/break;
				case 68:move(1);/*console.log(myTank.tempX);console.log(myTank.tempY);*/break;
				case 83:move(2);/*console.log(myTank.tempX);console.log(myTank.tempY);*/break;
				case 65:move(3);/*console.log(myTank.tempX);console.log(myTank.tempY);*/break;
				/*case 32:createBullet();*/
				default:return;

			};


		});
	})();


}



