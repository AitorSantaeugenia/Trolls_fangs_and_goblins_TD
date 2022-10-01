class QueenBoss extends Minons {
  constructor(context, path, width, height) {
    super(context, path, width, height);
    this.x = this.path[0][0];
    this.y = this.path[0][1];
    this.w = 60;
    this.h = 60;

    // Stats
    this.speed = 1.4;
    this.gold = 70;
    this.minionHp = 800;
    this.minionHpOffset = 800;

    this.swidth = 300;
    this.sheight = 300;
    this.varHPBAR = -15;
    this.offSetMinion = 10;

    // img
    this.img = new Image();
    this.img.src = `./../../../images/enemies/bosses/queen_boss.png`;
    this.img.currentLoopIndex = 0;
    this.img.frames = 3;
  }
}
