class Wave {
	constructor(context, path, mWidth, mHeight) {
		this.context = context;
		this.path = path;
		// Minions x wave
		this.waveCount = 10;
		//Minion properties
		this.minionWidth = mWidth;
		this.minionHeight = mHeight;
		// Waves
		this.wave = [
			this.getWave1(this.waveCount),
			this.getWave2(this.waveCount),
			this.getWave3(this.waveCount),
			this.getWave4(this.waveCount),
			this.getWave5(this.waveCount)
		];
	}

	//Number of waves
	getWave1() {
		let wave = [];
		let countEnemies = this.waveCount;
		for (let i = 1; i <= countEnemies; i++) {
			wave.push(new Minons(this.context, this.path, this.minionHeight, this.minionWidth));
		}
		return wave;
	}
	getWave2() {
		let wave = [];
		let countEnemies = this.waveCount + 10;
		for (let i = 1; i <= countEnemies; i++) {
			wave.push(new Minons(this.context, this.path, this.minionHeight, this.minionWidth));
		}
		return wave;
	}
	getWave3() {
		let wave = [];
		let countEnemies = this.waveCount;
		for (let i = 1; i <= countEnemies; i++) {
			wave.push(new Minons(this.context, this.path, this.minionHeight, this.minionWidth));
		}
		return wave;
	}
	getWave4() {
		let wave = [];
		let countEnemies = this.waveCount + 10;
		for (let i = 1; i <= countEnemies; i++) {
			wave.push(new Minons(this.context, this.path, this.minionHeight, this.minionWidth));
		}
		return wave;
	}
	getWave5() {
		let wave = [];
		let countEnemies = this.waveCount;
		for (let i = 1; i <= countEnemies; i++) {
			wave.push(new Minons(this.context, this.path, this.minionHeight, this.minionWidth));
		}
		return wave;
	}
}
