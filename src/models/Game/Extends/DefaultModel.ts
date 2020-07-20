export type DefaultModelConstructor = { ctx: CanvasRenderingContext2D; image: HTMLImageElement };

class DefaultModel {
    ctx?: CanvasRenderingContext2D;

    image?: HTMLImageElement;

    constructor({ ctx, image }: DefaultModelConstructor) {
        this.ctx = ctx;
        this.image = image;
    }
}

export default DefaultModel;
