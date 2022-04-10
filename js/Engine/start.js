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
		//Game sounds and Themes
		//we change audio1 inside #83 function, for each lvl there is a different theme
		this.audio1 = '';
		this.audio2 = document.getElementById('victoryMusic');
		this.audio3 = document.getElementById('defeatMusic');
		this.audio4 = document.getElementById('jobDoneSound');
		this.audio5 = document.getElementById('liveLessSound');
		this.audio6 = document.getElementById('moreGoldSound');
		this.audio7 = document.getElementById('thanosInevitable');

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
		this.endGameMenuDiv = document.getElementById('endGameMenu');
		this.restartTextCd = document.getElementById('restartingTimerText');
		this.soundOn = document.getElementById('yesSound');
		this.soundOff = document.getElementById('noSound');

		//v.02
		this.gameStatus = 'true';
		this.pauseStatus = 'false';
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
		//timer for the ending menu
		this.timeleft = 10;
		//countdown variable for winning or losing game MENU
		this.downloadTimer = '';
		this.placeHolderImg = new Image();
		this.towersInPath = new Turret();

		//we specify the range of the turret here instead of tower.js
		this.rangeTurret = 0;

		//turret selected = name of turret
		this.turretSelected = '';

		//we will prevent the cheatCode input to being use in pause or win/lose scenarios
		this.cheatCodeInput = document.getElementById('inputCheatCode');
		this.textDefault = 'Insert cheatcode ...';

		this.towerCosts = {
			sand: 70,
			slow: 200
		};
	}

	//Difficulty level
	setDifficultyLvl(lvlDifficulty) {
		this.gameDifficulty = lvlDifficulty;

		this.selectGameMode();
	}

	selectGameMode() {
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
				[ 1000, 470 ],
				[ 1150, 470 ],
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
			//we remove pointer events to select turrets again (after reseting the game when it ended))
			this.canvasBoard.classList.remove('noPointerEvents');
			//while we are preventing cheating in pause or win/lose scenarios, we allow it again when game start
			this.cheatCodeInput.disabled = false;
			//pause status = false
			this.pauseStatus = 'false';
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

	//Function to remove the enemy
	removeEnemy() {
		this.goldFromEnemy();
		this.enemies = this.enemies.filter((enemy) => {
			return enemy.getHP() > 0;
		});
	}

	// Function to detect the enemy
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

	//Function that draw a placeholder of turret and range while hovering canvas
	drawPlaceholderTurretAndRange(pos, turretSelected) {
		var posX = pos.x;
		var posY = pos.y;
		var pos = pos;

		//turret range declared, later we give a valor
		var turretRangeIs = 0;

		//we check (true, false) if we are trying to build over the path
		var isHittingPath = this.towersInPath.turretInPath(
			this.path,
			pos,
			this.turretHitBox,
			this.turretSizeW,
			this.turretSizeH
		);

		//return of all turrets objects
		var turrets = this.selectionTurretMenu();

		//we check (true, false) if we are trying to build over another turret created before
		var turretOverTurret = this.positionTower(pos);
		//we adding a filter red/green to placeholder turret and range, this is declared here for later usage
		var filterColor = '';

		//we do this, because if we restart the game, the animationFrame in init.js #227 still working after reset
		//we can prevent this behaviour with this
		if (
			turrets.sandTurret.classList.contains('turretSelectedBorder') ||
			turrets.cataTurret.classList.contains('turretSelectedBorder') ||
			turrets.slowTurret.classList.contains('turretSelectedBorder') ||
			turrets.flameTurret.classList.contains('turretSelectedBorder')
		) {
			this.turretSelected = turretSelected;
		} else {
			this.turretSelected = '';
		}

		//it will trigger while ONE turret is selected
		//we need to specify here again the range, because when we do at 424 in the
		//createTurret() function, the range is decided when we do a onmousedown, we need this before that (onmousemove)
		if (this.turretSelected && this.userGold >= 70) {
			if (this.turretSelected === 'sand') {
				turretRangeIs = this.getTurretRange(this.turretSelected);
				this.placeHolderImg.src = '../../images/towers/sandTurret.png';
			} else if (this.turretSelected === 'catapult') {
				turretRangeIs = this.getTurretRange(this.turretSelected);
				this.placeHolderImg.src = '../../images/towers/stoneTurret.png';
			} else if (this.turretSelected === 'slow') {
				turretRangeIs = this.getTurretRange(this.turretSelected);
				this.placeHolderImg.src = '../../images/towers/freezeTurret.png';
			} else if (this.turretSelected === 'flame') {
				turretRangeIs = this.getTurretRange(this.turretSelected);
				this.placeHolderImg.src = '../../images/towers/flameTurret.png';
			}

			//draw the range of the turret
			this.context.save();
			this.context.beginPath();
			this.context.arc(posX, posY, turretRangeIs, 0, Math.PI * 2);
			this.context.globalCompositeOperation = 'source-over';
			this.context.strokeStyle = 'rgba(147, 250, 165, 0.8)';
			this.context.lineWidth = 4;
			this.context.stroke();
			this.context.restore();

			//filter to red or green, red = can't build/green = can build
			if (isHittingPath === false) {
				if (turretOverTurret === false) {
					if (this.turretSelected === 'sand' && this.userGold >= 70) {
						filterColor = 'grayscale(100%) brightness(80%) sepia(300%) hue-rotate(50deg) saturate(500%)';
					} else if (this.turretSelected === 'catapult' && this.userGold >= 150) {
						filterColor = 'grayscale(100%) brightness(80%) sepia(300%) hue-rotate(50deg) saturate(500%)';
					} else if (this.turretSelected === 'slow' && this.userGold >= 200) {
						filterColor = 'grayscale(100%) brightness(80%) sepia(300%) hue-rotate(50deg) saturate(500%)';
					} else if (this.turretSelected === 'flame' && this.userGold >= 300) {
						filterColor = 'grayscale(100%) brightness(80%) sepia(300%) hue-rotate(50deg) saturate(500%)';
					} else {
						filterColor =
							'grayscale(100%) brightness(40%) sepia(100%) hue-rotate(-50deg) saturate(600%) contrast(0.8)';
					}
				} else if (turretOverTurret === true) {
					filterColor =
						'grayscale(100%) brightness(40%) sepia(100%) hue-rotate(-50deg) saturate(600%) contrast(0.8)';
				}
			} else {
				filterColor =
					'grayscale(100%) brightness(40%) sepia(100%) hue-rotate(-50deg) saturate(600%) contrast(0.8)';
			}

			//draw a placeholder turret
			this.context.save();
			this.context.globalCompositeOperation = 'source-over';
			this.context.filter = filterColor;
			this.context.drawImage(
				this.placeHolderImg,
				posX - this.turretSizeW / 2,
				posY - this.turretSizeW / 2,
				this.turretSizeW,
				this.turretSizeH
			);
			this.context.restore();
		}
	}

	//Function to create turret when clicking with left-mouse button
	createTurret(pos, type) {
		if (pos.click === 0) {
			let turret = null;
			let towerCost = 0;

			if (!this.positionTower(pos)) {
				if (type === 'sand') {
					this.rangeTurret = this.getTurretRange(type);
					turret = new Turret(
						this.context,
						pos.x,
						pos.y,
						this.turretSizeW,
						this.turretSizeH,
						this.rangeTurret
					);
					towerCost = turret.returnPrice();
					if (this.userGold >= towerCost) {
						if (
							!turret.turretInPath(this.path, pos, this.turretHitBox, this.turretSizeW, this.turretSizeH)
						) {
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
					this.rangeTurret = this.getTurretRange(type);
					turret = new SlowTurret(
						this.context,
						pos.x,
						pos.y,
						this.turretSizeW,
						this.turretSizeH,
						this.rangeTurret
					);
					towerCost = turret.returnPrice();
					if (this.userGold >= towerCost) {
						if (
							!turret.turretInPath(this.path, pos, this.turretHitBox, this.turretSizeW, this.turretSizeH)
						) {
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
					this.rangeTurret = this.getTurretRange(type);
					turret = new FlameTurret(
						this.context,
						pos.x,
						pos.y,
						this.turretSizeW,
						this.turretSizeH,
						this.rangeTurret
					);
					towerCost = turret.returnPrice();
					if (this.userGold >= towerCost) {
						if (
							!turret.turretInPath(this.path, pos, this.turretHitBox, this.turretSizeW, this.turretSizeH)
						) {
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
					this.rangeTurret = this.getTurretRange(type);
					turret = new CatapultTurret(
						this.context,
						pos.x,
						pos.y,
						this.turretSizeW,
						this.turretSizeH,
						this.rangeTurret
					);
					towerCost = turret.returnPrice();
					if (this.userGold >= towerCost) {
						if (
							!turret.turretInPath(this.path, pos, this.turretHitBox, this.turretSizeW, this.turretSizeH)
						) {
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

	//function that gets the range of every turret
	getTurretRange(turret) {
		if (turret === 'sand') {
			return 255;
		} else if (turret === 'catapult') {
			return 450;
		} else if (turret === 'slow') {
			return 255;
		} else if (turret === 'flame') {
			return 450;
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

	// function to show player hp
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

	//function to know wich turret is selected in lower menu
	checkTurretSelected(turret) {
		this.turretSelected = turret;

		var turrets = this.selectionTurretMenu();

		if (this.turretSelected == 'sand') {
			turrets.sandTurret.classList.add('turretSelectedBorder');
			turrets.cataTurret.classList.remove('turretSelectedBorder');
			turrets.slowTurret.classList.remove('turretSelectedBorder');
			turrets.flameTurret.classList.remove('turretSelectedBorder');
		} else if (this.turretSelected == 'catapult') {
			turrets.sandTurret.classList.remove('turretSelectedBorder');
			turrets.cataTurret.classList.add('turretSelectedBorder');
			turrets.slowTurret.classList.remove('turretSelectedBorder');
			turrets.flameTurret.classList.remove('turretSelectedBorder');
		} else if (this.turretSelected == 'slow') {
			turrets.sandTurret.classList.remove('turretSelectedBorder');
			turrets.cataTurret.classList.remove('turretSelectedBorder');
			turrets.slowTurret.classList.add('turretSelectedBorder');
			turrets.flameTurret.classList.remove('turretSelectedBorder');
		} else if (this.turretSelected == 'flame') {
			turrets.sandTurret.classList.remove('turretSelectedBorder');
			turrets.cataTurret.classList.remove('turretSelectedBorder');
			turrets.slowTurret.classList.remove('turretSelectedBorder');
			turrets.flameTurret.classList.add('turretSelectedBorder');
		}
	}

	//function for when we win the game (cheat = ezwin calls this)
	gameWin() {
		//wining sound reset to 0
		this.audio2.currentTime = 0;

		if (this.downloadTimer != '') {
			clearInterval(this.downloadTimer);
			this.timeleft = 10;
		}

		//game paused
		this.gameStatus = 'false';

		//in case we used this cheat, we mute it
		this.audio7.volume = 0;
		this.audio7.currentTime = 0;
		this.audio7.pause();

		//add no pointer events class to prevent bugs or behaviours
		this.canvasBoard.classList.add('noPointerEvents');

		//We stop the game
		window.cancelAnimationFrame(this.intervalId);
		this.restartTextCd.innerText = 'Exiting game in 10 seconds';
		this.endGameMenuDiv.classList.remove('hidden');
		this.audio1.pause();

		//we prevent cheating when the game is finished
		this.cheatCodeInput.value = this.textDefault;
		this.cheatCodeInput.disabled = true;

		if (this.soundOn.classList.contains('buttonSelectedBorder')) {
			this.audio2.volume = 0.1;
			this.audio2.play();
		} else if (this.soundOff.classList.contains('buttonSelectedBorder')) {
			this.audio2.volume = 0;
			this.audio2.pause();
		}
		//We clear the map
		this.clearCanvas();
		//we reset everything to default to prevent multiple bugs or behaviours
		this.defaultSetupGame();
		//We show the winer/loser logo
		this.context.drawImage(this.winner, 125, -55, 950, 420);

		//10 seconds, refresh or click
		this.downloadTimer = setInterval(() => {
			if (this.timeleft <= 0) {
				if (!this.endGameMenuDiv.classList.contains('hidden')) {
					setInterval(this.downloadTimer);
					this.exitGame();
				}
			} else {
				this.restartTextCd.innerText = 'Exiting game in ' + this.timeleft + ' seconds';
			}
			this.timeleft -= 1;
		}, 1000);
	}

	//function when we lose the game (cheat = 4lose calls this)
	gameLost() {
		//defeat sound reset to 0
		this.audio3.currentTime = 0;
		if (this.downloadTimer != '') {
			clearInterval(this.downloadTimer);
			this.timeleft = 10;
		}

		//game paused
		this.gameStatus = 'false';

		//in case we used this cheat, we mute it
		this.audio7.volume = 0;
		this.audio7.currentTime = 0;
		this.audio7.pause();

		//add no pointer events class to prevent bugs or behaviours
		this.canvasBoard.classList.add('noPointerEvents');

		//we prevent cheating when the game is finished
		this.cheatCodeInput.value = this.textDefault;
		this.cheatCodeInput.disabled = true;

		window.cancelAnimationFrame(this.intervalId);
		this.restartTextCd.innerText = 'Exiting game in 10 seconds';
		this.endGameMenuDiv.classList.remove('hidden');

		//We clear the map
		this.clearCanvas();
		//we reset everything to default to prevent multiple bugs or behaviours
		this.defaultSetupGame();
		//We show the winer/loser logo
		this.context.drawImage(this.loser, 295, -10, 600, 300);
		this.audio1.pause();

		if (this.soundOn.classList.contains('buttonSelectedBorder')) {
			this.audio3.volume = 0.1;
			this.audio3.play();
		} else if (this.soundOff.classList.contains('buttonSelectedBorder')) {
			this.audio3.volume = 0;
			this.audio3.pause();
		}

		//10 seconds, refresh or click
		this.downloadTimer = setInterval(() => {
			if (this.timeleft <= 0) {
				if (!this.endGameMenuDiv.classList.contains('hidden')) {
					setInterval(this.downloadTimer);
					this.exitGame();
				}
			} else {
				this.restartTextCd.innerText = 'Exiting game in ' + this.timeleft + ' seconds';
			}
			this.timeleft -= 1;
		}, 1000);
	}

	//function to reload the game to its own main page - called in win/lose menu
	exitGame() {
		location.reload();
	}

	//Utils functions
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

	//Function to check soundOFF soundON UI and change the border
	checkSound() {
		if (this.soundOn.classList.contains('buttonSelectedBorder')) {
			this.audio1.volume = 0.1;
			this.audio1.play();
			this.audio1.loop = true;
		} else if (this.soundOff.classList.contains('buttonSelectedBorder')) {
			this.audio1.volume = 0;
			this.audio1.pause();
			this.audio2.volume = 0;
			this.audio2.pause();
			this.audio3.volume = 0;
			this.audio3.pause();
			this.audio4.currentTime = 0;
			this.audio4.volume = 0;
			this.audio4.pause();
			this.audio5.volume = 0;
			this.audio5.pause();
			this.audio6.currentTime = 0;
			this.audio6.volume = 0;
			this.audio6.pause();
			this.audio7.currentTime = 0;
			this.audio7.volume = 0;
			this.audio7.pause();
		}
	}

	//Function to pause the game clicking ESC key
	pauseGame() {
		if (this.gameStatus === 'true') {
			//game paused
			this.gameStatus = 'false';
			//we stop all the audios to prevent bugs
			this.audio1.volume = 0;
			this.audio1.pause();
			this.audio2.volume = 0;
			this.audio2.pause();
			this.audio3.volume = 0;
			this.audio3.pause();
			this.audio4.currentTime = 0;
			this.audio4.volume = 0;
			this.audio4.pause();
			this.audio5.volume = 0;
			this.audio5.pause();
			this.audio6.currentTime = 0;
			this.audio6.volume = 0;
			this.audio6.pause();
			this.audio7.currentTime = 0;
			this.audio7.volume = 0;
			this.audio7.pause();

			//we return true while we are in this screen
			this.pauseStatus = 'true';

			//we prevent cheating while game is paused
			this.cheatCodeInput.value = this.textDefault;
			this.cheatCodeInput.disabled = true;

			//add or remove a border in the soundon soundoff icon
			if (
				this.soundOn.getAttribute('isActive') === 'true' &&
				this.soundOff.getAttribute('isActive') === 'false'
			) {
				this.soundOff.classList.add('buttonSelectedBorder');
				this.soundOn.classList.remove('buttonSelectedBorder');
			}

			//add pointer events class to prevent building in pause time
			this.canvasBoard.classList.add('noPointerEvents');
			//DIV pause show up
			this.pauseMenu.style.visibility = 'visible';
		} else if (this.gameStatus === 'false') {
			//continue game
			this.gameStatus = 'true';
			this.run();
			this.audio1.volume = 0.1;
			this.audio1.play();

			//we prevent cheating while game is paused
			this.cheatCodeInput.disabled = false;

			//add or remove a border in the soundon soundoff icon
			if (
				this.soundOn.getAttribute('isActive') === 'false' &&
				this.soundOff.getAttribute('isActive') === 'true'
			) {
				this.soundOff.classList.add('buttonSelectedBorder');
				this.soundOn.classList.remove('buttonSelectedBorder');
			} else {
				this.soundOff.classList.remove('buttonSelectedBorder');
				this.soundOn.classList.add('buttonSelectedBorder');
			}

			//remove pointer events class to build again after pause
			this.canvasBoard.classList.remove('noPointerEvents');
			// we hide the pause menu
			this.pauseMenu.style.visibility = 'hidden';
		}
	}

	// Function to restart level (menu pause or win/lose menu after game)
	restartLvl() {
		this.gameStatus = 'true';
		this.endGameMenuDiv.classList.add('hidden');
		clearInterval(this.intervalId);
		//we hide the pause menu to instant restart of the lvl
		this.pauseMenu.style.visibility = 'hidden';
		//we play audio again
		this.audio1.volume = 0.1;
		this.audio2.pause();
		this.audio3.pause();
		//we reset the audio time to start it from 0
		this.audio1.currentTime = 0;
		this.audio1.play();
		//add or remove a border in the soundon soundoff icon
		this.soundOn.classList.add('buttonSelectedBorder');
		this.soundOff.classList.remove('buttonSelectedBorder');
		this.intervalId = null;
		this.clearCanvas();
		this.defaultSetupGame();
		this.run();
	}
	//Function to print campfire
	campFireCanvas(x, y) {
		var ctx = canvas.getContext('2d');
		var x = x;
		var y = y;

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
	//Function that clear the canvas
	clearCanvas() {
		this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
	}

	//when the game is reset (endgame menu or pause menu), if game was muted, it stay muted and turrets lose their classes
	//we also reset game properties such as HP, gold, etc
	defaultSetupGame() {
		var turrets = this.selectionTurretMenu();

		//we remove the border in all towers in the selection menu
		turrets.sandTurret.classList.remove('turretSelectedBorder');
		turrets.cataTurret.classList.remove('turretSelectedBorder');
		turrets.slowTurret.classList.remove('turretSelectedBorder');
		turrets.flameTurret.classList.remove('turretSelectedBorder');

		//game properties reset
		this.waves = [];
		this.turretSelected = '';
		this.waveIndex = 0;
		this.waveEnemies = 0;
		this.enemies = [];
		this.towers = [];
		this.userHP = 35;
		this.userGold = 500;
	}

	//Function to return the ID of all turrets, we use this quite a lot
	selectionTurretMenu() {
		const sandTurret = document.getElementById('sandTurret');
		const cataTurret = document.getElementById('cataTurret');
		const slowTurret = document.getElementById('slowTurret');
		const flameTurret = document.getElementById('flameTurret');

		return {
			sandTurret,
			cataTurret,
			slowTurret,
			flameTurret
		};
	}

	thanosSnap() {
		//console.log('snap');
		//this.enemies.forEach((enemy) => console.log(enemy));

		if (this.soundOn.classList.contains('buttonSelectedBorder')) {
			this.audio7.volume = 0.1;
			this.audio7.play();
			this.audio1.loop = true;
		} else if (this.soundOff.classList.contains('buttonSelectedBorder')) {
			this.audio7.volume = 0;
			this.audio7.pause();
		}

		setTimeout(() => {
			this.enemies.forEach((enemy) => this.killAllShownEnemies(enemy));
		}, 3200);

		// console.log(this.enemies[0].img.currentSrc);
		// console.log(this.enemies[0].img.currentLoopIndex);
		// console.log(this.enemies[0].img.frames);
		//----------------------------------------------
		// startAnimation();
		// const imageBox = document.querySelector('#image');
		// const image = document.querySelector('#image img');
		// const btn = document.querySelector('.btn');
		// var isPlay = false; //是否触发了动画
		// btn.onclick = function() {};
		// function startAnimation() {
		// 	image.classList.remove('quickFade');
		// 	snap(imageBox);
		// }
		// const snap = (target) => {
		// 	isPlay = true;
		// 	const canvasCount = 20;
		// 	const ctx = canvas.getContext('2d');
		// 	const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
		// 	const pixelArr = imageData.data;
		// 	const data = imageData.data.slice(0).fill(0);
		// 	let imageDataArray = Array.from({ length: canvasCount }, (e) => data.slice(0));
		// 	for (let i = 0; i < pixelArr.length; i += 4) {
		// 		const p = Math.floor(i / pixelArr.length * canvasCount);
		// 		const a = imageDataArray[weightedRandomDistrib(p, canvasCount)];
		// 		a[i] = pixelArr[i];
		// 		a[i + 1] = pixelArr[i + 1];
		// 		a[i + 2] = pixelArr[i + 2];
		// 		a[i + 3] = pixelArr[i + 3];
		// 	}
		// 	for (let i = 0; i < canvasCount; i++) {
		// 		const c = newCanvasFromImageData(imageDataArray[i], canvas.width, canvas.height);
		// 		c.classList.add('dust');
		// 		setTimeout(() => {
		// 			animateTransform(c, 200, -100, chance.integer({ min: -25, max: 25 }), 2000);
		// 			c.classList.add('blur');
		// 			setTimeout(() => {
		// 				c.remove();
		// 			}, 2050);
		// 		}, 70 * i);
		// 		target.appendChild(c);
		// 	}
		// 	Array.from(target.querySelectorAll(':not(.dust)')).map((el) => {
		// 		el.classList.add('quickFade');
		// 	});
		// };
		// function weightedRandomDistrib(peak, count) {
		// 	const prob = [],
		// 		seq = [];
		// 	for (let i = 0; i < count; i++) {
		// 		prob.push(Math.pow(count - Math.abs(peak - i), 6));
		// 		seq.push(i);
		// 	}
		// 	return chance.weighted(seq, prob);
		// }
		// function animateTransform(elem, sx, sy, angle, duration) {
		// 	elem.animate(
		// 		[
		// 			{ transform: 'rotate(0) translate(0, 0)' },
		// 			{
		// 				transform: 'rotate(' + angle + 'deg) translate(' + sx + 'px,' + sy + 'px)'
		// 			}
		// 		],
		// 		{
		// 			duration: duration,
		// 			easing: 'ease-in'
		// 		}
		// 	);
		// }
		// function newCanvasFromImageData(imageDataArray, w, h) {
		// 	const canvas = document.createElement('canvas');
		// 	canvas.width = w;
		// 	canvas.height = h;
		// 	const tempCtx = canvas.getContext('2d');
		// 	tempCtx.putImageData(new ImageData(imageDataArray, w, h), 0, 0);
		// 	return canvas;
		// }
	}

	killAllShownEnemies(enemy) {
		return (enemy.minionHp = 0);
	}

	checkGameStatus() {
		return this.gameStatus;
	}

	checkPauseStatus() {
		return this.pauseStatus;
	}
}
