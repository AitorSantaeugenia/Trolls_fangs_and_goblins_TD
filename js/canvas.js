class Canvas {
	constructor(context, pathW) {
		//Setters
		this.context = context;
		this.pathW = pathW;
		//load Floor img
		this.img = new Image();
		this.img.src = 'https://aitorsantaeugenia.github.io/TD_Project1/images/terrain/floor.png';
	}

	//Methods
	draw() {
		// Pintamos floor pattern
		this.context.fillStyle = this.context.createPattern(this.img, 'repeat');
	}
}
