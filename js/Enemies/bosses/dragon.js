class Dragon extends Minons {
  constructor(context, path, width, height) {
    super(context, path, width, height);
    this.x = this.path[0][0];
    this.y = this.path[0][1];
    this.w = 100;
    this.h = 100;

    // Stats
    this.speed = 1.4;
    this.gold = 50;
    this.minionHp = 500;
    this.minionHpOffset = 500;

    this.swidth = 300;
    this.sheight = 300;
    this.varHPBAR = -30;
    this.offSetMinion = 20;

    // img
    this.img = new Image();
    this.img.src = `./../../../images/enemies/bosses/dragon_boss.png`;
    this.img.currentLoopIndex = 0;
    this.img.frames = 3;
  }
}
