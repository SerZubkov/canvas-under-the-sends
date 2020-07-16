import './styles/style.scss';
import initCanvasSize from './utils/initCanvasSize';
import { Game, KeyImages } from './types';

import { HEIGHT_GAME, WIDTH_GAME, KEY_CODE } from './constant';
import Ball from './models/Ball';
import Platform from './models/Platform';
import Block from './models/Block';

const game: Game = {
    ctx: null,
    canvas: null,
    images: {
        background: null,
        ball: null,
        block: null,
        platform: null,
    },
    width: WIDTH_GAME,
    height: HEIGHT_GAME,
    ball: new Ball(),
    blocks: new Block(),
    platform: new Platform(),
    init() {
        this.canvas = <HTMLCanvasElement>document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');

        // Определяем размер экрана игры
        initCanvasSize.bind(this)();

        // Добавляем ссылку ball для платформы
        this.platform.addBall(this.ball);

        // Добавляем эвенты
        this.setEvents();
    },
    preload(callback) {
        let loaded = 0;
        const images = Object.keys(this.images) as KeyImages[];
        images.forEach((src) => {
            const image = new Image();
            image.src = `src/static/sprites/${src}.png`;
            this.images[src] = image;
            this.images[src]?.addEventListener('load', () => {
                loaded += 1;
                if (loaded >= images.length) {
                    callback();
                }
            });
        });
    },
    setEvents() {
        window.addEventListener('keydown', (e) => {
            switch (e.keyCode) {
                case KEY_CODE.LEFT:
                    this.platform.minusPositionDX();
                    break;
                case KEY_CODE.RIGHT:
                    this.platform.plusPositionDX();
                    break;
                case KEY_CODE.SPACE:
                    this.platform.fire();
                    this.ball.start();
                    break;
                default:
                    break;
            }
        });

        window.addEventListener('keyup', (e) => {
            if (e.key)
                if (e.keyCode === KEY_CODE.LEFT || e.keyCode === KEY_CODE.RIGHT) {
                    this.platform.stopPositionDX();
                }
        });
    },
    updateController() {
        this.platform.move();
        this.ball.move();

        this.collideBlock();
        this.collidePlatform();
        this.ball.collideWindowBounds();
    },
    collideBlock() {
        this.blocks.items.forEach((element, i) => {
            if (this.ball.collide(element)) {
                if (element.active) {
                    this.ball.bumbBlock();
                }
                this.blocks.deactivationBlock = i;
            }
        });
    },
    collidePlatform() {
        if (this.ball.collide(this.platform)) {
            this.ball.bumbPlatform(this.platform);
        }
    },
    run() {
        window.requestAnimationFrame(() => {
            this.updateController();
            this.render();
            this.run();
        });
    },
    render() {
        this.ctx?.clearRect(0, 0, this.width, this.height);
        if (this.images.background) {
            this.ctx?.drawImage(this.images.background, 0, 0);
        }
        if (this.images.ball) {
            this.ctx?.drawImage(
                this.images.ball,
                0,
                0,
                this.ball.width,
                this.ball.height,
                this.ball.x,
                this.ball.y,
                this.ball.width,
                this.ball.height,
            );
        }
        if (this.images.platform) {
            // console.log('this.platform.x', this.platform.x);
            this.ctx?.drawImage(this.images.platform, this.platform.x, this.platform.y);
        }
        this.renderInitBlocks();
    },
    renderInitBlocks() {
        this.blocks.items.forEach((element) => {
            if (this.images.block && element.active) {
                this.ctx?.drawImage(this.images.block, element.x, element.y);
            }
        });
    },
    start() {
        this.init();
        this.preload(() => {
            this.run();
        });
    },
};

window.addEventListener('load', () => {
    game.start();
});
