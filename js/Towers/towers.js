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
		// IMG
		this.img = new Image();
		this.img.src = 'https://aitorsantaeugenia.github.io/TD_Project1/images/towers/sandTurret.png';
	}

	draw() {
		this.context.drawImage(this.img, this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
		this.bullets.forEach((projectile) => projectile.draw());
		this.removeProjectilesHit();
	}

	move() {
		this.bullets.forEach((projectile) => projectile.move());
	}

	turretInPath(path, pos, width) {
		let collide = false;

		console.log('Aitor' + width);

		for (let i = 0; i < path.length - 1; i++) {
			if (path[i][0] - path[i + 1][0] === 0) {
				if (
					//not collide with vertical path
					Math.abs(path[i][0] - pos.x) < width + this.w / 2 &&
					((pos.y > path[i][1] - width && pos.y < path[i + 1][1] + width) ||
						(pos.y < path[i][1] + width && pos.y > path[i + 1][1] - width))
				) {
					collide = true;
				}
			} else if (path[i][1] - path[i + 1][1] === 0) {
				if (
					//not collide with horizontal path
					Math.abs(path[i][1] - pos.y) < width + this.h / 2 &&
					((pos.x > path[i][0] - width && pos.x < path[i + 1][0] + width) ||
						(pos.x < path[i][0] + width && pos.x > path[i + 1][0] - width))
				) {
					collide = true;
				}
			}
		}
		return collide;
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
