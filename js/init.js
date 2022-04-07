window.onload = function() {
	const gameInterface = document.getElementById('startingMenu');

	const start = new StartGame();
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
		let test = cheatCodeInput.classList;
		let textToUpper = cheatInput.value;
		textToUpper = textToUpper.toLowerCase();
		let textDefault = 'Insert cheatcode ...';

		//In game cheats
		if (event.key === 'Enter' && test == 'hidden') {
			cheatCodeInput.classList.remove('hidden');
			//when clicking ENTER to insert a cheatcode, it get focus of the whole text, you need just start typing
			let checkLength = cheatInput.value;
			checkLength = checkLength.length;
			cheatInput.focus();
			cheatInput.setSelectionRange(0, checkLength);
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
};
