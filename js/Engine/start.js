class StartGame {
	constructor() {
		this.canvas = document.getElementById('canvas');
		this.context = canvas.getContext('2d');
		this.intervalId = null;
		this.contextW = 1200;
		this.contextH = 700;
		//Path - We change value later
		this.path = '';
		this.waves = [];
		this.waveIndex = 0;
		this.waveEnemies = 0;
		this.audio1 = '';
		this.audio2 = document.getElementById('victoryMusic');
		this.audio3 = document.getElementById('defeatMusic');
		this.audio4 = document.getElementById('jobDoneSound');
		this.audio5 = document.getElementById('liveLessSound');
		// this.audio6 = document.getElementById('twistedTreelineSong');
		this.audio6 = document.getElementById('moreGoldSound');
		// this.audio7 = document.getElementById('pothSong');
		//Path
		this.board = '';
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

		//v.02
		this.gameStatus = 'true';
		this.canvasBoard = document.getElementById('canvas');
		//div pause
		this.pauseMenu = document.getElementById('overCanvasPauseMenu');
		//difficulty
		this.gameDifficulty = 'Easy';
		//towers changing size when selecting different levelSection
		this.turretSizeW = '';
		this.turretSizeH = '';
		this.turretHitBox = '';
		//minion properties
		this.minonWidth = '';
		this.minionHeight = '';
		//animated campfire position
		this.campfireX = '';
		this.campfireY = '';
		//path Floor
		this.pathFloor = '';

		this.towerCosts = {
			sand: 70,
			slow: 200
		};
	}

	//Difficulty level
	setDifficultyLvl(lvlDifficulty) {
		this.gameDifficulty = lvlDifficulty;

		this.selectPath();
	}

	selectPath() {
		const selectedTrueEasy = document.getElementById('selectedTrueEasy');
		const selectedTrueNormal = document.getElementById('selectedTrueNormal');
		const selectedTrueHard = document.getElementById('selectedTrueHard');
		const selectedTrueHell = document.getElementById('selectedTrueHell');

		if (selectedTrueEasy.getAttribute('activationlvl') === 'true') {
			this.gameDifficulty = 'Easy';
			this.path = [ [ 0, 350 ], [ 1200, 350 ] ]; // Path1
			//path floor
			this.pathFloor = './images/terrain/floor.png';
			this.board = new Waypoint(this.context, this.path, 20, this.pathFloor);
			//size of turrets & hitbox
			this.turretSizeW = 60;
			this.turretSizeH = 80;
			this.turretHitBox = 30;
			this.minonWidth = 40;
			this.minionHeight = 40;
			this.campfireX = 455;
			this.campfireY = 490;
			//background img
			this.canvas.style.backgroundImage = 'url(./images/background.png)';
			//selecting songtrack
			this.audio1 = document.getElementById('backgroundMusic');
		} else if (selectedTrueNormal.getAttribute('activationlvl') === 'true') {
			this.gameDifficulty = 'Normal';
			this.path = [
				[ 0, 255.5 ], //Path2
				[ 120, 255.5 ],
				[ 120, 120 ],
				[ 1080, 120 ],
				[ 1080, 400 ],
				[ 120, 400 ],
				[ 120, 255.5 ],
				[ 1200, 255.5 ]
			];
			//path floor
			this.pathFloor = './images/terrain/Floor2.png';
			this.board = new Waypoint(this.context, this.path, 20, this.pathFloor);
			this.turretSizeW = 40;
			this.turretSizeH = 50;
			this.turretHitBox = 20;
			this.minonWidth = 30;
			this.minionHeight = 30;
			this.campfireX = 740;
			this.campfireY = 490;
			//background img
			this.canvas.style.backgroundImage = 'url(./images/background2.png)';
			//selecting songtrack
			this.audio1 = document.getElementById('twistedTreelineSong');
		} else if (selectedTrueHard.getAttribute('activationlvl') === 'true') {
			this.gameDifficulty = 'Hard';
			this.path = [
				[ 0, 100 ], //Path3
				[ 100, 100 ],
				[ 100, 500 ],
				[ 250, 500 ],
				[ 250, 100 ],
				[ 400, 100 ],
				[ 400, 500 ],
				[ 550, 500 ],
				[ 550, 100 ],
				[ 700, 100 ],
				[ 700, 500 ],
				[ 850, 500 ],
				[ 850, 100 ],
				[ 1000, 100 ],
				[ 1000, 500 ],
				[ 1150, 500 ],
				[ 1150, 250 ],
				[ 1200, 250 ]
			];
			//path floor
			this.pathFloor = './images/terrain/floor.png';
			this.board = new Waypoint(this.context, this.path, 20, this.pathFloor);
			this.turretSizeW = 40;
			this.turretSizeH = 50;
			this.turretHitBox = 20;
			this.minonWidth = 30;
			this.minionHeight = 30;
			//background img
			this.canvas.style.backgroundImage = 'url(./images/background.png)';
			//selecting songtrack
			this.audio1 = document.getElementById('backgroundMusic');
		} else if (selectedTrueHell.getAttribute('activationlvl') === 'true') {
			this.gameDifficulty = 'Hell';
			this.path = [
				[ 0, 100 ], //Path3
				[ 100, 100 ],
				[ 100, 500 ],
				[ 250, 500 ],
				[ 250, 100 ],
				[ 400, 100 ],
				[ 400, 500 ],
				[ 550, 500 ],
				[ 550, 100 ],
				[ 700, 100 ],
				[ 700, 500 ],
				[ 850, 500 ],
				[ 850, 100 ],
				[ 1000, 100 ],
				[ 1000, 500 ],
				[ 1150, 500 ],
				[ 1150, 250 ],
				[ 1200, 250 ]
			];
			//path floor
			this.pathFloor = './images/terrain/floor.png';
			this.board = new Waypoint(this.context, this.path, 20, this.pathFloor);
			this.turretSizeW = 40;
			this.turretSizeH = 50;
			this.turretHitBox = 20;
			this.minonWidth = 30;
			this.minionHeight = 30;
			//background img
			this.canvas.style.backgroundImage = 'url(./images/background.png)';
			//selecting songtrack
			this.audio1 = document.getElementById('pothSong');
		} else {
			this.gameDifficulty = 'Easy';
			this.path = [ [ 0, 350 ], [ 1200, 350 ] ]; // Path1 as default
			//path floor
			this.pathFloor = './images/terrain/floor.png';
			this.board = new Waypoint(this.context, this.path, 20, this.pathFloor);
			//default size of turrets
			this.turretSizeW = 60;
			this.turretSizeH = 80;
			this.turretHitBox = 30;
			this.minonWidth = 40;
			this.minionHeight = 40;
			this.campfireX = 455;
			this.campfireY = 490;
			//background img
			this.canvas.style.backgroundImage = 'url(./images/background.png)';
			//selecting songtrack
			this.audio1 = document.getElementById('backgroundMusic');
		}
	}

	run() {
		if (this.gameStatus === 'true') {
			this.clearCanvas();
			this.intervalId = requestAnimationFrame(() => this.run());
			this.checkSound();
			this.waves = new Wave(this.context, this.path, this.minonWidth, this.minionHeight);
			this.enemyInfo();
			this.playerHP();
			this.draw();
			this.enemyInRange();
			this.enemyEnding();
			this.playerGold();
			this.clearEnemyEnding();
			this.removeEnemy();
		}
	}

	draw() {
		if (this.checkGameContinue()) {
			this.board.draw();
			this.move();

			this.enemies.forEach((enemy) => enemy.draw());
			this.towers.forEach((turret) => turret.draw());
			this.framesCounter++;
			this.campFireCanvas(this.campfireX, this.campfireY);

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
		//We add enemies while it's smaller than the enemy array (20)
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
		this.context.fillText(`Wave ${numberWave} of ${wavesOf}`, 50, 50, 300);
		this.context.fillText(`Enemies: ${numberEnemiesInWave}`, 995, 50, 300);
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
					turret = new Turret(this.context, pos.x, pos.y, this.turretSizeW, this.turretSizeH);
					towerCost = turret.returnPrice();
					if (this.userGold >= towerCost) {
						if (!turret.turretInPath(this.path, pos, this.turretHitBox)) {
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
					} else {
						if (this.soundOn.classList.contains('buttonSelectedBorder')) {
							this.audio6.volume = 0.1;
							this.audio6.play();
						} else if (this.soundOff.classList.contains('buttonSelectedBorder')) {
							this.audio6.volume = 0;
						}
					}
				} else if (type === 'slow') {
					turret = new SlowTurret(this.context, pos.x, pos.y, this.turretSizeW, this.turretSizeH);
					towerCost = turret.returnPrice();
					if (this.userGold >= towerCost) {
						if (!turret.turretInPath(this.path, pos, this.turretHitBox)) {
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
					} else {
						if (this.soundOn.classList.contains('buttonSelectedBorder')) {
							this.audio6.volume = 0.1;
							this.audio6.play();
						} else if (this.soundOff.classList.contains('buttonSelectedBorder')) {
							this.audio6.volume = 0;
						}
					}
				} else if (type === 'flame') {
					turret = new FlameTurret(this.context, pos.x, pos.y, this.turretSizeW, this.turretSizeH);
					towerCost = turret.returnPrice();
					if (this.userGold >= towerCost) {
						if (!turret.turretInPath(this.path, pos, this.turretHitBox)) {
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
					} else {
						if (this.soundOn.classList.contains('buttonSelectedBorder')) {
							this.audio6.volume = 0.1;
							this.audio6.play();
						} else if (this.soundOff.classList.contains('buttonSelectedBorder')) {
							this.audio6.volume = 0;
						}
					}
				} else if (type === 'catapult') {
					turret = new CatapultTurret(this.context, pos.x, pos.y, this.turretSizeW, this.turretSizeH);
					towerCost = turret.returnPrice();
					if (this.userGold >= towerCost) {
						if (!turret.turretInPath(this.path, pos, this.turretHitBox)) {
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
					} else {
						if (this.soundOn.classList.contains('buttonSelectedBorder')) {
							this.audio6.volume = 0.1;
							this.audio6.play();
						} else if (this.soundOff.classList.contains('buttonSelectedBorder')) {
							this.audio6.volume = 0;
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
		this.clearCanvas();
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
		this.clearCanvas();
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
	// cheatUnlockedTurret() {
	// 	this.context.font = '30px Play';
	// 	this.context.fillStyle = 'red';
	// 	this.context.fillText('You have unlocked the OP turret', 500, 500);
	// }
	//soundOFF soundON UI and change the border
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
	// paused game menu
	pauseGame() {
		if (this.gameStatus === 'true') {
			this.gameStatus = 'false';
			//we stop all the audios to prevent bugs
			this.audio1.volume = 0;
			this.audio1.pause();
			this.audio2.volume = 0;
			this.audio2.pause();
			this.audio3.volume = 0;
			this.audio3.pause();
			this.audio4.volume = 0;
			this.audio4.pause();
			this.audio5.volume = 0;
			this.audio5.pause();
			//add or remove a border in the soundon soundoff icon
			this.soundOff.classList.add('buttonSelectedBorder');
			this.soundOn.classList.remove('buttonSelectedBorder');
			//add pointer events class to prevent building in pause time
			this.canvasBoard.classList.add('noPointerEvents');
			//DIV pause show up
			this.pauseMenu.style.visibility = 'visible';
		} else if (this.gameStatus === 'false') {
			this.gameStatus = 'true';
			this.run();
			this.audio1.volume = 0.1;
			this.audio1.play();
			//add or remove a border in the soundon soundoff icon
			this.soundOn.classList.add('buttonSelectedBorder');
			this.soundOff.classList.remove('buttonSelectedBorder');
			//remove pointer events class to build again after pause
			this.canvasBoard.classList.remove('noPointerEvents');
			// we hide the pause menu
			this.pauseMenu.style.visibility = 'hidden';
		}
	}

	// restart level selected
	restartLvl() {
		this.gameStatus = 'true';
		clearInterval(this.intervalId);
		//we hide the pause menu to instant restart of the lvl
		this.pauseMenu.style.visibility = 'hidden';
		//we remove pointer events to select turrets again (after paused menu, where it's disabled to prevent it)
		this.canvasBoard.classList.remove('noPointerEvents');
		//we play audio again
		this.audio1.volume = 0.1;
		//we reset the audio time to start it from 0
		this.audio1.currentTime = 0;
		this.audio1.play();
		//add or remove a border in the soundon soundoff icon
		this.soundOn.classList.add('buttonSelectedBorder');
		this.soundOff.classList.remove('buttonSelectedBorder');
		this.intervalId = null;
		this.clearCanvas();
		this.waves = [];
		this.waveIndex = 0;
		this.waveEnemies = 0;
		this.enemies = [];
		this.towers = [];
		this.userHP = 35;
		this.userGold = 500;
		this.run();
	}
	//print campfire
	campFireCanvas(x, y) {
		var ctx = canvas.getContext('2d');
		var x = x;
		var y = y;
		//ctx.clearRect(0, 0, 300, 300);

		ctx.fillStyle = 'rgb(51, 26, 0)';
		ctx.strokeStyle = 'rgba(250,100,0, 0.75)';

		ctx.save();

		ctx.beginPath();
		ctx.moveTo(x + 5, y);
		ctx.lineTo(x + 5, y);
		ctx.lineTo(x + 50, y + 17.5);
		ctx.lineTo(x + 45, y + 25);
		ctx.lineTo(x, y + 7.5);
		ctx.closePath();
		ctx.fill();

		ctx.beginPath();
		ctx.moveTo(x + 45, y);
		ctx.lineTo(x + 45, y);
		ctx.lineTo(x + 50, y + 7.5);
		ctx.lineTo(x + 5, y + 25);
		ctx.lineTo(x, y + 17.5);
		ctx.closePath();
		ctx.fill();

		ctx.fillStyle = 'rgb(255, 153, 0, 0.60)';
		var startY = y - (Math.floor(Math.random() * 10) + 10);

		ctx.beginPath();
		ctx.moveTo(x, startY);
		ctx.bezierCurveTo(x + 12.5, y, x + 25, y, x + 25, y - Math.floor(Math.random() * 25));
		ctx.bezierCurveTo(x + 25, y, x + 37.5, y, x + 50, y - (Math.floor(Math.random() * 10) + 10));
		ctx.quadraticCurveTo(x + 25, y + 37.5, x, startY);
		ctx.fill();

		var flamelety = y - (Math.floor(Math.random() * 12.5) + 25);
		ctx.beginPath();
		ctx.moveTo(x + 12.5, flamelety);
		ctx.bezierCurveTo(x - 25, y + 12.5, x + 50, y + 12.5, x + 12.5, flamelety);
		ctx.fill();

		flamelety = y - (Math.floor(Math.random() * 12.5) + 25);
		ctx.beginPath();
		ctx.moveTo(x + 37.5, flamelety);
		ctx.bezierCurveTo(x, y + 12.5, x + 75, y + 12.5, x + 37.5, flamelety);
		ctx.fill();

		flamelety = y - (Math.floor(Math.random() * 12.5) + 37.5);
		ctx.beginPath();
		ctx.moveTo(x + 25, flamelety);
		ctx.bezierCurveTo(x - 25, y + 12.5, x + 75, y + 12.5, x + 25, flamelety);
		ctx.fill();

		flamelety = y - (Math.floor(Math.random() * 12.5) + 25);
		ctx.beginPath();
		ctx.moveTo(x + 25, flamelety);
		ctx.bezierCurveTo(x - 25, y + 12.5, x + 75, y + 12.5, x + 25, flamelety);
		ctx.fill();
	}
	//clear the canvas for a reset or game win/ game end
	clearCanvas() {
		this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
	}
}
