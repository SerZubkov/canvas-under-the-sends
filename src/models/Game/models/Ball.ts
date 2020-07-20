import intervalRandom from 'utils/intervalRandom';
import { HEIGHT_GAME, WIDTH_GAME, BALL_HEIGHT, BALL_WIDTH, PLATFORM_HEIGHT, BALL_VELOCITY } from 'constant';

// eslint-disable-next-line import/no-cycle
import Platform from './Platform';
import DefaultModel from '../Extends/DefaultModel';

type Collide = {
    x: number;
    y: number;
    width: number;
    height: number;
};

const isInScope = ({ x, y, block }: { x: number; y: number; block: Collide }): boolean => {
    return x > block.x && x < block.x + block.width && y > block.y && y < block.y + block.height;
};

const getPositiveNumber = (number: number): number => {
    return number > 0 ? number : number * -1;
};
const getNegativeNumber = (number: number): number => {
    return number < 0 ? number : number * -1;
};

class Ball extends DefaultModel {
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

    set setPositionX(x: number) {
        this.x = x;
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

        console.log('this.dx', this.dx);
    }

    collide(block: Collide): { x?: number; y?: number; touch: boolean } {
        const x = this.x + this.dx;
        const y = this.y + this.dy;
        const ifTop = y + this.height > block.y;
        const ifBottom = y < block.y + block.height;
        const ifLeft = x < block.x + block.width;
        const ifRight = x + this.width > block.x;

        if (ifRight && ifLeft && ifTop && ifBottom) {
            const A = isInScope({ x, y: y + this.height, block });
            const B = isInScope({ x, y, block });
            const C = isInScope({ x: x + this.width, y, block });
            const D = isInScope({ x: x + this.width, y: y + this.height, block });
            let touchX;
            let touchY;
            if (A && !B && !C && !D) {
                touchX = getPositiveNumber(this.dx);
                touchY = getNegativeNumber(this.dy);
            }
            if (A && B && !C && !D) {
                touchX = getPositiveNumber(this.dx);
                touchY = this.dy;
            }
            if (!A && B && !C && !D) {
                touchX = getPositiveNumber(this.dx);
                touchY = getPositiveNumber(this.dy);
            }
            if (!A && B && C && !D) {
                touchX = this.dx;
                touchY = getPositiveNumber(this.dy);
            }
            if (!A && !B && C && !D) {
                touchX = getNegativeNumber(this.dx);
                touchY = getPositiveNumber(this.dy);
            }
            if (!A && !B && C && D) {
                touchX = getNegativeNumber(this.dx);
                touchY = this.dy;
            }
            if (!A && !B && !C && D) {
                touchX = getNegativeNumber(this.dx);
                touchY = getNegativeNumber(this.dy);
            }
            if (A && !B && !C && D) {
                touchX = this.dx;
                touchY = getNegativeNumber(this.dy);
            }
            return {
                touch: true,
                x: touchX as number,
                y: touchY as number,
            };
        }
        return {
            touch: false,
            x: undefined,
            y: undefined,
        };
    }

    bumbBlock({ x, y }: { x?: number; y?: number }): void {
        if (y) {
            this.dy = y;
        }
        if (x) {
            this.dx = x;
        }
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

    render(): void {
        if (this.image) {
            this.ctx?.drawImage(this.image, 0, 0, this.width, this.height, this.x, this.y, this.width, this.height);
        }
    }
}

export default Ball;
