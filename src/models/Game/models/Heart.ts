import { HEARTS_HEIGHT, HEARTS_WIDTH, HEARTS_PADDING, HEARTS_MARGIN } from 'constant';

import DefaultModel, { DefaultModelConstructor } from '../Extends/DefaultModel';

type Hearts = {
    active: boolean;
    width: number;
    height: number;
    x: number;
    y: number;
};

type Constructor = DefaultModelConstructor & {
    lives: number;
    heightWindow: number;
};

type MapHearts = { heightWindow: number; lives: number };

const mapHears = ({ heightWindow, lives }: MapHearts): Hearts[] => {
    const hearts = [];
    for (let index = 0; index < lives; index += 1) {
        const padding = index === 0 ? 0 : (HEARTS_PADDING + HEARTS_WIDTH) * index;
        hearts.push({
            active: true,
            width: HEARTS_WIDTH,
            height: HEARTS_HEIGHT,
            x: HEARTS_MARGIN + padding,
            y: heightWindow - HEARTS_MARGIN - HEARTS_HEIGHT,
        });
    }
    return hearts;
};

class Heart extends DefaultModel {
    hearts: Hearts[] = [];

    constructor(options: Constructor) {
        super(options);

        this.hearts = mapHears({ heightWindow: options.heightWindow, lives: options.lives });
    }

    get heartsCount(): number {
        return this.hearts.length;
    }

    reset({ heightWindow, lives }: MapHearts): void {
        this.hearts = mapHears({ heightWindow, lives });
    }

    minusHear(): void {
        this.hearts.pop();
    }

    render(): void {
        this.hearts.forEach((element) => {
            if (this.image) {
                this.ctx?.drawImage(this.image, element.x, element.y);
            }
        });
    }
}

export default Heart;
