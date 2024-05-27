const canvas = $("#please-login-to-create-projects")[0];
canvas.width = window.screen.width;
canvas.height = window.screen.height;
const ctx = canvas.getContext("2d");

var dots = [];
var dotsCount = 300;

class Dot {
	constructor(x, y) {
		this.x = x;
		this.y = y;

		this.speed = 0.5;

		this.goal = {
			x: Math.floor(Math.random() * (canvas.width-50) + 50),
			y: Math.floor(Math.random() * (canvas.height-50) + 50),
		}

		this.diffX = Math.abs(this.goal.x - this.x);
		this.diffY = Math.abs(this.goal.y - this.y);
	
		this.color = "#3f3f3f";
		this.radius = 4;
	}
	draw(context, nearDots) {
		context.fillStyle = this.color;
		context.beginPath();
		context.arc(this.x, this.y, this.radius, 0, 2*Math.PI)
		context.fill();
		nearDots.forEach((dot) => {
			let distance = Math.sqrt(Math.pow(dot.x - this.x, 2) + Math.pow(dot.y - this.y, 2));
			let opacity = 1 - distance / 100;

			context.beginPath();
			context.moveTo(this.x, this.y);
			context.lineTo(dot.x, dot.y);
            if (dot.x != mouseX && dot.y != mouseY) {
                context.strokeStyle = `rgba(50, 50, 50, ${opacity})`;
            } else {
                let opacity = 1 - distance / 200;
                context.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
            }
			
			context.stroke();
		});
	}
	update() {
		if (this.diffX >= 20){
			if (this.x < this.goal.x){
				this.x += this.speed;
			}else if (this.x > this.goal.x){
				this.x -= this.speed;
			}
		  }
		  if(this.diffY >= 20){
			if (this.y < this.goal.y){
				this.y += this.speed;
			}else if (this.y > this.goal.y){
				this.y -= this.speed;
			}
		  }
		  if(this.diffX <= 20 && this.diffY <= 20){
			this.goal.x = Math.floor(Math.random() * (canvas.width-50) + 50);
			this.goal.y =  Math.floor(Math.random() * (canvas.height-50) + 50);

			this.diffX = Math.abs(this.goal.x - this.x);
			this.diffY = Math.abs(this.goal.y - this.y);
		  }
	  
		this.diffX = Math.abs(this.goal.x - this.x);
		this.diffY = Math.abs(this.goal.y - this.y);
	}
}

var mouseX = 0;
var mouseY = 0;

// document.addEventListener("mousemove", function(event) {
//     mouseX = event.clientX;
//     mouseY = event.clientY;
// });


function generateRandomDots() {
	for(var i = 0; i < dotsCount; i++) {
		var randomX = Math.floor(Math.random()*(canvas.width-50) + 50);
		var randomY = Math.floor(Math.random()*(canvas.height-50) + 50);
		dots.push(new Dot(randomX, randomY));
	}

}

function draw() {
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	dots.forEach((dot) => {
		var nearDots = dots.filter((otherDot) => {
			return dot !== otherDot && 
				Math.abs(dot.x - otherDot.x) < 100 && // Пороговое значение для близости по оси X
				Math.abs(dot.y - otherDot.y) < 100; // Пороговое значение для близости по оси Y
		});
        // nearDots.push(new Dot(mouseX-pos.left, mouseY+pos.top+10))
		dot.draw(ctx, nearDots);
		dot.update();
	});
}

generateRandomDots();

setInterval(draw, 50);