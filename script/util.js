
/**
 * 
 * 定义选择器
 * @param  {[type]} x [description]
 * @return {[type]}   [description]
 */
$=function(x){
return document.querySelector(x);
}
$a=function(x){
	return document.querySelectorAll(x);
}

collision=function(obj01,obj02){
	//    x-轴                      x-轴
	//  A1------>B1 C1              A2------>B2 C2
	//  +--------+   ^              +--------+   ^
	//  | object1|   | y-轴         | object2|   | y-轴
	//  |        |   |              |        |   |
	//  +--------+  D1              +--------+  D2
	var overlap01=0,overlap02=0;
	//如果是子弹和砖块的话，允许有部分重叠，避免一颗子弹打在两块砖中间时击毁两块砖
	if(obj01 instanceof brick&&obj02 instanceof bullet){
		overlap01=4;
	}
	if(obj02 instanceof brick&&obj01 instanceof bullet){
		overlap02=4;
	}



	var A1=obj01.getX();
	var B1=obj01.getX()+obj01.size-overlap01;
	var C1=obj01.getY();
	var D1=obj01.getY()+obj01.size-overlap01;

	var A2=obj02.getX();
	var B2=obj02.getX()+obj02.size-overlap02;
	var C2=obj02.getY();
	var D2=obj02.getY()+obj02.size-overlap02;

	if((A1<B2&&A1>A2)||(A2<B1&&A2>A1)){
		if((C1<D2&&C1>C2)||(C2<D1&&C2>C1)){
			return true;
		}
		return false;
	}
	

	if((obj01 instanceof brick)&&(obj02 instanceof myTank)
		||(obj02 instanceof brick)&&(obj01 instanceof myTank)){
		if((A1<=B2&&A1>=A2)||(A2<=B1&&A2>=A1)){
			if((C1<=D2&&C1>=C2)||(C2<=D1&&C2>=C1)){
				return true;
				console.log('==is collision');
			}
		return false;
		}

	}


};

function objCollisionList(obj,list){
	for(var i=0;i<list.length;i++){
		if(collision(obj,list[i])){
			return true;
		}
	}
	return false;
}




//按照index删除数组中的元素
Array.prototype.removeByIndexList = function(List){
	var newArray=[];
	var n=0,length=this.length;

	for(var i=0;i<length;i++){
		var index=i;
		if(List.indexOf(i)==-1){
			newArray[n++]=this[index];
		}

	}
	return newArray;
};

//删除数组中毁坏的元素
function refineList(list){
	var arr=[];
	var n=0;
	for(var i=0;i<list.length;i++){
		if(!list[i].getIsDestroyed()){
			list[n++]=list[i]
		}
	}
	list.length=n;

}


/**
 * 如果两个数列中的元素相碰撞，就将他们从该数列中删除
 * @param  {[type]} List01 [description]
 * @param  {[type]} list02 [description]
 * @return {[type]}        [description]
 */
function deleteDestroyedElement(list01,list02){
	
	var arr01=[];
	var arr02=[];

	for(var i=0;i<list01.length;i++){
		for(j=0;j<list02.length;j++){
			if(collision(list01[i],list02[j])){
				/*arr01.push(i);
				list01[i].setIsDestroyed(true);

				arr02.push(j);
				list02[j].setIsDestroyed(true);*/
				list01[i].setBlood(list01[i].getBlood()-1);
				console.log(list01[i].getBlood());
				if(list01[i].getIsDestroyed()){
					arr01.push(i);
					console.log('pushpushpushpush')
				}
				list02[j].setBlood(list02[j].getBlood()-1);
				if(list02[j].getIsDestroyed()){
					arr02.push(j);
				}
			}
		}
	}
	console.log('list01之前的 '+list01.length);
	console.log(arr01);
	list01=list01.removeByIndexList(arr01);

	console.log('list01 之后的'+list01.length);
	list02=list02.removeByIndexList(arr02);

	
}

/**
 * 检测某点是否被砖块或者坦克填充
 * @param  {[type]} _x    [description]
 * @param  {[type]} _y    [description]
 * @param  {[type]} brick [description]
 * @return {[type]}       [description]
 */
function filledByBrickOrTank(_x,_y,brick_or_tank){
	if(_x>=brick_or_tank.getX()&&_x<=brick_or_tank.getX()+brick_or_tank.size){
		if(_y>=brick_or_tank.getY()&&_y<=brick_or_tank.getY()+brick_or_tank.size){
			return true;
		}
		return false;
	}
	return false;
}
/**
 * 检测某处是否被墙填充
 * @param  {[type]} _x [description]
 * @param  {[type]} _y [description]
 * @return {[type]}    [description]
 */
function filledByWall(_x,_y){
	var x=_x,y=_y;
	for(var i=0;i<wallList.length;i++){
		if(filledByBrickOrTank(x,y,wallList[i])){
			return true;
		}
	}
	return false;
}




function hindered(tank,direction){
	var tankList=[];
	for(var i=0;i<enList.length;i++){
		tankList.push(enList[i]);
	}




	tankList.push(myTankList[0]);
	var x=tank.getX();
	var y=tank.getY();
	switch(direction){
		case 0:
			if(filledByWall(x+10,y)||filledByWall(x+30,y)){return true;}
			for(var i=0;i<tankList.length;i++){
				if(tank===tankList[i]){return false;}
				if(filledByBrickOrTank(x+10,y,tankList[i])||filledByBrickOrTank(x+30,y,tankList[i])){
					return true;
				}
				
			}

			return false;
		case 1:
			if(filledByWall(x+40,y+10)||filledByWall(x+40,y+30)){return true;}
			for(var i=0;i<tankList.length;i++){
				if(tank===tankList[i]){return false;}
				if(filledByBrickOrTank(x+40,y+10,tankList[i])||filledByBrickOrTank(x+40,y+30,tankList[i])){
					return true;
				}
				
			}
			return false;
		case 2:
			if(filledByWall(x+10,y+40)||filledByWall(x+30,y+40)){return true;}
			for(var i=0;i<tankList.length;i++){
			if(tank===tankList[i]){return false;}
			if(filledByBrickOrTank(x+10,y+40,tankList[i])||filledByBrickOrTank(x+30,y+40,tankList[i])){
				return true;
			}
				
			}
			return false;
		case 3:
			if(filledByWall(x,y+10)||filledByWall(x,y+30)){return true;}
			for(var i=0;i<tankList.length;i++){
				if(tank===tankList[i]){return false;}
				if(filledByBrickOrTank(x,y+10,tankList[i])||filledByBrickOrTank(x,y+30,tankList[i])){
					return true;
				}
				
			}
			return false;


	}




}