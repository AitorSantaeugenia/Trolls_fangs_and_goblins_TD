class StartGame {
	constructor(context) {
		this.context = context;
		this.intervalId = null;
		this.path = [ [ 0, 350 ], [ 1200, 350 ] ];
		this.waves = [];
		this.waveIndex = 0;
		this.waveEnemies = 0;
		this.audio1 = document.getElementById('backgroundMusic');
		this.audio2 = document.getElementById('victoryMusic');
		this.audio3 = document.getElementById('defeatMusic');
		this.audio4 = document.getElementById('jobDone');
		this.audio5 = document.getElementById('liveLessMusic');
		//Path
		this.board = new Canvas(this.context, this.path, 30);
		this.enemies = [];
		this.towers = [];
		this.framesCounter = 0;
		this.userHP = 35;
		this.userGold = 500;
		this.loser = new Image();
		this.loser.src = 'https://aitorsantaeugenia.github.io/TD_Project1/images/defeat.png';
		this.winner = new Image();
		this.winner.src = 'https://aitorsantaeugenia.github.io/TD_Project1/images/victory.png';
		this.restartButton = document.getElementById('restarButtonDiv');
		this.restartTextCd = document.getElementById('restartingTimerText');
		this.soundOn = document.getElementById('yesSound');
		this.soundOff = document.getElementById('noSound');

		this.gameStatus = 'normal';

		this.towerCosts = {
			sand: 70,
			slow: 200
		};
	}

	run() {
		this.intervalId = requestAnimationFrame(() => this.run());
		this.checkSound();
		this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
		this.waves = new Wave(this.context, this.path);
		this.enemyInfo();
		this.playerHP();
		this.draw();
		this.enemyInRange();
		this.enemyEnding();
		this.playerGold();
		this.clearEnemyEnding();
		this.removeEnemy();
	}

	draw() {
		if (this.checkGameContinue()) {
			this.board.draw();
			this.move();

			this.enemies.forEach((enemy) => enemy.draw());
			this.towers.forEach((turret) => turret.draw());
			this.framesCounter++;

			if (this.framesCounter % 50 === 0) {
				this.framesCounter = 0;
				this.addEnemy();
			}
		} else {
			this.framesCounter = 0;
		}
	}

	move() {
		this.enemies.forEach((enemy) => enemy.move());
		this.towers.forEach((turret) => turret.move());
	}

	addEnemy() {
		//We add enemies while it's small than the enemy array (20)
		if (this.waveEnemies < this.waves.wave[this.waveIndex].length) {
			this.enemies.push(this.waves.wave[this.waveIndex][this.waveEnemies]);
			this.waveEnemies += 1;
		} else {
			//if there is a new wave...
			if (this.waveIndex < this.waves.wave.length - 1 && this.enemies.length === 0) {
				//5 secs, next
				setTimeout((this.enemies = []), (this.waveEnemies = 0), (this.waveIndex += 1), 5000);
				//else we finish
			} else if (this.waveIndex === this.waves.wave.length - 1 && this.enemies.length === 0) {
				//You win
				this.gameWin();
			}
		}
	}

	enemyInfo() {
		let numberWave = this.waveIndex + 1;
		let wavesOf = this.waves.wave.length;
		let numberEnemiesInWave = this.enemies.length;
		this.context.font = '30px Play';
		this.context.fillStyle = 'red';
		this.context.fillText(`Wave ${numberWave} of ${wavesOf}`, 50, 50);
		this.context.fillText(`Enemies: ${numberEnemiesInWave}`, 995, 50);
	}

	goldFromEnemy() {
		this.enemies.forEach((enemy) => {
			if (enemy.isDead()) {
				this.userGold += enemy.returningGold();
			}
		});
	}

	clearEnemyEnding() {
		this.enemies = this.enemies.filter((enemy) => {
			return enemy.x + enemy.w / 2 <= this.context.canvas.width;
		});
	}

	enemyEnding() {
		this.enemies.forEach((enemy) => {
			if (enemy.endingObjective()) {
				this.userHP -= 1;
				if (this.soundOn.classList.contains('buttonSelectedBorder')) {
					this.audio5.volume = 0.1;
					this.audio5.play();
				} else if (this.soundOff.classList.contains('buttonSelectedBorder')) {
					this.audio5.volume = 0;
					this.audio5.pause();
				}
			}
		});
	}

	removeEnemy() {
		this.goldFromEnemy();
		this.enemies = this.enemies.filter((enemy) => {
			return enemy.getHP() > 0;
		});
	}

	// Turrets
	enemyInRange() {
		this.towers.forEach((turret) => {
			this.enemies.forEach((enemy) => {
				if (!turret.isHitting()) {
					if (turret.enemyInRange(enemy)) {
						if (turret.type === 'slow' && enemy.slow === false) {
							enemy.reduceSpeed(turret.slow);
						}
						enemy.receiveDamage(turret.recieveDmg());
					}
				}
			});
		});
	}

	createTurret(pos, type) {
		if (pos.click === 0) {
			let turret = null;
			let towerCost = 0;
			if (!this.positionTower(pos)) {
				if (type === 'sand') {
					turret = new Turret(this.context, pos.x, pos.y);
					towerCost = turret.returnPrice();
					if (this.userGold >= towerCost) {
						if (!turret.drawCanvas(this.path, pos, 30)) {
							this.towers.push(turret);
							this.userGold -= towerCost;
							if (this.soundOn.classList.contains('buttonSelectedBorder')) {
								this.audio4.volume = 0.1;
								this.audio4.play();
							} else if (this.soundOff.classList.contains('buttonSelectedBorder')) {
								this.audio4.volume = 0;
								this.audio4.pause();
							}
						}
					}
				} else if (type === 'slow') {
					turret = new SlowTurret(this.context, pos.x, pos.y);
					towerCost = turret.returnPrice();
					if (this.userGold >= towerCost) {
						if (!turret.drawCanvas(this.path, pos, 30)) {
							this.towers.push(turret);
							this.userGold -= towerCost;
							if (this.soundOn.classList.contains('buttonSelectedBorder')) {
								this.audio4.volume = 0.1;
								this.audio4.play();
							} else if (this.soundOff.classList.contains('buttonSelectedBorder')) {
								this.audio4.volume = 0;
								this.audio4.pause();
							}
						}
					}
				} else if (type === 'flame') {
					turret = new FlameTurret(this.context, pos.x, pos.y);
					towerCost = turret.returnPrice();
					if (this.userGold >= towerCost) {
						if (!turret.drawCanvas(this.path, pos, 30)) {
							this.towers.push(turret);
							this.userGold -= towerCost;
							if (this.soundOn.classList.contains('buttonSelectedBorder')) {
								this.audio4.volume = 0.1;
								this.audio4.play();
							} else if (this.soundOff.classList.contains('buttonSelectedBorder')) {
								this.audio4.volume = 0;
								this.audio4.pause();
							}
						}
					}
				} else if (type === 'catapult') {
					turret = new CatapultTurret(this.context, pos.x, pos.y);
					towerCost = turret.returnPrice();
					if (this.userGold >= towerCost) {
						if (!turret.drawCanvas(this.path, pos, 30)) {
							this.towers.push(turret);
							this.userGold -= towerCost;
							if (this.soundOn.classList.contains('buttonSelectedBorder')) {
								this.audio4.volume = 0.1;
								this.audio4.play();
							} else if (this.soundOff.classList.contains('buttonSelectedBorder')) {
								this.audio4.volume = 0;
								this.audio4.pause();
							}
						}
					}
				}
			}
		}
	}

	positionTower(pos) {
		for (let i = 0; i <= this.towers.length - 1; i++) {
			if (
				Math.sqrt(Math.pow(this.towers[i].x - pos.x, 2) + Math.pow(this.towers[i].y - pos.y, 2)) <=
				this.towers[i].w
			) {
				return true;
			}
		}
		return false;
	}

	// Player
	playerHP() {
		const HP = document.getElementById('hpPlayer');
		HP.innerText = this.userHP;
		if (this.userHP === 0) {
			// Stop the game
			this.gameLost();
		}
	}

	playerGold() {
		const gold = document.getElementById('goldPlayer');
		gold.innerText = '$' + this.userGold;
	}

	//Utils and game winner
	checkTurretSelected(turret) {
		let turretSelected = turret;

		const sandTurret = document.getElementById('sandTurret');
		const cataTurret = document.getElementById('cataTurret');
		const slowTurret = document.getElementById('slowTurret');
		const flameTurret = document.getElementById('flameTurret');
		if (turretSelected == 'sand') {
			sandTurret.classList.add('turretSelectedBorder');
			cataTurret.classList.remove('turretSelectedBorder');
			slowTurret.classList.remove('turretSelectedBorder');
			flameTurret.classList.remove('turretSelectedBorder');
		} else if (turretSelected == 'catapult') {
			sandTurret.classList.remove('turretSelectedBorder');
			cataTurret.classList.add('turretSelectedBorder');
			slowTurret.classList.remove('turretSelectedBorder');
			flameTurret.classList.remove('turretSelectedBorder');
		} else if (turretSelected == 'slow') {
			sandTurret.classList.remove('turretSelectedBorder');
			cataTurret.classList.remove('turretSelectedBorder');
			slowTurret.classList.add('turretSelectedBorder');
			flameTurret.classList.remove('turretSelectedBorder');
		} else if (turretSelected == 'flame') {
			sandTurret.classList.remove('turretSelectedBorder');
			cataTurret.classList.remove('turretSelectedBorder');
			slowTurret.classList.remove('turretSelectedBorder');
			flameTurret.classList.add('turretSelectedBorder');
		}
	}
	gameWin() {
		//We stop the game
		window.cancelAnimationFrame(this.intervalId);
		this.restartTextCd.innerText = 'Restarting in 10 seconds';
		this.restartButton.classList.remove('hidden');
		this.audio1.pause();

		if (this.soundOn.classList.contains('buttonSelectedBorder')) {
			this.audio2.volume = 0.1;
			this.audio2.play();
		} else if (this.soundOff.classList.contains('buttonSelectedBorder')) {
			this.audio2.volume = 0;
			this.audio2.pause();
		}
		//We clear the map
		this.context.clearRect(0, 0, 1200, 800);
		//We show the winer/loser logo
		this.context.drawImage(this.winner, 150, -55, 950, 420);

		//10 seconds, refresh or click
		let timeleft = 10;
		let downloadTimer = setInterval(() => {
			if (timeleft <= 0) {
				setInterval(downloadTimer);
				this.restart();
			} else {
				this.restartTextCd.innerText = 'Restarting in ' + timeleft + ' seconds';
			}
			timeleft -= 1;
		}, 1000);
	}
	gameLost() {
		window.cancelAnimationFrame(this.intervalId);
		this.restartTextCd.innerText = 'Restarting in 10 seconds';
		this.restartButton.classList.remove('hidden');

		//We clear the map
		this.context.clearRect(0, 0, 1200, 800);
		//We show the winer/loser logo
		this.context.drawImage(this.loser, 325, 30, 600, 300);
		this.audio1.pause();

		if (this.soundOn.classList.contains('buttonSelectedBorder')) {
			this.audio3.volume = 0.1;
			this.audio3.play();
		} else if (this.soundOff.classList.contains('buttonSelectedBorder')) {
			this.audio3.volume = 0;
			this.audio3.pause();
		}

		//10 seconds, refresh or click
		let timeleft = 10;
		let downloadTimer = setInterval(() => {
			if (timeleft <= 0) {
				setInterval(downloadTimer);
				this.restart();
			} else {
				this.restartTextCd.innerText = 'Restarting in ' + timeleft + ' seconds';
			}
			timeleft -= 1;
		}, 1000);
	}
	restart() {
		location.reload();
	}
	checkGameContinue() {
		return this.userHP <= 0 ? false : true;
	}
	cheatCodeGold() {
		this.userGold += 200;
		this.playerGold();
	}
	cheatCodeGoldToTheMoon() {
		this.userGold += 1000;
		this.playerGold();
	}
	cheatUnlockedTurret() {
		this.context.font = '30px Play';
		this.context.fillStyle = 'red';
		this.context.fillText('You have unlocked the OP turret', 500, 500);
	}
	checkSound() {
		if (this.soundOn.classList.contains('buttonSelectedBorder')) {
			this.audio1.volume = 0.1;
			this.audio1.play();
			this.audio1.loop = true;
		} else if (this.soundOff.classList.contains('buttonSelectedBorder')) {
			this.audio1.volume = 0;
			this.audio1.pause();
		}
	}
	pauseGame() {
		if (this.gameStatus === 'normal') {
			this.gameStatus = 'pause';
			console.log(this.gameStatus);
		} else if (this.gameStatus === 'pause') {
			this.gameStatus = 'normal';
			console.log(this.gameStatus);
		}
	}
}
