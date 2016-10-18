
/**
 * 敌方坦克的构造函数
 */

var enTank=function(_x,_y,isRed){
	

	console.log('I am creating enermy Tank')
	/**
	 * 基本参数
	 * @type {Number}
	 * 
	 */	
	renderList.push(this);
	var self=this;
	this.size=40;
	this.level=isRed+1;

	var blood=1;
	if(isRed){
		blood=2;
	}



	

 	var x=_x;
 	var y=_y;



 	var speed=4;
 	var dir=2;
 	var hit=false;
 	var bullet=[];
 	var isDestroyed=false;
 	var tempX=x;
 	var tempY=y;
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
 		if(blood==0||blood<0){
 			isDestroyed=true;
 			return true;
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
 	 * 发射子弹
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
					dir=Math.floor(Math.random()*4);//随机改变坦克方向
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
					dir=Math.floor(Math.random()*4);//随机改变坦克方向
					return;
				}else{
					tempX+=speed;
				};
				
				break;
			case 2://向下移动
				if(dir!=2){
					dir=2;
				}else if(hindered(self,2)){
					dir=Math.floor(Math.random()*4);//随机改变坦克方向
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
					dir=Math.floor(Math.random()*4);//随机改变坦克方向
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
		if(blood==2){
				switch(dir){
				case 0:
					img.src="images/tank/enTankB0.png";
					break;
				case 1:
					img.src="images/tank/enTankB1.png";
					break;
				case 2:
					img.src="images/tank/enTankB2.png";
					break;
				case 3:
					img.src="images/tank/enTankB3.png";
					break;
				default:
					img.src="images/tank/enTank0.png";

			}
			return img;
		}
		switch(dir){
			case 0:
				img.src="images/tank/enTank0.png";
				break;
			case 1:
				img.src="images/tank/enTank1.png";
				break;
			case 2:
				img.src="images/tank/enTank2.png";
				break;
			case 3:
				img.src="images/tank/enTank3.png";
				break;
			default:
				img.src="images/tank/enTank0.png";

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

		if(!isDestroyed){
				image.onload=function(){
				ctx.drawImage(image,x,y,40,40);
			};
		}
		
		
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
				if(tempX>760){tempX=760};
				break;
			case 2:
				if(tempY>660){tempY=660};
			case 3:
				if(tempX<0){tempX=0;}

		};

	};
	this.manipulate=(function(){


		var move_or_turn=1;
		var fireBullet=1;

		setInterval(function(){
			var num=Math.floor(Math.random()*4);
			if(x==0&&dir==3){
				var ranDir=Math.floor(Math.random()*4);
				if(ranDir==3){ranDir=1}
				move(ranDir);return;
			}
			if(y==0&&dir==0){
				var ranDir=Math.floor(Math.random()*4);
				if(ranDir==0){ranDir=2}
				move(ranDir);return;
			}
			if(x==760&&dir==1){
				var ranDir=Math.floor(Math.random()*4);
				if(ranDir==1){ranDir=3}
				move(ranDir);return;
			}
			if(y==660&&dir==2){
				var ranDir=Math.floor(Math.random()*4);
				if(ranDir==2){ranDir=0}
				move(ranDir);return;
			}

			if(move_or_turn%30==0){


				move(num);
				move_or_turn++;
			}else{
				move(dir);
				move_or_turn++;
			}
			

		},100);



		
	})();


};


function createEnTank(enermyTank){

	

	function creTank(){
		if(enermyTank.length<1){
			return;
		}
		if(enList.length<5){
			var ran=Math.floor(Math.random()*5);
			/*console.log('ran is '+ran);*/
			var pos_x,pos_y;
			switch(ran){
				case 0:pos_x=0;pos_y=200;break;
				case 1:pos_x=0;pos_y=0;break;
				case 2:pos_x=375;pos_y=0;break;
				case 3:pos_x=760;pos_y=0;break;
				case 4:pos_x=760;pos_y=200;break;
			}
			/*console.log(pos_x);
			console.log(pos_y);
			*/
			var isRed=enermyTank.shift();
			var enTank01=new enTank(pos_x,pos_y,isRed);
			enList.push(enTank01);
			
		}
	};

	setInterval(creTank,2000);
	
}
