import { Game } from '../types';

function initCanvasSize(this: Game): void {
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

export default initCanvasSize;
