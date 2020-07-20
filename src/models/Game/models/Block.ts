import {
    BLOCK_WIDTH,
    BLOCK_HEIGHT,
    BLOCKS_ROW,
    BLOCKS_COLUMN,
    BLOCKS_MARGIN,
    WIDTH_GAME,
    BLOCKS_TOP_Y,
} from 'constant';
import DefaultModel, { DefaultModelConstructor } from '../Extends/DefaultModel';

export type Item = {
    x: number;
    y: number;
    width: number;
    height: number;
    active: boolean;
};

class Blocks extends DefaultModel {
    x = 0;

    y = 0;

    row = BLOCKS_ROW;

    column = BLOCKS_COLUMN;

    items: Item[] = [];

    width = BLOCK_WIDTH;

    height = BLOCK_HEIGHT;

    constructor(options: DefaultModelConstructor) {
        super(options);
        this.initial();
    }

    initial(): void {
        const blockWithMargin = this.width + BLOCKS_MARGIN;
        const blockHeightMargin = this.height + BLOCKS_MARGIN;
        const arr = [];
        for (let row = 0; row < this.row; row += 1) {
            for (let column = 0; column < this.column; column += 1) {
                arr.push({
                    x: blockWithMargin * column + (WIDTH_GAME / 2 - (this.column / 2) * blockWithMargin),
                    y: blockHeightMargin * row + BLOCKS_TOP_Y,
                    width: this.width,
                    height: this.height,
                    active: true,
                });
            }
        }
        this.items = arr;
    }

    reset(): void {
        this.initial();
    }

    set deactivationBlock(index: number) {
        this.items = this.items.map((item, i) => ({
            ...item,
            active: item.active ? i !== index : false,
        }));
    }

    set updateBlocks(blocks: Item[]) {
        this.items = blocks;
    }

    render(): void {
        this.items.forEach((element) => {
            if (this.image && element.active) {
                this.ctx?.drawImage(this.image, element.x, element.y);
            }
        });
    }
}

export default Blocks;
