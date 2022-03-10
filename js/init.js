window.onload = function() {
	const gameInterface = document.getElementById('startingMenu');
	let canvas = document.getElementById('canvas');
	let canvas1 = '';
	let canvas2 = '';
	let canvas3 = '';
	let canvas4 = '';
	let context = canvas.getContext('2d');
	const start = new StartGame(context);
	const canvasContainer = document.getElementById('canvasContainer');
	const gameMenu = document.getElementById('gameMenu');
	const startGameButton = document.getElementById('startGame');
	const sandTurret = document.getElementById('sandTurret');
	const cataTurret = document.getElementById('cataTurret');
	const slowTurret = document.getElementById('slowTurret');
	const flameTurret = document.getElementById('flameTurret');
	const priceTurret = document.getElementById('idGoldTurretCost');
	let turretSelected = '';
	const audio1 = document.getElementById('backgroundMusic');
	const audio2 = document.getElementById('victoryMusic');
	const audio3 = document.getElementById('defeatMusic');
	const audio4 = document.getElementById('jobDone');
	const audio5 = document.getElementById('liveLessMusic');
	const audio = document.getElementById('buttonMusic');
	let cheatCodeInput = document.getElementById('cheatCodes');
	let goldCheat = document.getElementById('inputCheatCode');
	let restartButton = document.getElementById('restarButtonDiv');
	let soundOn = document.getElementById('yesSound');
	let soundOff = document.getElementById('noSound');

	// Starting v.02
	// HOME MENU - LVL SELECTION UI
	// DIV container to select lvls
	const selectedEasy = document.getElementById('selectedEasy');
	const selectedNormal = document.getElementById('selectedNormal');
	const selectedHard = document.getElementById('selectedHard');
	const selectedHell = document.getElementById('selectedHell');
	// Hover DIV select lvls, we use this to know which canvas+context use when selecting the mode
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
	// let context = document.getElementById('canvas');
	// start = new StartGame(context);

	// Events
	// event to know which lvl is selected and what canvas & context use in that case
	document.addEventListener('click', function() {
		if (selectedTrueEasy.getAttribute('activationlvl') === 'true') {
			canvas2 = document.getElementById('canvasNormal');
			canvas3 = document.getElementById('canvasHard');
			canvas4 = document.getElementById('canvasHell');
			canvas = document.getElementById('canvas');
			context = canvas.getContext('2d');
			canvas.classList.remove('hidden');
			canvas2.classList.add('hidden');
			canvas3.classList.add('hidden');
			canvas4.classList.add('hidden');
			// startSelectedLevel(context);
		} else if (selectedTrueNormal.getAttribute('activationlvl') === 'true') {
			canvas1 = document.getElementById('canvas');
			canvas3 = document.getElementById('canvasHard');
			canvas4 = document.getElementById('canvasHell');
			canvas = document.getElementById('canvasNormal');
			context = canvas.getContext('2d');
			canvas1.classList.add('hidden');
			canvas3.classList.add('hidden');
			canvas4.classList.add('hidden');
			canvasNormal.classList.remove('hidden');
			// startSelectedLevel(context);
		} else if (selectedTrueHard.getAttribute('activationlvl') === 'true') {
			canvas1 = document.getElementById('canvas');
			canvas2 = document.getElementById('canvasNormal');
			canvas4 = document.getElementById('canvasHell');
			canvas1.classList.add('hidden');
			canvas2.classList.add('hidden');
			canvas4.classList.add('hidden');
			canvas = document.getElementById('canvasHard');
			context = canvas.getContext('2d');
			canvasHard.classList.remove('hidden');
			// startSelectedLevel(context);
		} else if (selectedTrueHell.getAttribute('activationlvl') === 'true') {
			canvas1 = document.getElementById('canvas');
			canvas2 = document.getElementById('canvasNormal');
			canvas3 = document.getElementById('canvasHard');
			canvas1.classList.add('hidden');
			canvas2.classList.add('hidden');
			canvas3.classList.add('hidden');
			canvas = document.getElementById('canvasHell');
			context = canvas.getContext('2d');
			canvasHell.classList.remove('hidden');
			// startSelectedLevel(context);
		} else {
			canvas = document.getElementById('canvas');
			canvas2 = document.getElementById('canvasNormal');
			canvas3 = document.getElementById('canvasHard');
			canvas4 = document.getElementById('canvasHell');
			canvas.classList.remove('hidden');
			canvas2.classList.add('hidden');
			canvas3.classList.add('hidden');
			canvas4.classList.add('hidden');
			context = canvas.getContext('2d');
			// startSelectedLevel(context);
		}
	});

	// console.log(context);
	//const start = new StartGame(context);
	// console.log(context);

	// // Function to know wich canvas is selected at the start of the game
	// function startSelectedLevel(context) {
	// 	let contextStart = context;
	// 	start = new StartGame(contextStart);
	// }

	// START GAME
	// const start = new StartGame(context);

	//event to insert cheatcodes when ENTER key is pressed
	document.addEventListener('keydown', (event) => {
		let test = cheatCodeInput.classList;
		let textToUpper = goldCheat.value;
		textToUpper = textToUpper.toLowerCase();
		let textDefault = 'Insert cheatcode ...';

		//In game cheats
		if (event.key === 'Enter' && test == 'hidden') {
			cheatCodeInput.classList.remove('hidden');
		} else if (event.key === 'Enter' && test == '') {
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

	// Selecting lvl in menu
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
		console.log('aitormenta');
		start.createTurret(getCursorPosition(canvas, event), turretSelected);
	};

	cheatCodeInput.addEventListener('click', function() {
		let checkLength = goldCheat.value;
		checkLength = checkLength.length;
		goldCheat.setSelectionRange(0, checkLength);
	});

	startGameButton.addEventListener('click', function() {
		gameInterface.classList.remove('startingMenu');
		canvasContainer.classList.remove('hidden');
		gameInterface.classList.add('hidden');
		gameMenu.classList.remove('hidden');
		audio.play();
		audio.volume = 0.1;
		startGame();
	});

	restartButton.addEventListener('click', function() {
		start.restart();
	});

	sandTurret.addEventListener('click', function() {
		turretSelected = 'sand';
		priceTurret.innerHTML = '$70';
		start.checkTurretSelected(turretSelected);
	});

	cataTurret.addEventListener('click', function() {
		turretSelected = 'catapult';
		priceTurret.innerHTML = '$150';
		start.checkTurretSelected(turretSelected);
	});

	slowTurret.addEventListener('click', function() {
		turretSelected = 'slow';
		priceTurret.innerHTML = '$200';
		start.checkTurretSelected(turretSelected);
	});

	flameTurret.addEventListener('click', function() {
		turretSelected = 'flame';
		priceTurret.innerHTML = '$300';
		start.checkTurretSelected(turretSelected);
	});

	soundOn.addEventListener('click', function() {
		soundOn.classList.add('buttonSelectedBorder');
		soundOff.classList.remove('buttonSelectedBorder');
	});

	soundOff.addEventListener('click', function() {
		soundOff.classList.add('buttonSelectedBorder');
		soundOn.classList.remove('buttonSelectedBorder');
	});

	function startGame() {
		start.run(audio1, audio2, audio3, audio4, audio5);
	}
};
