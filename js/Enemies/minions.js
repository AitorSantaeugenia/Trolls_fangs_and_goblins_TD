//Enemy 1 - redDemon
class Minons extends Enemy {
	constructor(context, path) {
		//Setters
		super(context, path);
		this.x = this.path[0][0];
		this.y = this.path[0][1];
		this.posInicialX = this.x;
		this.wHPBar = 35;
		this.pathIndex = 0;
		this.slow = false;
		//Enemy stats
		this.gold = 15;
		this.minionHp = 300;
		this.speed = 1.4;
		// Image red enemy.png
		this.randomImage = Math.trunc(Math.random() * 8);
		this.img = new Image();
		this.img.src = `./images/enemies/sprites/${this.randomImage}.png`;

		//tring out spritesheets
		this.canvas = document.querySelector('canvas');

		//Own testing with sprites
		//https://dev.to/martyhimmel/animating-sprite-sheets-with-javascript-ag3
		//Work in progress
		//1- pillar posicion imagen
		//2- pintar imagen (acordarse del random de arriba)
		//3- animar con frames
		this.frameCount = 0;
		this.w = 40;
		this.h = 40;
		this.width = 40;
		this.height = 40;
		this.img.frames = 3;
		this.img.currentLoopIndex = 0;
		this.swidth = 0;
		this.sheight = 0;

		//different size of the sprites
		if (this.randomImage === 1) {
			this.swidth = 180;
			this.sheight = 240;
		} else if (this.randomImage === 2) {
			this.swidth = 215;
			this.sheight = 240;
		} else if (this.randomImage === 3) {
			this.swidth = 180;
			this.sheight = 240;
		} else if (this.randomImage === 4) {
			this.swidth = 125;
			this.sheight = 200;
		} else if (this.randomImage === 5) {
			this.swidth = 155;
			this.sheight = 240;
		} else if (this.randomImage === 6) {
			this.swidth = 138;
			this.sheight = 240;
		} else if (this.randomImage === 7) {
			this.swidth = 160;
			this.sheight = 280;
		} else {
			this.swidth = 180;
			this.sheight = 240;
		}
	}

	draw() {
		this.context.globalCompositeOperation = 'source-over';
		this.context.drawImage(
			this.img,
			this.img.currentLoopIndex * this.img.width / this.img.frames,
			this.img.height / 4 * this.direction,
			this.swidth,
			this.sheight,
			this.x - this.w / 2,
			this.y - this.h / 2, //
			this.w,
			this.h
		);

		this.frameCount++;
		if (this.frameCount > 10) {
			this.frameCount = 0;
			this.img.currentLoopIndex++;
		}
		if (this.img.currentLoopIndex >= this.img.frames) {
			this.img.currentLoopIndex = 0;
		}

		this.paintHpBar();
	}

	move() {
		if (this.pathIndex < this.path.length) {
			this.directionPath();
		}
	}

	directionPath() {
		const distX = this.path[this.pathIndex][0] - this.x0;
		const distY = this.path[this.pathIndex][1] - this.y0;
		const percentageX = Math.abs(distX) / (Math.abs(distX) + Math.abs(distY));
		const percentageY = 1 - percentageX;

		if (distX > 0) {
			this.updateDirection('right');
			this.x += this.speed * percentageX; // right
		} else if (distX < 0) {
			this.updateDirection('left');
			this.x -= this.speed * percentageX; // left
		}

		if (distY > 0) {
			this.updateDirection('down');
			this.y += this.speed * percentageY; // down
		} else if (distY < 0) {
			this.updateDirection('up');
			this.y -= this.speed * percentageY; // up
		}

		// change to next waypoint after reaching one
		if (
			this.x + 1 >= this.path[this.pathIndex][0] &&
			this.x - 1 <= this.path[this.pathIndex][0] &&
			this.y + 1 >= this.path[this.pathIndex][1] &&
			this.y - 1 <= this.path[this.pathIndex][1]
		) {
			this.x0 = this.path[this.pathIndex][0];
			this.y0 = this.path[this.pathIndex][1];
			this.pathIndex += 1;
		}
	}
	updateDirection(dir) {
		switch (dir) {
			case 'right':
				this.direction = 0;
				break;
			case 'up':
				this.direction = 3;
				break;
			case 'down':
				this.direction = 1;
				break;
			case 'left':
				this.direction = 2;
				break;
		}
	}
	paintHpBar() {
		new HPbar(
			this.context,
			this.x - this.w / 2,
			this.y - this.h / 2 - 11,
			this.wHPBar * this.minionHp / 300,
			8
		).draw();
	}

	endingObjective() {
		return this.x + this.w / 2 > this.context.canvas.width;
	}

	isDead() {
		return this.minionHp <= 0;
	}

	returningGold() {
		return this.gold;
	}

	reduceSpeed(rate) {
		const minionSpeed = this.speed;
		this.speed *= rate;
		this.slow = true;

		// 1 sec slow
		setTimeout(() => {
			this.speed = minionSpeed;
			this.slow = false;
		}, 1000);
	}
}
