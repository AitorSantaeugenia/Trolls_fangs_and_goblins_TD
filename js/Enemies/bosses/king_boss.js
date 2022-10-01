class King extends Minons {
  constructor(context, path, width, height) {
    super(context, path, width, height);
    this.x = this.path[0][0];
    this.y = this.path[0][1];
    this.w = 80;
    this.h = 80;

    // Stats
    this.speed = 1;
    this.gold = 250;
    this.minionHp = 10000;
    this.minionHpOffset = 10000;

    this.swidth = 300;
    this.sheight = 300;
    this.varHPBAR = -20;
    this.offSetMinion = 20;

    // img
    this.img = new Image();
    this.img.src = `./../../../images/enemies/bosses/king.png`;
    this.img.currentLoopIndex = 0;
    this.img.frames = 3;
  }
}
