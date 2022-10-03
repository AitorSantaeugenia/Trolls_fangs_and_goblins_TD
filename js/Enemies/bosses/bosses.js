class Dragon extends Minons {
  constructor(context, path, width, height) {
    super(context, path, width, height);
    this.x = this.path[0][0];
    this.y = this.path[0][1];
    this.w = 100;
    this.h = 100;

    // stats
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
    this.img.src = `https://aitorsantaeugenia.github.io/Trolls_fangs_and_goblins_TD/images/enemies/bosses/dragon_boss.png`;
    this.img.currentLoopIndex = 0;
    this.img.frames = 3;
  }
}

class DragonBoss extends Minons {
  constructor(context, path, width, height) {
    super(context, path, width, height);
    this.x = this.path[0][0];
    this.y = this.path[0][1];
    this.w = 100;
    this.h = 100;

    // stats
    this.speed = 1;
    this.gold = 80;
    this.minionHp = 1000;
    this.minionHpOffset = 1000;

    this.swidth = 300;
    this.sheight = 300;
    this.varHPBAR = -30;
    this.offSetMinion = 20;

    // img
    this.img = new Image();
    this.img.src = `https://aitorsantaeugenia.github.io/Trolls_fangs_and_goblins_TD/images/enemies/bosses/dragon_boss_2.png`;
    this.img.currentLoopIndex = 0;
    this.img.frames = 3;
  }
}

class DragonLordBoss extends Minons {
  constructor(context, path, width, height) {
    super(context, path, width, height);
    this.x = this.path[0][0];
    this.y = this.path[0][1];
    this.w = 100;
    this.h = 100;

    // stats
    this.speed = 1.2;
    this.gold = 500;
    this.minionHp = 20000;
    this.minionHpOffset = 20000;

    this.swidth = 300;
    this.sheight = 300;
    this.varHPBAR = -30;
    this.offSetMinion = 20;

    // img
    this.img = new Image();
    this.img.src = `https://aitorsantaeugenia.github.io/Trolls_fangs_and_goblins_TD/images/enemies/bosses/dragon_boss_lord.png`;
    this.img.currentLoopIndex = 0;
    this.img.frames = 3;
  }
}

class Lord extends Minons {
  constructor(context, path, width, height) {
    super(context, path, width, height);
    this.x = this.path[0][0];
    this.y = this.path[0][1];
    this.w = 50;
    this.h = 50;

    // stats
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
    this.img.src = `https://aitorsantaeugenia.github.io/Trolls_fangs_and_goblins_TD/images/enemies/bosses/lord_2.png`;
    this.img.currentLoopIndex = 0;
    this.img.frames = 3;
  }
}

class LordBoss extends Minons {
  constructor(context, path, width, height) {
    super(context, path, width, height);
    this.x = this.path[0][0];
    this.y = this.path[0][1];
    this.w = 60;
    this.h = 60;

    // stats
    this.speed = 1;
    this.gold = 150;
    this.minionHp = 5000;
    this.minionHpOffset = 5000;

    this.swidth = 300;
    this.sheight = 300;
    this.varHPBAR = -12;
    this.offSetMinion = 12;

    // img
    this.img = new Image();
    this.img.src = `https://aitorsantaeugenia.github.io/Trolls_fangs_and_goblins_TD/images/enemies/bosses/lord.png`;
    this.img.currentLoopIndex = 0;
    this.img.frames = 3;
  }
}

class King extends Minons {
  constructor(context, path, width, height) {
    super(context, path, width, height);
    this.x = this.path[0][0];
    this.y = this.path[0][1];
    this.w = 80;
    this.h = 80;

    // stats
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
    this.img.src = `https://aitorsantaeugenia.github.io/Trolls_fangs_and_goblins_TD/images/enemies/bosses/king.png`;
    this.img.currentLoopIndex = 0;
    this.img.frames = 3;
  }
}

class QueenBoss extends Minons {
  constructor(context, path, width, height) {
    super(context, path, width, height);
    this.x = this.path[0][0];
    this.y = this.path[0][1];
    this.w = 60;
    this.h = 60;

    // stats
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
    this.img.src = `https://aitorsantaeugenia.github.io/Trolls_fangs_and_goblins_TD/images/enemies/bosses/queen_boss.png`;
    this.img.currentLoopIndex = 0;
    this.img.frames = 3;
  }
}

class SnowBoss extends Minons {
  constructor(context, path, width, height) {
    super(context, path, width, height);
    this.x = this.path[0][0];
    this.y = this.path[0][1];
    this.w = 100;
    this.h = 100;

    // stats
    this.speed = 1;
    this.gold = 500;
    this.minionHp = 25000;
    this.minionHpOffset = 25000;

    this.swidth = 300;
    this.sheight = 300;
    this.varHPBAR = -34;
    this.offSetMinion = 20;

    // img
    this.img = new Image();
    this.img.src = `https://aitorsantaeugenia.github.io/Trolls_fangs_and_goblins_TD/images/enemies/bosses/snow_lord_boss.png`;
    this.img.currentLoopIndex = 0;
    this.img.frames = 3;
  }
}
