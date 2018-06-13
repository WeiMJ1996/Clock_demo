var dom = document.getElementById('clock');
var ctx = dom.getContext('2d');
var width = ctx.canvas.width;
var height = ctx.canvas.height;
var r = width/2;

function drawBackGround(){
	ctx.save();
	/**
	绘制时钟外框
	**/
	ctx.translate(r,r);
	ctx.beginPath();
	ctx.lineWidth = 5
	ctx.arc(0,0,r-2.5, 0, 2*Math.PI,false);
	ctx.stroke();
	/**
	*绘制数字
	*/
	var hourNumbers = [3,4,5,6,7,8,9,10,11,12,1,2];//按照绘制圆形的顺序
	ctx.font = '18px Arial';
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';
	hourNumbers.forEach(function(num,i) {
		var rad = 2 * Math.PI / 12 * i;//弧度
		var x = Math.cos(rad) * (r-20);
		var y = Math.sin(rad) * (r-20);
		ctx.fillText(num,x,y);
	});
	for (var i=0;i<60;i++){
		var rad = 2 * Math.PI / 60 * i;
		var x = Math.cos(rad) * (r-10);
		var y = Math.sin(rad) * (r-10);
		ctx.beginPath();
		if (i % 5 === 0) {
			ctx.fillStyle = '#000';
			ctx.arc(x, y, 2, 0, 2 * Math.PI, false);
		}else{
			ctx.fillStyle = '#ccc';
			ctx.arc(x, y, 2, 0, 2 * Math.PI, false);
		}
		ctx.fill();
	}
}

function drawHour(hour, minute){
	ctx.save();
	ctx.beginPath();
	var rad = 2 * Math.PI / 12 * hour;
	var mrad = 2 * Math.PI / 12 / 60 * minute;
	ctx.rotate(rad + mrad);
	ctx.lineWidth = 6;
	ctx.lineCap = 'round';
	ctx.moveTo(0, 10);
	ctx.lineTo(0, -r / 3);
	ctx.stroke();
	ctx.restore();
}
function drawMinute(minute){
	ctx.save();
	ctx.beginPath();
	var rad = 2 * Math.PI / 60 * minute;
	ctx.rotate(rad);
	ctx.lineWidth = 3;
	ctx.lineCap = 'round';
	ctx.moveTo(0, 10);
	ctx.lineTo(0, -r + 36);
	ctx.stroke();
	ctx.restore();
}
function drawSecond(second){
	ctx.save();
	ctx.beginPath();
	ctx.fillStyle = '#c14543';
	var rad = 2 * Math.PI / 60 *second;
	ctx.rotate(rad);
	ctx.moveTo(-2, 20);
	ctx.lineTo(2, 20);
	ctx.lineTo(1, -r + 18);
	ctx.lineTo(-1, -r + 18);
	ctx.fill();
	ctx.restore();
}
function drawDot(){
	ctx.beginPath();
	ctx.fillStyle = '#fff';
	ctx.arc(0, 0, 3, 0, 2*Math.PI,false);
	ctx.fill();
}


function draw(){
	ctx.clearRect(0, 0, width, height);
	var now = new Date();
	var hour = now.getHours();
	var minute = now.getMinutes();
	var second = now.getSeconds();
	drawBackGround();
	drawHour(hour, minute);
	drawMinute(minute);
	drawSecond(second);
	drawDot();	
	ctx.restore();
}
setInterval(draw,1000);