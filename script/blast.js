/**
 * [bomb description]
 * @return {[type]} [description]
 */
function blast(_x,_y){
	var x=_x-30;
	var y=_y-30;

	if(x>770){
		x=770;
	};
	if(x<30){
		x=30;
	}
	if(y>670){
		y=670;
	}
	if(y<30){
		y=30;
	}
	var n=1;
	var isDestroyed=false;
	this.getIsDestroyed=function(){
		if(n>5){
			return true;
		}
		return isDestroyed;
	}

	
	this.img=function(){
		var img=new Image();
		
		switch(n){
			case 1:
				img.src='images/others/bomb1.png';break;
			case 2:
				img.src='images/others/bomb2.png';break;
			case 3:
				img.src='images/others/bomb3.png';break;
			case 4:
				img.src='images/others/bomb4.png';break;
			case 5:
				img.src='images/others/bomb5.png';break;
					}
		n++;
		return img;

	}
	this.draw=function(ctx){
		var image=this.img();

		image.onload=function(){
				ctx.drawImage(image,x,y);
			}
	}


}