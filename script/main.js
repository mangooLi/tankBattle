
var startButton=$("#start");
var nextButton=$("#next");
var gameDataList=$a(".gameData");
var title=$("#title");

var pageIntroduction=$("#gameIntroduction");
var pageGame=$("#container");
var pageScore=$("#scoreBoard");

var canvasBuffer=document.getElementById('canvasBuffer');
var	ctxBuffer=canvasBuffer.getContext('2d');








window.onload=function(){

	
	//点击开始按钮开始游戏
	startButton.onclick=function(){
		switchPage(pageIntroduction,pageGame);
		setTimeout(function(){
			loadGame();
		},5000);
	};

	nextButton.onclick=function(){
		switchPage(pageScore,pageGame);
		if(gamelevel>finialLevel){
			gamelevel=1;
		}
		setTimeout(function(){
			loadGame();
		},5000);

	}






}

/**
 * 切换界面
 * @return {[type]} [description]
 */
function switchPage(page1,page2){
	page2.className="block";
	var top2=800;var top1=0;//两个页面的高度
	page2.style.top=top2+"px";
	var switchTimer=setInterval(function(){
		top1-=10;top2-=10;
		page1.style.top=top1+"px";
		page2.style.top=top2+"px";
		if(top2==0){
			clearInterval(switchTimer);
			page1.className="hidden";
		}

	},50)
}

/**
 * 加载游戏
 * @param  {[type]} gamelevel 游戏关卡
 * @return {[type]}           [description]
 */
function loadGame(){
	//游戏关卡
	
	var preTank=myTankList[0];//将前一关游戏结束后的坦克保存一下
	//清空之前游戏数据
	myTankList=[];
	myBulletList=[];
	wallList=[];

	enList=[];
	enBulletList=[];

	giftList=[];
	renderList=[];

	stageScore=0;//每关游戏中分数
	if(gamelevel==1){
		totalScore=0;
	}
	


	blackNum=0;//击毁黑色坦克数量
	redNum=0;//击毁红色坦克数量
	giftNum=0;//领取奖品数量
	brickNum=0;
	//引入敌方坦克数列
	var enermyTankList=[];
		enermyTankList[0]=[0,1,0,1,0,0,1,0,1,0,0,1];
		enermyTankList[1]=[0,1,0,1,0,1,0,1,0,0,1,1];

	//加载地图
	drawWall(map[gamelevel-1]);
	//创造坦克
	var tank01=new myTank();
	//将前一关坦克的威力赋值给该坦克
	if(gamelevel>1){
		tank01.damage=preTank.damage;

	}

	//给坦克绑定发射子弹的事件
	document.addEventListener('keyup',function(event){

		if(event.keyCode==32){

			var x=myTankList[0].getX(),y=myTankList[0].getY(),dir=myTankList[0].getDir(),damage=myTankList[0].damage;
			if(myBulletList.length>5){
				return;
			}
			var bullet01=new bullet(x,y,dir,1,damage);
			myBulletList.push(bullet01);
		}

	});
	

	var enermyTank=enermyTankList[gamelevel-1];
	createEnTank(enermyTank);
	var timer=setInterval(function(){
		render();
		/*ctx.drawImage(canvasBuffer,0,0);*/
		/*console.log('=====================================');*/
		//结束游戏后切换界面
		if(myTankNum<=0||(enList.length<=0&&enermyTank.length<=0)){
			
			ctxBuffer.clearRect(0,0,800,700);
			setTimeout(switchPage(pageGame,pageScore),5000);

			gamelevel++;
			clearInterval(timer);
			
			//统计游戏数据
			stageScore+=myTankNum*1000;
			totalScore+=stageScore;

			gameDataList[0].innerHTML=blackNum;
			gameDataList[1].innerHTML=redNum;
			gameDataList[2].innerHTML=brickNum;
			gameDataList[3].innerHTML=giftNum;
			gameDataList[4].innerHTML=stageScore;
			gameDataList[5].innerHTML=totalScore;

			if(gamelevel>finialLevel){
				title.innerHTML="游戏通关";
				next.innerHTML="Play Again";
			}

		}
			
	},50);

	
}

