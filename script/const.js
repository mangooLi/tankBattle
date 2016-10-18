
canvas_width=800;
canvas_height=700;

renderList=[];//需要渲染的元素的数组

enList=[];//地方坦克的数组

myBulletList=[];//我方发射的子弹的数组

enBulletList=[];//敌方坦克发射子弹的数组

myTankList=[];//我方坦克数组。这个游戏暂时只有一个玩家，因此这个数组只有一个元素

wallList=[];//砖块数组

myTankNum=2;//是否结束游戏

giftList=[];//击毁敌方红色坦克后获得的奖励


var totalScore;//总分数


gamelevel=1;//初始关卡是第一关
finialLevel=2;//最后一关是第二关
//敌方坦克的数列
enermyTankList=[];
enermyTankList[0]=[1,1,1,1,0];
enermyTankList[1]=[0,1,0,1,0,0,1,1]



map=[];
map[0]=[];

for(var m=0;m<40;m++){
	var x0=m*20;
	map[0][m]={x:x0,y:100,class:0};
	map[0][m+40]={x:x0,y:80,class:0}
	if(m>15&&m<20){
		map[0][m].class=1;
		map[0][m+40].class=1;
	}
	
};
map[1]=[];
var brick_x=100,brick_y=40;
for(var m=0;m<30;m++){
	map[1][m]={x:brick_x,y:brick_y,class:0}
	brick_x+=20;
	brick_y+=20;
	if(m<10||m>20){
		map[1][m].class=1;
	}
}
var brick_x=100,brick_y=640
for(var m=30;m<60;m++){
	map[1][m]={x:brick_x,y:brick_y,class:0}
	brick_x+=20;brick_y-=20;
	if(m>40&&m<50){
		map[1][m].class=1;
	}
}


