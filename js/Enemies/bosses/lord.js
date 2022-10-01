class Lord extends Minons {
  constructor(context, path, width, height) {
    super(context, path, width, height);
    this.x = this.path[0][0];
    this.y = this.path[0][1];
    this.w = 50;
    this.h = 50;

    // Stats
    this.speed = 1.8;
    this.gold = 100;
    this.minionHp = 2000;
    this.minionHpOffset = 2000;

    this.swidth = 300;
    this.sheight = 300;
    this.varHPBAR = -7;
    this.offSetMinion = 7;

    // img
    this.img = new Image();
    this.img.src = `./../../../images/enemies/bosses/lord_2.png`;
    this.img.currentLoopIndex = 0;
    this.img.frames = 3;
  }
}
