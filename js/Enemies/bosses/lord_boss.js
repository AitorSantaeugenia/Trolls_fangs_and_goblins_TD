class LordBoss extends Minons {
  constructor(context, path, width, height) {
    super(context, path, width, height);
    this.x = this.path[0][0];
    this.y = this.path[0][1];
    this.w = 60;
    this.h = 60;

    // Stats
    this.speed = 1;
    this.gold = 150;
    this.minionHp = 5000;

    this.swidth = 300;
    this.sheight = 300;
    this.varHPBAR = -20;
    this.offSetMinion = 12;

    // img
    this.img = new Image();
    this.img.src = `./../../../images/enemies/bosses/lord.png`;
    this.img.currentLoopIndex = 0;
    this.img.frames = 3;
  }
}
