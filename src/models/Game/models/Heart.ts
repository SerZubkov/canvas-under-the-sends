import DefaultModel, { DefaultModelConstructor } from '../Extends/DefaultModel';

type Hearts = {
    active: boolean;
    width: number;
    height: number;
};

type Constructor = DefaultModelConstructor & {
    hearts: Hearts[];
};

class Heart extends DefaultModel {
    hearts: Hearts[] = [];

    constructor(props: Constructor) {
        super(props);

        this.hearts = props.hearts;
    }

    render(): void {
        if (this.image) {
            // this.ctx?.drawImage(this.image, this.x, this.y);
        }
    }
}

export default Heart;
