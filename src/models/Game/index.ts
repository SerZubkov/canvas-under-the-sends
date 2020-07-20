import { KeyImages, Images } from 'types';

import { KEY_CODE } from 'constant';
import Ball from './models/Ball';
import Platform from './models/Platform';
import Block from './models/Block';
import Heart from './models/Heart';

type ConstructorGame = {
    height: number;
    width: number;
};

class Game {
    ctx: CanvasRenderingContext2D | null = null;

    canvas: HTMLCanvasElement | null = null;

    images: Images = {
        background: null,
        ball: null,
        block: null,
        platform: null,
        heart: null,
    };

    width = 0;

    height = 0;

    ball?: Ball;

    blocks?: Block;

    platform?: Platform;

    heart?: Heart;

    constructor({ height, width }: ConstructorGame) {
        this.height = height;
        this.width = width;
    }

    initCanvasSize(): void {
        const realWidth = window.innerWidth * window.devicePixelRatio;
        const realHeight = window.innerHeight * window.devicePixelRatio;
        const maxHeight = this.height;
        const maxWidth = this.width;
        this.height = Math.min(Math.floor((maxWidth * realHeight) / realWidth), maxHeight);
        if (this.canvas) {
            this.canvas.width = this.width;
            this.canvas.height = this.height;
        }
    }

    init(): void {
        this.canvas = <HTMLCanvasElement>document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        // Определяем размер экрана игры
        this.initCanvasSize();
        // Добавляем эвенты
        this.setEvents();
    }

    preload(callback: () => void): void {
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
    }

    setEvents(): void {
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
    }

    updateController(): void {
        this.platform?.move();
        this.ball?.move();

        this.collideBlock();
        this.collidePlatform();
        this.ball?.collideWindowBounds();
        this.platform?.collideWindowPlatform();
    }

    collideBlock(): void {
        this.blocks?.items.forEach((element, i) => {
            const collide = this.ball?.collide(element);
            if (collide && collide.x && collide.y) {
                if (element.active) {
                    this.ball?.bumbBlock(collide);
                }
                if (this.blocks) this.blocks.deactivationBlock = i;
            }
        });
    }

    collidePlatform(): void {
        if (this.platform) {
            const collide = this.ball?.collide(this.platform);
            if (collide && collide.touch) {
                this.ball?.bumbPlatform(this.platform);
            }
        }
    }

    run(): void {
        window.requestAnimationFrame(() => {
            this.updateController();
            this.render();
            this.run();
        });
    }

    render(): void {
        this.ctx?.clearRect(0, 0, this.width, this.height);
        if (this.images.background) {
            this.ctx?.drawImage(this.images.background, 0, 0);
        }
        this.ball?.render();
        this.platform?.render();
        this.blocks?.render();
    }

    start(): void {
        this.init();
        this.preload(() => {
            this.run();
        });
    }
}

export default Game;
