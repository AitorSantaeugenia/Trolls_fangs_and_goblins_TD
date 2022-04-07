class Turret {
	constructor(context, x, y, w, h) {
		this.context = context;
		this.x = x;
		this.y = y;
		// Stats
		this.dmg = 5;
		this.cost = 70;
		this.range = 255;
		this.type = 'sand';
		this.bullets = [];
		// Size
		this.w = w;
		this.h = h;
		this.collide = '';
		this.selectionTurret = false;
		// IMG
		this.img = new Image();
		this.img.src = 'https://aitorsantaeugenia.github.io/TD_Project1/images/towers/sandTurret.png';

		//we add canvas
		this.canvas = document.getElementById('canvas');
		//this.canvas.addEventListener('mousemove', false);
		// this.canvas.addEventListener('mousemove', this.mouseMove.bind(this), false);
	}

	draw() {
		this.context.globalCompositeOperation = 'destination-over';
		this.context.drawImage(this.img, this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);

		//this.context.fillStyle = this.collide === false ? 'rgba(255, 255, 255, .3)' : 'rgba(255, 0, 0, .3)';
		// if ((this.selectionTurret = true)) {
		// 	this.context.fillStyle = this.selectionTurret = true ? 'rgba(255, 255, 255, .3)' : 'rgba(255, 0, 0, .3)';
		// 	this.context.beginPath();
		// 	this.context.arc(this.x, this.y, this.range, 0, Math.PI * 2, true);
		// 	this.context.fill();
		// }
		// this.context.fill();

		this.bullets.forEach((projectile) => projectile.draw());
		this.removeProjectilesHit();
	}

	move() {
		this.bullets.forEach((projectile) => projectile.move());
	}

	turretInPath(path, pos, width) {
		this.collide = false;

		for (let i = 0; i < path.length - 1; i++) {
			if (path[i][0] - path[i + 1][0] === 0) {
				if (
					//not collide with vertical path
					Math.abs(path[i][0] - pos.x) < width + this.w / 2 &&
					((pos.y > path[i][1] - width && pos.y < path[i + 1][1] + width) ||
						(pos.y < path[i][1] + width && pos.y > path[i + 1][1] - width))
				) {
					this.collide = true;
				}
			} else if (path[i][1] - path[i + 1][1] === 0) {
				if (
					//not collide with horizontal path
					Math.abs(path[i][1] - pos.y) < width + this.h / 2 &&
					((pos.x > path[i][0] - width && pos.x < path[i + 1][0] + width) ||
						(pos.x < path[i][0] + width && pos.x > path[i + 1][0] - width))
				) {
					this.collide = true;
				}
			}
		}
		return this.collide;
	}

	enemyInRange(enemy) {
		const inRange =
			Math.sqrt((enemy.x - this.x) * (enemy.x - this.x) + (enemy.y - this.y) * (enemy.y - this.y)) <= this.range;
		const bullet = new projectileTurret(this.context, this.x, this.y, enemy.x, enemy.y, this.type);

		if (inRange) {
			this.bullets.push(bullet);
		}

		return inRange;
	}

	recieveDmg() {
		return this.dmg;
	}

	removeProjectilesHit() {
		this.bullets = this.bullets.filter((projectile) => projectile.hittingPosition() === false);
	}

	returnPrice() {
		return this.cost;
	}

	isHitting() {
		return this.bullets.length > 0;
	}

	// testingTecno(x, y, turret, context) {
	// 	//let canvas = document.getElementById('canvas');
	// 	const ctx = context;
	// 	let pageX = x;
	// 	let pageY = y;
	// 	let towerSelected = turret;
	// 	let turretIMG = new Image();

	// 	//console.log(towerSelected);
	// 	//console.log(this.img.src);
	// 	//this.context.fillStyle = 'rgba(255, 255, 255, .3)';
	// 	if (towerSelected === 'sand') {
	// 		turretIMG.src = 'https://aitorsantaeugenia.github.io/TD_Project1/images/towers/sandTurret.png';
	// 	} else if (towerSelected === 'catapult') {
	// 		turretIMG.src = 'https://aitorsantaeugenia.github.io/TD_Project1/images/towers/stoneTurret.png';
	// 	} else if (towerSelected === 'slow') {
	// 		turretIMG.src = 'https://aitorsantaeugenia.github.io/TD_Project1/images/towers/freezeTurret.png';
	// 	} else if (towerSelected === 'flame') {
	// 		turretIMG.src = 'https://aitorsantaeugenia.github.io/TD_Project1/images/towers/flameTurret.png';
	// 	}

	// 	//console.log(this.context);
	// 	//console.log(turretIMG.src);
	// 	ctx.fillStyle = 'rgba(255, 255, 255, .3)';
	// 	ctx.globalCompositeOperation = 'destination-over';
	// 	ctx.beginPath();
	// 	ctx.arc(pageX, pageY, 300, 0, Math.PI * 2);
	// 	ctx.fill();

	// 	ctx.drawImage(turretIMG, pageX, pageY, 300, 300, 50, 50, 200, 200);
	// }
	// canvas.addEventListener(
	// 	'mousemove',
	// 	function(e) {
	// 		var turret = turretSelected;
	// 		var selection = turretIsSelected;
	// 		console.log(turretIsSelected);

	// 		if (selection) {
	// 			towers.testingTecno();
	// 		}
	// 	},
	// 	false
	// );
}

//Catapult turret
class CatapultTurret extends Turret {
	constructor(context, x, y, w, h) {
		super(context, x, y);
		this.w = w;
		this.h = h;
		this.dmg = 20;
		this.cost = 150;
		this.range = 450;
		this.type = 'catapult';
		this.bullets = [];

		this.img = new Image();
		this.img.src = 'https://aitorsantaeugenia.github.io/TD_Project1/images/towers/stoneTurret.png';
	}
}

//Torre slow
class SlowTurret extends Turret {
	constructor(context, x, y, w, h) {
		super(context, x, y);
		this.w = w;
		this.h = h;
		this.dmg = 0.5;
		this.cost = 200;
		this.range = 220;
		this.type = 'slow';
		this.slow = 0.3;
		this.bullets = [];

		this.img = new Image();
		this.img.src = 'https://aitorsantaeugenia.github.io/TD_Project1/images/towers/freezeTurret.png';
	}
}

//Torre heavy
class FlameTurret extends Turret {
	constructor(context, x, y, w, h) {
		super(context, x, y);
		this.w = w;
		this.h = h;
		this.dmg = 35;
		this.cost = 300;
		this.range = 450;
		this.type = 'flame';
		this.bullets = [];

		this.img = new Image();
		this.img.src = 'https://aitorsantaeugenia.github.io/TD_Project1/images/towers/flameTurret.png';
	}
}
