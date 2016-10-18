

/**
 * 进行碰撞测试
 */

function textCollision(){

	
	//======================敌方坦克与我方子弹碰撞===========================================
	

	for(var i=0;i<enList.length;i++){
		for(j=0;j<myBulletList.length;j++){
			if(collision(enList[i],myBulletList[j])){
				stageScore+=100;//击中黑色坦克，加100分

				renderList.push(new blast(myBulletList[j].getX(),myBulletList[j].getY()));
				
				enList[i].setBlood(enList[i].getBlood()-myBulletList[j].damage);
				if(enList[i].getIsDestroyed()){
					if(enList[i].level==2){//如果击毁了高级坦克，则获得奖品
						redNum+=1;stageScore+=400;//击毁红色坦克，加500分
						console.log("redNum="+redNum);
						console.log("stageScore="+ stageScore);
						giftList.push(new gift());

					}else{
						blackNum+=1;
					}
					


					
				}
				myBulletList[j].setIsDestroyed(true);
			}
		}
	}

	refineList(enList);
	refineList(myBulletList);





	//=================================我方坦克与奖品碰撞============
	
	
	
	for(var i=0;i<myTankList.length;i++){
		for(var j=0;j<giftList.length;j++){
			
			if(collision(myTankList[i],giftList[j])){
				console.log("吃到奖励");
				giftNum+=1;
				stageScore+=200;
				console.log("giftNum="+giftNum);
				console.log("stageScore="+stageScore);
				switch(giftList[j].getClassNum()){

					case 0:
						myTankList[i].damage+=1;console.log("吃到星星后坦克威力为"+myTankList[i].damage);break;
					case 1:
						myTankNum+=1;console.log('life is raising');console.log('吃到奖品后坦克数量为：'+myTankNum);break;
					case 2:

						myTankList[i].damage+=2;console.log("吃到枪后坦克威力为"+myTankList[i].damage);break;
				}

				giftList[j].setIsDestroyed(true);
				
			}
		}
	}
	refineList(giftList);
	
	

	//======================我方子弹与墙碰撞=================================================
	
	for(var i=0;i<wallList.length;i++){
		for(j=0;j<myBulletList.length;j++){
			if(collision(wallList[i],myBulletList[j])){
				renderList.push(new blast(myBulletList[j].getX(),myBulletList[j].getY()));

				console.log("子弹的威力为"+myBulletList[j].damage);
				
				wallList[i].setBlood(wallList[i].getBlood()-myBulletList[j].damage);

				if(wallList[i].getIsDestroyed()){
					stageScore+=50;
					brickNum+=1;
					console.log("stageScore="+stageScore);
					console.log("brickNum="+brickNum);
				}
				myBulletList[j].setIsDestroyed(true);
				
			}
		}
	}
	
	refineList(wallList);
	refineList(myBulletList);

	//=========================敌方子弹与墙碰撞======================================================
	
	for(var i=0;i<wallList.length;i++){
		for(j=0;j<enBulletList.length;j++){
			if(collision(wallList[i],enBulletList[j])){

				renderList.push(new blast(enBulletList[j].getX(),enBulletList[j].getY()));
				
				wallList[i].setBlood(wallList[i].getBlood()-1);
				wallList[i].getIsDestroyed();

				enBulletList[j].setIsDestroyed(true);
				
			}
		}
	}
	refineList(wallList);
	
	refineList(enBulletList);
	//=============================我方坦克与敌方子弹碰撞=================================================================

	for(var ei=0;ei<enBulletList.length;ei++){
		for(var ej=0;ej<myTankList.length;ej++){
			if(collision(enBulletList[ei],myTankList[ej])){

				renderList.push(new blast(enBulletList[ei].getX(),enBulletList[ei].getY()));

				enBulletList[ei].setIsDestroyed(true);

				myTankList[ej].setIsDestroyed(true);
				myTankList.shift();
				myTankNum--;
				console.log(myTankNum);

				if(myTankNum>0){
					myTankList.push(new myTank());
					
				}

			}
		}
	}
	refineList(myTankList);
	refineList(enBulletList);
	//=============================我方子弹与敌方子弹碰撞=================================================================

	for(var ei=0;ei<enBulletList.length;ei++){
		for(var ej=0;ej<myBulletList.length;ej++){
			if(collision(enBulletList[ei],myBulletList[ej])){

				renderList.push(new blast(enBulletList[ei].getX(),enBulletList[ei].getY()));

				enBulletList[ei].setIsDestroyed(true);

				myBulletList.setIsDestroyed(true);
				

			}
		}
	}
	refineList(myBulletList);
	refineList(enBulletList);


	//将已经碰撞销毁的敌方坦克和子弹从renderList中销毁
	


}
//将超出canvas边界的子弹清除
function abandonBullet(){
	
	for(var i=0;i<myBulletList.length;i++){
		if(myBulletList[i].getX()>800||myBulletList[i].getX()<0){
			myBulletList[i].setIsDestroyed(true);
			
		}
		if(myBulletList[i].getY()>700||myBulletList[i].getY()<0){
			myBulletList[i].setIsDestroyed(true);
			
		}
	}
	refineList(myBulletList);
	

	
	for(var i=0;i<enBulletList.length;i++){
		if(enBulletList[i].getX()>800||enBulletList[i].getX()<0){
			EnBulletList[i].setIsDestroyed(true);
			
		}
		if(enBulletList[i].getY()>700||enBulletList[i].getY()<0){
			enBulletList[i].setIsDestroyed(true);
			
		}
	}
	refineList(enBulletList);

}




//精简renderList
function refineRender(){
	

	textCollision();

	enFire();

	abandonBullet();

	refineList(renderList);
}


/**
 * 敌方坦克开火
 * @type {Number}
 */
var fire_or_not=1;
var num=0;
function enFire(){
	

	if(fire_or_not%50==0&&enList.length>0){

		var fireIndex=num%enList.length;

		enBulletList.push(new bullet(enList[fireIndex].getX(),enList[fireIndex].getY(),enList[fireIndex].getDir()));

		if(fireIndex==0&&enList>2){
				enBulletList.push(new bullet(enList[fireIndex+1].getX(),enList[fireIndex+1].getY(),enList[fireIndex+1].getDir()));
		}else if(fireIndex>1){
			enBulletList.push(new bullet(enList[fireIndex-1].getX(),enList[fireIndex-1].getY(),enList[fireIndex-1].getDir()));
		}

		num++;
		/*for(var i=0;i<enList.length;i+=2){
			console.log(enList.length);
			enBulletList.push(new bullet(enList[i].getX(),enList[i].getY(),enList[i].getDir()));
			console.log('en is firing');
		}*/
	}

	fire_or_not++;
	/*console.log('enFire is running');*/

}