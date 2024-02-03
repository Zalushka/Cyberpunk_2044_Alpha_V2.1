var index = 2;

document.addEventListener('keydown', (e) => {
    if (e.code == 'KeyD') user.xvr = 7, index = 0;
    if (e.code == 'KeyA') user.xvl = -7, index = 1;
    if (e.code == 'KeyW') {
        if (grounded) {
            user.yv = -10, grounded = false;
            if (index == 1) {
                index = 4
            } else if (index == 0) {
                index = 3;
            }else if(index == 2){
                index = 3
            }else if(index == 5){
                index = 4
            }
        }
    }

});

document.addEventListener('keyup', (e) => {
    if (e.code == 'KeyD') {user.xvr = 0; if(index == 0) index = 2};
    if (e.code == 'KeyA') {user.xvl = 0; if(index == 1) index = 5;}

});

const
    canvas = document.querySelector('.canvas'),
    ctx = canvas.getContext('2d');

w = canvas.width = window.innerWidth;
h = canvas.height = window.innerHeight;

let grounded = false;

let gameframe = 0;



let image = new Image();
image.src = 'stinger.png';



let animations = [
    {
        name: 'Run to right',
        animation: './Raider_1/Run.png',
        frames: 6,
        image: new Image()
    },

    {
        name: 'Run to left',
        animation: './Raider_1/Run_left.png',
        frames: 6,
        image: new Image()
    },

    {
        name: 'idle',
        animation: './Raider_1/idle.png',
        frames: 4,
        image: new Image()
    },

    {
        name: 'jump',
        animation: './Raider_1/Jump.png',
        frames: 9,
        image: new Image()
    },

    {
        name: 'jump to left',
        animation: './Raider_1/Jump_left.png',
        frames: 9,
        image: new Image()
    },

    {
        name: 'idle_left',
        animation: './Raider_1/idle_left.png',
        frames: 4,
        image: new Image()
    },
];

const propert = {
    fillColor: 'rgba(255, 40, 40, 1)',
    tringlesize: 60,
};

function backDraw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, w, h);
    ctx.fill();

};

class Player {
    constructor(x, y, xvr, xvl, yv) {
        this.x = x;
        this.y = y;
        this.xvr = xvr;
        this.xvl = xvl;
        this.yv = yv;
        this.spriteWidth = 128;
        this.spriteHeight = 128;
        this.width = this.spriteWidth;
        this.height = this.spriteHeight
        this.frame = 0;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.strokeStyle = propert.fillColor;
        this.x += this.xvl;
        this.x += this.xvr;
        this.y += this.yv;
        ctx.strokeRect(this.x, this.y, 100, 100);
        ctx.closePath();
        ctx.fill();

        let playerImage = new Image();
        playerImage.src = animations[index].animation

        if (gameframe % 5 === 0) {
            this.frame > animations[index].frames ? this.frame = 0 : this.frame++;
        }

        ctx.drawImage(playerImage, this.frame * this.spriteWidth, 0, this.spriteHeight, this.spriteHeight, this.x - 10, this.y - 27, this.width, this.height)


    }
};

var user = new Player(w / 2, h / 2, 0, 0, 0);

var randomPlace = Math.random() * w;

class Trap {
    constructor(xpos, ypos, color) {
        this.color = color;
        this.xpos = xpos;
        this.ypos = ypos;
        this.speed = 50;
    }

    spawnTrap(ctx) {
        ctx.beginPath();
        ctx.fillStyle = 'gray';
        ctx.fillRect(randomPlace + 10, h - 100, 40, 5);
        ctx.closePath()

        this.xpos += this.speed;
        console.log(this.xpos)

        ctx.beginPath();
        ctx.fillStyle = 'rgba(244, 40, 40, 0.25)';
        ctx.fillRect(this.xpos, this.ypos, propert.tringlesize, propert.tringlesize);
        ctx.fill();

        ctx.drawImage(image, this.xpos, this.ypos, propert.tringlesize, propert.tringlesize);
    };

}

var stinger = new Trap(randomPlace, h - 85, 'white');

function collision() {
    if (
        user.x + 100 >= randomPlace + 10 &&
        user.x <= randomPlace + 40 &&
        user.y + 100 >= h - 105
    ) {
        user.y = h - 210;
        grounded = true;

    };

    if(stinger.xpos >= randomPlace + 50){
        stinger.xpos = randomPlace - 100;
    }

    if (user.y >= h - 150) {
        user.y = h - 150;
        grounded = true;
    };

    if (user.x >= w + 100) {
        user.x = 0;
        console.log(user.x)
    } else
        if (user.x + 100 <= -100) {
            user.x = w - 100;
            console.log(user.x)
        };

    if (
        user.x + 100 >= stinger.xpos + 50 &&
        user.x <= stinger.xpos + 100 &&
        user.y + 100 >= stinger.ypos
    ) {
        location.reload()
    };;

};

setInterval(function gravity() {
    if (grounded == false) {
        user.yv += 0.05;
    }
});

function loop() {
    backDraw();
    user.draw(ctx)
    collision();
//    traps.forEach(element => {
        stinger.spawnTrap(ctx);
 //   });
    gameframe++;
    requestAnimationFrame(loop);
};

function init() {
    loop();
};

init();
