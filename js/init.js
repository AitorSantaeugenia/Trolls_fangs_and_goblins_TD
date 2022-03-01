window.onload = function() {
	const canvas = document.getElementById('canvas');
	const context = canvas.getContext('2d');
	const gameInterface = document.getElementById('startingMenu');
	const canvasContainer = document.getElementById('canvasContainer');
	const gameMenu = document.getElementById('gameMenu');
	const startGameButton = document.getElementById('startGame');
	const start = new StartGame(context);
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

	// Events
	document.addEventListener('keydown', (event) => {
		let test = cheatCodeInput.classList;
		let textToUpper = goldCheat.value;
		textToUpper = textToUpper.toLowerCase();
		let textDefault = 'Insert cheatcode ...';

		//Insert whosyourdaddy and press intro = 200gold more, clear and if you want repeat
		if (event.key === 'Enter' && test == 'hidden') {
			cheatCodeInput.classList.remove('hidden');
		} else if (event.key === 'Enter' && test == '') {
			if (textToUpper === 'greedisgood') {
				start.cheatCodeGold();
				document.getElementById('inputCheatCode').value = textDefault;
			} else if (textToUpper === 'ezwin') {
				// restartButton.classList.remove('hidden');
				start.gameWin();
				document.getElementById('inputCheatCode').value = textDefault;
			} else if (textToUpper === '4lose') {
				// restartButton.classList.remove('hidden');
				start.gameLost();
				document.getElementById('inputCheatCode').value = textDefault;
			} else if (textToUpper === 'hollymolly') {
				start.cheatCodeGoldToTheMoon();
				document.getElementById('inputCheatCode').value = textDefault;
			} else if (textToUpper === 'whosyourdaddy') {
				start.cheatUnlockedTurret();
				flameTurret.classList.remove('hidden');
				document.getElementById('inputCheatCode').value = textDefault;
			} else {
				document.getElementById('inputCheatCode').value = textDefault;
			}
			cheatCodeInput.classList.add('hidden');
		}
	});

	function getCursorPosition(canvas, event) {
		const range = canvas.getBoundingClientRect();
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

	cheatCodeInput.addEventListener('click', function() {
		let checkLength = goldCheat.value;
		checkLength = checkLength.length;
		//console.log(goldCheat);
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
		// alert('clicked green');
		soundOn.classList.add('buttonSelectedBorder');
		soundOff.classList.remove('buttonSelectedBorder');
	});

	soundOff.addEventListener('click', function() {
		// alert('clicked red');
		soundOff.classList.add('buttonSelectedBorder');
		soundOn.classList.remove('buttonSelectedBorder');
	});

	function startGame() {
		start.run(audio1, audio2, audio3, audio4, audio5);
	}
};
