import Ball from '../models/Ball';
import Blocks from '../models/Block';
import Platform from '../models/Platform';

export type Images = {
    background: HTMLImageElement | null;
    ball: HTMLImageElement | null;
    block: HTMLImageElement | null;
    platform: HTMLImageElement | null;
};
export type Sprites = {
    x: number;
    y: number;
    width: number;
    height: number;
};

export type KeyImages = keyof Images;

export type Game = {
    // state
    canvas: HTMLCanvasElement | null;
    ctx: CanvasRenderingContext2D | null;
    images: Images;
    ball: Ball;
    platform: Platform;
    blocks: Blocks;
    width: number;
    height: number;

    // actions

    init: () => void;
    preload: (callback: () => void) => void;
    render: () => void;
    renderInitBlocks: () => void;
    collideBlock: () => void;
    collidePlatform: () => void;
    start: () => void;
    run: () => void;
    setEvents: () => void;
    updateController: () => void;
};
