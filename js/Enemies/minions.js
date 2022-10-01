//Enemy 1 - redDemon
class Minons extends Enemy {
  constructor(context, path, width, height, mode) {
    //Setters
    super(context, path);
    this.x = this.path[0][0];
    this.y = this.path[0][1];
    this.posInicialX = this.x;
    this.wHPBar = 35;
    this.pathIndex = 0;
    this.slow = false;
    this.gameDifficulty = mode;
    //Enemy stats
    this.gold = 15;
    this.minionHp = 300;
    this.minionHpOffset = 300;
    this.speed = 1.4;
    this.offSetMinion = 0;
    // Image red enemy.png
    this.randomImage = Math.trunc(Math.random() * 15);
    this.img = new Image();
    if (this.gameDifficulty === "Hell") {
      this.img.src = `./images/enemies/Osprites/${this.randomImage}.png`;
    } else {
      this.img.src = `./images/enemies/sprites/${this.randomImage}.png`;
    }

    this.canvas = document.querySelector("canvas");

    //minions properties
    this.frameCount = 0;
    this.w = width;
    this.h = height;

    //image properties
    this.img.frames = 3;
    this.img.currentLoopIndex = 0;
    this.swidth = 0;
    this.sheight = 0;

    //center HPBAR
    this.varHPBAR = 0;

    //if minion width = 40, hp is center in the middle -(-1)
    if (this.w === 40) {
      this.varHPBAR = -1;
      //else hp is center in the middle -2
    } else {
      this.varHPBAR = 2;
    }

    //different size of the sprites
    if (this.randomImage === 0) {
      this.swidth = 280;
      this.sheight = 250;
    } else if (this.randomImage === 1) {
      this.swidth = 230;
      this.sheight = 250;
    } else if (this.randomImage === 2) {
      this.swidth = 250;
      this.sheight = 268;
    } else if (this.randomImage === 3) {
      this.swidth = 270;
      this.sheight = 284;
    } else if (this.randomImage === 4) {
      this.swidth = 270;
      this.sheight = 276;
    } else if (this.randomImage === 5) {
      this.swidth = 300;
      this.sheight = 276;
    } else if (this.randomImage === 6) {
      this.swidth = 280;
      this.sheight = 276;
    } else if (this.randomImage === 7) {
      this.swidth = 280;
      this.sheight = 276;
    } else if (this.randomImage === 8) {
      this.swidth = 280;
      this.sheight = 276;
    } else if (this.randomImage === 9) {
      this.swidth = 300;
      this.sheight = 276;
    } else if (this.randomImage === 10) {
      this.swidth = 290;
      this.sheight = 276;
    } else if (this.randomImage === 11) {
      this.swidth = 300;
      this.sheight = 276;
    } else if (this.randomImage === 12) {
      this.swidth = 300;
      this.sheight = 276;
    } else if (this.randomImage === 13) {
      this.swidth = 300;
      this.sheight = 276;
    } else if (this.randomImage === 14) {
      this.swidth = 300;
      this.sheight = 276;
    } else {
      this.swidth = 180;
      this.sheight = 240;
    }
  }

  draw() {
    this.context.globalCompositeOperation = "source-over";
    this.context.drawImage(
      this.img,
      (this.img.currentLoopIndex * this.img.width) / this.img.frames,
      (this.img.height / 4) * this.direction,
      this.swidth,
      this.sheight,
      this.x - this.w / 2,
      this.y - this.h / 2 - this.offSetMinion,
      this.w,
      this.h
    );

    this.frameCount++;
    if (this.frameCount > 10) {
      this.frameCount = 0;
      this.img.currentLoopIndex++;
    }
    if (this.img.currentLoopIndex >= this.img.frames) {
      this.img.currentLoopIndex = 0;
    }

    this.paintHpBar();
  }

  move() {
    if (this.pathIndex < this.path.length) {
      this.directionPath();
    }
  }

  directionPath() {
    const distX = this.path[this.pathIndex][0] - this.x0;
    const distY = this.path[this.pathIndex][1] - this.y0;
    const percentageX = Math.abs(distX) / (Math.abs(distX) + Math.abs(distY));
    const percentageY = 1 - percentageX;

    if (distX > 0) {
      this.updateDirection("right");
      this.x += this.speed * percentageX;
    } else if (distX < 0) {
      this.updateDirection("left");
      this.x -= this.speed * percentageX;
    }

    if (distY > 0) {
      this.updateDirection("down");
      this.y += this.speed * percentageY;
    } else if (distY < 0) {
      this.updateDirection("up");
      this.y -= this.speed * percentageY;
    }

    // change to next waypoint after reaching one
    if (
      this.x + 1 >= this.path[this.pathIndex][0] &&
      this.x - 1 <= this.path[this.pathIndex][0] &&
      this.y + 1 >= this.path[this.pathIndex][1] &&
      this.y - 1 <= this.path[this.pathIndex][1]
    ) {
      this.x0 = this.path[this.pathIndex][0];
      this.y0 = this.path[this.pathIndex][1];
      this.pathIndex += 1;
    }
  }
  updateDirection(dir) {
    switch (dir) {
      case "right":
        this.direction = 0;
        break;
      case "up":
        this.direction = 3;
        break;
      case "down":
        this.direction = 1;
        break;
      case "left":
        this.direction = 2;
        break;
    }
  }
  paintHpBar() {
    new HPbar(
      this.context,
      this.x - this.w / 2 - this.varHPBAR,
      this.y - this.h / 2 - 11 - this.offSetMinion,
      (this.wHPBar * this.minionHp) / this.minionHpOffset,
      8
    ).draw();
  }

  endingObjective() {
    //Sometimes we had an error with context, that's why we are not removing this line
    //return this.x + this.w / 2 > this.context.canvas.width;

    return this.x + this.w / 2 > 1200;
  }

  isDead() {
    return this.minionHp <= 0;
  }

  returningGold() {
    return this.gold;
  }

  reduceSpeed(rate) {
    const minionSpeed = this.speed;
    this.speed *= rate;
    this.slow = true;

    // 1 sec slow
    setTimeout(() => {
      this.speed = minionSpeed;
      this.slow = false;
    }, 1000);
  }
}
