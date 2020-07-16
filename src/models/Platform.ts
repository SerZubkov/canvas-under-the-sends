import { HEIGHT_GAME, WIDTH_GAME, PLATFORM_WIDTH, PLATFORM_HEIGHT, PLATFORM_VELOCITY } from '../constant';

// eslint-disable-next-line import/no-cycle
import Ball from './Ball';

class Platform {
    x = WIDTH_GAME / 2 - PLATFORM_WIDTH / 2;

    y = HEIGHT_GAME - PLATFORM_HEIGHT;

    dx = 0;

    velocity = PLATFORM_VELOCITY;

    width = PLATFORM_WIDTH;

    height = PLATFORM_HEIGHT;

    ball: Ball | null = null;

    fire(): void {
        if (this.ball) {
            this.ball.start();
            this.ball = null;
        }
    }

    addBall(ball: Ball): void {
        this.ball = ball;
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
}

export default Platform;
