class HPbar {
	constructor(context, posx, posy, width, height, color) {
		this.context = context;
		this.posx = posx;
		this.posy = posy;
		this.width = width;
		this.height = height;
		this.color = color;
	}

	draw() {
		this.context.fillStyle = this.color;
		this.img = new Image();
		this.img.src = 'https://aitorsantaeugenia.github.io/TD_Project1/images/hbar.png';
		this.context.globalCompositeOperation = 'source-over';
		this.context.drawImage(this.img, this.posx, this.posy, this.width, this.height);
	}
}
