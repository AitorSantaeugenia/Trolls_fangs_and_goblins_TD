class projectileTurret {
  constructor(context, posX, posY, reachX, reachY, turretType) {
    this.context = context;
    //Width - Height
    this.posY = posY;
    this.posX = posX;
    //Hiting reach position
    this.reachX = reachX;
    this.reachY = reachY;
    this.turretType = turretType;
    //Tower speed
    this.speed = 12;
    //load projectiles
    this.img = new Image();
    this.img.type = {
      sand: "./images/bullets/sandrock.png",
      catapult: "./images/bullets/rockchain.png",
      slow: "./images/bullets/snowball.png",
      flame: "./images/bullets/fireball.png",
    };
    this.img.src = this.img.type[turretType];
    //Width - Height
    if (this.turretType === "sand") {
      this.w = 12;
      this.h = 12;
    } else if (this.turretType === "slow") {
      this.w = 12;
      this.h = 12;
      this.speed = 10;
    } else if (this.turretType === "flame") {
      this.w = 15;
      this.h = 15;
      this.speed = 40;
    } else {
      this.w = 20;
      this.h = 20;
      this.speed = 8;
    }
  }

  draw() {
    this.context.globalCompositeOperation = "source-over";
    this.context.drawImage(
      this.img,
      this.posX - 5,
      this.posY - 20,
      this.w,
      this.h
    );
  }

  move() {
    if (this.reachX - this.posX > 0) {
      this.posX +=
        this.speed *
        (Math.abs(this.reachX - this.posX) /
          (Math.abs(this.reachX - this.posX) +
            Math.abs(this.reachY - this.posY)));
    } else {
      this.posX -=
        this.speed *
        (Math.abs(this.reachX - this.posX) /
          (Math.abs(this.reachX - this.posX) +
            Math.abs(this.reachY - this.posY)));
    }

    if (this.reachY - this.posY > 0) {
      this.posY +=
        this.speed *
        (1 -
          Math.abs(this.reachX - this.posX) /
            (Math.abs(this.reachX - this.posX) +
              Math.abs(this.reachY - this.posY)));
    } else {
      this.posY -=
        this.speed *
        (1 -
          Math.abs(this.reachX - this.posX) /
            (Math.abs(this.reachX - this.posX) +
              Math.abs(this.reachY - this.posY)));
    }
  }

  hittingPosition() {
    return (
      this.posX + this.speed >= this.reachX &&
      this.posX - this.speed <= this.reachX &&
      this.posY + this.speed >= this.reachY &&
      this.posY - this.speed <= this.reachY
    );
  }
}
