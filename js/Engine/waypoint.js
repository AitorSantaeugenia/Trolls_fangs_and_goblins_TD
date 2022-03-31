class Waypoint {
	constructor(context, path, pathW) {
		//Setters
		this.context = context;
		this.path = path;
		this.widthPath = pathW;
		this.x = 0;
		this.y = 0;
		this.w = this.context.canvas.width;
		this.h = this.context.canvas.height;

		//load Floor img
		this.img = new Image();
		this.img.src = './images/terrain/floor.png';
	}

	//Methods
	draw() {
		// Floor pattern
		this.context.fillStyle = this.context.createPattern(this.img, 'repeat');
		this.context.globalCompositeOperation = 'source-over';

		for (let i = 0, l = this.path.length; i < l - 1; i++) {
			const axisX = this.path[i + 1][0] - this.path[i][0];
			const axisY = this.path[i + 1][1] - this.path[i][1];

			if (axisX === 0) {
				//Up-Down
				if (axisY > 0) {
					this.pathVerticalDown(i);
				} else {
					this.pathVerticalUp(i);
				}
			} else if (axisY === 0) {
				// Left-Right
				if (axisX > 0) {
					this.pathHorizontalRight(i);
				} else {
					this.pathHorizontalLeft(i);
				}
			}
		}
	}

	pathVerticalUp(i) {
		this.context.beginPath();

		this.context.moveTo(this.path[i][0] - this.widthPath, this.path[i][1] - this.widthPath);

		this.context.lineTo(this.path[i][0] - this.widthPath, this.path[i][1] + this.widthPath);

		this.context.lineTo(this.path[i][0] + this.widthPath, this.path[i][1] + this.widthPath);

		this.context.lineTo(this.path[i][0] + this.widthPath, this.path[i][1] - this.widthPath);

		this.context.lineTo(this.path[i + 1][0] + this.widthPath, this.path[i + 1][1] + this.widthPath);

		this.context.lineTo(this.path[i + 1][0] + this.widthPath, this.path[i + 1][1] - this.widthPath);

		this.context.lineTo(this.path[i + 1][0] - this.widthPath, this.path[i + 1][1] - this.widthPath);

		this.context.lineTo(this.path[i + 1][0] - this.widthPath, this.path[i + 1][1] + this.widthPath);

		this.context.fill();
		this.context.closePath();
	}

	pathVerticalDown(i) {
		this.context.beginPath();

		this.context.moveTo(this.path[i][0] - this.widthPath, this.path[i][1] + this.widthPath);

		this.context.lineTo(this.path[i][0] - this.widthPath, this.path[i][1] - this.widthPath);

		this.context.lineTo(this.path[i][0] + this.widthPath, this.path[i][1] - this.widthPath);

		this.context.lineTo(this.path[i][0] + this.widthPath, this.path[i][1] + this.widthPath);

		this.context.lineTo(this.path[i + 1][0] + this.widthPath, this.path[i + 1][1] - this.widthPath);

		this.context.lineTo(this.path[i + 1][0] + this.widthPath, this.path[i + 1][1] + this.widthPath);

		this.context.lineTo(this.path[i + 1][0] - this.widthPath, this.path[i + 1][1] + this.widthPath);

		this.context.lineTo(this.path[i + 1][0] - this.widthPath, this.path[i + 1][1] - this.widthPath);

		this.context.fill();
		this.context.closePath();
	}

	pathHorizontalRight(i) {
		this.context.beginPath();

		this.context.moveTo(this.path[i][0] + this.widthPath, this.path[i][1] + this.widthPath);

		this.context.lineTo(this.path[i][0] - this.widthPath, this.path[i][1] + this.widthPath);

		this.context.lineTo(this.path[i][0] - this.widthPath, this.path[i][1] - this.widthPath);

		this.context.lineTo(this.path[i][0] + this.widthPath, this.path[i][1] - this.widthPath);

		this.context.lineTo(this.path[i + 1][0] - this.widthPath, this.path[i + 1][1] - this.widthPath);

		this.context.lineTo(this.path[i + 1][0] + this.widthPath, this.path[i + 1][1] - this.widthPath);

		this.context.lineTo(this.path[i + 1][0] + this.widthPath, this.path[i + 1][1] + this.widthPath);

		this.context.lineTo(this.path[i + 1][0] - this.widthPath, this.path[i + 1][1] + this.widthPath);

		this.context.fill();
		this.context.closePath();
	}

	pathHorizontalLeft(i) {
		this.context.beginPath();

		this.context.moveTo(this.path[i][0] - this.widthPath, this.path[i][1] - this.widthPath);

		this.context.lineTo(this.path[i][0] + this.widthPath, this.path[i][1] - this.widthPath);

		this.context.lineTo(this.path[i][0] + this.widthPath, this.path[i][1] + this.widthPath);

		this.context.lineTo(this.path[i][0] - this.widthPath, this.path[i][1] + this.widthPath);

		this.context.lineTo(this.path[i + 1][0] + this.widthPath, this.path[i + 1][1] + this.widthPath);

		this.context.lineTo(this.path[i + 1][0] - this.widthPath, this.path[i + 1][1] + this.widthPath);

		this.context.lineTo(this.path[i + 1][0] - this.widthPath, this.path[i + 1][1] - this.widthPath);

		this.context.lineTo(this.path[i + 1][0] + this.widthPath, this.path[i + 1][1] - this.widthPath);

		this.context.fill();
		this.context.closePath();
	}
}
