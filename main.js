// setup canvas

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;
var balls = [];


// function to generate random number

function random(min, max) {
    var num = Math.floor(Math.random() * (max - min)) + min;
    return num;
}

function Shape() {
    this.x = random(0, width);
    this.y = random(0, height);
    this.velX = random(-7, 7);
    this.velY = random(-7, 7);

    this.exists = true;


};

function Ball() {
    Shape.call(this, this.x, this.y, this.velX, this.velY, this.exists);

    this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')';
    this.size = random(10, 20);

}

Ball.prototype.draw = function() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();


};

Ball.prototype.update = function() {
    if ((this.x + this.size) >= width) {
        this.velX = -(this.velX);
    }

    if ((this.x - this.size) <= 0) {
        this.velX = -(this.velX);
    }
    if ((this.y + this.size) >= height) {
        this.velY = -(this.velY);
    }

    if ((this.y - this.size) <= 0) {
        this.velY = -(this.velY);
    }
    this.x += this.velX;
    this.y += this.velY;

}
Ball.prototype.collisionDetect = function() {
    for (j = 0; j < balls.length; j++) {
        if (!(this.x == balls[j].x && this.y == balls[j].y && this.velX == balls[j].velX && this.velY == balls[j].velY)) {
            var dx = this.x - balls[j].x;
            var dy = this.y - balls[j].y;
            var distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < this.size + balls[j].size && balls[j].exists) {
                balls[j].velX = -(balls[j].velX);
                this.velX = -this.velX;
                balls[j].velY = -balls[j].velY;
                this.velY = -this.velY;
                balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')';
            }
        }
    }
}



function EvilCircle() {
    Shape.call(this, this.x, this.y, this.exists)
    this.color = 'white';
    this.size = 10;
    this.velX = 20;
    this.velY = 20;
}

EvilCircle.prototype.draw = function() {
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.lineWidth =3;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.stroke();


};

EvilCircle.prototype.checkBounds = function() {
    if ((this.x + this.size) >= width) {
        this.x -= 20;
    }

    if ((this.x - this.size) <= 0) {
        this.x += 20;
    }
    if ((this.y + this.size) >= height) {
        this.y -= 20;
    }

    if ((this.y - this.size) <= 0) {
        this.y += 20;
    }
}

 
function EvilBall(player,color)
{
    EvilCircle.call(this,this.size,this.velY,this.velX);
    this.color=color;
    // this.left=left;
    // this.right=right;
    // this.down=down;
    // this.up=up;
    this.score =0;
    this.player=player;

} 

EvilBall.prototype=Object.create(EvilCircle.prototype);
EvilBall.prototype.constructor =EvilBall;

   EvilBall.prototype.setControls=function(left,right,down,up){
        var _this = this;
        window.onkeydown = function(e) {
            console.log(e.keyCode);
            if (e.keyCode === left) {
                _this.x -= _this.velX;
            } else if (e.keyCode === right) {
                _this.x += _this.velX;
            } else if (e.keyCode === down) {
                _this.y -= _this.velY;
            } else if (e.keyCode === up) {
                _this.y += _this.velY;
            }
        }
    }



EvilBall.prototype.collisionDetect = function() {
    for (j = 0; j < balls.length; j++) {
        if (balls[j].exists) {
            var dx = this.x - balls[j].x;
            var dy = this.y - balls[j].y;
            var distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < this.size + balls[j].size) {
                balls[j].exists=false;
                this.score++;
                d= document.getElementById(this.player)
                d.style.color=this.color;
                d.innerHTML=this.score;
            }
        }
    }
}


function loop() {
    ctx.fillStyle = 'rgba(0,0,0,0.25)';
    ctx.fillRect(0, 0, width, height);
    while (balls.length < 25) {
        var ball = new Ball();
        balls.push(ball);

    }
    for (i = 0; i < balls.length; i++) {
        if (balls[i].exists)
        {
        balls[i].draw();
        balls[i].update()
        balls[i].collisionDetect();
    }
    }
    evilBall.draw();
    evilBall.checkBounds();
    evilBall.collisionDetect();
    evilBall2.draw();
    evilBall2.checkBounds();
    evilBall2.collisionDetect();

    requestAnimationFrame(loop);

}
var evilBall = new EvilBall('p1','white');
var evilBall2 = new EvilBall('p2','yellow');
evilBall2.setControls(65,68,87,83);
evilBall.setControls(37,39,38,40);

loop();

