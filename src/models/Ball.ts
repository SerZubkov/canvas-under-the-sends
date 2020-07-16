import { HEIGHT_GAME, WIDTH_GAME, BALL_HEIGHT, BALL_WIDTH, PLATFORM_HEIGHT, BALL_VELOCITY } from '../constant';
import intervalRandom from '../utils/intervalRandom';

// eslint-disable-next-line import/no-cycle
import Platform from './Platform';

type Collide = {
    x: number;
    y: number;
    width: number;
    height: number;
};

class Ball {
    x = WIDTH_GAME / 2 - BALL_WIDTH / 2;

    y = HEIGHT_GAME - BALL_HEIGHT - PLATFORM_HEIGHT;

    dx = 0;

    dy = 0;

    velocity = BALL_VELOCITY;

    width = BALL_WIDTH;

    height = BALL_HEIGHT;

    set updatePositionX(velocity: number) {
        if (velocity) {
            this.x += velocity;
        }
    }

    start(): void {
        this.dy = -this.velocity;
        this.dx = intervalRandom(-this.velocity, this.velocity);
    }

    move(): void {
        if (this.dy) {
            this.y += this.dy;
        }
        if (this.dx) {
            this.x += this.dx;
        }
    }

    collide(block: Collide): boolean {
        const x = this.x + this.dx;
        const y = this.y + this.dy;
        if (
            x + this.width > block.x &&
            x < block.x + block.width &&
            y + this.height > block.y &&
            y < block.y + block.height
        ) {
            return true;
        }
        return false;
    }

    bumbBlock(): void {
        this.dy *= -1;
    }

    bumbPlatform(platform: Platform): void {
        if (this.dy > 0) {
            this.dy = -this.velocity;
            const touchX = this.x + this.width / 2;
            this.dx = this.velocity * platform.getPlatformTouch(touchX);
        }
    }

    collideWindowBounds(): void {
        const motionX = this.x + this.dx;
        const motionY = this.y + this.dy;

        if (motionX < 0) {
            this.x = 0;
            this.dx = +this.velocity;
        } else if (motionY < 0) {
            this.y = 0;
            this.dy = this.velocity;
        } else if (motionX + this.width > WIDTH_GAME) {
            this.x = WIDTH_GAME - this.width;
            this.dx = -this.dx;
        } else if (motionY + this.height > HEIGHT_GAME) {
            console.log('Game over!');
        }
    }
}

export default Ball;
