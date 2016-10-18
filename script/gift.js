/**
 * 奖品的构造参数，我方坦克击毁地方坦克后，将获得奖励
 * @return {[type]} [description]
 */
function gift(){
	var startTime=new Date();
	var self=this;
	
	/**
	 * 基本参数
	 * @type {Number}
	 * 
	 */	
	renderList.push(this);

	
	
	this.size=40;

 	var x=Math.random()*760;
 	var y=Math.random()*660;
 	var isDestroyed=false;
 	
 	this.getX=function(){
 		return x;
 	}
 	this.getY=function(){
 		return y;
 	}
 	this.getIsDestroyed=function(){
 		return isDestroyed;
 	}
 	this.setIsDestroyed=function(yes_or_no){
 		isDestroyed=yes_or_no;
 	}

 	var classNum=Math.floor(Math.random()*3);
 	
 	this.getClassNum=function(){
 		return classNum;
 	}


 	console.log("生成奖励，种类为："+classNum);
 	
	/**
	 * 图像文件
	 * @return {[type]} [description]
	 */
	this.img=function(){
		var img=new Image();
		switch(classNum){
			case 0:
				img.src="images/others/star.png";
				break;
			case 1:
				img.src="images/others/life.png";
				break;
			case 2:
				img.src="images/others/gun.png";
				break;
			default:
				img.src="images/others/star.png";

		}
		return img;

	};
	/**
	 * 
	 * @param  {[type]}  [description]
	 * @return {[type]}     [description]
	 */

	
	this.draw=function(ctx){


		var image=this.img();
		var endTime=new Date();

		var lastTime=endTime-startTime;

		if(lastTime>15000){
			isDestroyed=true;
			return;

		}
		
		image.onload=function(){
			ctx.drawImage(image,x,y,40,40);
		};
		/*ctx.clearRect(0,0,800,700);*/
		/*ctx.drawImage(image,x,y);*/
		
		
	};
		
	

}