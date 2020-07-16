import './styles/style.scss';
import initCanvasSize from './utils/initCanvasSize';
import { Game, KeyImages } from './types';

import { HEIGHT_GAME, WIDTH_GAME, KEY_CODE } from './constant';
import Ball from './models/Ball';
import Platform from './models/Platform';
import Block from './models/Block';
import Heart from './models/Heart';

const game: Game = {
    ctx: null,
    canvas: null,
    images: {
        background: null,
        ball: null,
        block: null,
        platform: null,
        heart: null,
    },
    width: WIDTH_GAME,
    height: HEIGHT_GAME,
    ball: undefined,
    blocks: undefined,
    platform: undefined,
    heart: new Heart(),
    init() {
        this.canvas = <HTMLCanvasElement>document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        // Определяем размер экрана игры
        initCanvasSize.bind(this)();
        // Добавляем эвенты
        this.setEvents();
    },
    preload(callback) {
        let loaded = 0;
        const images = Object.keys(this.images) as KeyImages[];
        images.forEach((src) => {
            const image = new Image();
            image.src = `src/static/${src}.png`;
            this.images[src] = image;
            this.images[src]?.addEventListener('load', () => {
                loaded += 1;
                if (loaded >= images.length) {
                    callback();
                }
            });
        });

        if (this.ctx) {
            if (this.images.block) {
                this.blocks = new Block({ ctx: this.ctx, image: this.images.block });
            }
            if (this.images.ball) {
                this.ball = new Ball({ ctx: this.ctx, image: this.images.ball });
            }
            if (this.images.platform && this.ball) {
                this.platform = new Platform({ ctx: this.ctx, image: this.images.platform, ball: this.ball });
            }
        }
    },
    setEvents() {
        window.addEventListener('keydown', (e) => {
            switch (e.keyCode) {
                case KEY_CODE.LEFT:
                    this.platform?.minusPositionDX();
                    break;
                case KEY_CODE.RIGHT:
                    this.platform?.plusPositionDX();
                    break;
                case KEY_CODE.SPACE:
                    this.platform?.fire();
                    this.ball?.start();
                    break;
                default:
                    break;
            }
        });
        window.addEventListener('keyup', (e) => {
            if (e.key)
                if (e.keyCode === KEY_CODE.LEFT || e.keyCode === KEY_CODE.RIGHT) {
                    this.platform?.stopPositionDX();
                }
        });
    },
    updateController() {
        this.platform?.move();
        this.ball?.move();

        this.collideBlock();
        this.collidePlatform();
        this.ball?.collideWindowBounds();
        this.platform?.collideWindowPlatform();
    },
    collideBlock() {
        this.blocks?.items.forEach((element, i) => {
            if (this.ball?.collide(element)) {
                if (element.active) {
                    this.ball?.bumbBlock();
                }
                if (this.blocks) this.blocks.deactivationBlock = i;
            }
        });
    },
    collidePlatform() {
        if (this.platform && this.ball?.collide(this.platform)) {
            this.ball?.bumbPlatform(this.platform);
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
        this.ball?.render();
        this.platform?.render();
        this.blocks?.render();
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
