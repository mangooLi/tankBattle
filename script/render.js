/**
 * 渲染坦克
 */
function render(){


	

	refineRender();
	
	/*ctx.clearRect(0,0,800,700);*/
	ctxBuffer.clearRect(0,0,800,700);

	
	
	for(var i=0;i<renderList.length;i++){
		if(renderList[i] instanceof bullet){
			renderList[i].manipulate();
			renderList[i].draw(ctxBuffer);
			
		}else{
			renderList[i].draw(ctxBuffer);
		}



	}

	/*ctx.drawImage(canvasBuffer,0,0);*/


	/*obj.draw(ctx);
	obj2.manipulate();
	obj2.draw(ctx);
*/	
	/*console.log('render is running');*/
	
	

}