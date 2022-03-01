//Vikingos - https://github.com/AitorSantaeugenia/lab-javascript-vikings
// Class Enemy
class Enemy {
	constructor(context, path) {
		//Setters
		this.context = context;
		this.path = path;
	}
	//Getters
	setHP(value) {
		this.minionHp = value;
	}

	receiveDamage(value) {
		this.minionHp -= value;
	}

	getHP() {
		return this.minionHp;
	}
}

//Enemy 1 - redDemon
class SmallDemon extends Enemy {
	constructor(context, path) {
		//Setters
		super(context, path);
		this.x = this.path[0][0];
		this.y = this.path[0][1];
		this.posInicialX = this.x;
		this.wHPBar = 35;
		this.pathIndex = 0;
		this.slow = false;
		// Stats enemigo
		this.gold = 15;
		this.minionHp = 300;
		this.speed = 1.4;
		// Imagen enemigo red.png
		this.randomImage = Math.trunc(Math.random() * 8);
		this.img = new Image();
		//this.img.src = `https://aitorsantaeugenia.github.io/TD_Project1/images/enemies/enemy${this.randomImage}.png`;
		this.img.src = `https://aitorsantaeugenia.github.io/TD_Project1//images/enemies/sprites/${this
			.randomImage}.png`;

		//tring out spritesheets
		this.canvas = document.querySelector('canvas');
		//let canvas = document.querySelector('canvas');

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

		//tamaño diferente de los sprites
		if (this.randomImage === 1) {
			this.swidth = 170;
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
			this.swidth = 170;
			this.sheight = 240;
		}
		//5
		//155

		//6
		//138

		//7
		//	160,
		//280,
	}

	draw() {
		this.context.drawImage(
			this.img,
			this.img.currentLoopIndex * this.img.width / this.img.frames,
			this.direction,
			this.swidth,
			this.sheight,
			this.x - this.w / 2,
			this.y - this.h / 2,
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
		this.directionPath();
	}

	directionPath() {
		if (this.path[this.pathIndex][0] - this.posInicialX > 0) {
			this.direction = 1;
			this.x +=
				this.speed *
				(Math.abs(this.path[this.pathIndex][0] - this.posInicialX) /
					(Math.abs(this.path[this.pathIndex][0] - this.posInicialX) +
						Math.abs(this.path[this.pathIndex][1])));
		}

		if (this.x + 1 >= this.path[this.pathIndex][0] && this.x - 1 <= this.path[this.pathIndex][0]) {
			this.posInicialX = this.path[this.pathIndex][0];
			this.pathIndex += 1;
		}
	}

	paintHpBar() {
		new HPbar(
			this.context,
			this.x - this.w / 2,
			this.y - this.h / 2 - 15,
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

class HPbar {
	constructor(context, posx, posy, width, height, color) {
		this.context = context;
		this.posx = posx;
		this.posy = posy;
		this.width = width;
		this.height = height;
		this.color = color;
	}

	draw() {
		this.context.fillStyle = this.color;
		this.img = new Image();
		this.img.src = 'https://aitorsantaeugenia.github.io/TD_Project1/images/hbar.png';
		this.context.drawImage(this.img, this.posx, this.posy, this.width, this.height);
	}
}
