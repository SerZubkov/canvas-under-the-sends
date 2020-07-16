import { HEIGHT_GAME, WIDTH_GAME, PLATFORM_WIDTH, PLATFORM_HEIGHT, PLATFORM_VELOCITY } from '../constant';

// eslint-disable-next-line import/no-cycle
import Ball from './Ball';
import DefaultModel, { DefaultModelConstructor } from './Extends/DefaultModel';

type Constructor = DefaultModelConstructor & {
    ball: Ball;
};
class Platform extends DefaultModel {
    x = WIDTH_GAME / 2 - PLATFORM_WIDTH / 2;

    y = HEIGHT_GAME - PLATFORM_HEIGHT;

    dx = 0;

    velocity = PLATFORM_VELOCITY;

    width = PLATFORM_WIDTH;

    height = PLATFORM_HEIGHT;

    ball: Ball | null = null;

    constructor(options: Constructor) {
        super(options);

        this.ball = options.ball;
    }

    fire(): void {
        if (this.ball) {
            this.ball.start();
            this.ball = null;
        }
    }

    removeBall(): void {
        this.ball = null;
    }

    plusPositionDX(): void {
        this.dx = +this.velocity;
    }

    minusPositionDX(): void {
        this.dx = -this.velocity;
    }

    move(): void {
        if (this.dx) {
            this.x += this.dx;

            if (this.ball) {
                this.ball.updatePositionX = this.dx;
            }
        }
    }

    stopPositionDX(): void {
        this.dx = 0;
    }

    getPlatformTouch(touchX: number): number {
        const diff = this.x + this.width - touchX;
        const offset = this.width - diff;
        const result = (2 * offset) / this.width;
        return result - 1;
    }

    collideWindowPlatform(): void {
        if (this.x + this.dx < 0) {
            this.dx = 0;
            this.x = 0;
            if (this.ball) {
                this.ball.setPositionX = this.width / 2 - this.ball.width / 2;
            }
        }
        if (this.x + this.width + this.dx >= WIDTH_GAME) {
            this.dx = 0;
            this.x = WIDTH_GAME - this.width;

            if (this.ball) {
                this.ball.setPositionX = this.width / 2 - this.ball.width / 2 + this.x;
            }
        }
    }

    render(): void {
        if (this.image) {
            this.ctx?.drawImage(this.image, this.x, this.y);
        }
    }
}

export default Platform;
