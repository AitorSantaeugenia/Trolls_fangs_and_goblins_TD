window.onload = function() {
	const gameInterface = document.getElementById('startingMenu');

	const start = new StartGame();
	const test = new Turret();
	const canvasContainer = document.getElementById('canvasContainer');
	const gameMenu = document.getElementById('gameMenu');
	const startGameButton = document.getElementById('startGame');
	//turrets
	const sandTurret = document.getElementById('sandTurret');
	const cataTurret = document.getElementById('cataTurret');
	const slowTurret = document.getElementById('slowTurret');
	const flameTurret = document.getElementById('flameTurret');
	const priceTurret = document.getElementById('idGoldTurretCost');
	//audios
	const audio1 = document.getElementById('backgroundMusic');
	const audio2 = document.getElementById('victoryMusic');
	const audio3 = document.getElementById('defeatMusic');
	const audio4 = document.getElementById('jobDone');
	const audio5 = document.getElementById('liveLessMusic');
	const audio = document.getElementById('newGameSound');

	let soundOn = document.getElementById('yesSound');
	let soundOff = document.getElementById('noSound');
	//misc
	let turretSelected = '';
	let cheatCodeInput = document.getElementById('cheatCodes');
	let cheatInput = document.getElementById('inputCheatCode');
	let exitButton = document.getElementById('exitButtonEndGameMenu');
	let restartLvlButton = document.getElementById('restartButtonEndGameMenu');

	// Starting v.02
	// HOME MENU - LVL SELECTION UI
	// DIV container to select lvls
	const selectedEasy = document.getElementById('selectedEasy');
	const selectedNormal = document.getElementById('selectedNormal');
	const selectedHard = document.getElementById('selectedHard');
	const selectedHell = document.getElementById('selectedHell');
	// Hover DIV select lvls, we use this to know which lvl difficulty
	const selectedTrueEasy = document.getElementById('selectedTrueEasy');
	const selectedTrueNormal = document.getElementById('selectedTrueNormal');
	const selectedTrueHard = document.getElementById('selectedTrueHard');
	const selectedTrueHell = document.getElementById('selectedTrueHell');

	// PAUSE MENU - buttons
	//continue button
	const continueButtonFromPause = document.getElementById('continuePauseBtn');
	//restart button
	const restartButtonFromPause = document.getElementById('restartPauseBtn');
	//exit button
	const exitButtonFromPause = document.getElementById('toMenuPauseBtn');

	//game difficulty - default Easy
	let gameDifficulty = 'Easy';

	//canvas for mousemove
	const canvas = document.getElementById('canvas');
	const context = canvas.getContext('2d');
	//var to know when turret is selectedTrueEasy
	var turretIsSelected = false;

	//test with turret img here
	//var turretIMG = new Image();

	// Events
	// event to know which lvl difficulty is selected and do some behaviour or another in canvas
	document.addEventListener('click', function() {
		if (selectedTrueEasy.getAttribute('activationlvl') === 'true') {
			gameDifficulty = 'Easy';
		} else if (selectedTrueNormal.getAttribute('activationlvl') === 'true') {
			gameDifficulty = 'Normal';
		} else if (selectedTrueHard.getAttribute('activationlvl') === 'true') {
			gameDifficulty = 'Hard';
		} else if (selectedTrueHell.getAttribute('activationlvl') === 'true') {
			gameDifficulty = 'Hell';
		} else {
			gameDifficulty = 'Easy';
		}
	});

	//event to insert cheatcodes when ENTER key is pressed
	document.addEventListener('keydown', (event) => {
		let cheatCodeClass = cheatCodeInput.classList;
		let textToUpper = cheatInput.value;
		textToUpper = textToUpper.toLowerCase();
		let textDefault = 'Insert cheatcode ...';

		//In game cheats
		if (event.key === 'Enter' && cheatCodeClass == 'hidden') {
			cheatCodeInput.classList.remove('hidden');
			//when clicking ENTER to insert a cheatcode, it get focus of the whole text, you need just start typing
			let checkLength = cheatInput.value;
			checkLength = checkLength.length;
			cheatInput.focus();
			cheatInput.setSelectionRange(0, checkLength);
		} else if (event.key === 'Enter' && cheatCodeClass == '') {
			if (textToUpper === 'greedisgood') {
				start.cheatCodeGold();
				document.getElementById('inputCheatCode').value = textDefault;
			} else if (textToUpper === 'ezwin') {
				start.gameWin();
				document.getElementById('inputCheatCode').value = textDefault;
			} else if (textToUpper === '4lose') {
				start.gameLost();
				document.getElementById('inputCheatCode').value = textDefault;
			} else if (textToUpper === 'hollymolly') {
				start.cheatCodeGoldToTheMoon();
				document.getElementById('inputCheatCode').value = textDefault;
			} else if (textToUpper === 'whosyourdaddy') {
				// start.cheatUnlockedTurret();
				flameTurret.classList.remove('hidden');
				document.getElementById('inputCheatCode').value = textDefault;
			} else {
				document.getElementById('inputCheatCode').value = textDefault;
			}
			cheatCodeInput.classList.add('hidden');
		}
	});

	// Selecting lvl MENU - adding hover img with level instructions
	// Level EASY
	selectedEasy.addEventListener('click', function() {
		if (selectedTrueEasy.style.visibility === 'hidden') {
			selectedTrueNormal.style.visibility = 'hidden';
			selectedTrueEasy.style.visibility = 'visible';
			selectedTrueHard.style.visibility = 'hidden';
			selectedTrueHell.style.visibility = 'hidden';
			selectedTrueEasy.setAttribute('activationLvl', 'true');
			selectedTrueNormal.setAttribute('activationLvl', 'false');
			selectedTrueHard.setAttribute('activationLvl', 'false');
			selectedTrueHell.setAttribute('activationLvl', 'false');
		} else if ((selectedTrueEasy.style.visibility = 'visible')) {
			selectedTrueEasy.style.visibility = 'hidden';
			selectedTrueEasy.setAttribute('activationLvl', 'false');
		}
	});
	// Level NORMAL
	selectedNormal.addEventListener('click', function() {
		if (selectedTrueNormal.style.visibility === 'hidden') {
			selectedTrueNormal.style.visibility = 'visible';
			selectedTrueEasy.style.visibility = 'hidden';
			selectedTrueHard.style.visibility = 'hidden';
			selectedTrueHell.style.visibility = 'hidden';
			selectedTrueEasy.setAttribute('activationLvl', 'false');
			selectedTrueNormal.setAttribute('activationLvl', 'true');
			selectedTrueHard.setAttribute('activationLvl', 'false');
			selectedTrueHell.setAttribute('activationLvl', 'false');
		} else if ((selectedTrueNormal.style.visibility = 'visible')) {
			selectedTrueNormal.style.visibility = 'hidden';
			selectedTrueNormal.setAttribute('activationLvl', 'false');
		}
	});
	// Level HARD
	selectedHard.addEventListener('click', function() {
		if (selectedTrueHard.style.visibility === 'hidden') {
			selectedTrueNormal.style.visibility = 'hidden';
			selectedTrueEasy.style.visibility = 'hidden';
			selectedTrueHard.style.visibility = 'visible';
			selectedTrueHell.style.visibility = 'hidden';
			selectedTrueEasy.setAttribute('activationLvl', 'false');
			selectedTrueNormal.setAttribute('activationLvl', 'false');
			selectedTrueHard.setAttribute('activationLvl', 'true');
			selectedTrueHell.setAttribute('activationLvl', 'false');
		} else if ((selectedTrueHard.style.visibility = 'visible')) {
			selectedTrueHard.style.visibility = 'hidden';
			selectedTrueHard.setAttribute('activationLvl', 'false');
		}
	});
	// Level HELL
	selectedHell.addEventListener('click', function() {
		if (selectedTrueHell.style.visibility === 'hidden') {
			selectedTrueNormal.style.visibility = 'hidden';
			selectedTrueEasy.style.visibility = 'hidden';
			selectedTrueHard.style.visibility = 'hidden';
			selectedTrueHell.style.visibility = 'visible';
			selectedTrueEasy.setAttribute('activationLvl', 'false');
			selectedTrueNormal.setAttribute('activationLvl', 'false');
			selectedTrueHard.setAttribute('activationLvl', 'false');
			selectedTrueHell.setAttribute('activationLvl', 'true');
		} else if ((selectedTrueHell.style.visibility = 'visible')) {
			selectedTrueHell.style.visibility = 'hidden';
			selectedTrueHell.setAttribute('activationLvl', 'false');
		}
	});

	// PAUSE GAME
	document.addEventListener('keydown', (e) => {
		if (e.code === 'Escape') {
			start.pauseGame();
		}
	});

	// if we click continue (only showed at paused menu) we call start.pauseGame
	// with status false, and change to true to continue (same as clicking ESC again)
	continueButtonFromPause.addEventListener('click', function() {
		start.pauseGame();
	});

	// restart lvl from paused menu
	restartButtonFromPause.addEventListener('click', function() {
		start.restartLvl();
	});

	// refresh webpage as exit the game
	exitButtonFromPause.addEventListener('click', function() {
		location.reload();
	});

	//Other functions
	function getCursorPosition(canvas, event) {
		let range = canvas.getBoundingClientRect();
		const x = event.clientX - range.left;
		const y = event.clientY - range.top;
		return {
			x: x,
			y: y,
			click: event.button
		};
	}

	canvas.onmousedown = (event) => {
		start.createTurret(getCursorPosition(canvas, event), turretSelected);
	};

	// //testing with range display
	// canvas.onmousemove = (event) => {
	// 	// start.createTurret(getCursorPosition(canvas, event), turretSelected);
	// 	start.hoverTurret(getCursorPosition(canvas, event), turretSelected, turretIMG);
	// };

	//when clicking the INPUT to insert a cheatcode, selects the whole text, then you just need to start typing
	//is not necessary since we implemented it at line #80, but it's a better behaviour than without it
	cheatCodeInput.addEventListener('click', function() {
		let checkLength = cheatInput.value;
		checkLength = checkLength.length;
		cheatInput.setSelectionRange(0, checkLength);
	});

	startGameButton.addEventListener('click', function() {
		start.setDifficultyLvl(gameDifficulty);
		gameInterface.classList.remove('startingMenu');
		canvasContainer.classList.remove('hidden');
		gameInterface.classList.add('hidden');
		gameMenu.classList.remove('hidden');
		audio.play();
		audio.volume = 0.1;
		startGame();
	});

	exitButton.addEventListener('click', function() {
		start.exitGame();
	});

	restartLvlButton.addEventListener('click', function() {
		start.restartLvl();
	});

	sandTurret.addEventListener('click', function() {
		turretSelected = 'sand';
		priceTurret.innerHTML = '$70';
		turretIsSelected = true;
		start.checkTurretSelected(turretSelected);
	});

	cataTurret.addEventListener('click', function() {
		turretSelected = 'catapult';
		priceTurret.innerHTML = '$150';
		turretIsSelected = true;
		start.checkTurretSelected(turretSelected);
	});

	slowTurret.addEventListener('click', function() {
		turretSelected = 'slow';
		priceTurret.innerHTML = '$200';
		turretIsSelected = true;
		start.checkTurretSelected(turretSelected);
	});

	flameTurret.addEventListener('click', function() {
		turretSelected = 'flame';
		priceTurret.innerHTML = '$300';
		turretIsSelected = true;
		start.checkTurretSelected(turretSelected);
	});

	soundOn.addEventListener('click', function() {
		soundOn.classList.add('buttonSelectedBorder');
		soundOff.classList.remove('buttonSelectedBorder');
		soundOff.setAttribute('isActive', 'false');
		soundOn.setAttribute('isActive', 'true');
	});

	soundOff.addEventListener('click', function() {
		soundOff.classList.add('buttonSelectedBorder');
		soundOn.classList.remove('buttonSelectedBorder');
		soundOn.setAttribute('isActive', 'false');
		soundOff.setAttribute('isActive', 'true');
	});

	function startGame() {
		start.run(audio1, audio2, audio3, audio4, audio5);
	}

	// $('canvas').addEventListener(
	// 	'mousemove',
	// 	function(e) {
	// 		var selection = game.selection;
	// 		var turret = selection.turret;

	// 		if (selection && selection.status !== 'selected') {
	// 			var tx = Math.ceil((e.pageX - this.offsetLeft) / 5);
	// 			var ty = Math.ceil((e.pageY - this.offsetTop) / 5);

	// 			turret.x = tx * 5 - 2.5;
	// 			turret.y = ty * 5 - 2.5;
	// 			selection.placeable = tx >= 3 && tx <= 158 && ty >= 3 && ty <= 98;

	// 			for (var i = 5; i--; ) {
	// 				for (var ii = 5; ii--; ) {
	// 					if (game.tiles[tx + i - 2 + ',' + (ty + ii - 2)]) {
	// 						selection.placeable = false;
	// 						return;
	// 					}
	// 				}
	// 			}
	// 		}
	// 	},
	// 	false
	// );

	// canvas.addEventListener('mousemove', (e) => {
	// 	var turret = turretSelected;
	// 	var selection = turretIsSelected;
	// 	var canvas = document.getElementById('canvas');
	// 	var context = canvas.getContext('2d');
	// 	//console.log(turret);

	// 	//console.log(selection);
	// 	//console.log(e.pageX, e.pageY);
	// 	//console.log(e);
	// 	//console.log(context);

	// 	//console.log('FU AITOR');
	// 	//context.fillStyle = 'rgba(255, 255, 255, .3)';
	// 	// test.testingTecno(e.pageX, e.pageY, turret, context);
	// 	// context.fillStyle = 'rgba(255, 0, 0, .3)';
	// 	// context.beginPath();
	// 	// context.arc(e.pageX, e.pageY, 300, 0, Math.PI * 2, true);
	// 	// context.fill();
	// 	//let canvas = document.getElementById('canvas');
	// 	const ctx = context;
	// 	//console.log(ctx);
	// 	let pageX = e.offsetX;
	// 	let pageY = e.offsetY;
	// 	//console.log(pageX, pageY);
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
	// 	//console.log(turretIMG);
	// 	//console.log(turretIMG.src);
	// 	//console.log(turretIMG.src);
	// 	ctx.fillStyle = 'rgba(255, 255, 255, .3)';
	// 	//ctx.globalCompositeOperation = 'multiply';

	// 	ctx.beginPath();

	// 	ctx.arc(pageX, pageY, 500, 0, Math.PI * 2, true);
	// 	ctx.drawImage(turretIMG, pageX, pageY, 104, 124);
	// 	//context.lineTo(x2, y2);
	// 	ctx.fill();

	// 	//ctx.drawImage(turretIMG, 33, 71, 104, 124, 21, 20, 87, 104);
	// });
};
